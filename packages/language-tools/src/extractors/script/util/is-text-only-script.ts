import { type Node, NodeType, Repeated } from "../../../parser";

export function isTextOnlyScript(tag: Node.ParentTag): tag is Node.Tag & {
  nameText: "script";
  args: undefined;
  attrs: undefined;
  body: Repeated<Node.Text>;
} {
  if (tag.nameText !== "script" || tag.args || tag.attrs || !tag.body) {
    return false;
  }

  for (const child of tag.body) {
    if (child.type !== NodeType.Text) {
      return false;
    }
  }

  return true;
}
