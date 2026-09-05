import { type Node, NodeType } from "@marko/language-tools";

import getTagShorthandCompletions from "../util/tag-shorthand-completions";
import type { CompletionMeta, CompletionResult } from ".";

const staticImportReg = /^\s*(?:static|client|server) import\b/;
// Captures the quote, the shorthand tag name, and whether the closing `>` is
// already present (eg `"<foo>"`, or a half-typed `"<fo`).
const importTagReg = /(['"])<((?:[^'"\\>]|\\.)*)(>?)\1/;

export function Import({
  node,
  file,
}: CompletionMeta<Node.Import | Node.Static>): CompletionResult {
  const value = file.parsed.read(node);
  if (node.type === NodeType.Static && !staticImportReg.test(value)) {
    // Checks for `static import`, `client import` and `server import`.
    return;
  }

  const match = importTagReg.exec(value);
  if (!match) return;

  const [, , name, close] = match;
  const nameStart = node.start + match.index + 2; // skip the opening quote and `<`
  return getTagShorthandCompletions(
    file,
    { start: nameStart, end: nameStart + name.length },
    close ? "" : ">",
  );
}
