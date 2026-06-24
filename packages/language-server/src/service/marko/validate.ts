import type { Config } from "@marko/compiler";
import {
  type Diagnostic as CompilerDiagnostic,
  DiagnosticType,
} from "@marko/compiler/babel-utils";
import { Project } from "@marko/language-tools";
import path from "path";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";

import { getFSPath } from "../../utils/file";
import type { Plugin } from "../types";

/**
 * The result of compiling a document for diagnostics: either the compiler's
 * diagnostics or the error thrown while trying to compile it.
 */
export type MarkoDiagnosticsResult =
  | { diagnostics: CompilerDiagnostic[]; error?: undefined }
  | { diagnostics?: undefined; error: unknown };

/**
 * Caches the compiler diagnostics per document version so that `doValidate` and
 * the code action provider can share a single compile instead of compiling the
 * same document twice.
 */
const diagnosticsCache = new WeakMap<
  TextDocument,
  { version: number; result: MarkoDiagnosticsResult }
>();

const markoErrorRegExp =
  /^(.+?)\.marko(?:\((\d+)(?:\s*,\s*(\d+))?\))?: (.*)$/gm;

/**
 * Shared compiler config used to surface diagnostics. Runs through the
 * `migrate` output (the latest stage diagnostic fixes can be registered in)
 * with error recovery so that all recoverable diagnostics are returned on
 * `meta.diagnostics` instead of being thrown. The code action provider reuses
 * this same config so the diagnostics (and their indices) line up exactly with
 * what is reported here.
 */
export const compilerConfig: Config = {
  code: false,
  output: "migrate",
  sourceMaps: false,
  errorRecovery: true,
  babelConfig: {
    babelrc: false,
    configFile: false,
    browserslistConfigFile: false,
    caller: {
      name: "@marko/language-server",
      supportsStaticESM: true,
      supportsDynamicImport: true,
      supportsTopLevelAwait: true,
      supportsExportNamespaceFrom: true,
    },
  },
};

/**
 * Compiles the document for diagnostics, caching the result per document
 * version. Both `doValidate` and the code action provider call this so the
 * document is only compiled once per change.
 */
export function getMarkoDiagnostics(doc: TextDocument): MarkoDiagnosticsResult {
  const cached = diagnosticsCache.get(doc);
  if (cached && cached.version === doc.version) return cached.result;

  const filename = getFSPath(doc);
  let result: MarkoDiagnosticsResult;
  try {
    const { meta } = Project.getCompiler(
      filename && path.dirname(filename),
    ).compileSync(doc.getText(), filename || "untitled.marko", compilerConfig);
    result = { diagnostics: meta.diagnostics };
  } catch (error) {
    result = { error };
  }

  diagnosticsCache.set(doc, { version: doc.version, result });
  return result;
}

export const doValidate: Plugin["doValidate"] = (doc) => {
  const diagnostics: Diagnostic[] = [];
  const result = getMarkoDiagnostics(doc);

  if (result.diagnostics) {
    for (const diag of result.diagnostics) {
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
  } else {
    addDiagnosticsForError(result.error, diagnostics);
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
