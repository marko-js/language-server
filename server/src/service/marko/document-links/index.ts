import type { DocumentLink } from "vscode-languageserver";
import { getCompilerInfo, parse } from "../../../utils/compiler";
import type { Plugin } from "../../types";
import { extractDocumentLinks } from "./extract";

const cache = new WeakMap<ReturnType<typeof parse>, DocumentLink[]>();

export const findDocumentLinks: Plugin["findDocumentLinks"] = async (doc) => {
  const parsed = parse(doc);
  let result = cache.get(parsed);
  if (!result) {
    result = extractDocumentLinks(doc, parsed, getCompilerInfo(doc).lookup);
    cache.set(parsed, result);
  }
  return result;
};
