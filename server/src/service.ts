import {
  IConnection,
  CompletionParams,
  TextDocuments,
  TextDocument
} from "vscode-languageserver";
import { CompletionItem, CompletionList } from "vscode-css-languageservice";
import { parseUntilOffset } from "./utils/htmljs-parser";
import { getTagLibLookup } from "./utils/compiler";
import getCompletion from "./utils/completions";

// import {
//   loadMarkoCompiler,
//   Scope,
//   ScopeType,
//   getTag,
//   getTagLibLookup,
//   loadCompilerComponent
// } from "./util/marko";

// import {
//   getAutocomleteAtText,
//   checkPosition,
//   getAttributeAutocomplete,
//   getTagAutocomplete,
//   getCloseTagAutocomplete,
//   IAutocompleteArguments,
//   getJavascriptAutocomplete
// } from "./util/autocomplete";

// const tagNameCharsRegExp = /[a-zA-Z0-9_.:-]/;
// const attrNameCharsRegExp = /[a-zA-Z0-9_#.:-]/;
// const markoErrorRegExp = /.*\[(.*)\:(\d+)\:(\d+)\](.*)/gi;
// const DEBUG = process.env.DEBUG === "true";

/*
NOTE: It would be nice to have a Cache for all the documents that have
been parsed already so we don't have to do it every time.

For now let's just reparse every document we need to.
*/

// function createTextDocument(filename: string): TextDocument {
//   const uri = URI.file(filename).toString();
//   const content = fs.readFileSync(filename, "utf-8");
//   return TextDocument.create(uri, "plaintext", 0, content);
// }

// function getComponentJSFilePath(documentPath: string): string | null {
//   const dir = path.dirname(documentPath);
//   const possibleFileNames = ["component.js", "widget.js", "index.js"];

//   for (const fileName of possibleFileNames) {
//     const filePath = path.join(dir, fileName);
//     if (fs.existsSync(filePath)) {
//       return filePath;
//     }
//   }

//   return null;
// }

// function createRangeFromContext(context: IMarkoErrorOutput) {
//   const start = context.pos;
//   const end = context.endPos;
//   return createRange(start.line - 1, start.column, end.line - 1, end.column);
// }

// function createRange(
//   startLine: number,
//   stratColumn: number,
//   endLine?: number,
//   endColumn?: number
// ): Range {
//   return {
//     start: Position.create(startLine, stratColumn),
//     end: Position.create(endLine || startLine, endColumn || stratColumn)
//   };
// }

/*
This gives scope at position.

It returns the TAG ScopeType when the cursor is inside an open tag. This complicates the Hover and error messages

 */
// async function getScopeAtPos(offset: number, text: string) {
//   let found: boolean = false;
//   return new Promise((resolve: (tag: Scope | boolean) => void) => {
//     const parser = createParser({
//       onError: (error: any, data: any) => {
//         resolve({
//           tagName: error.code,
//           scopeType: ScopeType.NO_SCOPE,
//           data
//         });
//       },
//       onOpenTag(event: any) {
//         const {
//           pos: startPos,
//           endPos,
//           tagName,
//           tagNameEndPos,
//           attributes
//         } = event;

//         // Don't process when the offset is not inside a tag or we found our tag already
//         if (checkPosition(found, event, offset)) {
//           return;
//         }

//         if (DEBUG) {
//           console.log(`Searching for character '${text[offset]}'
//           in string: '${text.slice(startPos, endPos)}'`);
//         }

//         found = true;
//         const defaultTagScope = {
//           tagName,
//           scopeType: ScopeType.NO_SCOPE
//         };

//         const validCharAtPos =
//           tagNameCharsRegExp.test(text.charAt(offset)) ||
//           attrNameCharsRegExp.test(text.charAt(offset));
//         if (!validCharAtPos) {
//           return resolve(defaultTagScope);
//         }

//         // Tag Scope
//         // If tag name starts with '@' then it's an inner section that should be
//         // defined int he marko.json file
//         if (DEBUG) {
//           console.log(
//             `Looking in tagName: ${text.slice(startPos, tagNameEndPos)}`
//           );
//         }

//         if (offset <= tagNameEndPos) {
//           return resolve({
//             tagName,
//             scopeType: ScopeType.TAG
//           });
//         }

