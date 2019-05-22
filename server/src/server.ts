/* --------------------------------------------------------------------------------------------
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.

Modifications Copyright 2018 eBay Inc.
Author/Developer: Diego Berrocal

Use of this source code is governed by an MIT-style
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
* ------------------------------------------------------------------------------------------ */

import {
  createConnection,
  TextDocuments,
  TextDocument,
  Diagnostic,
  InitializeParams,
  ProposedFeatures
} from "vscode-languageserver";

import { MLS } from "./service";

let mls: MLS;

// Create a connection for the server
// Also include all preview / proposed LSP features.
const connection =
  process.argv.length <= 2
    ? createConnection(process.stdin, process.stdout) // no arg specified
    : createConnection(ProposedFeatures.all);
const DEBUG = process.env.DEBUG === 'true' || false;

console.log = connection.console.log.bind(connection.console);
console.error = connection.console.error.bind(connection.console);

// Create a simple text document manager. The text document manager
// supports full document sync only
let documents: TextDocuments = new TextDocuments();

// let hasConfigurationCapability: boolean = false;
// let hasWorkspaceFolderCapability: boolean = false;
// let hasDiagnosticRelatedInformationCapability: boolean = false;

// After the server has started the client sends an initilize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilites.
let workspaceRoot: string;
connection.onInitialize((params: InitializeParams) => {
  workspaceRoot = params.rootPath;

  // let capabilities = params.capabilities;
  // // Does the client support the `workspace/configuration` request?
  // // If not, we will fall back using global settings
  // hasConfigurationCapability = !!(
  //   capabilities.workspace && !!capabilities.workspace.configuration
  // );
  // hasWorkspaceFolderCapability = !!(
  //   capabilities.workspace && !!capabilities.workspace.workspaceFolders
  // );
  // hasDiagnosticRelatedInformationCapability = !!(
  //   capabilities.textDocument &&
  //   capabilities.textDocument.publishDiagnostics &&
  //   capabilities.textDocument.publishDiagnostics.relatedInformation
  // );

  mls = new MLS(workspaceRoot, connection);
  mls.initialize(workspaceRoot, documents);

  return {
    capabilities: {
      // Tell the client that the server works in FULL text document sync mode
      textDocumentSync: documents.syncKind,
      // Tell the client that we have reference provider as well
      documentFormattingProvider : true,
      definitionProvider: true,
      completionProvider: {
        resolveProvider: true,
        triggerCharacters: [".", ":", "<", '"', "'", "/", "@", "*"]
      }
    }
  };
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
  validateTextDocument(change.document);
});

// The settings have changed. Is send on server activation
// as well.
connection.onDidChangeConfiguration(() => {
  // Revalidate any open text documents
  documents.all().forEach(validateTextDocument);
});

function validateTextDocument(textDocument: TextDocument): void {
  let diagnostics: Diagnostic[] = [];
  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

connection.onDidChangeWatchedFiles(_change => {
  // Monitored files have change in VSCode
  DEBUG && connection.console.log("We recevied an file change event");
});
// This handler provides the initial list of the completion items.
// connection.onCompletion(async (completionParams: TextDocumentPositionParams): CompletionItem[] => {
// });

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
