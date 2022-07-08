import { URI } from "vscode-uri";
import { Diagnostic, DiagnosticSeverity, Range } from "vscode-languageserver";
import { getCompilerInfo } from "../../utils/compiler";
import type { Plugin } from "../types";

const markoErrorRegExp = /^(.+?)(?:\((\d+)(?:\s*,\s*(\d+))?\))?: (.*)$/gm;

export const doValidate: Plugin["doValidate"] = (doc) => {
  const { fsPath, scheme } = URI.parse(doc.uri);
  const diagnostics: Diagnostic[] = [];

  if (scheme === "file") {
    const { compiler, translator, cache, lookup } = getCompilerInfo(doc);

    if (lookup) {
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
    }
  }

  return diagnostics;
};
