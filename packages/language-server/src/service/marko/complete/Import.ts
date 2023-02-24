import { CompletionItem, TextEdit } from "vscode-languageserver";
import type { Node } from "@marko/language-tools";

import getTagNameCompletion from "../util/get-tag-name-completion";

import type { CompletionMeta, CompletionResult } from ".";

const importTagReg = /(['"])<((?:[^\1\\>]+|\\.)*)>?\1/;

export function Import({
  node,
  file: {
    parsed,
    filename,
    project: { lookup },
  },
}: CompletionMeta<Node.Import>): CompletionResult {
  // check for import statement
  const value = parsed.read(node);
  const match = importTagReg.exec(value);
  if (match) {
    const [{ length }] = match;
    const fromStart = node.start + match.index;
    const range = parsed.locationAt({
      start: fromStart + 1,
      end: fromStart + length - 1,
    });

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
        const completion = getTagNameCompletion({
          tag,
          importer: filename,
        });

        completion.label = `<${completion.label}>`;
        completion.textEdit = TextEdit.replace(range, completion.label);
        result.push(completion);
      }
    }

    return result;
  }
}
