import path from "path";
import ts from "typescript";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { getCompilerInfo, parse } from "../../utils/compiler";
import type { Plugin } from "../types";
import { extractScripts } from "./extract";
import {
  CompletionItem,
  CompletionItemKind,
  Diagnostic,
  DiagnosticSeverity,
  DiagnosticTag,
} from "vscode-languageserver";
import type { Location } from "htmljs-parser";
import * as documents from "../../utils/text-documents";
import { START_OF_FILE } from "../../utils/utils";
import { URI } from "vscode-uri";
import { relativeImportPath } from "relative-import-path";

interface ProjectInfo {
  basePath: string;
  configPath: string | undefined;
  fileNames: string[];
  options: ts.CompilerOptions;
  service: ts.LanguageService;
  getVirtualFileName(doc: TextDocument): string | undefined;
}

interface ScriptInfo {
  generated: string;
  sourceOffsetAt(generatedOffset: number): number | undefined;
  sourceLocationAt(
    generatedOffsetStart: number,
    generatedOffsetEnd: number
  ): Location | undefined;
  generatedOffsetAt(sourceOffset: number): number | undefined;
}

const projectsCacheKey = Symbol();
const parseCache = new WeakMap<ReturnType<typeof parse>, ScriptInfo>();
const snapshotCache = new WeakMap<TextDocument, ts.IScriptSnapshot>();
const snapshotVersions = new WeakMap<ts.IScriptSnapshot, number>();
const markoFileReg = /\.marko$/;
const modulePartsReg = /^((?:@([^/]+).)?(?:[^/]+))(.*)/;
const tsTriggerChars = new Set([".", '"', "'", "`", "/", "@", "<", "#", " "]);

const ScriptService: Partial<Plugin> = {
  doComplete(doc, params) {
    const info = getScriptInfo(doc);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffset = info.generatedOffsetAt(sourceOffset);
    if (generatedOffset === undefined) return;

    const { fsPath, scheme } = URI.parse(doc.uri);
    if (scheme !== "file") return;

    const { service, getVirtualFileName } = getTSProject(fsPath);
    const completions = service.getCompletionsAtPosition(
      getVirtualFileName(doc)!,
      generatedOffset,
      {
        triggerCharacter: getTSTriggerChar(params.context?.triggerCharacter),
        includeCompletionsWithInsertText: true,
        includeCompletionsForModuleExports: true,
        // TODO: the rest must be derived from vscode config
      }
    );
    if (!completions || completions.entries.length === 0) return;

    const result: CompletionItem[] = [];

    for (const completion of completions.entries) {
      const { replacementSpan, insertText } = completion;
      let { name: label } = completion;
      let textEdit: CompletionItem["textEdit"];
      let detail: CompletionItem["detail"];

      if (completion.source && completion.hasAction) {
        // TODO: test this
        // TODO: should shorten replacement when importing a Marko file that can be discovered through taglib.
        label = relativeImportPath(fsPath, completion.source);
        detail = completion.source;
      }

      if (completion.sourceDisplay) {
        // TODO: test this
        detail = ts.displayPartsToString(completion.sourceDisplay);
      }

      if (completion.labelDetails) {
        // TODO: test this
        detail = completion.labelDetails.detail;
      }

      if (completion.kindModifiers) {
        // TODO
      }

      if (replacementSpan) {
        const range = info.sourceLocationAt(
          replacementSpan.start,
          replacementSpan.start + replacementSpan.length
        );

        if (range) {
          textEdit = {
            range,
            newText: insertText || label,
          };
        } else {
          continue;
        }
      }

      result.push({
        detail,
        filterText: insertText,
        insertText,
        kind: convertCompletionItemKind(completion.kind),
        label,
        preselect: completion.isRecommended,
        sortText: completion.sortText,
        textEdit,
      });
    }

    return {
      isIncomplete: true,
      items: result,
    };
  },
  doHover(doc, params) {
    const info = getScriptInfo(doc);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffset = info.generatedOffsetAt(sourceOffset);
    if (generatedOffset === undefined) return;

    const { fsPath, scheme } = URI.parse(doc.uri);
    if (scheme !== "file") return;

    const { service, getVirtualFileName } = getTSProject(fsPath);
    const quickInfo = service.getQuickInfoAtPosition(
      getVirtualFileName(doc)!,
      generatedOffset
    );
    if (!quickInfo) return;
    const { textSpan } = quickInfo;
    const range = info.sourceLocationAt(
      textSpan.start,
      textSpan.start + textSpan.length
    );

    if (!range) return;

    let contents = "";

    const displayParts = ts.displayPartsToString(quickInfo.displayParts);
    if (displayParts) {
      contents += `\`\`\`typescript\n${displayParts}\n\`\`\``;
    }

    const documentation = printDocumentation(
      quickInfo.documentation,
      quickInfo.tags
    );
    if (documentation) {
      contents += `\n---\n${documentation}`;
    }

    return {
      range,
      contents,
    };
  },
  doValidate(doc) {
    const info = getScriptInfo(doc);
    const { fsPath, scheme } = URI.parse(doc.uri);
    if (scheme !== "file") return;

    const { service, getVirtualFileName } = getTSProject(fsPath);
    const virtualFsPath = getVirtualFileName(doc)!;

    let results: Diagnostic[] | undefined;
    for (const tsDiag of service.getSuggestionDiagnostics(virtualFsPath)) {
      addDiag(tsDiag);
    }

    for (const tsDiag of service.getSyntacticDiagnostics(virtualFsPath)) {
      addDiag(tsDiag);
    }

    for (const tsDiag of service.getSemanticDiagnostics(virtualFsPath)) {
      addDiag(tsDiag);
    }

    return results;

    function addDiag(tsDiag: ts.Diagnostic) {
      const diag = convertDiag(info, tsDiag);
      if (diag) {
        if (results) {
          results.push(diag);
        } else {
          results = [diag];
        }
      }
    }
  },
};

