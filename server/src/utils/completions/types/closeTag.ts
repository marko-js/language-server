import {
  CompletionParams,
  CompletionList,
  CompletionItemKind,
  InsertTextFormat,
  TextEdit,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { ParserEvents } from "../../htmljs-parser";
import { TagLibLookup } from "../../compiler";
import { rangeFromEvent } from "../../utils";

export function closeTag(
  taglib: TagLibLookup,
  document: TextDocument,
  params: CompletionParams,
  event: ParserEvents.CloseTag
) {
  if (event.tagName[0] === "$") {
    return;
  }

  const closingTagStr = `</${event.tagName}>`;

  return CompletionList.create(
    [
      {
        label: closingTagStr,
        kind: CompletionItemKind.Class,
        insertTextFormat: InsertTextFormat.Snippet,
        textEdit: TextEdit.replace(
          rangeFromEvent(document, event),
          closingTagStr
        ),
      },
    ],
    true
  );
}
