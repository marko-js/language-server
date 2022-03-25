import {
  type CompletionParams,
  CompletionList,
  CompletionItemKind,
  InsertTextFormat,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import type { ParserEvents } from "../../htmljs-parser";
import type { TaglibLookup } from "../../compiler";

export function openTag(
  _taglib: TaglibLookup,
  _document: TextDocument,
  params: CompletionParams,
  event: ParserEvents.OpenTag
) {
  const triggerCharacter = params.context && params.context.triggerCharacter;
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
