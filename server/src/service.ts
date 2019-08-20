import { URI } from "vscode-uri";
import {
  Range,
  Definition,
  IConnection,
  CompletionList,
  CompletionParams,
  Diagnostic,
  DiagnosticSeverity,
  DocumentFormattingParams,
  TextDocuments,
  TextDocument,
  TextDocumentPositionParams,
  TextEdit
} from "vscode-languageserver";
import prettyPrint from "@marko/prettyprint";
import { getTagLibLookup, loadMarkoFile } from "./utils/compiler";
import { parseUntilOffset } from "./utils/htmljs-parser";
import * as completionTypes from "./utils/completions";
import * as definitionTypes from "./utils/definitions";

const markoErrorRegExp = /.*\[(.*)\:(\d+)\:(\d+)\](.*)/gi;

export class MLS {
  public static start(connection: IConnection) {
    return new MLS(connection);
  }

  private documents = new TextDocuments();
  private validationDelayMs = 800;
  private pendingValidationRequests: {
    [uri: string]: ReturnType<typeof setTimeout>;
  } = {};

  constructor(private connection: IConnection) {
    this.connection = connection;
    this.documents.listen(connection);
    connection.listen();

    connection.onCompletion(this.onCompletion);
    this.documents.onDidChangeContent(change =>
      this.queueValidation(change.document)
    );

    connection.onInitialize(() => {
      connection.onDefinition(this.onDefinition);
      connection.onDocumentFormatting(this.onDocumentFormatting);
      this.documents.all().forEach(doc => this.queueValidation(doc));

      return {
        capabilities: {
          textDocumentSync: this.documents.syncKind,
          documentFormattingProvider: true,
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

  public doValidate(doc: TextDocument): Diagnostic[] {
    const { path: filePath } = URI.parse(doc.uri);
    const compiler = loadMarkoFile(filePath, "compiler");
    const diagnostics: Diagnostic[] = [];
    let context: any;
    let message: string;
    let errorThrown = false;

    try {
      message = compiler.compile(doc.getText(), filePath, {
        writeToDisk: false,
        onContext: (innerContext: any) => {
          context = innerContext;
        }
      });
    } catch (e) {
      message = e.message;
      errorThrown = true;
    }

    if (context && context.hasErrors()) {
      // If marko exported onContext then use that to create diagnostic output
      return context.getErrors().map((error: any) => {
        return Diagnostic.create(
          Range.create(0, 0, 0, 0),
          error.message,
          DiagnosticSeverity.Error,
          error.code,
          filePath
        );
      });
    } else if (errorThrown) {
      // 0: full line, 1: filename, 2: line number 3: column, 4 message
      let matches: RegExpExecArray | null = null;
      // Iterate through all regexp matches for the given message
      while ((matches = markoErrorRegExp.exec(message))) {
        const line = parseInt(matches[2], 10) - 1; // Line starts at 0
        const col = parseInt(matches[3], 10);
        diagnostics.push(
          Diagnostic.create(
            Range.create(line, col, line, col),
            matches[4],
            DiagnosticSeverity.Error,
            "",
            matches[1]
          )
        );
      }
    }
    return diagnostics;
  }

  public onDocumentFormatting = ({
    textDocument,
    options
  }: DocumentFormattingParams): TextEdit[] => {
    const doc = this.documents.get(textDocument.uri)!;
    const { path: filename } = URI.parse(textDocument.uri);

    try {
      const text = doc.getText();
      const markoCompiler = loadMarkoFile(filename, "compiler");
      const CodeWriter = loadMarkoFile(filename, "compiler/CodeWriter");
      const formatted = prettyPrint(text, {
        markoCompiler,
        CodeWriter,
        filename,
        indent: (options.insertSpaces ? " " : "\t").repeat(options.tabSize)
      });

      return [
        TextEdit.replace(
          Range.create(doc.positionAt(0), doc.positionAt(text.length)),
          formatted
        )
      ];
    } catch (e) {
      this.displayMessage("error", 'Formatting failed: "' + e.message + '"');
    }

    return [];
  };

  private queueValidation(textDocument: TextDocument): void {
    const previousRequest = this.pendingValidationRequests[textDocument.uri];
    if (previousRequest) {
      clearTimeout(previousRequest);
      delete this.pendingValidationRequests[textDocument.uri];
    }

    this.pendingValidationRequests[textDocument.uri] = setTimeout(() => {
      delete this.pendingValidationRequests[textDocument.uri];
      this.connection.sendDiagnostics({
        uri: textDocument.uri,
        diagnostics: this.doValidate(textDocument)
      });
    }, this.validationDelayMs);
  }

  private displayMessage(type: "info" | "warning" | "error", msg: string) {
    this.connection.sendNotification(
      `$/display${type[0].toUpperCase() + type.slice(1)}`,
      msg
    );
  }
}
