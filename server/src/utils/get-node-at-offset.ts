import { Node, NodeType } from "./parser";

export function getNodeAtOffset(
  offset: number,
  program: Node.Program
): Node.AnyNode {
  const bodyNode = childAtOffset(offset, program.body);
  if (bodyNode) return visitChildNode(offset, bodyNode);
  return childAtOffset(offset, program.static) || program;
}

function visitChildNode(offset: number, child: Node.ChildNode): Node.AnyNode {
  switch (child.type) {
    case NodeType.Tag:
    case NodeType.AttrTag:
      return visitTag(offset, child);
    default:
      return child;
  }
}

function visitTag(offset: number, tag: Node.ParentTag): Node.AnyNode {
  const { body } = tag;
  if (body && offset > tag.open.end) {
    const childNode = childAtOffset(offset, body);
    return childNode ? visitChildNode(offset, childNode) : tag;
  }

  const { attrs } = tag;
  if (attrs && offset > attrs[0].start) {
    const attrNode = childAtOffset(offset, attrs);
    return attrNode ? visitAttrNode(offset, attrNode) : tag;
  }

  const { var: tagVar } = tag;
  if (tagVar && offset > tagVar.start && offset <= tagVar.end) {
    return tagVar;
  }

  const { args } = tag;
  if (args && offset > args.start && offset <= args.end) {
    return args;
  }

  const { params } = tag;
  if (params && offset > params.start && offset <= params.end) {
    return params;
  }

  const { name } = tag;
  if (name && offset <= name.end) {
    return name;
  }

  return tag;
}

function visitAttrNode(offset: number, attr: Node.AttrNode): Node.AnyNode {
  switch (attr.type) {
    case NodeType.AttrTag:
      return visitTag(offset, attr);
    case NodeType.AttrNamed: {
      const { value } = attr;
      if (value && offset > value.start) {
        return value;
      }

      const { name } = attr;
      if (offset > name.start && offset <= name.end) {
        return name;
      }

      break;
    }
  }

  return attr;
}

function childAtOffset<T extends Node.AnyNode[]>(
  offset: number,
  children: T
): undefined | T[number] {
  let max = children.length - 1;
  let min = 0;

  while (min < max) {
    const mid = (1 + min + max) >>> 1;

    if (children[mid].start < offset) {
      min = mid;
    } else {
      max = mid - 1;
    }
  }

  const child = children[min];
  return offset > child.start && offset <= child.end ? child : undefined;
}
