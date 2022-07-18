import { URI } from "vscode-uri";
import type { TaglibLookup } from "@marko/babel-utils";
import { SymbolInformation, SymbolKind } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { type Node, type parse, NodeType } from "../../../utils/parser";

/**
 * Iterate over the Marko CST and extract all the symbols (mostly tags) in the document.
 */
export function extractDocumentSymbols(
  doc: TextDocument,
  parsed: ReturnType<typeof parse>,
  lookup: TaglibLookup
): SymbolInformation[] {
  if (URI.parse(doc.uri).scheme === "untitled") {
    return [];
  }

  const symbols: SymbolInformation[] = [];
  const { program } = parsed;
  const visit = (node: Node.ChildNode) => {
    switch (node.type) {
      case NodeType.Tag:
      case NodeType.AttrTag:
        symbols.push(
          SymbolInformation.create(
            (node.type === NodeType.AttrTag
              ? node.nameText?.slice(node.nameText.indexOf("@"))
              : node.nameText) || "<${...}>",
            (node.nameText &&
              lookup.getTag(node.nameText)?.html &&
              SymbolKind.Property) ||
              SymbolKind.Class,
            parsed.locationAt(node),
            doc.uri
          )
        );

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
