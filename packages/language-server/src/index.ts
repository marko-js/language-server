import "./utils/project-defaults";

import { Project } from "@marko/language-tools";
import { inspect, isDeepStrictEqual } from "util";
import {
  createConnection,
  type DefinitionLink,
  Diagnostic,
  DidChangeWatchedFilesNotification,
  ProposedFeatures,
  TextDocumentSyncKind,
} from "vscode-languageserver/node";
import type { TextDocument } from "vscode-languageserver-textdocument";

import service from "./service";
import { markoCodeActionKinds } from "./service/marko/code-actions";
import { clearMarkoCacheForFile } from "./utils/file";
import setupMessages from "./utils/messages";
import * as documents from "./utils/text-documents";
import * as workspace from "./utils/workspace";

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
let canRegisterFileWatchers = false;

// On-disk changes to these files affect Marko intellisense (imported
// components, TS modules, styles, tag definitions, tsconfig, and dependency
// manifests). VS Code's client watches them via `synchronize.fileEvents`, but
// other clients (e.g. Zed) only send `didChangeWatchedFiles` for watchers the
// server registers itself — so register them to keep caches in sync everywhere.
const WATCHED_FILES_GLOB =
  "**/{*.ts,*.mts,*.cts,*.js,*.mjs,*.cjs,*.marko,*.module.css,*.module.scss,*.module.less,marko.json,marko-tag.json,tsconfig.json,jsconfig.json,package.json,package-lock.json,pnpm-lock.yaml,yarn.lock}";

console.log = (...args: unknown[]) => {
  connection.console.log(args.map((v) => inspect(v)).join(" "));
};
console.error = (...args: unknown[]) => {
  connection.console.error(args.map((v) => inspect(v)).join(" "));
};
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

connection.onInitialize(async (params) => {
  canRegisterFileWatchers = Boolean(
    params.capabilities.workspace?.didChangeWatchedFiles?.dynamicRegistration,
  );
  setupMessages(connection);
  await service.initialize(params);

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      documentFormattingProvider: true,
      definitionProvider: true,
      hoverProvider: true,
      renameProvider: { prepareProvider: true },
      codeActionProvider: {
        resolveProvider: true,
        codeActionKinds: markoCodeActionKinds,
      },
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

connection.onInitialized(() => {
  // Ask spec-compliant clients that don't watch files on the server's behalf
  // (e.g. Zed) to notify us of on-disk changes to Marko-relevant files. VS Code
  // already watches these via its client-side `synchronize.fileEvents`.
  if (canRegisterFileWatchers) {
    void connection.client.register(DidChangeWatchedFilesNotification.type, {
      watchers: [{ globPattern: WATCHED_FILES_GLOB }],
    });
  }
});

workspace.setup(connection);
workspace.onConfigChange(validateDocs);

connection.onDidOpenTextDocument(async (params) => {
  documents.doOpen(params);

  const doc = documents.get(params.textDocument.uri);
  if (doc) {
    const diagnostics = (await service.doValidate(doc)) || [];
    prevDiags.set(doc, diagnostics);
    connection.sendDiagnostics({
      uri: doc.uri,
      diagnostics,
    });
  }
});
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
      cancel,
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
      cancel,
    )) as DefinitionLink[]) || null
  );
});

connection.onReferences(async (params, cancel) => {
  return (
    (await service.findReferences(
      documents.get(params.textDocument.uri)!,
      params,
      cancel,
    )) || null
  );
});

connection.onDocumentLinks(async (params, cancel) => {
  return (
    (await service.findDocumentLinks(
      documents.get(params.textDocument.uri)!,
      params,
      cancel,
    )) || null
  );
});

connection.onDocumentSymbol(async (params, cancel) => {
  return (
    (await service.findDocumentSymbols(
      documents.get(params.textDocument.uri)!,
      params,
      cancel,
    )) || null
  );
});

connection.onDocumentHighlight(async (params, cancel) => {
  return (
    (await service.findDocumentHighlights(
      documents.get(params.textDocument.uri)!,
      params,
      cancel,
    )) || null
  );
});

connection.onDocumentColor(async (params, cancel) => {
  return (
    (await service.findDocumentColors(
      documents.get(params.textDocument.uri)!,
      params,
      cancel,
    )) || []
  );
});

connection.onColorPresentation(async (params, cancel) => {
  return (
    (await service.getColorPresentations(
      documents.get(params.textDocument.uri)!,
      params,
      cancel,
    )) || []
  );
});

connection.onHover(async (params, cancel) => {
  return (
    (await service.doHover(
      documents.get(params.textDocument.uri)!,
      params,
      cancel,
    )) || null
  );
});

connection.onPrepareRename(async (params, cancel) => {
  return (
    (await service.prepareRename(
      documents.get(params.textDocument.uri)!,
      params,
      cancel,
    )) || null
  );
});

connection.onRenameRequest(async (params, cancel) => {
  return (
    (await service.doRename(
      documents.get(params.textDocument.uri)!,
      params,
      cancel,
    )) || null
  );
});

connection.onCodeAction(async (params, cancel) => {
  return (
    (await service.doCodeActions(
      documents.get(params.textDocument.uri)!,
      params,
      cancel,
    )) || null
  );
});

connection.onCodeActionResolve(async (action, cancel) => {
  return (await service.doCodeActionResolve(action, cancel)) || action;
});

connection.onDocumentFormatting(async (params, cancel) => {
  return (
    (await service.format(
      documents.get(params.textDocument.uri)!,
      params,
      cancel,
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
      }),
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
