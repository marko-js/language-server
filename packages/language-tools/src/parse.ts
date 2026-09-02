import { parse as parseCST, type ParseOptions } from "@marko/parse";

import { normalizePath } from "./util/normalize-path";

// Keeps the filename on the parse result platform native, as callers of the
// language tools have always been able to rely on.
export function parse(code: string, filename?: string, options?: ParseOptions) {
  return parseCST(code, filename && normalizePath(filename), options);
}
