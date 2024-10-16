import {
  CompletionItem,
  CompletionItemKind,
  InsertTextFormat,
  TextEdit,
} from "vscode-languageserver";
import { type Node, UNFINISHED } from "@marko/language-tools";
import { MarkoVirtualCode } from "../../core/marko-plugin";

const partialCloseTagReg = /<\/(?:[^><]*>)?/iy;

/**
 * Provide completion for the closing tag.
 */
export function Tag(
  node: Node.Tag,
  file: MarkoVirtualCode,
  offset: number,
): CompletionItem[] | undefined {
  const isClosed = node.end !== UNFINISHED;
  if (isClosed || node.concise) return;

  const closingTagStr = `</${node.nameText || ""}>`;

  if (offset === node.open.end) {
    // We're at the end of the open tag and the closing tag was not found.
    return [
      {
        label: closingTagStr,
        kind: CompletionItemKind.Class,
        insertTextFormat: InsertTextFormat.Snippet,
        insertText: `\n\t$0\n${closingTagStr}`,
      },
    ];
  } else if (node.close && offset >= node.close.start) {
    // We have an unfinished closing tag.
    const start = node.close.start;
    partialCloseTagReg.lastIndex = start;
    const code = file.snapshot.getText(0, file.snapshot.getLength());
    const [{ length }] = partialCloseTagReg.exec(code)!;
    const end = start + length;

    return [
      {
        label: closingTagStr,
        kind: CompletionItemKind.Class,
        insertTextFormat: InsertTextFormat.Snippet,
        textEdit: TextEdit.replace(
          file.markoAst.locationAt({
            start,
            end,
          }),
          closingTagStr,
        ),
      },
    ];
  }
}
