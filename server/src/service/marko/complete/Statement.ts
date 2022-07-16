import type { Node } from "../../../utils/parser";
import type { CompletionMeta, CompletionResult } from ".";
import { CompletionItem, TextEdit } from "vscode-languageserver";
import getTagNameCompletion from "../util/get-tag-name-completion";
import { getDocFile } from "../../../utils/doc-file";

const importTagReg = /(['"])<((?:[^\1\\>]+|\\.)*)>?\1/g;

export function Statement({
  code,
  node,
  parsed,
  lookup,
  document,
}: CompletionMeta<Node.Statement>): CompletionResult {
  // check for import statement
  if (code[node.start] === "i") {
    importTagReg.lastIndex = 0;
    const value = parsed.read(node);
    const match = importTagReg.exec(value);
    if (match) {
      const importer = getDocFile(document);
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
            importer,
          });

          completion.label = `<${completion.label}>`;
          completion.textEdit = TextEdit.replace(range, completion.label);
          result.push(completion);
        }
      }

      return result;
    }
  }
}
