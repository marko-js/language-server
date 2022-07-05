import {
  createConnection,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { inspect } from "util";
import setupCompiler from "./utils/compiler";
import setupMessages from "./features/messages";
import setupCompletions from "./features/completions";
import setupDefinitions from "./features/definitions";
import setupFormatting from "./features/formatting";
import setupValidation from "./features/validation";

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

console.log = (...args: unknown[]) => {
  connection.console.log(args.map((v) => inspect(v)).join(" "));
};
console.error = (...args: unknown[]) => {
  connection.console.error(args.map((v) => inspect(v)).join(" "));
};
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

connection.onInitialize(() => {
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

setupMessages(connection);
setupCompiler(connection, documents);
setupCompletions(connection, documents);
setupDefinitions(connection, documents);
setupFormatting(connection, documents);
setupValidation(connection, documents);

documents.listen(connection);
connection.listen();
