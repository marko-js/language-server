import type { TaglibLookup } from "@marko/babel-utils";
import { SymbolInformation, SymbolKind } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import type { Plugin } from "../types";
import { type Node, NodeType, type Parsed } from "../../utils/parser";
import { getCompilerInfo, getParsed } from "../../utils/compiler";

const cache = new WeakMap<Parsed, SymbolInformation[]>();

export const findDocumentSymbols: Plugin["findDocumentSymbols"] = async (
  doc
) => {
  const parsed = getParsed(doc);
  let result = cache.get(parsed);
  if (!result) {
    result = extractDocumentSymbols(doc, parsed, getCompilerInfo(doc).lookup);
    cache.set(parsed, result);
  }
  return result;
};

/**
 * Iterate over the Marko CST and extract all the symbols (mostly tags) in the document.
 */
function extractDocumentSymbols(
  doc: TextDocument,
  parsed: Parsed,
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
        symbols.push({
          name:
            (node.type === NodeType.AttrTag
              ? node.nameText?.slice(node.nameText.indexOf("@"))
              : node.nameText) || "<${...}>",
          kind:
            (node.nameText &&
              lookup.getTag(node.nameText)?.html &&
              SymbolKind.Property) ||
            SymbolKind.Class,
          location: {
            uri: doc.uri,
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
