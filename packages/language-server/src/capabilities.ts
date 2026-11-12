import {
  type ServerCapabilities,
  TextDocumentSyncKind,
} from "vscode-languageserver";

import { markoCodeActionKinds } from "./service/marko/code-actions";

export function getCapabilities(): ServerCapabilities {
  return {
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
  };
}
