import {
  type CompletionParams,
  CompletionList,
  CompletionItemKind,
  InsertTextFormat,
  TextEdit,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import type { ParserEvents } from "../../htmljs-parser";
import type { TaglibLookup } from "../../compiler";
import { rangeFromEvent } from "../../utils";

export function closeTag(
  _taglib: TaglibLookup,
  document: TextDocument,
  _params: CompletionParams,
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
