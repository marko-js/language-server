import { NodeType } from "@marko/language-tools";
import { LocationLink } from "vscode-languageserver";
import { MarkoVirtualCode } from "../../../language";
import { AttrName } from "./AttrName";
import { OpenTagName } from "./OpenTagName";

export function provideDefinitions(
  doc: MarkoVirtualCode,
  offset: number,
): LocationLink[] | undefined {
  const node = doc.markoAst.nodeAt(offset);

  switch (node?.type) {
    case NodeType.AttrName:
      return AttrName(node, doc);
    case NodeType.OpenTagName:
      return OpenTagName(node, doc);
    default:
      return;
  }
}
