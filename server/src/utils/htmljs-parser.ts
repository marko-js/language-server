import { createParser } from "htmljs-parser";
import { TagLibLookup } from "./compiler";

export namespace ParserEvents {
  export interface Error {
    type: "error";
    code: string;
    message: string;
    pos: number;
    endPos: number;
  }

  export interface OpenTagName extends Tag {
    type: "openTagName";
  }

  export interface OpenTag extends Tag {
    type: "openTag";
    argument: { pos: number; endPos: number; value: string } | undefined;
    params: { pos: number; endPos: number; value: string } | undefined;
    shorthandClassNames:
      | {
          value: string;
          rawParts: { text: string; pos: number; endPos: number }[];
        }[]
      | undefined;
    attributes: Attribute[];
    nestedTags: { [x: string]: Tag } | undefined;
    openTagOnly: boolean;
    selfClosed: boolean;
    tagNameEndPos: number;
    isNestedTag: boolean;
    isRepeated: boolean;
    targetProperty: string | undefined;
  }

  export interface CloseTag {
    type: "closeTag";
    tagName: string;
    pos: number;
    endPos: number;
  }

  export interface Placeholder {
    type: "placeholder";
    escape: boolean;
    pos: number;
    endPos: number; // Added manually.
    value: string;
    withinTagName: string;
    withinOpenTag: string;
    withinAttribute: boolean;
    withinBody: boolean;
    withinString: boolean;
  }

  // Extended events
  export interface AttributeName {
    type: "attributeName";
    tag: OpenTag;
    name: string;
    pos: number;
    endPos: number;
  }

  export interface AttributeModifier {
    type: "attributeModifier";
    tag: OpenTag;
    name: string;
    modifier: string;
    pos: number;
    endPos: number;
  }

  export interface AttributeValue {
    type: "attributeValue";
    tag: OpenTag;
    name: string;
    value: string;
    pos: number;
    endPos: number;
  }

  export interface Text {
    type: "text";
    value: string;
    // Added manually.
    pos: number;
    endPos: number;
    parent: OpenTag | null;
  }

  export interface StyleContent {
    type: "styleContent";
    language: "css" | "less" | "scss";
    block: boolean;
    content: string;
    pos: number;
    endPos: number;
  }

  export type Any =
    | Error
    | OpenTagName
    | OpenTag
    | CloseTag
    | Placeholder
    | AttributeName
    | AttributeModifier
    | AttributeValue
    | Text
    | StyleContent;

  interface Tag {
    tagName: string;
    tagNameExpression: string | undefined;
    emptyTagName: boolean; // eg: <.class>
    concise: boolean;
    pos: number;
    endPos: number;
    // Added manually.
    parent: OpenTag | null;
  }

  interface Attribute {
    name: string;
    argument: { pos: number; endPos: number; value: string } | undefined;
    value: string | undefined;
    pos: number;
    endPos: number;
  }
}

const SUPPORTED_STYLE_LANGS = {
  css: true,
  scss: true,
  less: true,
};

