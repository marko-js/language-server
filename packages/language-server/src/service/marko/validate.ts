import path from "path";
import { Project } from "@marko/language-tools";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { DiagnosticType } from "@marko/babel-utils";
import { getFSPath } from "../../utils/file";
import type { Plugin } from "../types";

const markoErrorRegExp =
  /^(.+?)\.marko(?:\((\d+)(?:\s*,\s*(\d+))?\))?: (.*)$/gm;

export const doValidate: Plugin["doValidate"] = (doc) => {
  const filename = getFSPath(doc);
  const diagnostics: Diagnostic[] = [];

  try {
    const { meta } = Project.getCompiler(
      filename && path.dirname(filename)
    ).compileSync(doc.getText(), filename || "untitled.marko", {
      code: false,
      output: "migrate",
      sourceMaps: false,
      errorRecovery: true,
      babelConfig: {
        caller: {
          name: "@marko/language-server",
          supportsStaticESM: true,
          supportsDynamicImport: true,
          supportsTopLevelAwait: true,
          supportsExportNamespaceFrom: true,
        },
      },
    });

    if (meta.diagnostics) {
      for (const diag of meta.diagnostics) {
        const range = diag.loc
          ? {
              start: {
                line: diag.loc.start.line - 1,
                character: diag.loc.start.column,
              },
              end: {
                line: diag.loc.end.line - 1,
                character: diag.loc.end.column,
              },
            }
          : {
              start: { line: 0, character: 0 },
              end: { line: 0, character: 0 },
            };

        let severity: DiagnosticSeverity | undefined;

        switch (diag.type) {
          case DiagnosticType.Warning:
          case DiagnosticType.Deprecation:
            severity = DiagnosticSeverity.Warning;
            break;
          case DiagnosticType.Suggestion:
            severity = DiagnosticSeverity.Hint;
            break;
          default:
            severity = DiagnosticSeverity.Error;
            break;
        }

        diagnostics.push({
          range,
          source: "marko",
          code: undefined,
          tags: undefined,
          severity,
          message: diag.label,
        });
      }
    }
  } catch (err) {
    addDiagnosticsForError(err, diagnostics);
  }

  return diagnostics;
};

function addDiagnosticsForError(err: unknown, diagnostics: Diagnostic[]) {
  if (!isError(err)) {
    diagnostics.push({
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 0 },
      },
      source: "marko",
      code: undefined,
      tags: undefined,
      severity: DiagnosticSeverity.Error,
      message: String(err),
    });
  } else if (isAggregateError(err)) {
    for (const nestedError of err.errors) {
      addDiagnosticsForError(nestedError, diagnostics);
    }
  } else if (isErrorWithLoc(err)) {
    const message = err.label || err.message || err.stack;
    if (!message) return;
    const { loc } = err;

    diagnostics.push({
      range: {
        start: {
          line: loc.start.line - 1,
          character: loc.start.column,
        },
        end: {
          line: loc.end.line - 1,
          character: loc.end.column,
        },
      },
      source: "marko",
      code: undefined,
      tags: undefined,
      severity: DiagnosticSeverity.Error,
      message,
    });
  } else {
    let match: RegExpExecArray | null;
    while ((match = markoErrorRegExp.exec((err as Error).message))) {
      const [, , rawLine, rawCol, message] = match;
      const pos = {
        line: (parseInt(rawLine, 10) || 1) - 1,
        character: (parseInt(rawCol, 10) || 1) - 1,
      };
      diagnostics.push({
        range: { start: pos, end: pos },
        source: "marko",
        code: undefined,
        tags: undefined,
        severity: DiagnosticSeverity.Error,
        message,
      });
    }
  }
}

function isError(err: unknown): err is Error {
  return (
    err != null &&
    typeof err === "object" &&
    typeof (err as { message: unknown }).message === "string"
  );
}

function isAggregateError(err: unknown): err is AggregateError {
  return Array.isArray((err as { errors: unknown })?.errors);
}

function isErrorWithLoc(err: unknown): err is Error & {
  label?: string;
  loc: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
} {
  const loc = (err as undefined | { loc: unknown })?.loc;
  if (typeof loc !== "object") return false;
  return (
    loc !== null &&
    typeof loc === "object" &&
    typeof (loc as { start: unknown }).start === "object" &&
    typeof (loc as { end: unknown }).end === "object" &&
    typeof (loc as { start: { line: unknown } }).start.line === "number" &&
    typeof (loc as { start: { column: unknown } }).start.column === "number" &&
    typeof (loc as { end: { line: unknown } }).end.line === "number" &&
    typeof (loc as { end: { column: unknown } }).end.column === "number"
  );
}
