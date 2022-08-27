import path from "path";

import { relativeImportPath } from "relative-import-path";
import ts from "typescript";
import {
  CompletionItem,
  CompletionItemKind,
  CompletionItemTag,
  DefinitionLink,
  Diagnostic,
  DiagnosticSeverity,
  DiagnosticTag,
  InsertTextFormat,
  TextEdit,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import { getMarkoProject } from "../../utils/project";
import { processDoc } from "../../utils/file";
import type { Extracted } from "../../utils/extractor";
import * as documents from "../../utils/text-documents";
import { START_LOCATION } from "../../utils/constants";
import { getConfig } from "../../utils/workspace";
import type { Plugin } from "../types";

import { extractScripts } from "./extract";

interface TSProject {
  basePath: string;
  scriptKind: ScriptKind;
  configPath: string | undefined;
  fileNames: string[];
  options: ts.CompilerOptions;
  service: ts.LanguageService;
  getVirtualFileName(doc: TextDocument): string | undefined;
}

const kTSProject = Symbol("ts-project");
const snapshotCache = new WeakMap<TextDocument, ts.IScriptSnapshot>();
const snapshotVersions = new WeakMap<ts.IScriptSnapshot, number>();
const markoFileReg = /\.marko$/;
const modulePartsReg = /^((?:@([^/]+).)?(?:[^/]+))(.*)/;
const tsTriggerChars = new Set([".", '"', "'", "`", "/", "@", "<", "#", " "]);
const optionalModifierReg = /\boptional\b/;
const deprecatedModifierReg = /\bdeprecated\b/;
const colorModifierReg = /\bcolor\b/;
enum ScriptKind {
  TS,
  JS,
}

const ScriptService: Partial<Plugin> = {
  async doComplete(doc, params) {
    const extracted = processDoc(doc, extractScripts);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffset = extracted.generatedOffsetAt(sourceOffset);
    if (generatedOffset === undefined) return;

    const { fsPath, scheme } = URI.parse(doc.uri);
    if (scheme !== "file") return;

    const { service, scriptKind, getVirtualFileName } = getTSProject(fsPath);
    const virtualFileName = getVirtualFileName(doc)!;
    const completions = service.getCompletionsAtPosition(
      virtualFileName,
      generatedOffset,
      {
        ...(await getPreferences(scriptKind)),
        ...params.context,
        triggerCharacter: getTSTriggerChar(params.context?.triggerCharacter),
      }
    );
    if (!completions?.entries.length) return;

    const result: CompletionItem[] = [];

    for (const completion of completions.entries) {
      const { replacementSpan } = completion;
      let { name: label, insertText, sortText } = completion;
      let textEdit: CompletionItem["textEdit"];
      let detail: CompletionItem["detail"];
      let kind: CompletionItem["kind"];
      let tags: CompletionItem["tags"];
      let labelDetails: CompletionItem["labelDetails"];
      let source = completion.source;

      if (source && completion.hasAction) {
        if (source[0] === ".") {
          source = path.resolve(fsPath, "..", source);
        }
        detail = relativeImportPath(fsPath, source);
        // De-prioritize auto-imported completions.
        sortText = `\uffff${sortText}`;
      } else if (completion.sourceDisplay) {
        const description = ts.displayPartsToString(completion.sourceDisplay);
        if (description !== label) {
          labelDetails = { description };
        }
      }

      if (completion.kindModifiers) {
        if (optionalModifierReg.test(completion.kindModifiers)) {
          insertText = label;
          label += "?";
        }

        if (deprecatedModifierReg.test(completion.kindModifiers)) {
          tags = [CompletionItemTag.Deprecated];
        }

        if (colorModifierReg.test(completion.kindModifiers)) {
          kind = CompletionItemKind.Color;
        }
      }

      if (replacementSpan) {
        const sourceRange = sourceLocationAtTextSpan(
          extracted,
          replacementSpan
        );

        if (sourceRange) {
          textEdit = {
            range: sourceRange,
            newText: insertText || label,
          };
        } else {
          continue;
        }
      }

      result.push({
        tags,
        label,
        detail,
        textEdit,
        sortText,
        insertText,
        labelDetails,
        filterText: insertText,
        preselect: completion.isRecommended || undefined,
        kind: kind || convertCompletionItemKind(completion.kind),
        insertTextFormat: completion.isSnippet
          ? InsertTextFormat.Snippet
          : undefined,
        data: completion.data && {
          originalData: completion.data,
          originalName: completion.name,
          originalSource: source,
          generatedOffset,
          virtualFileName,
        },
      });
    }

    return {
      isIncomplete: true,
      items: result,
    };
  },
  async doCompletionResolve(item) {
    const { data } = item;
    if (!data) return;
    const { virtualFileName } = data;
    if (!virtualFileName) return;
    const doc = documents.get(virtualFileToURI(virtualFileName));
    if (!doc) return;

    const { service, scriptKind } = getTSProject(virtualFileName);
    const detail = service.getCompletionEntryDetails(
      virtualFileName,
      data.generatedOffset,
      data.originalName,
      {},
      data.originalSource,
      await getPreferences(scriptKind),
      data.originalData
    );

    if (!detail?.codeActions) return;

    const extracted = processDoc(doc, extractScripts);
    const textEdits: CompletionItem["additionalTextEdits"] =
      (item.additionalTextEdits = item.additionalTextEdits || []);

    for (const action of detail.codeActions) {
      for (const change of action.changes) {
        if (change.fileName !== virtualFileName) continue;
        for (const { span, newText } of change.textChanges) {
          const sourceRange = /^\s*(?:import|export) /.test(newText)
            ? // Ensure import inserts are always in the program root.
              // TODO: this could probably be updated to more closely reflect
              // where typescript wants to put the import/export.
              START_LOCATION
            : sourceLocationAtTextSpan(extracted, span);
          if (sourceRange) {
            textEdits.push({
              newText,
              range: sourceRange,
            });
          }
        }
      }
    }

    return item;
  },
  findDefinition(doc, params) {
    const extracted = processDoc(doc, extractScripts);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffset = extracted.generatedOffsetAt(sourceOffset);
    if (generatedOffset === undefined) return;

    const { fsPath, scheme } = URI.parse(doc.uri);
    if (scheme !== "file") return;

    const { service, getVirtualFileName } = getTSProject(fsPath);
    const virtualFileName = getVirtualFileName(doc)!;
    const boundary = service.getDefinitionAndBoundSpan(
      virtualFileName,
      generatedOffset
    );
    if (!boundary?.definitions) return;

    const originSelectionRange = sourceLocationAtTextSpan(
      extracted,
      boundary.textSpan
    );
    let result: DefinitionLink[] | DefinitionLink | undefined;

    for (const def of boundary.definitions) {
      const targetUri = virtualFileToURI(def.fileName);
      const defDoc = documents.get(targetUri);
      if (!defDoc) continue;

      let link: DefinitionLink | undefined;

      if (markoFileReg.test(targetUri)) {
        const extracted = processDoc(defDoc, extractScripts);
        const targetSelectionRange =
          sourceLocationAtTextSpan(extracted, def.textSpan) || START_LOCATION;
        const targetRange =
          (def.contextSpan &&
            sourceLocationAtTextSpan(extracted, def.contextSpan)) ||
          START_LOCATION;
        link = {
          targetUri,
          targetRange,
          targetSelectionRange,
          originSelectionRange,
        };
      } else {
        link = {
          targetUri,
          targetRange: def.contextSpan
            ? docLocationAtTextSpan(defDoc, def.contextSpan)
            : START_LOCATION,
          targetSelectionRange: docLocationAtTextSpan(defDoc, def.textSpan),
          originSelectionRange,
        };
      }

      if (link) {
        if (result) {
          if (Array.isArray(result)) {
            result.push(link);
          } else {
            result = [result, link];
          }
        } else {
          result = link;
        }
      }
    }

    return result;
  },
  doHover(doc, params) {
    const extracted = processDoc(doc, extractScripts);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffset = extracted.generatedOffsetAt(sourceOffset);
    if (generatedOffset === undefined) return;

    const { fsPath, scheme } = URI.parse(doc.uri);
    if (scheme !== "file") return;

    const { service, getVirtualFileName } = getTSProject(fsPath);
    const quickInfo = service.getQuickInfoAtPosition(
      getVirtualFileName(doc)!,
      generatedOffset
    );
    if (!quickInfo) return;

    const sourceRange = sourceLocationAtTextSpan(extracted, quickInfo.textSpan);
    if (!sourceRange) return;

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
      range: sourceRange,
      contents,
    };
  },
  doRename(doc, params) {
    const extracted = processDoc(doc, extractScripts);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffset = extracted.generatedOffsetAt(sourceOffset);
    if (generatedOffset === undefined) return;

    const { fsPath, scheme } = URI.parse(doc.uri);
    if (scheme !== "file") return;

    const { service, getVirtualFileName } = getTSProject(fsPath);
    const virtualFileName = getVirtualFileName(doc)!;
    const renameLocations = service.findRenameLocations(
      virtualFileName,
      generatedOffset,
      false,
      false,
      false
    );

    if (!renameLocations) return;

    const changes: { [uri: string]: TextEdit[] } = {};

    for (const rename of renameLocations) {
      const renameURI = virtualFileToURI(rename.fileName);
      const renameDoc = documents.get(renameURI);
      let edit: TextEdit | undefined;
      if (!renameDoc) continue;
      if (markoFileReg.test(renameURI)) {
        const extracted = processDoc(renameDoc, extractScripts);
        const sourceRange = sourceLocationAtTextSpan(
          extracted,
          rename.textSpan
        );
        if (sourceRange) {
          edit = {
            newText: params.newName,
            range: sourceRange,
          };
        }
      } else {
        edit = {
          newText: params.newName,
          range: docLocationAtTextSpan(renameDoc, rename.textSpan),
        };
      }

      if (edit) {
        if (changes[renameURI]) {
          changes[renameURI].push(edit);
        } else {
          changes[renameURI] = [edit];
        }
      }
    }

    return {
      changes,
    };
  },
  doValidate(doc) {
    const extracted = processDoc(doc, extractScripts);
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
      const diag = convertDiag(extracted, tsDiag);
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

function sourceLocationAtTextSpan(
  extracted: Extracted,
  { start, length }: ts.TextSpan
) {
  if (start === 0 && length === 0) return START_LOCATION;
  return extracted.sourceLocationAt(start, start + length);
}

function docLocationAtTextSpan(
  doc: TextDocument,
  { start, length }: ts.TextSpan
) {
  return {
    start: doc.positionAt(start),
    end: doc.positionAt(start + length),
  };
}

function getTSProject(docFsPath: string): TSProject {
  let configPath: string | undefined;
  let virtualExt = ts.Extension.Js;
  let scriptKind = ScriptKind.JS;

  if (docFsPath) {
    configPath = ts.findConfigFile(
      docFsPath,
      ts.sys.fileExists,
      "tsconfig.json"
    );

    if (configPath) {
      virtualExt = ts.Extension.Ts;
      scriptKind = ScriptKind.TS;
    } else {
      configPath = ts.findConfigFile(
        docFsPath,
        ts.sys.fileExists,
        "jsconfig.json"
      );
    }
  }

  const basePath = (configPath && path.dirname(configPath)) || process.cwd();
  const markoProject = getMarkoProject(configPath && basePath);
  let projectCache = markoProject.cache.get(kTSProject) as
    | Map<string, TSProject>
    | undefined;
  let cached: TSProject | undefined;

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
    markoProject.cache.set(kTSProject, projectCache);
  }

  const { fileNames, options, projectReferences } =
    ts.parseJsonConfigFileContent(
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

  options.rootDir ??= basePath;
  options.module = ts.ModuleKind.ESNext;
  options.moduleResolution = ts.ModuleResolutionKind.NodeJs;
  options.noEmit =
    options.allowJs =
    options.declaration =
    options.skipLibCheck =
    options.isolatedModules =
    options.resolveJsonModule =
    options.skipDefaultLibCheck =
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

  const tsProject: TSProject = {
    basePath,
    configPath,
    fileNames,
    options,
    scriptKind,
    getVirtualFileName(doc) {
      const { scheme, fsPath } = URI.parse(doc.uri);
      if (scheme === "file") return addVirtualExt(fsPath);
    },
    service: ts.createLanguageService({
      getNewLine() {
        return ts.sys.newLine;
      },

      useCaseSensitiveFileNames() {
        return ts.sys.useCaseSensitiveFileNames;
      },

      getCompilationSettings() {
        return options;
      },

      getCurrentDirectory() {
        return basePath;
      },

      getProjectVersion() {
        return documents.projectVersion.toString(32);
      },

      getDefaultLibFileName() {
        return defaultLibFile;
      },

      getProjectReferences() {
        return projectReferences;
      },

      resolveModuleNames(moduleNames, containingFile) {
        return moduleNames.map<ts.ResolvedModule | undefined>((moduleName) => {
          if (markoFileReg.test(moduleName)) {
            if (moduleName[0] === ".") {
              return {
                resolvedFileName: path.resolve(
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

      readDirectory: (path, extensions, exclude, include, depth) => {
        return ts.sys.readDirectory(
          path,
          extensions ? extensions.concat(".marko") : [".marko"],
          exclude,
          include,
          depth
        );
      },

      readFile: (filename) => {
        const doc = documents.get(virtualFileToURI(filename));
        if (doc) {
          return markoFileReg.test(filename)
            ? processDoc(doc, extractScripts).generated
            : doc.getText();
        }
      },

      fileExists: (filename) => {
        return documents.exists(virtualFileToURI(filename));
      },

      getScriptFileNames() {
        const result = new Set<string>(fileNames);
        for (const doc of documents.getAllOpen()) {
          const { scheme, fsPath } = URI.parse(doc.uri);
          if (scheme === "file") result.add(fsPath);
        }

        for (const fileName of fileNames) {
          result.add(fileName);
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
              ? processDoc(doc, extractScripts).generated
              : doc.getText()
          );

          snapshotVersions.set(snapshot, doc.version);
          snapshotCache.set(doc, snapshot);
        }

        return snapshot;
      },
    }),
  };

  projectCache.set(basePath, tsProject);
  return tsProject;

  function addVirtualExt(filename: string) {
    return filename + virtualExt;
  }
}

function removeVirtualFileExt(filename: string) {
  return filename.replace(/\.marko\.[jt]s$/, ".marko");
}

function virtualFileToURI(filename: string) {
  return URI.file(removeVirtualFileExt(filename)).toString();
}

async function getPreferences(
  scriptKind: ScriptKind
): Promise<ts.UserPreferences> {
  const configName = scriptKind === ScriptKind.JS ? "javascript" : "typescript";
  const [preferencesConfig, suggestConfig, inlayHintsConfig] =
    await Promise.all([
      getConfig(`${configName}.preferences`),
      getConfig(`${configName}.suggest`),
      getConfig(`${configName}.inlayHints`),
    ]);

  return {
    disableSuggestions: suggestConfig.enabled === false,
    quotePreference: preferencesConfig.quoteStyle || "auto",
    includeCompletionsForModuleExports: suggestConfig.autoImports ?? true,
    includeCompletionsForImportStatements:
      suggestConfig.includeCompletionsForImportStatements ?? true,
    includeCompletionsWithSnippetText:
      suggestConfig.includeCompletionsWithSnippetText ?? true,
    includeAutomaticOptionalChainCompletions:
      suggestConfig.includeAutomaticOptionalChainCompletions ?? true,
    includeCompletionsWithInsertText: true,
    includeCompletionsWithClassMemberSnippets:
      suggestConfig.classMemberSnippets?.enabled ?? true,
    includeCompletionsWithObjectLiteralMethodSnippets:
      suggestConfig.objectLiteralMethodSnippets?.enabled ?? true,
    useLabelDetailsInCompletionEntries: true,
    allowIncompleteCompletions: true,
    importModuleSpecifierPreference:
      preferencesConfig.importModuleSpecifierPreference,
    importModuleSpecifierEnding:
      preferencesConfig.importModuleSpecifierEnding || "auto",
    allowTextChangesInNewFiles: true,
    providePrefixAndSuffixTextForRename: true,
    includePackageJsonAutoImports:
      preferencesConfig.includePackageJsonAutoImports ?? true,
    provideRefactorNotApplicableReason: true,
    jsxAttributeCompletionStyle:
      preferencesConfig.jsxAttributeCompletionStyle ?? "auto",
    includeInlayParameterNameHints:
      inlayHintsConfig.parameterNames?.enabled ?? "none",
    includeInlayParameterNameHintsWhenArgumentMatchesName:
      !inlayHintsConfig.parameterNames?.suppressWhenArgumentMatchesName,
    includeInlayFunctionParameterTypeHints:
      inlayHintsConfig.parameterTypes?.enabled ?? true,
    includeInlayVariableTypeHints:
      inlayHintsConfig.variableTypes?.enabled ?? true,
    includeInlayPropertyDeclarationTypeHints:
      inlayHintsConfig.propertyDeclarationTypes?.enabled ?? true,
    includeInlayFunctionLikeReturnTypeHints:
      inlayHintsConfig.functionLikeReturnTypes?.enabled ?? true,
    includeInlayEnumMemberValueHints:
      inlayHintsConfig.enumMemberValues?.enabled ?? true,
  };
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
  extracted: Extracted,
  tsDiag: ts.Diagnostic
): Diagnostic | undefined {
  const sourceRange =
    tsDiag.start === undefined
      ? START_LOCATION
      : sourceLocationAtTextSpan(extracted, tsDiag as ts.TextSpan);

  if (sourceRange) {
    return {
      range: sourceRange,
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
