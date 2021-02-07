import {
  CompletionParams,
  CompletionItemKind,
  CompletionList,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { ParserEvents } from "../../htmljs-parser";
import { TagLibLookup } from "../../compiler";

export function attributeModifier(
  taglib: TagLibLookup,
  document: TextDocument,
  params: CompletionParams,
  event: ParserEvents.OpenTagName
) {
  return CompletionList.create(
    [
      {
        label: "scoped",
        kind: CompletionItemKind.Keyword,
        detail: "Use to prefix with a unique ID",
      },
      {
        label: "no-update",
        kind: CompletionItemKind.Keyword,
        detail: "Use to skip future updates to this attribute",
      },
    ],
    true
  );
}
