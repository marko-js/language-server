import {
  createConnection,
  ProposedFeatures,
  Range,
  Position,
  CompletionList,
  CompletionParams,
  Diagnostic,
  DiagnosticSeverity,
  DocumentFormattingParams,
  TextDocuments,
  TextEdit,
  TextDocumentSyncKind,
  Definition,
  DefinitionLink,
} from "vscode-languageserver/node";
import { URI } from "vscode-uri";
import { TextDocument } from "vscode-languageserver-textdocument";
import * as prettier from "prettier";
import * as markoPrettier from "prettier-plugin-marko";
import { inspect, isDeepStrictEqual } from "util";
import {
  getTagLibLookup,
  getCompilerAndTranslatorForDoc,
  Compiler,
} from "./utils/compiler";
import { NodeType, Node, parse } from "./utils/parser";
import * as completionTypes from "./utils/completions";
import * as definitionTypes from "./utils/definitions";
import type { CompletionMeta } from "./utils/completions/meta";

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
        triggerCharacters: [".", ":", "<", ">", "@", "/"],
      },
    },
  };
});

connection.onInitialized(() => {
  documents.all().forEach((doc) => queueValidation(doc));
});

connection.onCompletion((params: CompletionParams): CompletionList => {
  try {
    const document = documents.get(params.textDocument.uri)!;
    const lookup = getTagLibLookup(document);
    if (!lookup) return CompletionList.create([], true);

    const code = document.getText();
    const parsed = parse(code);
    const offset = document.offsetAt(params.position);
    const node = parsed.nodeAt(offset);
    const handler = completionTypes[
      NodeType[node.type] as unknown as keyof typeof completionTypes
    ] as unknown as
      | undefined
      | ((data: CompletionMeta<Node.AnyNode>) => CompletionList | void);
    return (
      handler?.({
        document,
        params,
        lookup,
        parsed,
        offset,
        code,
        node,
      }) || CompletionList.create([], true)
    );
  } catch (e) {
    console.log(e);
    return CompletionList.create([], true);
  }
});

connection.onDefinition((params) => {
  const document = documents.get(params.textDocument.uri)!;
  const lookup = getTagLibLookup(document);
  if (!lookup) return [];
  const code = document.getText();
  const parsed = parse(code);
  const offset = document.offsetAt(params.position);
  const node = parsed.nodeAt(offset);
  const handler = definitionTypes[
    NodeType[node.type] as unknown as keyof typeof definitionTypes
  ] as unknown as
    | undefined
    | ((
        data: CompletionMeta<Node.AnyNode>
      ) => Definition | DefinitionLink[] | undefined | null);
  return (
    handler?.({
      document,
      params,
      lookup,
      parsed,
      offset,
      code,
      node,
    }) || []
  );
});

connection.onDocumentFormatting(
  async ({
    textDocument,
    options,
  }: DocumentFormattingParams): Promise<TextEdit[]> => {
    try {
      const doc = documents.get(textDocument.uri)!;
      const { fsPath, scheme } = URI.parse(textDocument.uri);
      const text = doc.getText();
      const formatted = prettier.format(text, {
        parser: "marko",
        filepath: fsPath,
        plugins: [markoPrettier],
        tabWidth: options.tabSize,
        useTabs: options.insertSpaces === false,
        ...(scheme === "file"
          ? await prettier
              .resolveConfig(fsPath, {
                editorconfig: true,
              })
              .catch(() => null)
          : null),
      });

      return [
        TextEdit.replace(
          Range.create(doc.positionAt(0), doc.positionAt(text.length)),
          formatted
        ),
      ];
    } catch (e) {
      displayMessage("Error", inspect(e, { colors: false }));
    }

    return [
      TextEdit.replace(
        Range.create(Position.create(0, 0), Position.create(0, 0)),
        ""
      ),
    ];
  }
);

connection.onDidChangeWatchedFiles(() => {
  const clearedCompilers = new Set<Compiler>();
  for (const doc of documents.all()) {
    const { compiler } = getCompilerAndTranslatorForDoc(doc);

    if (!clearedCompilers.has(compiler)) {
      clearCaches(compiler);
      clearedCompilers.add(compiler);
    }
  }
});

documents.onDidChangeContent((change) => {
  queueValidation(change.document);

  if (change.document.version > 1) {
    clearCaches(getCompilerAndTranslatorForDoc(change.document).compiler);
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

  const { compiler, translator } = getCompilerAndTranslatorForDoc(doc);
  const diagnostics: Diagnostic[] = [];

  try {
    compiler.compileSync(doc.getText(), fsPath, {
      cache: getCacheForCompiler(compiler),
      output: "source",
      code: false,
      translator,
    });
  } catch (e) {
    let match: RegExpExecArray | null;
    while ((match = markoErrorRegExp.exec((e as Error).message))) {
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
    cacheForCompiler.set(compiler, (cache = new Map()));
  }
  return cache;
}

function displayMessage(
  type: "Information" | "Warning" | "Error",
  msg: string
) {
  setImmediate(() => {
    connection.sendNotification(`show${type}`, msg);
  });
}

documents.listen(connection);
connection.listen();
