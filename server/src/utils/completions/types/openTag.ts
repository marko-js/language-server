import {
  type CompletionParams,
  CompletionList,
  CompletionItemKind,
  InsertTextFormat,
  Range,
  Position,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import type { ParserEvents } from "../../htmljs-parser";
import type { TaglibLookup } from "../../compiler";

export function openTag(
  _taglib: TaglibLookup,
  doc: TextDocument,
  params: CompletionParams,
  event: ParserEvents.OpenTag
) {
  const triggerCharacter =
    (params.context && params.context.triggerCharacter) ||
    doc.getText(
      Range.create(
        Position.create(params.position.line, params.position.character - 1),
        params.position
      )
    );

  if (triggerCharacter !== ">" || event.openTagOnly || event.selfClosed) {
    return;
  }

  const closingTagStr = `</${event.tagName[0] === "$" ? "" : event.tagName}>`;

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
}