function getScriptInfo(doc: TextDocument): ScriptInfo {
  const parsed = parse(doc);
  let cached = parseCache.get(parsed);

  if (!cached) {
    const { generated, sourceOffsetAt, generatedOffsetAt } = extractScripts(
      doc,
      parsed,
      getCompilerInfo(doc).lookup
    );

    parseCache.set(
      parsed,
      (cached = {
        generated,
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
      })
    );
  }
  return cached;
}

function getTSProject(docFsPath: string): ProjectInfo {
  let configPath: string | undefined;
  let virtualExt = ts.Extension.Js;

  if (docFsPath) {
    configPath = ts.findConfigFile(
      docFsPath,
      ts.sys.fileExists,
      "tsconfig.json"
    );

    if (configPath) {
      virtualExt = ts.Extension.Ts;
    } else {
      configPath = ts.findConfigFile(
        docFsPath,
        ts.sys.fileExists,
        "jsconfig.json"
      );
    }
  }

  const basePath = (configPath && path.dirname(configPath)) || process.cwd();
  const compilerInfo = getCompilerInfo(basePath);
  let projectCache = compilerInfo.cache.get(projectsCacheKey) as
    | Map<string, ProjectInfo>
    | undefined;
  let cached: ProjectInfo | undefined;

  // The typescript project and it's language service is
  // cached with the Marko compiler cache.
  // This causes the cache to be properly cleared when files change.
  if (projectCache) {
    cached = projectCache.get(basePath);
    if (cached) return cached;
  } else {
    // Within the compiler cache we store a map
    // of project paths to project info.
    projectCache = new Map();
    compilerInfo.cache.set(projectsCacheKey, projectCache);
  }

  const { fileNames, options } = ts.parseJsonConfigFileContent(
    (configPath && ts.readConfigFile(configPath, ts.sys.readFile).config) || {
      compilerOptions: { lib: ["dom", "node", "esnext"] },
    },
    ts.sys,
    basePath,
    undefined,
    configPath,
    undefined,
    [
      {
        extension: ".marko",
        isMixedContent: true,
        scriptKind: ts.ScriptKind.Deferred,
      },
    ]
  );

  options.module = ts.ModuleKind.ESNext;
  options.moduleResolution = ts.ModuleResolutionKind.NodeJs;
  options.noEmit =
    options.allowJs =
    options.declaration =
    options.isolatedModules =
    options.resolveJsonModule =
    options.allowNonTsExtensions =
      true;

  const tsPkgFile =
    configPath &&
    ts.resolveModuleName("typescript/package.json", configPath, options, ts.sys)
      .resolvedModule?.resolvedFileName;
  const defaultLibFile = path.join(
    tsPkgFile ? path.join(tsPkgFile, "../lib") : __dirname,
    ts.getDefaultLibFileName(options)
  );

  const project: ProjectInfo = {
    basePath,
    configPath,
    fileNames,
    options,
    getVirtualFileName(doc) {
      const { scheme, fsPath } = URI.parse(doc.uri);
      if (scheme === "file") return addVirtualExt(fsPath);
    },
    service: ts.createLanguageService({
      resolveModuleNames(moduleNames, containingFile) {
        return moduleNames.map<ts.ResolvedModule | undefined>((moduleName) => {
          if (markoFileReg.test(moduleName)) {
            if (moduleName[0] === ".") {
              return {
                resolvedFileName: path.join(
                  containingFile,
                  "..",
                  addVirtualExt(moduleName)
                ),
                extension: ts.Extension.Ts,
                isExternalLibraryImport: true,
              };
            } else if (path.isAbsolute(moduleName)) {
              return {
                resolvedFileName: addVirtualExt(moduleName),
                extension: ts.Extension.Ts,
                isExternalLibraryImport: true,
              };
            } else {
              const [, nodeModuleName, relativeModulePath] =
                modulePartsReg.exec(moduleName)!;
              const { resolvedModule } = ts.resolveModuleName(
                `${nodeModuleName}/package.json`,
                containingFile,
                options,
                ts.sys
              );

              if (resolvedModule) {
                return {
                  resolvedFileName: path.join(
                    resolvedModule.resolvedFileName,
                    "..",
                    addVirtualExt(relativeModulePath)
                  ),
                  extension: ts.Extension.Ts,
                  isExternalLibraryImport: true,
                };
              }

              return;
            }
          }

          return ts.resolveModuleName(
            moduleName,
            containingFile,
            options,
            ts.sys
          ).resolvedModule;
        });
      },
      readDirectory: ts.sys.readDirectory,
      getDefaultLibFileName() {
        return defaultLibFile;
      },
      readFile: (filename) => {
        const doc = documents.get(virtualFileToURI(filename));
        if (doc) {
          return markoFileReg.test(filename)
            ? getScriptInfo(doc).generated
            : doc.getText();
        } else {
          return ts.sys.readFile(filename) || "";
        }
      },
      fileExists: (filename) => {
        return documents.get(virtualFileToURI(filename)) !== undefined;
      },
      getScriptFileNames() {
        const result = new Set<string>(fileNames);
        for (const doc of documents.getAllOpen()) {
          const { scheme, fsPath } = URI.parse(doc.uri);
          if (scheme === "file") result.add(fsPath);
        }
        return Array.from(result, (fileName) =>
          markoFileReg.test(fileName) ? addVirtualExt(fileName) : fileName
        );
      },
      getScriptVersion(filename) {
        return `${documents.get(virtualFileToURI(filename))?.version ?? -1}`;
      },
      getScriptSnapshot(filename) {
        const doc = documents.get(virtualFileToURI(filename));
        if (!doc) return;

        let snapshot = snapshotCache.get(doc);
        if (!snapshot || snapshotVersions.get(snapshot) !== doc.version) {
          snapshot = ts.ScriptSnapshot.fromString(
            markoFileReg.test(doc.uri)
              ? getScriptInfo(doc).generated
              : doc.getText()
          );

          snapshotVersions.set(snapshot, doc.version);
          snapshotCache.set(doc, snapshot);
        }

        return snapshot;
      },

      getCompilationSettings() {
        return options;
      },

      getCurrentDirectory() {
        return basePath;
      },
    }),
  };

  projectCache.set(basePath, project);
  return project;

  function addVirtualExt(filename: string) {
    return filename + virtualExt;
  }

  function removeVirtualFileExt(filename: string) {
    return filename.replace(/\.marko\.[jt]s$/, ".marko");
  }

  function virtualFileToURI(filename: string) {
    return URI.file(removeVirtualFileExt(filename)).toString();
  }
}

