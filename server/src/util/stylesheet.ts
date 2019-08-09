import { IAutocompleteArguments } from "./autocomplete";
import {
  getLESSLanguageService,
  getCSSLanguageService,
  getSCSSLanguageService,
  CompletionList,
  TextDocument
} from "vscode-css-languageservice";
import { getSingleTypeDocument } from "./document";
import { IHtmlJSParserEvent } from "./marko";

export const supportedCSSList = ["less", "css", "sass"];
type CSSParserCallback = (
  embeddedDoc: TextDocument,
  options: IAutocompleteArguments
) => CompletionList;

interface ISupportedCSS {
  [key: string]: CSSParserCallback;
}

const supportedCSS: ISupportedCSS = {
  less: lessParser,
  scss: scssParser,
  css: cssParser
};

function lessParser(
  embeddedDoc: TextDocument,
  options: IAutocompleteArguments
) {
  const languageService = getLESSLanguageService();
  return languageService.doComplete(
    embeddedDoc,
    options.position,
    languageService.parseStylesheet(embeddedDoc)
  );
}
function scssParser(
  embeddedDoc: TextDocument,
  options: IAutocompleteArguments
) {
  const languageService = getSCSSLanguageService();
  return languageService.doComplete(
    embeddedDoc,
    options.position,
    languageService.parseStylesheet(embeddedDoc)
  );
}

function cssParser(embeddedDoc: TextDocument, options: IAutocompleteArguments) {
  const languageService = getCSSLanguageService();
  return languageService.doComplete(
    embeddedDoc,
    options.position,
    languageService.parseStylesheet(embeddedDoc)
  );
}

export function getStyleType(event: IHtmlJSParserEvent) {
  if (event.shorthandClassNames) {
    for (const shorthandClassName of event.shorthandClassNames) {
      for (const part of shorthandClassName.rawParts) {
        if (supportedCSS[part.text]) {
          return supportedCSS[part.text];
        }
      }
    }
  }

  return supportedCSS.css;
}

export function getStyleAutocomplete(
  options: IAutocompleteArguments
): CompletionList | null {
  const parser = getStyleType(options.scopeAtPos.event!);
  const embeddedDoc = getSingleTypeDocument(
    options.doc,
    options.scopeAtPos.regions!,
    "style"
  );
  return parser ? parser(embeddedDoc, options) : null;
}
