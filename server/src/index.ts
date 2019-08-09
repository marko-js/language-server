import {
  createConnection,
  TextDocuments,
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
const DEBUG = process.env.DEBUG === "true";

console.log = connection.console.log.bind(connection.console);
console.error = connection.console.error.bind(connection.console);

// Create a simple text document manager. The text document manager
// supports full document sync only
const documents: TextDocuments = new TextDocuments();

// let hasConfigurationCapability: boolean = false;
// let hasWorkspaceFolderCapability: boolean = false;
// let hasDiagnosticRelatedInformationCapability: boolean = false;

// After the server has started the client sends an initialize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilities.
let workspaceRoot: string;
connection.onInitialize((params: InitializeParams) => {
  workspaceRoot = params.rootPath as string;

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
      documentFormattingProvider: true,
      definitionProvider: true,
      completionProvider: {
        resolveProvider: true,
        triggerCharacters: [".", ":", "<", '"', "'", "/", "@", "*"]
      }
    }
  };
});

connection.onDidChangeWatchedFiles(_change => {
  // Monitored files have change in VSCode
  if (DEBUG) {
    console.log("We received an file change event");
  }
});
// This handler provides the initial list of the completion items.
// connection.onCompletion(async (completionParams: TextDocumentPositionParams): CompletionItem[] => {
// });

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
