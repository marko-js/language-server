import { type Node, NodeType } from "@marko/language-tools";

const linkedAttrs: Map<string, Set<string>> = new Map([
  [
    "src",
    new Set([
      "audio",
      "embed",
      "iframe",
      "img",
      "input",
      "script",
      "html-script",
      "source",
      "track",
      "video",
    ]),
  ],
  ["href", new Set(["a", "area", "link"])],
  ["data", new Set(["object"])],
  ["poster", new Set(["video"])],
]);

export default function isDocumentLinkAttr(
  code: string,
  tag: Node.ParentTag,
  attr: Node.AttrNode,
): attr is Node.AttrNamed & { value: Node.AttrValue } {
  return (
    (tag.nameText &&
      attr.type === NodeType.AttrNamed &&
      attr.value?.type === NodeType.AttrValue &&
      /^['"]$/.test(code[attr.value.value.start]) &&
      linkedAttrs
        .get(code.slice(attr.name.start, attr.name.end))
        ?.has(tag.nameText)) ||
    false
  );
}
