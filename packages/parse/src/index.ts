import { createParser, type Range, type Ranges, TagType } from "htmljs-parser";

import { getNodeAtOffset } from "./get-node-at-offset";
import { normalizePath } from "./normalize-path";

const styleBlockReg = /((?:\.[^\s\\/:*?"<>|({]+)*)\s*\{/y;

export type Repeated<T> = [T, ...T[]] | [...T[], T] | [T, ...T[], T];
export type Repeatable<T> = undefined | Repeated<T>;
export const UNFINISHED = Number.MAX_SAFE_INTEGER;

export * from "htmljs-parser";

export type Parsed = ReturnType<typeof parse>;

/**
 * Node type names are strings so that tools which select on a node's `type`
 * (eg ESLint selectors) work naturally.
 */
export enum NodeType {
  Program = "Program",
  Tag = "Tag",
  OpenTagName = "OpenTagName",
  ShorthandId = "ShorthandId",
  ShorthandClassName = "ShorthandClassName",
  TagTypeArgs = "TagTypeArgs",
  TagTypeParams = "TagTypeParams",
  TagVar = "TagVar",
  TagArgs = "TagArgs",
  TagParams = "TagParams",
  AttrNamed = "AttrNamed",
  AttrName = "AttrName",
  AttrArgs = "AttrArgs",
  AttrValue = "AttrValue",
  AttrMethod = "AttrMethod",
  AttrSpread = "AttrSpread",
  AttrTag = "AttrTag",
  Text = "Text",
  CDATA = "CDATA",
  Doctype = "Doctype",
  Declaration = "Declaration",
  Comment = "Comment",
  Placeholder = "Placeholder",
  Scriptlet = "Scriptlet",
  Import = "Import",
  Export = "Export",
  Class = "Class",
  Style = "Style",
  Static = "Static",
}

export enum CommentType {
  line = "line",
  block = "block",
  html = "html",
}

export interface ParseOptions {
  /**
   * Overrides how a tag with the given name is parsed (eg from taglib
   * `parseOptions`). When a type is returned it takes precedence over the
   * built in core/html tag handling (including the core statements, which
   * become generic `Static` nodes with a `name` range when forced);
   * returning nothing falls back to the built in behavior.
   */
  getTagType?(name: string, range: Range): TagType | undefined | void;
}

export namespace Node {
  export type AnyNode =
    | Program
    | Tag
    | OpenTagName
    | ShorthandId
    | ShorthandClassName
    | TagTypeArgs
    | TagTypeParams
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
  /** Anything that can appear in the root `program.body`. */
  export type RootBodyNode = ChildNode | StaticNode;
  export type StaticNode = Import | Export | Class | Style | Static;
  export type ParentTag = Tag | AttrTag;
  export type AttrNode = AttrNamed | AttrSpread;
  export type ControlFlowTag = Tag & {
    nameText: "if" | "else" | "else-if" | "for" | "while";
    bodyType: typeof TagType.html;
  };
  export type ChildNode =
    | Tag
    | AttrTag
    | Text
    | Doctype
    | Declaration
    | CDATA
    | Placeholder
    | Scriptlet
    | Comment;

  export interface Commentable {
    comments: Repeatable<Comment>;
  }

  export interface Program extends Range, Commentable {
    type: NodeType.Program;
    parent: undefined;
    static: StaticNode[];
    body: RootBodyNode[];
  }

  export interface Tag extends Range, Commentable {
    type: NodeType.Tag;
    parent: ParentNode;
    owner: undefined;
    concise: boolean;
    selfClosed: boolean;
    hasAttrTags: boolean;
    open: Range;
    close: Range | undefined;
    nameText: string | undefined;
    bodyType: Exclude<TagType, "statement">;
    name: OpenTagName;
    var: TagVar | undefined;
    args: TagArgs | undefined;
    params: TagParams | undefined;
    shorthandId: ShorthandId | undefined;
    shorthandClassNames: Repeatable<ShorthandClassName>;
    typeArgs: TagTypeArgs | undefined;
    typeParams: TagTypeParams | undefined;
    attrs: Repeatable<AttrNode>;
    body: Repeatable<ChildNode>;
  }

  export interface AttrTag extends Range, Commentable {
    type: NodeType.AttrTag;
    parent: ParentTag;
    owner: Tag | undefined;
    concise: boolean;
    selfClosed: boolean;
    hasAttrTags: boolean;
    open: Range;
    close: Range | undefined;
    nameText: string;
    bodyType: typeof TagType.html;
    name: OpenTagName;
    var: TagVar | undefined;
    args: TagArgs | undefined;
    params: TagParams | undefined;
    shorthandId: ShorthandId | undefined;
    shorthandClassNames: Repeatable<ShorthandClassName>;
    typeArgs: TagTypeArgs | undefined;
    typeParams: TagTypeParams | undefined;
    attrs: Repeatable<AttrNode>;
    body: Repeatable<ChildNode>;
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

  export interface TagTypeArgs extends Ranges.Value {
    type: NodeType.TagTypeArgs;
    parent: ParentTag;
  }

  export interface TagTypeParams extends Ranges.Value {
    type: NodeType.TagTypeParams;
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
    commentType: CommentType;
  }

  export interface Placeholder extends Ranges.Value, Commentable {
    type: NodeType.Placeholder;
    parent: ParentNode;
    escape: boolean;
  }

  export interface Scriptlet extends Ranges.Value, Commentable {
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
    typeParams: undefined | Ranges.Value;
    params: Range;
    body: Range;
  }

  export interface AttrSpread extends Ranges.Value {
    type: NodeType.AttrSpread;
    parent: ParentTag;
  }

  export interface Import extends Range, Commentable {
    type: NodeType.Import;
    parent: ParentNode;
  }

  export interface Export extends Range, Commentable {
    type: NodeType.Export;
    parent: ParentNode;
  }

  export interface Class extends Range, Commentable {
    type: NodeType.Class;
    parent: ParentNode;
  }

  export interface Style extends Range, Commentable {
    type: NodeType.Style;
    parent: ParentNode;
    ext: string | undefined;
    value: Range;
  }

  export interface Static extends Range, Commentable {
    type: NodeType.Static;
    parent: ParentNode;
    /**
     * The statement keyword (undefined when forced via `getTagType`).
     */
    target: "client" | "server" | "static" | undefined;
    /**
     * The range of the statement's name (set when forced via `getTagType`).
     */
    name: Range | undefined;
  }
}

export function parse(
  code: string,
  filename = "index.marko",
  options?: ParseOptions,
) {
  const builder = new Builder(code, options);
  const parser = createParser(builder);

  parser.parse(code);
  const program = builder.end();
  return {
    read: parser.read,
    locationAt: parser.locationAt,
    positionAt: parser.positionAt,
    nodeAt: (offset: number) => getNodeAtOffset(offset, program),
    filename: normalizePath(filename),
    program,
    /** Every comment in the template, in document order. */
    comments: builder.comments,
    /** Syntax errors encountered while parsing. */
    errors: builder.errors,
    code,
  };
}

class Builder {
  public comments: Node.Comment[] = [];
  public errors: Ranges.Error[] = [];
  #code: string;
  #program: Node.Program;
  #openTagStart: Range | undefined;
  #parentNode: Node.ParentNode;
  #staticNode: Node.StaticNode | undefined;
  #attrNode: Node.AttrNamed | undefined;
  #comments: Repeatable<Node.Comment>;
  #getTagType: ParseOptions["getTagType"];

  constructor(code: string, options?: ParseOptions) {
    this.#code = code;
    this.#getTagType = options?.getTagType;
    this.#program = this.#parentNode = {
      type: NodeType.Program,
      comments: undefined,
      parent: undefined,
      static: [],
      body: [],
      start: 0,
      end: code.length,
    };
  }

  end() {
    this.#program.comments = this.#comments;
    return this.#program;
  }

  #pushStatic(node: Node.StaticNode) {
    this.#staticNode = node;
    this.#program.static.push(node);
    this.#program.body.push(node);
  }

  onText(range: Range) {
    pushBody(this.#parentNode, {
      type: NodeType.Text,
      parent: this.#parentNode,
      start: range.start,
      end: range.end,
    });
  }
  onCDATA(range: Ranges.Value) {
    pushBody(this.#parentNode, {
      type: NodeType.CDATA,
      parent: this.#parentNode,
      value: range.value,
      start: range.start,
      end: range.end,
    });
  }
  onDoctype(range: Ranges.Value) {
    pushBody(this.#parentNode, {
      type: NodeType.Doctype,
      parent: this.#parentNode,
      value: range.value,
      start: range.start,
      end: range.end,
    });
  }
  onDeclaration(range: Ranges.Value) {
    pushBody(this.#parentNode, {
      type: NodeType.Declaration,
      parent: this.#parentNode,
      value: range.value,
      start: range.start,
      end: range.end,
    });
  }
  onComment(range: Ranges.Value) {
    let commentType = CommentType.html;
    switch (this.#code.charCodeAt(range.start + 1)) {
      case 47: // /
        commentType = CommentType.line;
        break;
      case 42: // *
        commentType = CommentType.block;
        break;
    }

    const comment: Node.Comment = {
      type: NodeType.Comment,
      parent: this.#parentNode,
      commentType,
      value: range.value,
      start: range.start,
      end: range.end,
    };

    // The same comment node is indexed three ways for different consumers:
    // the flat list (all comments without a tree walk), the parent body
    // (authoritative document-order position) and, below, buffered to attach
    // as the leading comments of the node which follows it.
    this.comments.push(comment);
    pushBody(this.#parentNode, comment);

    if (this.#comments) {
      this.#comments.push(comment);
    } else {
      this.#comments = [comment];
    }
  }
  onError(range: Ranges.Error) {
    this.errors.push(range);
  }
  onPlaceholder(range: Ranges.Placeholder) {
    pushBody(this.#parentNode, {
      type: NodeType.Placeholder,
      parent: this.#parentNode,
      comments: this.#comments,
      value: range.value,
      escape: range.escape,
      start: range.start,
      end: range.end,
    });

    this.#comments = undefined;
  }
  onScriptlet(range: Ranges.Scriptlet) {
    pushBody(this.#parentNode, {
      type: NodeType.Scriptlet,
      parent: this.#parentNode,
      comments: this.#comments,
      value: range.value,
      block: range.block,
      start: range.start,
      end: range.end,
    });
    this.#comments = undefined;
  }
  onOpenTagStart(range: Range) {
    this.#openTagStart = range;
  }
  onOpenTagName(range: Ranges.Template) {
    let concise = true;
    let start = range.start;
    let type = NodeType.Tag;
    let bodyType: TagType = TagType.html;
    let nameText: string | undefined = undefined;

    if (this.#openTagStart) {
      concise = false;
      start = this.#openTagStart.start;
      this.#openTagStart = undefined;
    }

    if (!range.expressions.length) {
      nameText = this.#code.slice(range.start, range.end) || "div";

      const hookedType =
        nameText[0] === "@" ? undefined : this.#getTagType?.(nameText, range);

      if (hookedType !== undefined) {
        if (hookedType === TagType.statement) {
          this.#pushStatic({
            type: NodeType.Static,
            parent: this.#program,
            comments: this.#comments,
            target: undefined,
            name: { start: range.start, end: range.end },
            start: range.start,
            end: UNFINISHED,
          });

          this.#comments = undefined;
          return TagType.statement;
        }

        bodyType = hookedType;
      } else
        switch (nameText) {
          // All statement types will early return.
          case "style": {
            styleBlockReg.lastIndex = range.end;
            const styleBlockMatch = styleBlockReg.exec(this.#code);

            if (styleBlockMatch) {
              const [{ length }, ext] = styleBlockMatch;
              this.#pushStatic({
                type: NodeType.Style,
                parent: this.#program,
                comments: this.#comments,
                ext: ext || undefined,
                value: {
                  start: range.end + length,
                  end: UNFINISHED,
                },
                start: range.start,
                end: UNFINISHED,
              });

              this.#comments = undefined;
              return TagType.statement;
            } else {
              bodyType = TagType.text;
              break;
            }
          }
          case "class":
            this.#pushStatic({
              type: NodeType.Class,
              parent: this.#program,
              comments: this.#comments,
              start: range.start,
              end: UNFINISHED,
            });

            this.#comments = undefined;
            return TagType.statement;
          case "export":
            this.#pushStatic({
              type: NodeType.Export,
              parent: this.#program,
              comments: this.#comments,
              start: range.start,
              end: UNFINISHED,
            });

            this.#comments = undefined;
            return TagType.statement;
          case "import":
            this.#pushStatic({
              type: NodeType.Import,
              parent: this.#program,
              comments: this.#comments,
              start: range.start,
              end: UNFINISHED,
            });

            this.#comments = undefined;
            return TagType.statement;
          case "server":
          case "client":
          case "static":
            this.#pushStatic({
              type: NodeType.Static,
              parent: this.#program,
              comments: this.#comments,
              target: nameText,
              name: undefined,
              start: range.start,
              end: UNFINISHED,
            });

            this.#comments = undefined;
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
          case "const":
          case "debug":
          case "id":
          case "let":
          case "lifecycle":
          case "log":
          case "return":
            bodyType = TagType.void;
            break;
          case "html-comment":
          case "html-script":
          case "html-style":
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

    const parent = this.#parentNode as Node.ParentNode;
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
      (this.#parentNode =
      name.parent =
        {
          type,
          parent,
          comments: this.#comments,
          owner: undefined,
          concise,
          selfClosed: false,
          hasAttrTags: false,
          open: { start, end },
          nameText,
          name,
          var: undefined,
          args: undefined,
          params: undefined,
          shorthandId: undefined,
          shorthandClassNames: undefined,
          typeArgs: undefined,
          typeParams: undefined,
          attrs: undefined,
          bodyType,
          body: undefined,
          close: undefined,
          start,
          end,
        } as Node.ParentTag);

    this.#comments = undefined;

    if (tag.type === NodeType.AttrTag) {
      let parentTag = parent;
      let nameText = tag.nameText.slice(1);

      while (parentTag.type === NodeType.Tag && isControlFlowTag(parentTag)) {
        parentTag.hasAttrTags = true;
        parentTag = parentTag.parent;
      }

      switch (parentTag.type) {
        case NodeType.AttrTag:
          tag.owner = parentTag.owner;
          parentTag.hasAttrTags = true;
          nameText = `${parentTag.nameText}:${nameText}`;
          break;
        case NodeType.Tag:
          tag.owner = parentTag;
          parentTag.hasAttrTags = true;
          nameText = `${parentTag.nameText || "*"}:${nameText}`;
          break;
      }

      // This name includes the full ancestry of the attribute tag and can be used in `TaglibLookup.getTag`.
      tag.nameText = nameText;
    }

    pushBody(parent, tag);
    this.#openTagStart = undefined;
    return bodyType;
  }
  onTagShorthandId(range: Ranges.Template) {
    const parent = this.#parentNode as Node.ParentTag;
    parent.shorthandId = {
      type: NodeType.ShorthandId,
      parent,
      quasis: range.quasis,
      expressions: range.expressions,
      start: range.start,
      end: range.end,
    };
  }
  onTagShorthandClass(range: Ranges.Template) {
    const parent = this.#parentNode as Node.ParentTag;
    const shorthandClassName: Node.ShorthandClassName = {
      type: NodeType.ShorthandClassName,
      parent,
      quasis: range.quasis,
      expressions: range.expressions,
      start: range.start,
      end: range.end,
    };

    if (parent.shorthandClassNames) {
      parent.shorthandClassNames.push(shorthandClassName);
    } else {
      parent.shorthandClassNames = [shorthandClassName];
    }
  }
  onTagTypeArgs(range: Ranges.Value) {
    const parent = this.#parentNode as Node.ParentTag;
    parent.typeArgs = {
      type: NodeType.TagTypeArgs,
      parent,
      value: range.value,
      start: range.start,
      end: range.end,
    };
  }
  onTagTypeParams(range: Ranges.Value) {
    const parent = this.#parentNode as Node.ParentTag;
    parent.typeParams = {
      type: NodeType.TagTypeParams,
      parent,
      value: range.value,
      start: range.start,
      end: range.end,
    };
  }
  onTagVar(range: Ranges.Value) {
    const parent = this.#parentNode as Node.ParentTag;
    parent.var = {
      type: NodeType.TagVar,
      parent,
      value: range.value,
      start: range.start,
      end: range.end,
    };
  }
  onTagParams(range: Ranges.Value) {
    const parent = this.#parentNode as Node.ParentTag;
    parent.params = {
      type: NodeType.TagParams,
      parent,
      value: range.value,
      start: range.start,
      end: range.end,
    };
  }
  onTagArgs(range: Ranges.Value) {
    const parent = this.#parentNode as Node.ParentTag;
    parent.args = {
      type: NodeType.TagArgs,
      parent,
      value: range.value,
      start: range.start,
      end: range.end,
    };
  }
  onAttrName(range: Ranges.Value) {
    const parent = this.#parentNode as Node.ParentTag;
    const name: Node.AttrName = {
      type: NodeType.AttrName,
      parent: undefined as unknown as Node.AttrNamed,
      start: range.start,
      end: range.end,
    };

    pushAttr(
      parent,
      (this.#attrNode = name.parent =
        {
          type: NodeType.AttrNamed,
          parent,
          name,
          value: undefined,
          args: undefined,
          start: range.start,
          end: range.end,
        }),
    );
  }
  onAttrArgs(range: Ranges.Value) {
    const parent = this.#attrNode!;
    parent.args = {
      type: NodeType.AttrArgs,
      parent,
      value: range.value,
      start: range.start,
      end: range.end,
    };
    parent.end = range.end;
  }
  onAttrValue(range: Ranges.AttrValue) {
    const parent = this.#attrNode!;
    parent.value = {
      type: NodeType.AttrValue,
      parent,
      value: range.value,
      bound: range.bound,
      start: range.start,
      end: range.end,
    };
    parent.end = range.end;
  }
  onAttrMethod(range: Ranges.AttrMethod) {
    const parent = this.#attrNode!;
    parent.value = {
      type: NodeType.AttrMethod,
      parent,
      typeParams: range.typeParams,
      params: range.params,
      body: range.body,
      start: range.start,
      end: range.end,
    };
    parent.end = range.end;
  }
  onAttrSpread(range: Ranges.Value) {
    const parent = this.#parentNode as Node.ParentTag;
    pushAttr(parent, {
      type: NodeType.AttrSpread,
      parent,
      value: range.value,
      start: range.start,
      end: range.end,
    });
  }
  onOpenTagEnd(range: Ranges.OpenTagEnd) {
    if (this.#staticNode) {
      if (this.#staticNode.type === NodeType.Style) {
        this.#staticNode.value.end = range.end - 1;
      }

      this.#staticNode.end = range.end;
      this.#staticNode = undefined;
    } else {
      this.#attrNode = undefined;

      const tag = this.#parentNode as Node.ParentTag;
      tag.open.end = range.end;

      if (range.selfClosed || tag.bodyType === TagType.void) {
        this.#parentNode = tag.parent;
        tag.end = range.end;
        tag.selfClosed = range.selfClosed;
      }
    }
  }
  onCloseTagStart(range: Range) {
    (this.#parentNode as Node.ParentTag).close = {
      start: range.start,
      end: UNFINISHED,
    };
  }
  onCloseTagEnd(range: Range) {
    const parent = this.#parentNode as Node.ParentTag;
    if (hasCloseTag(parent)) parent.close.end = range.end;
    parent.end = range.end;
    this.#parentNode = parent.parent;
    // Trailing comments in the closed body must not attach as the leading
    // comments of whatever follows the tag; they remain body children only.
    this.#comments = undefined;
  }
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
  parent: Node.AnyNode,
): parent is Node.ParentTag & { close: Range } {
  return (parent as Node.ParentTag).close !== undefined;
}

/**
 * Used to check if a node should be ignored as the parent of an attribute tag.
 * When control flow is the parent of an attribute tag, we add the attribute tag to
 * the closest non control flow ancestor attrs instead.
 */
export function isControlFlowTag(node: Node.Tag): node is Node.ControlFlowTag {
  switch (node.nameText) {
    case "if":
    case "else":
    case "else-if":
    case "for":
    case "while":
      return true;
    default:
      return false;
  }
}
