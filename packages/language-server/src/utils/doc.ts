import path from "path";

import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { CompilerInfo, getCompilerInfo } from "./compiler";
import { type Parsed, parse } from "./parser";

const processorCaches = new WeakMap<Parsed, Map<unknown, unknown>>();

export interface DocInfo {
  uri: string;
  scheme: string;
  version: number;
  filename: string;
  parsed: Parsed;
  code: string;
  info: CompilerInfo;
}

export function getDocDir(doc: TextDocument): string | undefined {
  const filename = getDocFile(doc);
  return filename ? path.dirname(filename) : undefined;
}

export function getDocFile(doc: TextDocument): string | undefined {
  return URI.parse(doc.uri).fsPath;
}

export function getDocInfo(doc: TextDocument): DocInfo {
  const code = doc.getText();
  const { version, uri } = doc;
  const { fsPath: filename, scheme } = URI.parse(uri);
  const info = getCompilerInfo(filename && path.dirname(filename));
  const cache = info.cache as Map<TextDocument, Parsed>;
  let parsed = cache.get(doc);
  if (!parsed) {
    parsed = parse(code);
    cache.set(doc, parsed);
  }

  return {
    uri,
    scheme,
    version,
    filename,
    parsed,
    info,
    code,
  };
}

/**
 * Run some processing against a parsed document and cache the result.
 * Anytime the document changes, the cache is cleared.
 */
export function processDoc<T>(
  doc: TextDocument,
  cb: (docInfo: DocInfo) => T
): T {
  const docInfo = getDocInfo(doc);
  const cache = processorCaches.get(docInfo.parsed) as
    | Map<typeof cb, T>
    | undefined;
  let result: T | undefined;

  if (cache) {
    result = cache.get(cb);
    if (!result) {
      result = cb(docInfo);
      cache.set(cb, result);
    }
  } else {
    result = cb(docInfo);
    processorCaches.set(docInfo.parsed, new Map([[cb, result]]));
  }

  return result;
}