//         for (const attribute of attributes) {
//           // Non event-handling attributes (i.e. not on-* or on*) have their position
//           // set to the position of the value they have.
//           const attrNamePos = attribute.pos - attribute.name.length;
//           // Attributes are ordered and if the start of the attribute
//           // name is higher than the offset, then the offset must be
//           // in a place that doesn't interest us
//           if (offset < attrNamePos) {
//             return resolve(defaultTagScope);
//           }

//           if (!attribute.argument) {
//             // Check if cursor is on the attribute name
//             if (DEBUG) {
//               console.log(
//                 `Looking in attributePosEndPos: ${text.slice(
//                   attribute.pos,
//                   attribute.endPos
//                 )}`
//               );

//               console.log(
//                 `Looking in attributeName: ${text.slice(
//                   attrNamePos,
//                   attribute.pos
//                 )}`
//               );
//             }

//             // pos and endPos are for the value of the Attribute
//             //  m y - a t t r = " h e l l o "
//             //                ^             ^
//             //               pos          endPos
//             // So we need to make sure the offset is between pos - length of attrName and pos
//             if (offset >= attrNamePos && offset <= attribute.pos) {
//               return resolve({
//                 tagName,
//                 data: attribute.name,
//                 scopeType: ScopeType.ATTR_NAME
//               });
//             }
//           } else {
//             // Cursor is in the argument of `onClick('myOnClickHandler')` like attributes
//             if (DEBUG) {
//               console.log(
//                 `Looking in Attribute's Argument: ${text.slice(
//                   attribute.argument.pos + 1,
//                   attribute.argument.endPos
//                 )}`
//               );
//             }

//             if (
//               offset >= attribute.argument.pos + 1 &&
//               offset <= attribute.argument.endPos
//             ) {
//               return resolve({
//                 tagName,
//                 data: attribute.argument.value.slice(1, -1),
//                 scopeType: ScopeType.ATTR_VALUE
//               });
//             }
//           }
//         }
//         return resolve(defaultTagScope);
//       },
//       onfinish() {
//         if (DEBUG) {
//           console.log("================Finished!!!==============");
//         }
//         // TODO: Maybe this is not right? we need it to resolve somehow
//         if (!found) {
//           resolve(false);
//         }
//       }
//     });
//     parser.parse(text);
//   });
// }

// function findDefinitionForTag(
//   document: TextDocument,
//   { tagName }: Scope
// ): Definition {
//   const { template = false, renderer = false, taglibId } = getTag(
//     document,
//     tagName!
//   );

//   // We can either have renderers defined where there are no templates.
//   if (!template && !renderer) {
//     throw new Error(`Couldn't find a definition for tag: ${tagName}`);
//   }

//   const refPath = template || renderer;

//   const definitions = [
//     {
//       uri: URI.file(refPath).toString(),
//       range: {
//         start: Position.create(0, 0),
//         end: Position.create(0, 0)
//       }
//     }
//   ];

//   if (taglibId) {
//     definitions.push({
//       uri: URI.file(taglibId).toString(),
//       range: {
//         start: Position.create(0, 0),
//         end: Position.create(0, 0)
//       }
//     });
//   }

//   return definitions;
// }

// function findDefinitionForAttrName(
//   document: TextDocument,
//   { tagName, data: attrName }: Scope
// ): Definition | null {
//   const attrDef = getTagLibLookup(document).getAttribute(tagName, attrName);
//   if (!attrDef || !attrDef.filePath) {
//     return null;
//   }

//   const attrDefDocument: TextDocument = createTextDocument(attrDef.filePath);

//   // Search for "@visible"
//   const match = attrDefDocument
//     .getText()
//     .match(new RegExp(`"@?${escapeStringRegexp(attrName)}"`));
//   if (match) {
//     const index = match.index as number;
//     return {
//       uri: attrDefDocument.uri,
//       range: {
//         start: attrDefDocument.positionAt(index),
//         end: attrDefDocument.positionAt(index + match[0].length)
//       }
//     };
//   }
//   return {
//     uri: attrDefDocument.uri,
//     range: {
//       start: Position.create(0, 0),
//       end: Position.create(0, 0)
//     }
//   };
// }

// function findDefinitionForAttrValue(
//   document: TextDocument,
//   { data: attrValue }: Scope
// ): Definition | null {
//   const documentPath = URI.parse(document.uri).fsPath;
//   const componentJSPath = getComponentJSFilePath(documentPath) as string;

