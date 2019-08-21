import {
  Position,
  CompletionParams,
  TextDocument
} from "vscode-languageserver";
import {
  getCSSLanguageService,
  getSCSSLanguageService,
  getLESSLanguageService
} from "vscode-css-languageservice";

import { ParserEvents } from "../../htmljs-parser";
import { TagLibLookup } from "../../compiler";
import { shiftCompletionRanges, shiftPosition } from "../../utils";

export function styleContent(
  taglib: TagLibLookup,
  document: TextDocument,
  params: CompletionParams,
  event: ParserEvents.StyleContent
) {
  const service = getService(event.language);
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

function getService(language: "css" | "scss" | "less") {
  switch (language) {
    case "css":
      return getCSSLanguageService();
    case "scss":
      return getSCSSLanguageService();
    case "less":
      return getLESSLanguageService();
  }
}
