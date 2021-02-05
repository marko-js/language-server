import { Position, CompletionParams } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import {
  getCSSLanguageService,
  getSCSSLanguageService,
  getLESSLanguageService,
} from "vscode-css-languageservice";

import { ParserEvents } from "../../htmljs-parser";
import { TagLibLookup } from "../../compiler";
import { shiftCompletionRanges, shiftPosition } from "../../utils";

const services = {
  css: getCSSLanguageService,
  scss: getSCSSLanguageService,
  less: getLESSLanguageService,
};

export function styleContent(
  taglib: TagLibLookup,
  document: TextDocument,
  params: CompletionParams,
  event: ParserEvents.StyleContent
) {
  const service = services[event.language]();
  const startPos = document.positionAt(event.pos);
  const relativePos = shiftPosition(
    params.position,
    Position.create(startPos.line * -1, startPos.character * -1)
  );
  const contentDocument = TextDocument.create(
    document.uri,
    event.language,
    document.version,
    event.content
  );

  const completions = service.doComplete(
    contentDocument,
    relativePos,
    service.parseStylesheet(contentDocument)
  );

  return shiftCompletionRanges(completions, startPos);
}
