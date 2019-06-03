import { IAutocompleteArguments } from "./autocomplete";
import {
    getLESSLanguageService,
    getCSSLanguageService,
    getSCSSLanguageService,
    CompletionList,
} from 'vscode-css-languageservice';

type CSSParserCallback = (options: IAutocompleteArguments) => CompletionList;


interface ISupportedCSS {
    [key: string]: CSSParserCallback
}


const supportedCSS: ISupportedCSS = {
    less: lessParser,
    scss: scssParser,
    css: cssParser,
}


function lessParser(options: IAutocompleteArguments) {
    const languageService = getLESSLanguageService();
    return languageService.doComplete(options.doc, options.position, languageService.parseStylesheet(options.doc));
}
function scssParser(options: IAutocompleteArguments) {
    const languageService = getSCSSLanguageService();
    return languageService.doComplete(options.doc, options.position, languageService.parseStylesheet(options.doc));
}

function cssParser(options: IAutocompleteArguments) {
    const languageService = getCSSLanguageService();
    return languageService.doComplete(options.doc, options.position, languageService.parseStylesheet(options.doc));
}

export function getStyleType(options: IAutocompleteArguments) {
    const event = options.scopeAtPos.event;
    let found: CSSParserCallback;
    try {
        event.shorthandClassNames.forEach((e) => {
            e.rawParts.forEach((raw) => {
                found = found || supportedCSS[raw.text];
            });
        });
    } catch (e) {
        // Default to css
        found = supportedCSS.css;
    }
    return found;
}

export function getStyleAutocomplete(options: IAutocompleteArguments): CompletionList {
    const parser = getStyleType(options);
    return parser ? parser(options) : null;
}