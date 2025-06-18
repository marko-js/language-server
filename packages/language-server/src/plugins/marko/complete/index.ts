import { NodeType } from "@marko/language-tools";
import { CompletionItem } from "vscode-languageserver";

import { MarkoVirtualCode } from "../../../language";
import { AttrName } from "./AttrName";
import { Import } from "./Import";
import { OpenTagName } from "./OpenTagName";
import { Tag } from "./Tag";

export function provideCompletions(
  doc: MarkoVirtualCode,
  offset: number,
): CompletionItem[] | undefined {
  const node = doc.markoAst.nodeAt(offset);

  switch (node?.type) {
    case NodeType.AttrName:
      return AttrName(node, doc, offset);
    case NodeType.Import:
      return Import(node, doc);
    case NodeType.Tag:
      return Tag(node, doc, offset);
    case NodeType.OpenTagName:
      return OpenTagName(node, doc);
    default:
      return;
  }
}
