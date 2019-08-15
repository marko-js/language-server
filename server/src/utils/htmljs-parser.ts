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
    argument: { pos: number; endPos: number; value: string } | undefined; // TODO: check
    params: { pos: number; endPos: number; value: string } | undefined; // TODO: check
    attributes: Attribute[];
    nestedTags: { [x: string]: Tag } | void;
    openTagOnly: boolean;
    selfClosed: boolean;
    tagNameEndPos: number;
    isNestedTag: boolean;
    isRepeated: boolean;
    targetProperty: string | void;
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

  export type Any =
    | Error
    | OpenTagName
    | OpenTag
    | CloseTag
    | Placeholder
    | AttributeName
    | AttributeModifier
    | AttributeValue;

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
      onOpenTagName(tag: ParserEvents.OpenTagName) {
        if (parentTag) {
          tag.parent = parentTag as ParserEvents.OpenTag;
        }

        // Currently the parser has the wrong end position here with tag params :\
        tag.endPos = tag.pos + tag.tagName.length;
        parentTag = tag;
        finish(tag);
      },
      onOpenTag(tag: ParserEvents.OpenTag) {
        tag.parent = parentTag!.parent;
        parentTag = tag;

        let attrEndPos = tag.tagNameEndPos;
        for (const attr of tag.attributes) {
          const attrStartPos = text.indexOf(attr.name, attrEndPos);

          if (attr.name.slice(0, 3) === "...") {
            attrEndPos = attr.argument ? attr.argument.endPos + 1 : attr.endPos;
            continue;
          }

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
                tag,
                name,
                modifier,
                pos: modifierStartPos,
                endPos: modifierEndPos
              })
            ) {
              return;
            }
          }

          const attrNameEndPos = attrStartPos + name.length;

          if (
            finish({
              type: "attributeName",
              tag,
              name,
              pos: attrStartPos,
              endPos: attrNameEndPos
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
                tag,
                name,
                value: text.slice(valueStartPos, attrEndPos), // We use the raw value to ignore things like non standard placeholders.
                pos: valueStartPos,
                endPos: attr.endPos
              })
            ) {
              break;
            }
          } else {
            attrEndPos = attr.argument ? attr.argument.endPos + 1 : attr.endPos;
          }
        }

        finish(tag);
      },
      onCloseTag(tag: ParserEvents.CloseTag) {
        parentTag = parentTag && parentTag.parent;
        finish(tag);
      }
    },
    {
      isOpenTagOnly(tagName: string) {
        const tagDef = taglib.getTag(tagName);
        return tagDef && tagDef.openTagOnly;
      }
    }
  );

  // A new line prevents the parser from erroring before emitting some events.
  parser.parse(`${text}\n`);

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
