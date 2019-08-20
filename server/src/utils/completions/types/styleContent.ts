import { CompletionParams, TextDocument } from "vscode-languageserver";
import { ParserEvents } from "../../htmljs-parser";
import { TagLibLookup } from "../../compiler";

export function styleContent(
  taglib: TagLibLookup,
  document: TextDocument,
  params: CompletionParams,
  event: ParserEvents.OpenTagName
) {}
