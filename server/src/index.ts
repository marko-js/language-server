import {
  createConnection,
  ProposedFeatures,
  Range,
  CompletionList,
  CompletionParams,
  Diagnostic,
  DiagnosticSeverity,
  DocumentFormattingParams,
  TextDocuments,
  TextEdit,
  TextDocumentSyncKind,
} from "vscode-languageserver/node";
import { URI } from "vscode-uri";
import { TextDocument } from "vscode-languageserver-textdocument";
import prettyPrint from "@marko/prettyprint";
import { getTagLibLookup, loadMarkoFile } from "./utils/compiler";
import { parseUntilOffset } from "./utils/htmljs-parser";
import * as completionTypes from "./utils/completions";
import * as definitionTypes from "./utils/definitions";

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
const markoErrorRegExp = /.*\[(.*)\:(\d+)\:(\d+)\](.*)/gi;
const pendingValidationRequests: {
  [uri: string]: ReturnType<typeof setTimeout>;
} = {};

console.log = connection.console.log.bind(connection.console);
console.error = connection.console.error.bind(connection.console);
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

connection.onInitialize(() => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Full,
      documentFormattingProvider: true,
      definitionProvider: true,
      completionProvider: {
        triggerCharacters: [".", ":", "<", ">", "@", "/"],
      },
    },
  };
});

connection.onInitialized(() => {
  documents.all().forEach((doc) => queueValidation(doc));
});

connection.onCompletion(
  (params: CompletionParams): CompletionList => {
    const doc = documents.get(params.textDocument.uri)!;
    const taglib = getTagLibLookup(doc);
    const event = parseUntilOffset({
      taglib,
      offset: doc.offsetAt(params.position),
      text: doc.getText(),
    });

    const handler = event && completionTypes[event.type];
    return (
      (handler && handler(taglib, doc, params, event)) ||
      CompletionList.create()
    );
  }
);

connection.onDefinition((params) => {
  const doc = documents.get(params.textDocument.uri)!;
  const taglib = getTagLibLookup(doc);
  const event = parseUntilOffset({
    taglib,
    offset: doc.offsetAt(params.position),
    text: doc.getText(),
  });

  const handler = event && definitionTypes[event.type];
  return handler && handler(taglib, doc, params, event);
});

connection.onDocumentFormatting(
  ({ textDocument, options }: DocumentFormattingParams): TextEdit[] => {
    const doc = documents.get(textDocument.uri)!;
    const { fsPath } = URI.parse(textDocument.uri);

    try {
      const text = doc.getText();
      const markoCompiler = loadMarkoFile(fsPath, "compiler");
      const CodeWriter = loadMarkoFile(fsPath, "compiler/CodeWriter");
      const formatted = prettyPrint(text, {
        markoCompiler,
        CodeWriter,
        filename: fsPath,
        indent: (options.insertSpaces ? " " : "\t").repeat(options.tabSize),
      });

      return [
        TextEdit.replace(
          Range.create(doc.positionAt(0), doc.positionAt(text.length)),
          formatted
        ),
      ];
    } catch (e) {
      displayMessage("error", 'Formatting failed: "' + e.message + '"');
    }

    return [];
  }
);

documents.onDidChangeContent((change) => {
  queueValidation(change.document);
});

function queueValidation(doc: TextDocument) {
  clearTimeout(pendingValidationRequests[doc.uri]);
  pendingValidationRequests[doc.uri] = setTimeout(() => {
    delete pendingValidationRequests[doc.uri];
    connection.sendDiagnostics({
      uri: doc.uri,
      diagnostics: doValidate(doc),
    });
  }, 800);
}

function doValidate(doc: TextDocument): Diagnostic[] {
  const { fsPath, scheme } = URI.parse(doc.uri);

  if (scheme !== "file") {
    return [];
  }

  const compiler = loadMarkoFile(fsPath, "compiler");
  const diagnostics: Diagnostic[] = [];
  let context: any;
  let message: string;
  let errorThrown = false;

  try {
    message = compiler.compile(doc.getText(), fsPath, {
      writeToDisk: false,
      onContext: (innerContext: any) => {
        context = innerContext;
      },
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
        fsPath
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

function displayMessage(type: "info" | "warning" | "error", msg: string) {
  connection.sendNotification(
    `$/display${type[0].toUpperCase() + type.slice(1)}`,
    msg
  );
}

documents.listen(connection);
connection.listen();
