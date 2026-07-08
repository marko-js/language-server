import { type Node, NodeType } from "@marko/language-tools";

// `<context from="...">`: matches when the value is a quoted string literal.
export default function getContextFromAttr(
  code: string,
  tag: Node.ParentTag,
  attr: Node.AttrNode,
): (Node.AttrNamed & { value: Node.AttrValue }) | undefined {
  return tag.nameText === "context" &&
    attr.type === NodeType.AttrNamed &&
    code.slice(attr.name.start, attr.name.end) === "from" &&
    attr.value?.type === NodeType.AttrValue &&
    /^['"]$/.test(code[attr.value.value.start])
    ? (attr as Node.AttrNamed & { value: Node.AttrValue })
    : undefined;
}