function printDocumentation(
  docs: ts.SymbolDisplayPart[] | undefined,
  tags: ts.JSDocTagInfo[] | undefined
) {
  let result = "";
  if (docs) {
    result += ts.displayPartsToString(docs);
  }

  if (tags) {
    for (const tag of tags) {
      const text = ts.displayPartsToString(tag.text);
      result += `*@${tag.name}*${
        text ? (/\n/.test(text) ? `\n${text}` : `- ${text}`) : ""
      }`;
    }
  }

  return result;
}

function convertDiag(
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
      tags: convertDiagTags(tsDiag),
      severity: convertDiagSeverity(tsDiag),
      message: ts.flattenDiagnosticMessageText(tsDiag.messageText, "\n"),
    };
  }
}

function convertDiagSeverity(tsDiag: ts.Diagnostic) {
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

function convertDiagTags(tsDiag: ts.Diagnostic) {
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

function convertCompletionItemKind(kind: ts.ScriptElementKind) {
  switch (kind) {
    case ts.ScriptElementKind.warning:
    case ts.ScriptElementKind.linkText:
      return CompletionItemKind.Text;

    case ts.ScriptElementKind.keyword:
    case ts.ScriptElementKind.primitiveType:
      return CompletionItemKind.Keyword;

    case ts.ScriptElementKind.scriptElement:
      return CompletionItemKind.File;

    case ts.ScriptElementKind.directory:
      return CompletionItemKind.Folder;

    case ts.ScriptElementKind.label:
    case ts.ScriptElementKind.string:
      return CompletionItemKind.Constant;

    case ts.ScriptElementKind.moduleElement:
    case ts.ScriptElementKind.externalModuleName:
      return CompletionItemKind.Module;

    case ts.ScriptElementKind.typeElement:
    case ts.ScriptElementKind.classElement:
    case ts.ScriptElementKind.localClassElement:
      return CompletionItemKind.Class;

    case ts.ScriptElementKind.interfaceElement:
      return CompletionItemKind.Interface;

    case ts.ScriptElementKind.enumElement:
      return CompletionItemKind.Enum;

    case ts.ScriptElementKind.enumMemberElement:
      return CompletionItemKind.EnumMember;

    case ts.ScriptElementKind.alias:
    case ts.ScriptElementKind.letElement:
    case ts.ScriptElementKind.constElement:
    case ts.ScriptElementKind.variableElement:
    case ts.ScriptElementKind.parameterElement:
    case ts.ScriptElementKind.localVariableElement:
      return CompletionItemKind.Variable;

    case ts.ScriptElementKind.functionElement:
    case ts.ScriptElementKind.localFunctionElement:
      return CompletionItemKind.Function;

    case ts.ScriptElementKind.callSignatureElement:
    case ts.ScriptElementKind.memberFunctionElement:
    case ts.ScriptElementKind.indexSignatureElement:
    case ts.ScriptElementKind.constructSignatureElement:
      return CompletionItemKind.Method;

    case ts.ScriptElementKind.memberGetAccessorElement:
    case ts.ScriptElementKind.memberSetAccessorElement:
    case ts.ScriptElementKind.memberVariableElement:
      return CompletionItemKind.Field;

    case ts.ScriptElementKind.constructorImplementationElement:
      return CompletionItemKind.Constructor;

    case ts.ScriptElementKind.typeParameterElement:
      return CompletionItemKind.TypeParameter;

    case ts.ScriptElementKind.link:
    case ts.ScriptElementKind.linkName:
      return CompletionItemKind.Reference;

    default:
      return CompletionItemKind.Property;
  }
}

function getTSTriggerChar(char: string | undefined) {
  if (char && tsTriggerChars.has(char))
    return char as ts.CompletionsTriggerCharacter;
}

export { ScriptService as default };
