import { CompletionParams, TextDocument } from "vscode-languageserver";
import {
  getCSSLanguageService,
  getSCSSLanguageService,
  getLESSLanguageService
} from "vscode-css-languageservice";

import { ParserEvents } from "../../htmljs-parser";
import { TagLibLookup } from "../../compiler";

export function styleContent(
  taglib: TagLibLookup,
  document: TextDocument,
  params: CompletionParams,
  event: ParserEvents.StyleContent
) {
  const service = getService(event.language);
  const contentDocument = TextDocument.create(
    document.uri,
    event.language,
    document.version,
    event.content
  );
  return service.doComplete(
    contentDocument,
    params.position,
    service.parseStylesheet(contentDocument)
  );
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
