import { createParser } from "htmljs-parser";
import { ScopeType, Scope, IHtMLJSParserEvent } from "./marko";
import { CompletionList, TextDocument, Position } from "vscode-languageserver";
import { getStyleAutocomplete } from "./stylesheet";
const DEBUG = process.env.DEBUG === 'true' || false;

export interface IAutocompleteArguments {
    doc: TextDocument;
    offset: number;
    scopeAtPos: Scope;
    tagLibLookup: any;
    position: Position;
}

export function checkPosition(found: boolean, event: any, offset: number) {
    const {
        pos: startPos = null,
        endPos = null,
    } = event;

    return found || startPos === null || offset < startPos || endPos == null || offset > endPos;

}

export function generateAutocomplete(attributes: { [key: string]: IMarkoAttribute }): CompletionList {
    const ret: CompletionList = {
        isIncomplete: false,
        items: []
    }
    Object.keys(attributes).forEach((item) => {
        let attr = attributes[item];
        ret.items.push({
            label: attr.name,
            documentation: attr.html ? `Standard ${attr.name}HTML tag` : 'Marko tag',
            // kind: CompletionItemKind.Snippet,
            // insertTextFormat: InsertTextFormat.Snippet,
            // insertText: `${attr.name}="\${1}"`

        });

    });
    return ret;
}

export async function getAutocomleteAtText(offset: number, text: string) {
    let found: boolean = false;
    return new Promise(function (resolve: (tag: Scope | boolean) => any) {
        const parser = createParser({
            onError: (error: any, data: any) => {
                resolve({
                    tagName: error.code,
                    scopeType: ScopeType.NO_SCOPE,
                    data,
                });
            },
            onOpenTag: (event: IHtMLJSParserEvent) => {
                const {
                    pos: startPos,
                    endPos,
                    tagName,
                    tagNameEndPos,
                    attributes,
                } = event;

                // Don't process when the offset is not inside a tag or we found our tag already
                if (checkPosition(found, event, offset)) return;
                DEBUG && console.log(`Searching for character '${text[offset]}'
                             in string: '${text.slice(startPos, endPos)}'`);

                found = true;
                const defaultTagScope = {
                    tagName,
                    scopeType: ScopeType.NO_SCOPE
                };

                if (offset <= tagNameEndPos) {
                    return resolve({
                        tagName,
                        scopeType: ScopeType.TAG,
                        event,
                    });
                }

                for (const attribute of attributes) {
                    // Non event-handling attributes (i.e. not on-* or on*) have their position
                    // set to the position of the value they have.
                    const attrNamePos = attribute.pos - attribute.name.length;
                    // Attributes are ordered and if the start of the attribute
                    // name is higher than the offset, then the offset must be
                    // in a place that doesn't interest us
                    if (offset < attrNamePos) return resolve(defaultTagScope);

                    if (offset > attribute.pos && offset <= attribute.endPos) {
                        // user is inside attr
                        if (!attribute.value && !attribute.argument) {
                            return resolve({
                                tagName,
                                data: attribute.name,
                                scopeType: ScopeType.ATTR_NAME,
                                event,
                            });
                        } else if (attribute.argument) {

                            return resolve({
                                tagName,
                                data: attribute.argument.value.slice(1, -1),
                                scopeType: ScopeType.ATTR_VALUE,
                                event,
                            })
                        } else {
                            return resolve({
                                tagName,
                                data: attribute.value,
                                scopeType: ScopeType.ATTR_VALUE,
                                event,
                            })
                        }
                    }
                }
                // return resolve(defaultTagScope);
            },
            onCloseTag: (event: IHtMLJSParserEvent) => {
                const {
                    tagName,
                } = event;

                // Don't process when the offset is not inside a tag or we found our tag already
                if (checkPosition(found, event, offset)) return;
                found = true;
                return resolve({
                    tagName,
                    data: tagName,
                    scopeType: ScopeType.CLOSE_TAG,
                    event,
                })
            },
            //  onString: (event: any) => {
            //     if (checkPosition(found, event, offset)) return;
            //     found = true;
            //     return resolve({
            //       tagName: '',
            //       data: '',
            //       scopeType: ScopeType.TEXT
            //     });
            //   },

            onfinish: () => {
                DEBUG && console.log("================Finished!!!==============");
                // TODO: Maybe this is not right? we need it to resolve somehow
                if (!found) resolve(false);
            }
        });
        parser.parse(text);
    });
}
function getHTMLAttrAutiocomplete(options: IAutocompleteArguments): CompletionList {
    const {
        scopeAtPos,
        tagLibLookup,
    } = options;
    const allTags = tagLibLookup.merged.tags;
    let attributeObjects: { [key: string]: IMarkoAttribute } = {};
    const tagInfo = allTags[scopeAtPos.tagName];
    // First create all attribute groups
    Object.assign(attributeObjects, tagLibLookup.merged.attributes);
    for (let grp of tagInfo.attributeGroups) {
        Object.assign(attributeObjects, tagLibLookup.merged.attributeGroups[grp]);
    }

    Object.assign(attributeObjects, tagInfo.attributes);
    // Add all marko attributes


    return generateAutocomplete(attributeObjects);

}

export function getAttributeAutocomplete(options: IAutocompleteArguments): CompletionList {
    switch(options.scopeAtPos.tagName) {
        case 'style':
            return getStyleAutocomplete(options);
        case 'class':
            return null;
        default:
            return getHTMLAttrAutiocomplete(options);
    }
}

export function getCloseTagAutocomplete(options: IAutocompleteArguments): CompletionList {
    let tagName = options.scopeAtPos.tagName;
    if (tagName.startsWith('${')) {
        tagName = '';
    }
    return {
        isIncomplete: false,
        items: [{
            label: tagName
        }]
    }

}

export function getTagAutocomplete(options: IAutocompleteArguments): CompletionList {
    const tagLibLookup = options.tagLibLookup;
    const allTags = tagLibLookup.merged.tags;
    // const startText = doc.getText().slice(0, offset);
    // const endText = doc.getText().slice(offset);
    // TODO might need this for autocomplete tags
    // const needStartBracket = /<\w*$/.test(startText) ? '' : '<';
    // const needEndBracket = /^>/.test(endText) ? '' : '>';


    return {
        isIncomplete: false,
        items:
            Object.keys(allTags).map((tag) => {
                const defn = allTags[tag];
                return {
                    label: tag,
                    documentation: defn.html ? 'Standard HTML tag' : 'Custom tag',
                    // kind: CompletionItemKind.Snippet,
                    // insertTextFormat: InsertTextFormat.Snippet,
                    // insertText: `${needStartBracket}${tag}\${1}</${tag}${needEndBracket}`
                };
            })
    }
}