//   if (!getComponentJSFilePath) {
//     return null;
//   }

//   const componentJSDocument: TextDocument = createTextDocument(componentJSPath);
//   const handlerRegExp = new RegExp(`${attrValue}\\s*[(]|${attrValue}\\s*[:]`);

//   const match = componentJSDocument.getText().match(handlerRegExp);
//   if (match) {
//     const index = match.index as number;
//     return {
//       uri: componentJSDocument.uri,
//       range: {
//         start: componentJSDocument.positionAt(index),
//         end: componentJSDocument.positionAt(index + match[0].length)
//       }
//     };
//   }

//   return {
//     uri: componentJSDocument.uri,
//     range: {
//       start: Position.create(0, 0),
//       end: Position.create(0, 0)
//     }
//   };
// }

export class MLS {
  public static start(connection: IConnection) {
    return new MLS(connection);
  }

  private documents = new TextDocuments();
  // private validationDelayMs = 800;
  private pendingValidationRequests: {
    [uri: string]: ReturnType<typeof setTimeout>;
  } = {};

  constructor(private connection: IConnection) {
    this.connection = connection;
    this.documents.listen(connection);
    connection.listen();

    connection.onCompletion(this.onCompletion);
    connection.onCompletionResolve(this.onCompletionResolve);
    // this.documents.onDidChangeContent(change =>
    //   this.triggerValidation(change.document)
    // );

    connection.onInitialize(() => {
      // connection.onDefinition(this.onDefinition);
      // connection.onDocumentFormatting(this.onDocumentFormatting);
      // this.documents
      //   .all()
      //   .forEach(document => this.triggerValidation(document));

      return {
        capabilities: {
          textDocumentSync: this.documents.syncKind,
          // documentFormattingProvider: true,
          // definitionProvider: true,
          completionProvider: {
            resolveProvider: true,
            triggerCharacters: [".", ":", "<", ">", "@", "/"]
          }
        }
      };
    });
  }

  public onCompletion = (params: CompletionParams): CompletionList => {
    const doc = this.documents.get(params.textDocument.uri)!;
    const taglib = getTagLibLookup(doc);
    return getCompletion(
      taglib,
      doc,
      params,
      parseUntilOffset({
        taglib,
        offset: doc.offsetAt(params.position),
        text: doc.getText()
      })
    );
    // const scopeAtPos = (await getAutocomleteAtText(
    //   offset,
    //   doc.getText()
    // )) as Scope;
    // const tagLibLookup = getTagLibLookup(doc);
    // const args: IAutocompleteArguments = {
    //   doc,
    //   offset,
    //   scopeAtPos,
    //   tagLibLookup,
    //   position: positionParams.position
    // };

    // switch (scopeAtPos.scopeType) {
    //   case ScopeType.TAG:
    //     return getTagAutocomplete(args);
    //   case ScopeType.ATTR_NAME:
    //     return getAttributeAutocomplete(args);
    //   case ScopeType.CLOSE_TAG:
    //     return getCloseTagAutocomplete(args);
    //   case ScopeType.ATTR_VALUE:
    //     if (DEBUG) {
    //       console.log("attr value");
    //     }
    //     break;
    //   case ScopeType.JAVASCRIPT:
    //     return getJavascriptAutocomplete(args);
    //   default:
    //     if (DEBUG) {
    //       console.log(`Couldn't match the scopeType: ${scopeAtPos.scopeType}`);
    //     }
    // }
    // return {};
  };

  public onCompletionResolve = (item: CompletionItem) => {
    console.log("completion resolve");
    return item;
  };

  // public async onDefinition(positionParams: TextDocumentPositionParams) {
  //   const doc = this.documents.get(positionParams.textDocument.uri)!;
  //   const offset = doc.offsetAt(positionParams.position);

  //   const scopeAtPos = (await getScopeAtPos(offset, doc.getText())) as Scope;
  //   if (!scopeAtPos || scopeAtPos.scopeType === ScopeType.NO_SCOPE) {
  //     return null;
  //   }

  //   const { scopeType } = scopeAtPos;

