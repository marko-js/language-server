import {
  type CompletionParams,
  CompletionList,
  CompletionItemKind,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import type { ParserEvents } from "../../htmljs-parser";
import type { TaglibLookup } from "../../compiler";

export function attributeModifier(
  _taglib: TaglibLookup,
  _document: TextDocument,
  _params: CompletionParams,
  _event: ParserEvents.OpenTagName
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
