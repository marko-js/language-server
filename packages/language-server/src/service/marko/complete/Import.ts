import { CompletionItem, TextEdit } from "vscode-languageserver";

import type { Node } from "../../../utils/parser";
import getTagNameCompletion from "../util/get-tag-name-completion";

import type { CompletionMeta, CompletionResult } from ".";

const importTagReg = /(['"])<((?:[^\1\\>]+|\\.)*)>?\1/g;

export function Import({
  node,
  file: {
    parsed,
    filename,
    project: { lookup },
  },
}: CompletionMeta<Node.Import>): CompletionResult {
  // check for import statement
  importTagReg.lastIndex = 0;
  const value = parsed.read(node);
  const match = importTagReg.exec(value);
  if (match) {
    const [{ length }] = match;
    const range = parsed.locationAt({
      start: node.start + match.index + 1,
      end: node.start + match.index + length - 1,
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
