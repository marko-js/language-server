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
import { isDeepStrictEqual } from "util";
import { getTagLibLookup, getCompilerForDoc, Compiler } from "./utils/compiler";
import { parseUntilOffset } from "./utils/htmljs-parser";
import * as completionTypes from "./utils/completions";
import * as definitionTypes from "./utils/definitions";

if (
  typeof require !== "undefined" &&
  require.extensions &&
  !(".ts" in require.extensions)
) {
  // Prevent compiler hooks written in typescript to explode the language server.
  require.extensions[".ts"] = undefined;
}

const cacheForCompiler = new WeakMap<Compiler, Map<unknown, unknown>>();
const connection = createConnection(ProposedFeatures.all);
const prevDiagnostics = new WeakMap<TextDocument, Diagnostic[]>();
const diagnosticTimeouts = new WeakMap<
  TextDocument,
  ReturnType<typeof setTimeout>
>();
const documents = new TextDocuments(TextDocument);
const markoErrorRegExp = /^(.+?)(?:\((\d+)(?:\s*,\s*(\d+))?\))?: (.*)$/gm;

console.log = (...args: unknown[]) => {
  connection.console.log(args.join(" "));
};
console.error = (...args: unknown[]) => {
  connection.console.error(args.map(arg => (arg as Error).stack || arg).join("\n"));
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
    if (!taglib) return CompletionList.create([], true);

    const event = parseUntilOffset({
      taglib,
      offset: doc.offsetAt(params.position),
      text: doc.getText(),
    });

    const handler = event && completionTypes[event.type];
    return (
      (handler && handler(taglib, doc, params, event)) ||
      CompletionList.create([], true)
    );
  }
);

connection.onDefinition((params) => {
  const doc = documents.get(params.textDocument.uri)!;
  const taglib = getTagLibLookup(doc);
  if (!taglib) return;

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
      const formatted = prettyPrint(text, {
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

connection.onDidChangeWatchedFiles(() => {
  const clearedCompilers = new Set<Compiler>();
  for (const doc of documents.all()) {
    const compiler = getCompilerForDoc(doc);

    if (!clearedCompilers.has(compiler)) {
      clearCaches(compiler);
      clearedCompilers.add(compiler);
    }
  }
});

documents.onDidChangeContent((change) => {
  queueValidation(change.document);

  if (change.document.version > 1) {
    clearCaches(getCompilerForDoc(change.document));
  }
});

function queueValidation(doc: TextDocument) {
  clearTimeout(diagnosticTimeouts.get(doc)!);
  diagnosticTimeouts.set(
    doc,
    setTimeout(() => {
      const prevDiag = prevDiagnostics.get(doc);
      const nextDiag = doValidate(doc);

      if (prevDiag && isDeepStrictEqual(prevDiag, nextDiag)) {
        return;
      }

      prevDiagnostics.set(doc, nextDiag);
      connection.sendDiagnostics({
        uri: doc.uri,
        diagnostics: nextDiag,
      });
    }, 800)
  );
}

function doValidate(doc: TextDocument): Diagnostic[] {
  const { fsPath, scheme } = URI.parse(doc.uri);

  if (scheme !== "file") {
    return [];
  }

  const compiler = getCompilerForDoc(doc);
  const diagnostics: Diagnostic[] = [];

  try {
    compiler.compileSync(doc.getText(), fsPath, {
      cache: getCacheForCompiler(compiler),
      output: "source",
      code: false,
    });
  } catch (e) {
    let match: RegExpExecArray | null;
    while ((match = markoErrorRegExp.exec(e.message))) {
      const [, fileName, rawLine, rawCol, msg] = match;
      const line = (parseInt(rawLine, 10) || 1) - 1;
      const col = (parseInt(rawCol, 10) || 1) - 1;
      diagnostics.push(
        Diagnostic.create(
          Range.create(line, col, line, col),
          msg,
          DiagnosticSeverity.Error,
          undefined,
          fileName
        )
      );
    }
  }

  return diagnostics;
}

function clearCaches(compiler: Compiler) {
  cacheForCompiler.get(compiler)?.clear();
  compiler.taglib.clearCaches();
}

function getCacheForCompiler(compiler: Compiler) {
  let cache = cacheForCompiler.get(compiler);
  if (!cache) {
    cacheForCompiler.set(compiler, cache = new Map());
  }
  return cache;
}

function displayMessage(type: "info" | "warning" | "error", msg: string) {
  connection.sendNotification(
    `$/display${type[0].toUpperCase() + type.slice(1)}`,
    msg
  );
}

documents.listen(connection);
connection.listen();
