import {
  createConnection,
  DefinitionLink,
  Diagnostic,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { inspect, isDeepStrictEqual } from "util";
import { clearCompilerCache } from "./utils/compiler";
import setupMessages from "./utils/messages";
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
const prevDiags = new WeakMap<TextDocument, Diagnostic[]>();
const pendingDiags = new WeakSet<TextDocument>();
let diagnosticTimeout: ReturnType<typeof setTimeout> | undefined;

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

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      documentFormattingProvider: true,
      definitionProvider: true,
      hoverProvider: true,
      renameProvider: true,
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

connection.onDidChangeConfiguration(validateDocs);
connection.onDidChangeWatchedFiles(validateDocs);
documents.onDidChangeContent(({ document }) => {
  queueDiagnostic();
  pendingDiags.add(document);
  clearCompilerCache(document);
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

connection.onDefinition(async (params, cancel) => {
  return (
    ((await service.findDefinition(
      documents.get(params.textDocument.uri)!,
      params,
      cancel
    )) as DefinitionLink[]) || null
  );
});

connection.onHover(async (params, cancel) => {
  return (
    (await service.doHover(
      documents.get(params.textDocument.uri)!,
      params,
      cancel
    )) || null
  );
});

connection.onRenameRequest(async (params, cancel) => {
  return (
    (await service.doRename(
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

function validateDocs() {
  queueDiagnostic();
  clearCompilerCache();
  for (const doc of documents.all()) {
    pendingDiags.add(doc);
  }
}

function queueDiagnostic() {
  clearTimeout(diagnosticTimeout);
  const id = (diagnosticTimeout = setTimeout(async () => {
    const results = await Promise.all(
      documents.all().map(async (doc) => {
        if (!pendingDiags.delete(doc)) return;
        const prevDiag = prevDiags.get(doc) || [];
        const nextDiag = (await service.doValidate(doc)) || [];
        if (isDeepStrictEqual(prevDiag, nextDiag)) return;
        return [doc, nextDiag] as const;
      })
    );

    // Check that it wasn't canceled.
    if (id === diagnosticTimeout) {
      for (const result of results) {
        if (result) {
          const [doc, diag] = result;
          prevDiags.set(doc, diag);
          connection.sendDiagnostics({
            uri: doc.uri,
            diagnostics: diag,
          });
        }
      }
    }
  }, 400));
}

documents.listen(connection);
connection.listen();
