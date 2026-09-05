import { type CompletionItem, TextEdit } from "vscode-languageserver";

import type { MarkoFile } from "../../../utils/file";
import getTagNameCompletion from "./get-tag-name-completion";

// Completes the tag-name slot of a `"<tag-name>"` shorthand string so it
// filters and sorts exactly like an open tag name; `close` appends the `>`.
export default function getTagShorthandCompletions(
  { parsed, filename, lookup }: MarkoFile,
  nameLoc: { start: number; end: number },
  close: string,
): CompletionItem[] {
  const range = parsed.locationAt(nameLoc);
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
      completion.textEdit = TextEdit.replace(range, completion.label + close);
      result.push(completion);
    }
  }

  return result;
}
