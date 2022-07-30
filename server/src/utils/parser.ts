import { getNodeAtOffset } from "./get-node-at-offset";
import { createParser, TagType, type Range, type Ranges } from "htmljs-parser";

const styleBlockReg = /((?:\.[^\s\\/:*?"<>|({]+)*)\s*\{/y;
export const UNFINISHED = Number.MAX_SAFE_INTEGER;

export {
  getLines,
  getPosition,
  getLocation,
  type Range,
  type Ranges,
  type Position,
  type Location,
} from "htmljs-parser";

export type Parsed = ReturnType<typeof parse>;
export enum NodeType {
  Program,
  Tag,
  OpenTagName,
  ShorthandId,
  ShorthandClassName,
  TagVar,
  TagArgs,
  TagParams,
  AttrNamed,
  AttrName,
  AttrArgs,
  AttrValue,
  AttrMethod,
  AttrSpread,
  AttrTag,
  Text,
  CDATA,
  Doctype,
  Declaration,
  Comment,
  Placeholder,
  Scriptlet,
  Import,
  Export,
  Class,
  Style,
  Static,
}

export namespace Node {
  export type AnyNode =
    | Program
    | Tag
    | OpenTagName
    | ShorthandId
    | ShorthandClassName
    | TagVar
    | TagArgs
    | TagParams
    | AttrNamed
    | AttrName
    | AttrArgs
    | AttrValue
    | AttrMethod
    | AttrSpread
    | AttrTag
    | Text
    | CDATA
    | Doctype
    | Declaration
    | Comment
    | Placeholder
    | Scriptlet
    | Import
    | Export
    | Class
    | Style
    | Static;
  export type ParentNode = Program | Tag | AttrTag;
  export type StaticNode = Comment | Import | Export | Class | Style | Static;
  export type ParentTag = Tag | AttrTag;
  export type AttrNode = AttrNamed | AttrSpread | AttrTag;
  export type ChildNode =
    | Tag
    | AttrTag
    | Text
    | Doctype
    | Declaration
    | CDATA
    | Comment
    | Placeholder
    | Scriptlet;

  export interface Program extends Range {
    type: NodeType.Program;
    parent: undefined;
    static: StaticNode[];
    body: ChildNode[];
  }

  export interface Tag extends Range {
    type: NodeType.Tag;
    parent: ParentNode;
    owner: undefined;
    concise: boolean;
    open: Range;
    close: Range | undefined;
    nameText: string | undefined;
    bodyType: Exclude<TagType, "statement">;
    name: OpenTagName;
    var: TagVar | undefined;
    args: TagArgs | undefined;
    params: TagParams | undefined;
    shorthandId: ShorthandId | undefined;
    shorthandClassNames: ShorthandClassName[] | undefined;
    attrs: AttrNode[] | undefined;
    selfClosed: boolean;
    body: undefined | ChildNode[];
  }

  export interface AttrTag extends Range {
    type: NodeType.AttrTag;
    parent: ParentTag;
    owner: ParentTag | undefined;
    concise: boolean;
    open: Range;
    close: Range | undefined;
    nameText: string | undefined;
    bodyType: TagType.html;
    name: OpenTagName;
    var: TagVar | undefined;
    args: TagArgs | undefined;
    params: TagParams | undefined;
    shorthandId: ShorthandId | undefined;
    shorthandClassNames: ShorthandClassName[] | undefined;
    attrs: AttrNode[] | undefined;
    selfClosed: boolean;
    body: undefined | ChildNode[];
  }

  export interface OpenTagName extends Ranges.Template {
    type: NodeType.OpenTagName;
    parent: ParentTag;
  }

  export interface ShorthandId extends Ranges.Template {
    type: NodeType.ShorthandId;
    parent: ParentTag;
  }

  export interface ShorthandClassName extends Ranges.Template {
    type: NodeType.ShorthandClassName;
    parent: ParentTag;
  }

  export interface TagVar extends Ranges.Value {
    type: NodeType.TagVar;
    parent: ParentTag;
  }

  export interface TagArgs extends Ranges.Value {
    type: NodeType.TagArgs;
    parent: ParentTag;
  }

  export interface TagParams extends Ranges.Value {
    type: NodeType.TagParams;
    parent: ParentTag;
  }

  export interface Text extends Range {
    type: NodeType.Text;
    parent: ParentNode;
  }

  export interface CDATA extends Ranges.Value {
    type: NodeType.CDATA;
    parent: ParentNode;
  }

  export interface Doctype extends Ranges.Value {
    type: NodeType.Doctype;
    parent: ParentNode;
  }

  export interface Declaration extends Ranges.Value {
    type: NodeType.Declaration;
    parent: ParentNode;
  }

  export interface Comment extends Ranges.Value {
    type: NodeType.Comment;
    parent: ParentNode;
  }

  export interface Placeholder extends Ranges.Value {
    type: NodeType.Placeholder;
    parent: ParentNode;
    escape: boolean;
  }

  export interface Scriptlet extends Ranges.Value {
    type: NodeType.Scriptlet;
    parent: ParentNode;
    block: boolean;
  }

  export interface AttrNamed extends Range {
    type: NodeType.AttrNamed;
    parent: ParentTag;
    name: AttrName;
    args: undefined | AttrArgs;
    value: undefined | AttrValue | AttrMethod;
  }

  export interface AttrName extends Range {
    type: NodeType.AttrName;
    parent: AttrNamed;
  }

  export interface AttrArgs extends Ranges.Value {
    type: NodeType.AttrArgs;
    parent: AttrNamed;
  }

  export interface AttrValue extends Range {
    type: NodeType.AttrValue;
    parent: AttrNamed;
    value: Range;
    bound: boolean;
  }

  export interface AttrMethod extends Range {
    type: NodeType.AttrMethod;
    parent: AttrNamed;
    params: Range;
    body: Range;
  }

  export interface AttrSpread extends Ranges.Value {
    type: NodeType.AttrSpread;
    parent: ParentTag;
  }

  export interface Import extends Range {
    type: NodeType.Import;
    parent: ParentNode;
  }

  export interface Export extends Range {
    type: NodeType.Export;
    parent: ParentNode;
  }

  export interface Class extends Range {
    type: NodeType.Class;
    parent: ParentNode;
  }

  export interface Style extends Range {
    type: NodeType.Style;
    parent: ParentNode;
    ext: string | undefined;
    value: Range;
  }

  export interface Static extends Range {
    type: NodeType.Static;
    parent: ParentNode;
  }
}

export function parse(source: string) {
  const program: Node.Program = {
    type: NodeType.Program,
    parent: undefined,
    static: [],
    body: [],
    start: 0,
    end: source.length,
  };
  let curOpenTagStart: Range | undefined;
  let curParent: Node.ParentNode = program;
  let curStatic: Node.StaticNode | undefined;
  let curAttr: Node.AttrNamed | undefined;

  const parser = createParser({
    onText(range) {
      pushBody(curParent, {
        type: NodeType.Text,
        parent: curParent,
        start: range.start,
        end: range.end,
      });
    },
    onCDATA(range) {
      pushBody(curParent, {
        type: NodeType.CDATA,
        parent: curParent,
        value: range.value,
        start: range.start,
        end: range.end,
      });
    },
    onDoctype(range) {
      pushBody(curParent, {
        type: NodeType.Doctype,
        parent: curParent,
        value: range.value,
        start: range.start,
        end: range.end,
      });
    },
    onDeclaration(range) {
      pushBody(curParent, {
        type: NodeType.Declaration,
        parent: curParent,
        value: range.value,
        start: range.start,
        end: range.end,
      });
    },
    onComment(range) {
      pushBody(curParent, {
        type: NodeType.Comment,
        parent: curParent,
        value: range.value,
        start: range.start,
        end: range.end,
      });
    },
    onPlaceholder(range) {
      pushBody(curParent, {
        type: NodeType.Placeholder,
        parent: curParent,
        value: range.value,
        escape: range.escape,
        start: range.start,
        end: range.end,
      });
    },
    onScriptlet(range) {
      pushBody(curParent, {
        type: NodeType.Scriptlet,
        parent: curParent,
        value: range.value,
        block: range.block,
        start: range.start,
        end: range.end,
      });
    },
    onOpenTagStart(range) {
      curOpenTagStart = range;
    },
    onOpenTagName(range) {
      let concise = true;
      let start = range.start;
      let type = NodeType.Tag;
      let bodyType = TagType.html;
      let nameText: string | undefined = undefined;

      if (curOpenTagStart) {
        concise = false;
        start = curOpenTagStart.start;
        curOpenTagStart = undefined;
      }

      if (!range.expressions.length) {
        switch ((nameText = parser.read(range))) {
          // All statement types will early return.
          case "style": {
            styleBlockReg.lastIndex = range.end;
            const styleBlockMatch = styleBlockReg.exec(source);

            if (styleBlockMatch) {
              const [{ length }, ext] = styleBlockMatch;
              pushStatic(
                program,
                (curStatic = {
                  type: NodeType.Style,
                  parent: program,
                  ext: ext || undefined,
                  value: {
                    start: range.end + length,
                    end: UNFINISHED,
                  },
                  start: range.start,
                  end: UNFINISHED,
                })
              );
              return TagType.statement;
            } else {
              return TagType.text;
            }
          }
          case "class":
            pushStatic(
              program,
              (curStatic = {
                type: NodeType.Class,
                parent: program,
                start: range.start,
                end: UNFINISHED,
              })
            );
            return TagType.statement;
          case "export":
            pushStatic(
              program,
              (curStatic = {
                type: NodeType.Export,
                parent: program,
                start: range.start,
                end: UNFINISHED,
              })
            );
            return TagType.statement;
          case "import":
            pushStatic(
              program,
              (curStatic = {
                type: NodeType.Import,
                parent: program,
                start: range.start,
                end: UNFINISHED,
              })
            );
            return TagType.statement;
          case "static":
            pushStatic(
              program,
              (curStatic = {
                type: NodeType.Static,
                parent: program,
                start: range.start,
                end: UNFINISHED,
              })
            );
            return TagType.statement;

          // The following are all still tags,
          // but with a different body type.
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            bodyType = TagType.void;
            break;
          case "html-comment":
          case "script":
          case "textarea":
            bodyType = TagType.text;
            break;
          default:
            if (nameText[0] === "@") {
              type = NodeType.AttrTag;
            }
            break;
        }
      }

      const parent = curParent as Node.ParentNode;
      const end = UNFINISHED;
      const name: Node.OpenTagName = {
        type: NodeType.OpenTagName,
        parent: undefined as unknown as Node.Tag,
        quasis: range.quasis,
        expressions: range.expressions,
        start: range.start,
        end: range.end,
      };
      const tag =
        (curParent =
        name.parent =
          {
            type,
            parent,
            owner: undefined,
            concise,
            open: { start, end },
            nameText,
            name,
            var: undefined,
            args: undefined,
            params: undefined,
            shorthandId: undefined,
            shorthandClassNames: undefined,
            attrs: undefined,
            selfClosed: false,
            bodyType,
            body: undefined,
            close: undefined,
            start,
            end,
          } as Node.ParentTag);

      if (tag.type === NodeType.AttrTag) {
        // We add attribute tags as a attribute of the closest non transparent tag.
        let owner = parent as Node.ParentTag;
        outer: do {
          switch (owner.type) {
            case NodeType.AttrTag:
              break;
            case NodeType.Tag:
              if (isTransparentTag(owner)) {
                owner = owner.parent as Node.ParentTag;
                continue outer;
              }
              break;
            default:
              break outer;
          }

          tag.owner = owner;
          // This name includes the full ancestry of the attribute tag and can be used in `TaglibLookup.getTag`.
          tag.nameText = resolveAttrTagName(tag);
          pushAttr(owner, tag);
          // eslint-disable-next-line no-constant-condition
        } while (false);
      }

      pushBody(parent, tag);
      curOpenTagStart = undefined;
      return bodyType;
    },
    onTagShorthandId(range) {
      // @ts-expect-error we know we are in a Tag
      declare const curParent: Node.ParentTag;
      curParent.shorthandId = {
        type: NodeType.ShorthandId,
        parent: curParent,
        quasis: range.quasis,
        expressions: range.expressions,
        start: range.start,
        end: range.end,
      };
    },
    onTagShorthandClass(range) {
      // @ts-expect-error we know we are in a Tag
      declare const curParent: Node.ParentTag;
      const shorthandClassName: Node.ShorthandClassName = {
        type: NodeType.ShorthandClassName,
        parent: curParent,
        quasis: range.quasis,
        expressions: range.expressions,
        start: range.start,
        end: range.end,
      };

      if (curParent.shorthandClassNames) {
        curParent.shorthandClassNames.push(shorthandClassName);
      } else {
        curParent.shorthandClassNames = [shorthandClassName];
      }
    },
    onTagVar(range) {
      // @ts-expect-error we know we are in a Tag
      declare const curParent: Node.OpenTag;
      curParent.var = {
        type: NodeType.TagVar,
        parent: curParent,
        value: range.value,
        start: range.start,
        end: range.end,
      };
    },
    onTagParams(range) {
      // @ts-expect-error we know we are in a Tag
      declare const curParent: Node.OpenTag;
      curParent.params = {
        type: NodeType.TagParams,
        parent: curParent,
        value: range.value,
        start: range.start,
        end: range.end,
      };
    },
    onTagArgs(range) {
      // @ts-expect-error we know we are in a Tag
      declare const curParent: Node.OpenTag;
      curParent.args = {
        type: NodeType.TagArgs,
        parent: curParent,
        value: range.value,
        start: range.start,
        end: range.end,
      };
    },
    onAttrName(range) {
      const parent = curParent as Node.Tag;
      const name: Node.AttrName = {
        type: NodeType.AttrName,
        parent: undefined as unknown as Node.AttrNamed,
        start: range.start,
        end: range.end,
      };

      pushAttr(
        parent,
        (curAttr = name.parent =
          {
            type: NodeType.AttrNamed,
            parent,
            name,
            value: undefined,
            args: undefined,
            start: range.start,
            end: range.end,
          })
      );
    },
    onAttrArgs(range) {
      curAttr!.args = {
        type: NodeType.AttrArgs,
        parent: curAttr!,
        value: range.value,
        start: range.start,
        end: range.end,
      };
    },
    onAttrValue(range) {
      curAttr!.value = {
        type: NodeType.AttrValue,
        parent: curAttr!,
        value: range.value,
        bound: range.bound,
        start: range.start,
        end: range.end,
      };
      curAttr!.end = range.end;
    },
    onAttrMethod(range) {
      curAttr!.value = {
        type: NodeType.AttrMethod,
        parent: curAttr!,
        params: range.params,
        body: range.body,
        start: range.start,
        end: range.end,
      };
      curAttr!.end = range.end;
    },
    onAttrSpread(range) {
      // @ts-expect-error we know we are in a Tag
      declare const curParent: Node.ParentTag;
      pushAttr(curParent, {
        type: NodeType.AttrSpread,
        parent: curParent,
        value: range.value,
        start: range.start,
        end: range.end,
      });
    },
    onOpenTagEnd(range) {
      if (curStatic) {
        if (curStatic.type === NodeType.Style) {
          curStatic.value.end = range.end - 1;
        }

        curStatic.end = range.end;
        curStatic = undefined;
      } else {
        curAttr = undefined;

        const tag = curParent as Node.ParentTag;
        tag.open.end = range.end;

        if (range.selfClosed) {
          curParent = tag.parent;
          tag.end = range.end;
          tag.selfClosed = range.selfClosed;
        } else if (tag.bodyType === TagType.void) {
          curParent = tag.parent;
          tag.end = range.end;
        }
      }
    },
    onCloseTagStart(range) {
      // @ts-expect-error we know we are in a Tag
      declare const curParent: Node.ParentTag;
      curParent.close = {
        start: range.start,
        end: Number.MAX_SAFE_INTEGER,
      };
    },
    onCloseTagEnd(range) {
      if (hasCloseTag(curParent)) curParent.close.end = range.end;
      curParent.end = range.end;
      curParent = curParent.parent as Node.ParentNode;
    },
  });

  parser.parse(source);
  return {
    read: parser.read,
    locationAt: parser.locationAt,
    positionAt: parser.positionAt,
    nodeAt: (offset: number) => getNodeAtOffset(offset, program),
    program,
  };
}

function pushStatic(program: Node.Program, node: Node.StaticNode) {
  // Copy comments before statements into the static section.
  let i = program.body.length;
  for (; i--; ) {
    const prev = program.body[i];
    if (prev.type === NodeType.Comment) {
      program.static.push(prev);
    } else {
      break;
    }
  }

  program.body.length = i + 1; // Remove comments that were copied from above.
  program.static.push(node);
}

function pushBody(parent: Node.ParentNode, node: Node.ChildNode) {
  if (parent.body) {
    parent.body.push(node);
  } else {
    parent.body = [node];
  }
}

function pushAttr(parent: Node.ParentTag, node: Node.AttrNode) {
  if (parent.attrs) {
    parent.attrs.push(node);
  } else {
    parent.attrs = [node];
  }
}

function hasCloseTag(
  parent: Node.AnyNode
): parent is Node.ParentTag & { close: Range } {
  return (parent as Node.ParentTag).close !== undefined;
}

function resolveAttrTagName(tag: Node.AttrTag) {
  let name = tag.nameText;
  let parentTag: Node.ParentTag | undefined = tag.owner!;
  do {
    switch (parentTag.type) {
      case NodeType.Tag:
        return parentTag.nameText ? `${parentTag.nameText}:${name}` : undefined;
      case NodeType.AttrTag:
        name = `${parentTag.nameText}:${name}`;
        parentTag = parentTag.owner;
        break;
      default:
        return;
    }
  } while (parentTag);
}

/**
 * Used to check if a node should be ignored as the parent of an attribute tag.
 * When control flow is the parent of an attribute tag, we add the attribute tag to
 * the closest non control flow ancestor attrs instead.
 */
function isTransparentTag(node: Node.Tag): node is Node.Tag {
  return (
    node.nameText !== undefined &&
    /^(?:if|else(?:-if)?|for|while)$/.test(node.nameText)
  );
}
