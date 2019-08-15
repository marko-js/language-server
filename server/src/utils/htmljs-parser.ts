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
    argument: string | undefined; // TODO: check
    params: string | undefined; // TODO: check
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

  export type Any = Error | OpenTagName | OpenTag | CloseTag | Placeholder;

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
    argument: string | undefined;
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

        parentTag = tag;
        finish(tag);
      },
      onOpenTag(tag: ParserEvents.OpenTag) {
        tag.parent = parentTag!.parent;
        parentTag = tag;

        for (const attribute of tag.attributes) {
          if (attribute.name === "...") {
            continue;
          }

          // TODO
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

  parser.parse(
    `${
      text.slice(offset - 2, offset) === "</"
        ? text.slice(0, offset) + ">" + text.slice(offset)
        : text
    }\n`
  ); // A new line prevents the parser from erroring before emitting some events.

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
