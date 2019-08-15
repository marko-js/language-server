import { createParser } from "htmljs-parser";
import { ScopeType, Scope, IHtmlJSParserEvent } from "./marko";
import { CompletionList, TextDocument, Position } from "vscode-languageserver";

import { getStyleAutocomplete, supportedCSSList } from "./stylesheet";
import { getJSAutocomplete } from "./javascript";
import { EmbeddedRegion, LanguageId, RegionType } from "./document";

const DEBUG = process.env.DEBUG === "true" || false;

export interface IAutocompleteArguments {
  doc: TextDocument;
  offset: number;
  scopeAtPos: Scope;
  tagLibLookup: any;
  position: Position;
}

export function checkPosition(found: boolean, event: any, offset: number) {
  const { pos: startPos = null, endPos = null } = event;

  return (
    found ||
    startPos === null ||
    offset < startPos ||
    endPos == null ||
    offset > endPos
  );
}

export function generateAutocomplete(attributes: {
  [key: string]: IMarkoAttribute;
}): CompletionList {
  const ret: CompletionList = {
    isIncomplete: false,
    items: []
  };
  Object.keys(attributes).forEach(item => {
    const attr = attributes[item];
    ret.items.push({
      label: attr.name,
      documentation: attr.html ? `Standard ${attr.name}HTML tag` : "Marko tag"
      // kind: CompletionItemKind.Snippet,
      // insertTextFormat: InsertTextFormat.Snippet,
      // insertText: `${attr.name}="\${1}"`
    });
  });
  return ret;
}

function getStyleType(event: IHtmlJSParserEvent): LanguageId {
  if (event.shorthandClassNames) {
    for (const shorthandClassName of event.shorthandClassNames) {
      for (const part of shorthandClassName.rawParts) {
        if (supportedCSSList.includes(part.text)) {
          return part.text as LanguageId;
        }
      }
    }
  }

  return "css";
}

function createRegion(
  region: EmbeddedRegion[],
  event: IHtmlJSParserEvent
): EmbeddedRegion[] {
  let languageId: LanguageId | null = null;
  let type: RegionType | null = null;

  if (event.tagName === "style") {
    languageId = getStyleType(event);
    type = "style";
  } else if (event.tagName === "class") {
    languageId = "javascript";
    type = "script";
  } else if (event.type === "placeholder") {
    type = "script";
    languageId = "javascript";
  }

  if (languageId !== null) {
    region.push({
      start: event.pos,
      end: event.endPos,
      type: type!,
      languageId
    });
  }

  return region;
}

