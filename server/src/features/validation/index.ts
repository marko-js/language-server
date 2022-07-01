import {
  type Connection,
  type TextDocuments,
  Diagnostic,
  Range,
  DiagnosticSeverity,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { isDeepStrictEqual } from "util";
import { URI } from "vscode-uri";
import { getCompilerInfo } from "../../utils/compiler";

const prevDiagnostics = new WeakMap<TextDocument, Diagnostic[]>();
const diagnosticTimeouts = new WeakMap<
  TextDocument,
  ReturnType<typeof setTimeout>
>();

const markoErrorRegExp = /^(.+?)(?:\((\d+)(?:\s*,\s*(\d+))?\))?: (.*)$/gm;

export default function setup(
  connection: Connection,
  documents: TextDocuments<TextDocument>
) {
  connection.onInitialized(() => {
    documents.all().forEach((doc) => queueValidation(doc));
  });

  documents.onDidChangeContent((change) => {
    queueValidation(change.document);
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
    const diagnostics: Diagnostic[] = [];

    if (scheme !== "file") {
      return diagnostics;
    }

    const { compiler, translator, cache, lookup } = getCompilerInfo(doc);

    if (!lookup) {
      return diagnostics;
    }

    try {
      compiler.compileSync(doc.getText(), fsPath, {
        cache,
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
}
