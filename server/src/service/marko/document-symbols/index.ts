import type { SymbolInformation } from "vscode-languageserver";
import { getCompilerInfo, parse } from "../../../utils/compiler";
import type { Plugin } from "../../types";
import { extractDocumentSymbols } from "./extract";

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
