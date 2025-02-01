import { NodeType } from "@marko/language-tools";
import { Hover } from "vscode-languageserver";
import { MarkoVirtualCode } from "../../../language";
import { OpenTagName } from "./OpenTagName";

export function provideHover(
  doc: MarkoVirtualCode,
  offset: number,
): Hover | undefined {
  const node = doc.markoAst.nodeAt(offset);

  switch (node?.type) {
    case NodeType.OpenTagName:
      return OpenTagName(node, doc);
    default:
      return;
  }
}
