import {
  createConnection,
  Diagnostic,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { inspect, isDeepStrictEqual } from "util";
import setupCompiler from "./utils/compiler";
import setupMessages from "./utils/messages";
import setupDefinitions from "./features/definitions";
import service from "./service";

if (
  typeof require !== "undefined" &&
  require.extensions &&
  !(".ts" in require.extensions)
) {
  // Prevent compiler hooks written in typescript to explode the language server.
  require.extensions[".ts"] = undefined;
}
const documents = new TextDocuments(TextDocument);
const connection = createConnection(ProposedFeatures.all);
const prevDiagnostics = new WeakMap<TextDocument, Diagnostic[]>();
const diagnosticTimeouts = new WeakMap<
  TextDocument,
  ReturnType<typeof setTimeout>
>();

console.log = (...args: unknown[]) => {
  connection.console.log(args.map((v) => inspect(v)).join(" "));
};
console.error = (...args: unknown[]) => {
  connection.console.error(args.map((v) => inspect(v)).join(" "));
};
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

connection.onInitialize(() => {
  setupMessages(connection);
  setupCompiler(connection, documents);

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      documentFormattingProvider: true,
      definitionProvider: true,
      completionProvider: {
        triggerCharacters: [
          ".",
          ":",
          "<",
          ">",
          "@",
          "/",
          '"',
          "'",
          "`",
          " ",
          "=",
          "*",
          "#",
          "$",
          "+",
          "^",
          "(",
          "[",
          "-",
        ],
      },
    },
  };
});

connection.onInitialized(() => {
  documents.all().forEach((doc) => queueValidation(doc));
});

documents.onDidChangeContent((change) => {
  queueValidation(change.document);
});

connection.onCompletion(async (params, cancel) => {
  return (
    (await service.doComplete(
      documents.get(params.textDocument.uri)!,
      params,
      cancel
    )) || null
  );
});

connection.onDocumentFormatting(async (params, cancel) => {
  return (
    (await service.format(
      documents.get(params.textDocument.uri)!,
      params,
      cancel
    )) || null
  );
});

function queueValidation(doc: TextDocument) {
  clearTimeout(diagnosticTimeouts.get(doc)!);
  const id = setTimeout(async () => {
    const prevDiag = prevDiagnostics.get(doc);
    const nextDiag = (await service.doValidate(doc)) || [];

    if (
      diagnosticTimeouts.get(doc) !== id ||
      (prevDiag && isDeepStrictEqual(prevDiag, nextDiag))
    ) {
      return;
    }

    prevDiagnostics.set(doc, nextDiag);
    connection.sendDiagnostics({
      uri: doc.uri,
      diagnostics: nextDiag,
    });
  }, 800);

  diagnosticTimeouts.set(doc, id);
}

setupDefinitions(connection, documents);

documents.listen(connection);
connection.listen();
