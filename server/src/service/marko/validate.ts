import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { getCompilerInfo } from "../../utils/compiler";
import { getDocFile } from "../../utils/doc-file";
import type { Plugin } from "../types";

const markoErrorRegExp =
  /^(.+?)\.marko(?:\((\d+)(?:\s*,\s*(\d+))?\))?: (.*)$/gm;

export const doValidate: Plugin["doValidate"] = (doc) => {
  const fsPath = getDocFile(doc);
  const diagnostics: Diagnostic[] = [];

  const { compiler, translator, cache } = getCompilerInfo(doc);

  try {
    compiler.compileSync(doc.getText(), fsPath || "untitled.marko", {
      cache,
      translator,
      code: false,
      output: "source",
      sourceMaps: false,
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
  } catch (e) {
    let match: RegExpExecArray | null;
    while ((match = markoErrorRegExp.exec((e as Error).message))) {
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

  return diagnostics;
};
