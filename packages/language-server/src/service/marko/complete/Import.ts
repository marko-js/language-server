import { type Node, NodeType } from "@marko/language-tools";
import { CompletionItem, TextEdit } from "vscode-languageserver";

import getTagNameCompletion from "../util/get-tag-name-completion";
import type { CompletionMeta, CompletionResult } from ".";

const staticImportReg = /^\s*(?:static|client|server) import\b/;
const importTagReg = /(['"])<((?:[^'"\\>]|\\.)*)>?\1/;

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
