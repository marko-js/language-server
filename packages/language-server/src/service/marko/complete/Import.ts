import { type Node, NodeType } from "@marko/language-tools";
import { CompletionItem, TextEdit } from "vscode-languageserver";

import getTagNameCompletion from "../util/get-tag-name-completion";
import type { CompletionMeta, CompletionResult } from ".";

const staticImportReg = /^\s*(?:static|client|server) import\b/;
// Captures the quote, the shorthand tag name, and whether the closing `>` is
// already present (eg `"<foo>"`, or a half-typed `"<fo`).
const importTagReg = /(['"])<((?:[^'"\\>]|\\.)*)(>?)\1/;

export function Import({
  node,
  file: { parsed, filename, lookup },
}: CompletionMeta<Node.Import | Node.Static>): CompletionResult {
  const value = parsed.read(node);
  if (node.type === NodeType.Static && !staticImportReg.test(value)) {
    // Checks for `static import`, `client import` and `server import`.
    return;
  }

  const match = importTagReg.exec(value);
  if (!match) return;

  const [, , name, close] = match;
  // Complete just the tag name slot (between `<` and `>`) so it filters and
  // sorts exactly like an open tag name, and append the closing `>` only when
  // the user has not typed it yet so the shorthand stays valid.
  const nameStart = node.start + match.index + 2; // skip the opening quote and `<`
  const range = parsed.locationAt({
    start: nameStart,
    end: nameStart + name.length,
  });
  const suffix = close ? "" : ">";

  const result: CompletionItem[] = [];

  for (const tag of lookup.getTagsSorted()) {
    if (
      (tag.template || tag.renderer) &&
      !(
        tag.html ||
        tag.parser ||
        tag.translator ||
        tag.isNestedTag ||
        tag.name === "*" ||
        tag.parseOptions?.statement ||
        /^@?marko[/-]/.test(tag.taglibId) ||
        (tag.name[0] === "_" && /[\\/]node_modules[\\/]/.test(tag.filePath))
      )
    ) {
      const completion = getTagNameCompletion({ tag, importer: filename });
      // Prioritize over TypeScript's module specifier completions.
      completion.sortText = `0${completion.label}`;
      completion.textEdit = TextEdit.replace(range, completion.label + suffix);
      result.push(completion);
    }
  }

  return result;
}