export async function getAutocomleteAtText(offset: number, text: string) {
  let found: boolean = false;
  const regions: EmbeddedRegion[] = [];
  let resolveData: Scope = {
    tagName: "",
    scopeType: ScopeType.NO_SCOPE,
    regions
  };
  return new Promise((resolve: (tag: Scope) => any) => {
    const parser = createParser({
      onError: (error: any, data: any) => {
        resolve({
          tagName: error.code,
          scopeType: ScopeType.NO_SCOPE,
          data
        });
      },
      onOpenTag: (event: IHtmlJSParserEvent) => {
        const {
          pos: startPos,
          endPos,
          tagName,
          tagNameEndPos,
          attributes,
          argument
        } = event;
        createRegion(regions, event);

        // Don't process when the offset is not inside a tag or we found our tag already
        if (checkPosition(found, event, offset)) {
          return;
        }

        if (DEBUG) {
          console.log(`Searching for character '${text[offset]}'
                             in string: '${text.slice(startPos, endPos)}'`);
        }

        found = true;
        const defaultTagScope = {
          tagName,
          scopeType: ScopeType.NO_SCOPE
        };

        if (offset <= tagNameEndPos) {
          if (argument && offset > argument.pos && offset <= argument.endPos) {
            // resolve as argument
            resolveData = {
              tagName,
              scopeType: ScopeType.JAVASCRIPT,
              event,
              regions
            };
          } else {
            // Check and see if there is an argument
            resolveData = {
              tagName,
              scopeType: ScopeType.TAG,
              event,
              regions
            };
          }
          return;
        }

        for (const attribute of attributes) {
          // Non event-handling attributes (i.e. not on-* or on*) have their position
          // set to the position of the value they have.
          const attrNamePos = attribute.pos - attribute.name.length;
          // Attributes are ordered and if the start of the attribute
          // name is higher than the offset, then the offset must be
          // in a place that doesn't interest us
          if (offset < attrNamePos) {
            return resolve(defaultTagScope);
          }

          if (offset > attribute.pos && offset <= attribute.endPos) {
            // user is inside attr
            if (!attribute.value && !attribute.argument) {
              resolveData = {
                tagName,
                data: attribute.name,
                scopeType: ScopeType.ATTR_NAME,
                event,
                regions
              };
            } else if (attribute.argument) {
              resolveData = {
                tagName,
                regions,
                data: attribute.argument.value.slice(1, -1),
                scopeType: ScopeType.ATTR_VALUE,
                event
              };
            } else {
              resolveData = {
                tagName,
                regions,
                data: attribute.value,
                scopeType: ScopeType.JAVASCRIPT,
                event
              };
            }
          }
        }
        // return resolve(defaultTagScope);
      },
      onScriptlet: (event: IHtmlJSParserEvent) => {
        createRegion(regions, event);
        if (checkPosition(found, event, offset)) {
          return;
        }
        resolveData = {
          regions,
          data: event.value,
          scopeType: ScopeType.JAVASCRIPT,
          event
        };
      },
      onPlaceholder: (event: IHtmlJSParserEvent) => {
        createRegion(regions, event);
        if (checkPosition(found, event, offset)) {
          return;
        }
        resolveData = {
          regions,
          data: event.value,
          scopeType: ScopeType.JAVASCRIPT,
          event
        };
      },
      onCloseTag: (event: IHtmlJSParserEvent) => {
        const { tagName } = event;

        // Don't process when the offset is not inside a tag or we found our tag already
        if (checkPosition(found, event, offset)) {
          return;
        }
        found = true;
        resolveData = {
          tagName,
          regions,
          data: tagName,
          scopeType: ScopeType.CLOSE_TAG,
          event
        };
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
        if (DEBUG) {
          console.log("================Finished!!!==============");
        }

        resolve(resolveData);
        // if (!found) resolve(false);
      }
    });
    parser.parse(text);
  });
}
function getHTMLAttrAutocomplete(
  options: IAutocompleteArguments
): CompletionList {
  const { scopeAtPos, tagLibLookup } = options;
  const allTags = tagLibLookup.merged.tags;
  const attributeObjects: { [key: string]: IMarkoAttribute } = {};
  const tagInfo = allTags[scopeAtPos.tagName!];
  // First create all attribute groups
  Object.assign(attributeObjects, tagLibLookup.merged.attributes);
  for (const grp of tagInfo.attributeGroups) {
    Object.assign(attributeObjects, tagLibLookup.merged.attributeGroups[grp]);
  }

  Object.assign(attributeObjects, tagInfo.attributes);
  // Add all marko attributes

  return generateAutocomplete(attributeObjects);
}

export function getAttributeAutocomplete(
  options: IAutocompleteArguments
): CompletionList | null {
  switch (options.scopeAtPos.tagName) {
    case "style":
      return getStyleAutocomplete(options);
    case "class":
      return getJSAutocomplete(options);
    default:
      return getHTMLAttrAutocomplete(options);
  }
}

export function getJavascriptAutocomplete(
  options: IAutocompleteArguments
): CompletionList {
  // const newDocument = getSingleTypeDocument(options.doc, 'javascript',);
  // createLanguageService()
  return getJSAutocomplete(options);
}

export function getCloseTagAutocomplete(
  options: IAutocompleteArguments
): CompletionList {
  let tagName = options.scopeAtPos.tagName!;
  if (tagName.startsWith("${")) {
    tagName = "";
  }
  return {
    isIncomplete: false,
    items: [
      {
        label: tagName
      }
    ]
  };
}

export function getTagAutocomplete(
  options: IAutocompleteArguments
): CompletionList {
  debugger;
  
  const tagLibLookup = options.tagLibLookup;
  const allTags = tagLibLookup.merged.tags;
  // const startText = doc.getText().slice(0, offset);
  // const endText = doc.getText().slice(offset);
  // TODO might need this for autocomplete tags
  // const needStartBracket = /<\w*$/.test(startText) ? '' : '<';
  // const needEndBracket = /^>/.test(endText) ? '' : '>';

  return {
    isIncomplete: false,
    items: Object.keys(allTags).map(tag => {
      const defn = allTags[tag];
      return {
        label: tag,
        documentation: defn.html ? "Standard HTML tag" : "Custom tag"
        // kind: CompletionItemKind.Snippet,
        // insertTextFormat: InsertTextFormat.Snippet,
        // insertText: `${needStartBracket}${tag}\${1}</${tag}${needEndBracket}`
      };
    })
  };
}