  //   switch (scopeType) {
  //     case ScopeType.TAG:
  //       return findDefinitionForTag(doc, scopeAtPos);
  //     case ScopeType.ATTR_NAME:
  //       return findDefinitionForAttrName(doc, scopeAtPos);
  //     case ScopeType.ATTR_VALUE:
  //       return findDefinitionForAttrValue(doc, scopeAtPos);
  //     default:
  //       throw new Error(`Couldn't match the scopeType: ${scopeType}`);
  //   }

  //   // do a switch case with the textScope
  //   // TAG: just return the template + the marko.json file if it exists
  //   // ATTR_NAME: Return the marko.json file if it exists, and otherwise go to the first usage of input.ATTR_NAME (or all of them)
  //   // ATTR_VALUE: Check if this is a handler to the ATTR_NAME and return the definition of this handler either in the template or in the component.json
  // }

  public cleanPendingValidation(textDocument: TextDocument): void {
    const request = this.pendingValidationRequests[textDocument.uri];
    if (request) {
      clearTimeout(request);
      delete this.pendingValidationRequests[textDocument.uri];
    }
  }

  // public doValidate(doc: TextDocument): Diagnostic[] {
  //   const { path: filePath } = URI.parse(doc.uri);
  //   const compiler = loadMarkoCompiler(filePath);
  //   const diagnostics: Diagnostic[] = [];
  //   let context: any;
  //   let message;
  //   let errorThrown = false;

  //   try {
  //     message = compiler.compile(doc.getText(), filePath, {
  //       writeToDisk: false,
  //       onContext: (innerContext: any) => {
  //         context = innerContext;
  //       }
  //     });
  //   } catch (e) {
  //     message = e.message;
  //     errorThrown = true;
  //   }

  //   if (context && context.hasErrors()) {
  //     // If marko exported onContext thne use that to create diagnostic output
  //     return context.getErrors().map((error: IMarkoErrorOutput) => {
  //       return Diagnostic.create(
  //         createRangeFromContext(error),
  //         error.message,
  //         DiagnosticSeverity.Error,
  //         error.code,
  //         filePath
  //       );
  //     });
  //   } else if (errorThrown) {
  //     // 0: full line, 1: filename, 2: line number 3: column, 4 message
  //     let matches;
  //     // Iterate through all regexp matches for the given message
  //     while ((matches = markoErrorRegExp.exec(message))) {
  //       const line = parseInt(matches[2], 10) - 1; // Line starts at 0
  //       const col = parseInt(matches[3], 10);
  //       diagnostics.push(
  //         Diagnostic.create(
  //           createRange(line, col),
  //           matches[4],
  //           DiagnosticSeverity.Error,
  //           "",
  //           matches[1]
  //         )
  //       );
  //     }
  //   }
  //   return diagnostics;
  // }

  // public onDocumentFormatting({
  //   textDocument,
  //   options
  // }: DocumentFormattingParams): TextEdit[] {
  //   const doc = this.documents.get(textDocument.uri)!;
  //   const { path: filePath } = URI.parse(textDocument.uri);
  //   let edits: TextEdit[] = [];

  //   try {
  //     const compiler = loadMarkoCompiler(filePath);
  //     const prettyPrintOptions = Object.assign({}, options, {
  //       filename: filePath,
  //       compiler,
  //       markoCompiler: compiler,
  //       CodeWriter: loadCompilerComponent("CodeWriter", filePath)
  //     });

  //     const pretty = prettyPrint(doc.getText(), prettyPrintOptions);
  //     const range = Range.create(
  //       Position.create(0, 0),
  //       Position.create(doc.lineCount, 0)
  //     );
  //     edits = [TextEdit.replace(range, pretty)];
  //   } catch (e) {
  //     this.displayMessage('error', 'Formatting failed: "' + e.message + '"');
  //   }
  //   return edits;
  // }

  /**
   * Custom Notifications
   */

  public displayMessage(type: "info" | "warning" | "error", msg: string) {
    this.connection.sendNotification(
      `$/display${type[0].toUpperCase() + type.slice(1)}`,
      msg
    );
  }

  // private triggerValidation(textDocument: TextDocument): void {
  //   this.cleanPendingValidation(textDocument);
  //   this.pendingValidationRequests[textDocument.uri] = setTimeout(() => {
  //     delete this.pendingValidationRequests[textDocument.uri];
  //     this.connection.sendDiagnostics({
  //       uri: textDocument.uri,
  //       diagnostics: this.doValidate(textDocument)
  //     });
  //   }, this.validationDelayMs);
  // }
}
