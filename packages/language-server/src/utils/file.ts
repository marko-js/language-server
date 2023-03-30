import path from "path";

import type { TextDocument } from "vscode-languageserver-textdocument";
import type { TaglibLookup } from "@marko/babel-utils";
import { type Parsed, Project, parse } from "@marko/language-tools";
import { URI } from "vscode-uri";

const processorCaches = new WeakMap<Parsed, Map<unknown, unknown>>();

export interface MarkoFile {
  uri: string;
  scheme: string;
  version: number;
  lookup: TaglibLookup;
  filename: string;
  dirname: string;
  parsed: Parsed;
  code: string;
}

export function getFSDir(doc: TextDocument): string | undefined {
  const filename = getFSPath(doc);
  return filename ? path.dirname(filename) : undefined;
}

export function getFSPath(doc: TextDocument): string | undefined {
  return URI.parse(doc.uri).fsPath;
}

export function getMarkoFile(doc: TextDocument): MarkoFile {
  const { uri } = doc;
  const { fsPath: filename, scheme } = URI.parse(uri);
  const dirname = filename && path.dirname(filename);
  const cache = Project.getCache(dirname) as Map<TextDocument, MarkoFile>;
  let file = cache.get(doc);
  if (!file) {
    const { version } = doc;
    const code = doc.getText();
    const parsed = parse(code, filename);
    const lookup = Project.getTagLookup(dirname);
    cache.set(
      doc,
      (file = {
        uri,
        scheme,
        version,
        lookup,
        filename,
        dirname,
        parsed,
        code,
      })
    );
  }

  return file;
}

export function clearMarkoCacheForFile(doc: TextDocument) {
  const { fsPath: filename } = URI.parse(doc.uri);
  const dirname = filename && path.dirname(filename);
  const cache = Project.getCache(dirname) as Map<TextDocument, MarkoFile>;
  cache.delete(doc);
}

/**
 * Run some processing against a parsed document and cache the result.
 * Anytime the document changes, the cache is cleared.
 */
export function processDoc<T>(
  doc: TextDocument,
  process: (file: MarkoFile) => T
): T {
  const file = getMarkoFile(doc);
  const cache = processorCaches.get(file.parsed) as
    | Map<typeof process, T>
    | undefined;
  let result: T | undefined;

  if (cache) {
    result = cache.get(process);
    if (!result) {
      result = process(file);
      cache.set(process, result);
    }
  } else {
    result = process(file);
    processorCaches.set(file.parsed, new Map([[process, result]]));
  }

  return result;
}
