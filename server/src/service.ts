import {
  Definition,
  IConnection,
  CompletionList,
  CompletionParams,
  TextDocuments,
  TextDocument,
  TextDocumentPositionParams
} from "vscode-languageserver";
import { getTagLibLookup } from "./utils/compiler";
import { parseUntilOffset } from "./utils/htmljs-parser";
import * as completionTypes from "./utils/completions";
import * as definitionTypes from "./utils/definitions";

// const markoErrorRegExp = /.*\[(.*)\:(\d+)\:(\d+)\](.*)/gi;

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
    // this.documents.onDidChangeContent(change =>
    //   this.triggerValidation(change.document)
    // );

    connection.onInitialize(() => {
      connection.onDefinition(this.onDefinition);
      // connection.onDocumentFormatting(this.onDocumentFormatting);
      // this.documents
      //   .all()
      //   .forEach(document => this.triggerValidation(document));

      return {
        capabilities: {
          textDocumentSync: this.documents.syncKind,
          // documentFormattingProvider: true,
          definitionProvider: true,
          completionProvider: {
            triggerCharacters: [".", ":", "<", ">", "@", "/"]
          }
        }
      };
    });
  }

  public onCompletion = (params: CompletionParams): CompletionList => {
    const doc = this.documents.get(params.textDocument.uri)!;
    const taglib = getTagLibLookup(doc);
    const event = parseUntilOffset({
      taglib,
      offset: doc.offsetAt(params.position),
      text: doc.getText()
    });

    const handler = event && completionTypes[event.type];
    return (
      (handler && handler(taglib, doc, params, event)) ||
      CompletionList.create()
    );
  };

  public onDefinition = (params: TextDocumentPositionParams): Definition => {
    const doc = this.documents.get(params.textDocument.uri)!;
    const taglib = getTagLibLookup(doc);
    const event = parseUntilOffset({
      taglib,
      offset: doc.offsetAt(params.position),
      text: doc.getText()
    });

    const handler = event && definitionTypes[event.type];
    return handler && handler(taglib, doc, params, event);
  };

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
