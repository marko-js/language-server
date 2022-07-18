import { URI } from "vscode-uri";
import type { TaglibLookup } from "@marko/babel-utils";
import { SymbolInformation, SymbolKind } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { type Node, NodeType } from "../../utils/parser";
import { getCompilerInfo, parse } from "../../utils/compiler";
import type { Plugin } from "../types";

const cache = new WeakMap<ReturnType<typeof parse>, SymbolInformation[]>();

export const findDocumentSymbols: Plugin["findDocumentSymbols"] = async (
  doc
) => {
  const parsed = parse(doc);
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
