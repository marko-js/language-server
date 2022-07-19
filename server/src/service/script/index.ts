import path from "path";
import ts from "typescript";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getCompilerInfo, parse } from "../../utils/compiler";
import type { Plugin } from "../types";
import { extractScripts } from "./extract";
import { displayInformation } from "../../utils/messages";
import { inspect } from "util";
import {
  Diagnostic,
  DiagnosticSeverity,
  DiagnosticTag,
} from "vscode-languageserver";
import type { Location } from "htmljs-parser";
import { START_OF_FILE } from "../../utils/utils";
import { URI } from "vscode-uri";

interface ScriptInfo {
  virtualDoc: TextDocument;
  snapshot: ts.IScriptSnapshot;
  sourceOffsetAt(generatedOffset: number): number | undefined;
  sourceLocationAt(
    generatedOffsetStart: number,
    generatedOffsetEnd: number
  ): Location | undefined;
  generatedOffsetAt(sourceOffset: number): number | undefined;
}

const cache = new WeakMap<ReturnType<typeof parse>, ScriptInfo>();
const ScriptService: Partial<Plugin> = {
  async doValidate(doc) {
    const info = getScriptInfo(doc);
    const { fsPath } = URI.parse(info.virtualDoc.uri);
    const tsConfigPath = findTSConfigPath(fsPath);
    const basePath =
      (tsConfigPath && path.dirname(tsConfigPath)) || process.cwd();
    const tsProject = getTSProject(basePath, tsConfigPath);
    const tsPkgFile =
      tsConfigPath &&
      ts.resolveModuleName(
        "typescript/package.json",
        tsConfigPath,
        tsProject.options,
        ts.sys
      ).resolvedModule?.resolvedFileName;
    const defaultLibFile = path.join(
      tsPkgFile ? path.join(tsPkgFile, "../lib") : __dirname,
      ts.getDefaultLibFileName(tsProject.options)
    );
    const service = ts.createLanguageService({
      // resolveModuleNames: () => {}, // TODO
      readDirectory: ts.sys.readDirectory,
      getDefaultLibFileName() {
        return defaultLibFile;
      },
      readFile: (filename) => {
        if (filename === fsPath) {
          return info.virtualDoc.getText();
        } else {
          return ts.sys.readFile(removeVirtualFileExt(filename));
        }
      },
      fileExists: (filename) => {
        return (
          filename === fsPath ||
          ts.sys.fileExists(removeVirtualFileExt(filename))
        );
      },
      getScriptFileNames() {
        return [fsPath];
      },
      getScriptVersion() {
        return `${info.virtualDoc.version}`;
      },
      getScriptSnapshot(filename) {
        if (filename === fsPath) {
          return info.snapshot;
        } else {
          return ts.ScriptSnapshot.fromString(
            ts.sys.readFile(removeVirtualFileExt(filename)) || ""
          );
        }
      },

      getCompilationSettings() {
        return tsProject.options;
      },

      getCurrentDirectory() {
        return basePath;
      },
    });

    try {
      let results: Diagnostic[] | undefined;
      const tsDiags = [
        ...service.getSuggestionDiagnostics(fsPath),
        ...service.getSyntacticDiagnostics(fsPath),
        ...service.getSemanticDiagnostics(fsPath),
      ];
      for (const tsDiag of tsDiags) {
        const cur = getDiag(info, tsDiag);
        if (cur) {
          if (results) {
            results.push(cur);
          } else {
            results = [cur];
          }
        }
      }
      return results;
    } catch (err) {
      displayInformation(inspect(err));
    }
  },
};

function getScriptInfo(doc: TextDocument): ScriptInfo {
  const parsed = parse(doc);
  let cached = cache.get(parsed);

  if (!cached) {
    const { generated, sourceOffsetAt, generatedOffsetAt } = extractScripts(
      doc,
      parsed,
      getCompilerInfo(doc).lookup
    );

    const virtualDoc = TextDocument.create(
      addVirtualFileExt(doc.uri),
      "typescript",
      doc.version,
      generated
    );

    cache.set(
      parsed,
      (cached = {
        virtualDoc,
        sourceOffsetAt,
        generatedOffsetAt,
        sourceLocationAt(
          generatedStart: number,
          generatedEnd: number
        ): Location | undefined {
          const start = sourceOffsetAt(generatedStart);
          if (start === undefined) return;
          const end = sourceOffsetAt(generatedEnd);
          if (end === undefined) return;
          return parsed.locationAt({ start, end });
        },
        snapshot: ts.ScriptSnapshot.fromString(generated),
      })
    );
  }
  return cached;
}

function addVirtualFileExt(filename: string) {
  return `${filename}.ts`;
}

function removeVirtualFileExt(filename: string) {
  return filename.replace(/\.marko\.ts$/, ".marko");
}

function getDiag(
  info: ScriptInfo,
  tsDiag: ts.Diagnostic
): Diagnostic | undefined {
  const range =
    tsDiag.start === undefined
      ? START_OF_FILE
      : info.sourceLocationAt(tsDiag.start, tsDiag.start + tsDiag.length!);

  if (range) {
    return {
      range,
      source: "ts",
      code: tsDiag.code,
      tags: getDiagTags(tsDiag),
      severity: getDiagSeverity(tsDiag),
      message: ts.flattenDiagnosticMessageText(tsDiag.messageText, "\n"),
    };
  }
}

function getDiagSeverity(tsDiag: ts.Diagnostic) {
  switch (tsDiag.category) {
    case ts.DiagnosticCategory.Error:
      return DiagnosticSeverity.Error;
    case ts.DiagnosticCategory.Warning:
      return DiagnosticSeverity.Warning;
    case ts.DiagnosticCategory.Suggestion:
      return DiagnosticSeverity.Hint;
    default:
      return DiagnosticSeverity.Information;
  }
}

function getDiagTags(tsDiag: ts.Diagnostic) {
  let tags: DiagnosticTag[] | undefined;

  if (tsDiag.reportsDeprecated) {
    tags = [DiagnosticTag.Deprecated];
  }

  if (tsDiag.reportsUnnecessary) {
    if (tags) tags.push(DiagnosticTag.Unnecessary);
    else tags = [DiagnosticTag.Unnecessary];
  }

  return tags;
}

function findTSConfigPath(docFsPath: string | undefined): string | undefined {
  if (docFsPath) {
    return ts.findConfigFile(docFsPath, ts.sys.fileExists, "tsconfig.json");
  }
}

function getTSProject(
  basePath: string,
  tsConfigPath: string | undefined
): ts.ParsedCommandLine {
  const configData: ts.TsConfigSourceFile = (tsConfigPath &&
    ts.readConfigFile(tsConfigPath, ts.sys.readFile).config) || {
    compilerOptions: {
      lib: ["dom", "node", "esnext"],
    } as ts.CompilerOptions,
  };

  const project = ts.parseJsonConfigFileContent(
    configData,
    ts.sys,
    basePath,
    undefined,
    tsConfigPath,
    undefined,
    [
      {
        extension: ".marko",
        isMixedContent: true,
        scriptKind: ts.ScriptKind.Deferred,
      },
    ]
  );

  return {
    ...project,
    fileNames: project.fileNames.map(removeVirtualFileExt),
    options: {
      ...project.options,
      noEmit: true,
      allowJs: true,
      declaration: false,
      isolatedModules: true,
      resolveJsonModule: true,
      allowNonTsExtensions: true,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
    },
  };
}

export { ScriptService as default };
