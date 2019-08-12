// import * as tsModule from 'typescript';
import * as ts from 'typescript';
import { IAutocompleteArguments } from './autocomplete';
import URI from 'vscode-uri';
import { getLanguageHost } from '../services/javascript';
import { CompletionList, TextEdit, TextDocument, Range, CompletionItemKind } from 'vscode-languageserver';



// Create the language service host to allow the LS to communicate with the host
export function getJSAutocomplete(options: IAutocompleteArguments): CompletionList {
    const {
        doc,
        position,
        offset,
        // scopeAtPos,
    } = options;
    const { path } = URI.parse(options.doc.uri);

    const services = ts.createLanguageService(
        getLanguageHost([path]),
        ts.createDocumentRegistry()
    );

    const completions = services.getCompletionsAtPosition(path, options.offset, {});
    if (!completions) {
        return { isIncomplete: false, items: [] };
    }
    const entries = completions.entries; //.filter(entry => entry.name !== '__vueEditorBridge');
    return {
        isIncomplete: false,
        items: entries.map((entry, index) => {
            const range = entry.replacementSpan && convertRange(doc, entry.replacementSpan);
            const { label, detail } = calculateLabelAndDetailTextForPathImport(entry);
            return {
                uri: doc.uri,
                position,
                label,
                detail,
                sortText: entry.sortText + index,
                kind: convertKind(entry.kind),
                textEdit: range && TextEdit.replace(range, entry.name),
                data: {
                    // data used for resolving item details (see 'doResolve')
                    // languageId: .languageId,
                    uri: doc.uri,
                    offset,
                    source: entry.source
                }
            };
        })
    };

}

function calculateLabelAndDetailTextForPathImport(entry: ts.CompletionEntry) {
    // Is import path completion
    if (entry.kind === ts.ScriptElementKind.scriptElement) {
        if (entry.kindModifiers) {
            return {
                label: entry.name,
                detail: entry.name + entry.kindModifiers
            };
        } else {
            if (entry.name.endsWith('.marko')) {
                return {
                    label: entry.name.slice(0, -'.marko'.length),
                    detail: entry.name
                };
            }
        }
    }

    return {
        label: entry.name,
        detail: undefined
    };
}

function convertKind(kind: ts.ScriptElementKind): CompletionItemKind {
    switch (kind) {
        case 'primitive type':
        case 'keyword':
            return CompletionItemKind.Keyword;
        case 'var':
        case 'local var':
            return CompletionItemKind.Variable;
        case 'property':
        case 'getter':
        case 'setter':
            return CompletionItemKind.Field;
        case 'function':
        case 'method':
        case 'construct':
        case 'call':
        case 'index':
            return CompletionItemKind.Function;
        case 'enum':
            return CompletionItemKind.Enum;
        case 'module':
            return CompletionItemKind.Module;
        case 'class':
            return CompletionItemKind.Class;
        case 'interface':
            return CompletionItemKind.Interface;
        case 'warning':
            return CompletionItemKind.File;
        case 'script':
            return CompletionItemKind.File;
        case 'directory':
            return CompletionItemKind.Folder;
    }

    return CompletionItemKind.Property;
}

function convertRange(document: TextDocument, span: ts.TextSpan): Range {
    const startPosition = document.positionAt(span.start);
    const endPosition = document.positionAt(span.start + span.length);
    return Range.create(startPosition, endPosition);
}

// ts.createLanguageService()