import {
  CompletionParams,
  CompletionList,
  CompletionItemKind,
  InsertTextFormat,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { ParserEvents } from "../../htmljs-parser";
import { TaglibLookup } from "../../compiler";

export function openTag(
  taglib: TaglibLookup,
  document: TextDocument,
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
