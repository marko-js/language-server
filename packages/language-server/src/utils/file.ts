import type { TaglibLookup } from "@marko/babel-utils";
import { parse, type Parsed, Project } from "@marko/language-tools";
import path from "path";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

const processorCaches = new WeakMap<Parsed, Map<unknown, unknown>>();

export interface MarkoFile {
  uri: string;
  scheme: string;
  version: number;
  lookup: TaglibLookup;
  filename: string | undefined;
  dirname: string | undefined;
  parsed: Parsed;
  code: string;
}

export function getFSDir(doc: TextDocument): string | undefined {
  const filename = getFSPath(doc);
  return filename && path.dirname(filename);
}

export function getFSPath(doc: TextDocument): string | undefined {
  const parsed = URI.parse(doc.uri);
  return parsed.scheme === "file" ? parsed.fsPath : undefined;
}

export function getMarkoFile(doc: TextDocument): MarkoFile {
  const { uri } = doc;
  const { fsPath, scheme } = URI.parse(uri);
  const filename = scheme === "file" ? fsPath : undefined;
  const dirname = filename ? path.dirname(filename) : process.cwd();
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
      }),
    );
  }

  return file;
}

export function clearMarkoCacheForFile(doc: TextDocument) {
  (Project.getCache(getFSDir(doc)) as Map<TextDocument, MarkoFile>).delete(doc);
}

/**
 * Run some processing against a parsed document and cache the result.
 * Anytime the document changes, the cache is cleared.
 */
export function processDoc<T>(
  doc: TextDocument,
  process: (file: MarkoFile) => T,
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
