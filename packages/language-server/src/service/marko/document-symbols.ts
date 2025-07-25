import { type Node, NodeType } from "@marko/language-tools";
import { SymbolInformation, SymbolKind } from "vscode-languageserver";

import { MarkoFile, processDoc } from "../../utils/file";
import type { Plugin } from "../types";
import { isHTML } from "./util/is-html";

export const findDocumentSymbols: Plugin["findDocumentSymbols"] = async (doc) =>
  processDoc(doc, extractDocumentSymbols);

/**
 * Iterate over the Marko CST and extract all the symbols (mostly tags) in the document.
 */
function extractDocumentSymbols({
  uri,
  scheme,
  parsed,
  lookup,
}: MarkoFile): SymbolInformation[] {
  if (scheme !== "file") {
    return [];
  }

  const symbols: SymbolInformation[] = [];
  const { program } = parsed;
  const visit = (node: Node.ChildNode) => {
    switch (node.type) {
      case NodeType.Tag:
      case NodeType.AttrTag:
        symbols.push({
          name:
            (node.type === NodeType.AttrTag
              ? node.nameText?.slice(node.nameText.indexOf("@"))
              : node.nameText) || "<${...}>",
          kind:
            (node.nameText &&
              isHTML(lookup.getTag(node.nameText)) &&
              SymbolKind.Property) ||
            SymbolKind.Class,
          location: {
            uri,
            range: parsed.locationAt(node),
          },
        });

        if (node.body) {
          for (const child of node.body) {
            visit(child);
          }
        }

        break;
    }
  };

  for (const item of program.body) {
    visit(item);
  }

  return symbols;
}
