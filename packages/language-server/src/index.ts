import { inspect, isDeepStrictEqual } from "util";

import {
  DefinitionLink,
  Diagnostic,
  ProposedFeatures,
  TextDocumentSyncKind,
  createConnection,
} from "vscode-languageserver/node";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { Project } from "@marko/language-tools";

import { clearMarkoCacheForFile } from "./utils/file";
import * as documents from "./utils/text-documents";
import * as workspace from "./utils/workspace";
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
const connection = createConnection(ProposedFeatures.all);
const prevDiags = new WeakMap<TextDocument, Diagnostic[]>();
let diagnosticTimeout: ReturnType<typeof setTimeout> | undefined;

console.log = (...args: unknown[]) => {
  connection.console.log(args.map((v) => inspect(v)).join(" "));
};
console.error = (...args: unknown[]) => {
  connection.console.error(args.map((v) => inspect(v)).join(" "));
};
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

connection.onInitialize(async (params) => {
  setupMessages(connection);
  await service.initialize(params);

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      documentFormattingProvider: true,
      definitionProvider: true,
      hoverProvider: true,
      renameProvider: true,
      codeActionProvider: true,
      referencesProvider: true,
      documentLinkProvider: { resolveProvider: false },
      colorProvider: true,
      documentHighlightProvider: true,
      documentSymbolProvider: true,
      completionProvider: {
        resolveProvider: true,
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

workspace.setup(connection);
workspace.onConfigChange(validateDocs);

connection.onDidOpenTextDocument(documents.doOpen);
connection.onDidChangeTextDocument(documents.doChange);
connection.onDidCloseTextDocument(documents.doClose);
connection.onDidChangeWatchedFiles(documents.doChangeWatchedFiles);

documents.onFileChange((changeDoc) => {
  if (changeDoc) {
    queueDiagnostic();
    clearMarkoCacheForFile(changeDoc);
  } else {
    validateDocs();
  }
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

connection.onCompletionResolve(async (item, cancel) => {
  return (await service.doCompletionResolve(item, cancel)) || item;
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

connection.onReferences(async (params, cancel) => {
  return (
    (await service.findReferences(
      documents.get(params.textDocument.uri)!,
      params,
      cancel
    )) || null
  );
});

connection.onDocumentLinks(async (params, cancel) => {
  return (
    (await service.findDocumentLinks(
      documents.get(params.textDocument.uri)!,
      params,
      cancel
    )) || null
  );
});

connection.onDocumentSymbol(async (params, cancel) => {
  return (
    (await service.findDocumentSymbols(
      documents.get(params.textDocument.uri)!,
      params,
      cancel
    )) || null
  );
});

connection.onDocumentHighlight(async (params, cancel) => {
  return (
    (await service.findDocumentHighlights(
      documents.get(params.textDocument.uri)!,
      params,
      cancel
    )) || null
  );
});

connection.onDocumentColor(async (params, cancel) => {
  return (
    (await service.findDocumentColors(
      documents.get(params.textDocument.uri)!,
      params,
      cancel
    )) || null
  );
});

connection.onColorPresentation(async (params, cancel) => {
  return (
    (await service.getColorPresentations(
      documents.get(params.textDocument.uri)!,
      params,
      cancel
    )) || null
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

connection.onCodeAction(async (params, cancel) => {
  return (
    (await service.doCodeActions(
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

for (const command in service.commands) {
  connection.onRequest(command, service.commands[command]);
}

function validateDocs() {
  queueDiagnostic();
  Project.clearCaches();
}

function queueDiagnostic() {
  clearTimeout(diagnosticTimeout);
  const id = (diagnosticTimeout = setTimeout(async () => {
    const results = await Promise.all(
      Array.from(documents.getAllOpen()).map(async (doc) => {
        if (!documents.isOpen(doc)) {
          prevDiags.delete(doc);
          return;
        }
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

connection.listen();
