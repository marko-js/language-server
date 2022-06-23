import {
  CompletionList,
  CompletionItemKind,
  InsertTextFormat,
  TextEdit,
} from "vscode-languageserver";
import type { CompletionMeta } from "../meta";
import { Node, UNFINISHED } from "../../parser";

const partialCloseTagReg = /<\/(?:[^><]*>)?/iy;

/**
 * Provide completion for the closing tag.
 */
export function Tag(event: CompletionMeta<Node.Tag>) {
  const { node } = event;
  const isClosed = node.end !== UNFINISHED;
  if (isClosed || node.concise) return;

  const { offset, parsed, code } = event;
  const closingTagStr = `</${node.nameText}>`;

  if (offset === node.open.end) {
    // We're at the end of the open tag and the closing tag was not found.
    return CompletionList.create(
      [
        {
          label: closingTagStr,
          kind: CompletionItemKind.Class,
          insertTextFormat: InsertTextFormat.Snippet,
          insertText: `\n\t$0\n${closingTagStr}`,
        },
      ],
      true
    );
  } else if (node.close && offset >= node.close.start) {
    // We have an unfinished closing tag.
    const start = node.close.start;
    partialCloseTagReg.lastIndex = start;
    const [{ length }] = partialCloseTagReg.exec(code)!;
    const end = start + length;

    return CompletionList.create(
      [
        {
          label: closingTagStr,
          kind: CompletionItemKind.Class,
          insertTextFormat: InsertTextFormat.Snippet,
          textEdit: TextEdit.replace(
            parsed.locationAt({
              start,
              end,
            }),
            closingTagStr
          ),
        },
      ],
      true
    );
  }
}