export function parseUntilOffset(options: {
  offset: number;
  text: string;
  taglib: TagLibLookup;
  includeErrors?: boolean;
}) {
  const { offset, text, taglib, includeErrors } = options;
  let result: ParserEvents.Any | null = null;
  let parentTag: ParserEvents.OpenTagName | ParserEvents.OpenTag | null = null;
  const parser = createParser(
    {
      onError: includeErrors && finish,
      onScriptlet: finish,
      onPlaceholder: finish,
      onOpenTagName(ev: ParserEvents.OpenTagName) {
        if (parentTag) {
          ev.parent = parentTag as ParserEvents.OpenTag;
        }

        // Currently the parser has the wrong end position here with tag params :\
        if (!ev.concise) {
          ev.pos += 1;
        }

        ev.endPos = ev.pos + ev.tagName.length;
        parentTag = ev;
        finish(ev);
      },
      onOpenTag(ev: ParserEvents.OpenTag) {
        ev.parent = parentTag!.parent;
        parentTag = ev;

        if (ev.tagName === "style") {
          const firstAttr = ev.attributes[0];
          const isBlock = firstAttr && firstAttr.name.startsWith("{");

          if (isBlock) {
            const content = firstAttr.name.slice(1, -1);
            const pos = text.indexOf(content, ev.tagNameEndPos);
            const endPos = pos + content.length;
            const requestedLanguage =
              ev.shorthandClassNames &&
              ev.shorthandClassNames[0].rawParts[0] &&
              ev.shorthandClassNames[0].rawParts[0].text;
            const language =
              requestedLanguage && SUPPORTED_STYLE_LANGS[requestedLanguage]
                ? (requestedLanguage as keyof typeof SUPPORTED_STYLE_LANGS)
                : "css";

            finish({
              type: "styleContent",
              language,
              block: true,
              content: text.slice(pos, endPos),
              pos,
              endPos,
            });

            return;
          }
        }

        let attrEndPos = ev.tagNameEndPos;
        for (const attr of ev.attributes) {
          if (!attr.name) {
            // Legacy dynamic attrs.
            if (attr.value !== undefined) {
              attrEndPos += attr.value.length;
            }
            continue;
          }

          if (attr.name.slice(0, 3) === "...") {
            attrEndPos = attr.argument ? attr.argument.endPos + 1 : attr.endPos;
            continue;
          }

          const attrStartPos = text.indexOf(attr.name, attrEndPos);
          const match = /:(.*)$/.exec(attr.name);
          const modifier = match && match[1];
          let name = attr.name;

          if (modifier) {
            name = name.slice(0, name.length - modifier.length - 1);
            const modifierStartPos = attrStartPos + name.length;
            const modifierEndPos = modifierStartPos + modifier.length + 1;
            if (
              finish({
                type: "attributeModifier",
                tag: ev,
                name,
                modifier,
                pos: modifierStartPos,
                endPos: modifierEndPos,
              })
            ) {
              return;
            }
          }

          const attrNameEndPos = attrStartPos + name.length;

          if (
            finish({
              type: "attributeName",
              tag: ev,
              name,
              pos: attrStartPos,
              endPos: attrNameEndPos,
            })
          ) {
            return;
          }

          if (attr.value) {
            attrEndPos = attr.endPos;
            const valueStartPos = attr.pos + 1; // Add one to account for "=".
            if (
              finish({
                type: "attributeValue",
                tag: ev,
                name,
                value: text.slice(valueStartPos, attrEndPos), // We use the raw value to ignore things like non standard placeholders.
                pos: valueStartPos,
                endPos: attr.endPos,
              })
            ) {
              break;
            }
          } else {
            attrEndPos = attr.argument ? attr.argument.endPos + 1 : attr.endPos;
          }
        }

        finish(ev);
      },
      onText(ev: ParserEvents.Text) {
        ev.endPos = parser.pos as number;
        ev.pos = ev.endPos - ev.value.length;

        if (parentTag) {
          ev.parent = parentTag as ParserEvents.OpenTag;

          if (parentTag.tagName === "style") {
            finish({
              type: "styleContent",
              language: "css",
              block: false,
              content: ev.value,
              pos: ev.pos,
              endPos: ev.endPos,
            });

            return;
          }
        }

        finish(ev);
      },
      onCloseTag(ev: ParserEvents.CloseTag) {
        parentTag = parentTag && parentTag.parent;
        finish(ev);
      },
    },
    {
      isOpenTagOnly(ev: string) {
        const tagDef = taglib.getTag(ev);
        return tagDef && tagDef.openTagOnly;
      },
    }
  );

  try {
    // We only parse up to the end of the line the user is currently looking for.
    const nextLine = text.indexOf("\n", offset);
    const parseText = nextLine === -1 ? `${text}\n` : text.slice(0, nextLine + 1);
    parser.parse(parseText);
  } catch (err) {
    return includeErrors
      ? ({
          type: "error",
          code: "UNEXPECTED_TOKEN",
          message: err.message,
          pos: parser.pos,
          endPos: parser.pos,
        } as ParserEvents.Error)
      : null;
  }

  return result as ParserEvents.Any | null;

  function finish(event: ParserEvents.Any): boolean {
    const { type, pos, endPos } = event;
    if (
      !result &&
      (type === "error" ||
        (pos != null && pos <= offset && endPos != null && endPos >= offset))
    ) {
      result = event;
      parser.end();
      return true;
    }

    return false;
  }
}
