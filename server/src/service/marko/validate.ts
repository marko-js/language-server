import { Diagnostic, DiagnosticSeverity, Range } from "vscode-languageserver";
import { getCompilerInfo } from "../../utils/compiler";
import { getDocFile } from "../../utils/doc-file";
import type { Plugin } from "../types";

const markoErrorRegExp = /^(.+?)(?:\((\d+)(?:\s*,\s*(\d+))?\))?: (.*)$/gm;

export const doValidate: Plugin["doValidate"] = (doc) => {
  const fsPath = getDocFile(doc);
  const diagnostics: Diagnostic[] = [];

  const { compiler, translator, cache } = getCompilerInfo(doc);

  try {
    compiler.compileSync(doc.getText(), fsPath || "untitled.marko", {
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
};
