import type { TextDocument } from "vscode-languageserver-textdocument";
import { type Node, NodeType } from "../../../utils/parser";

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
  doc: TextDocument,
  tag: Node.ParentTag,
  attr: Node.AttrNode
): attr is Node.AttrNamed & { value: Node.AttrValue } {
  return (
    (tag.nameText &&
      attr.type === NodeType.AttrNamed &&
      attr.value?.type === NodeType.AttrValue &&
      /^['"]$/.test(doc.getText()[attr.value.value.start]) &&
      linkedAttrs
        .get(doc.getText().slice(attr.name.start, attr.name.end))
        ?.has(tag.nameText)) ||
    false
  );
}
