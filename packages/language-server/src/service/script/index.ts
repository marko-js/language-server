import path from "path";

import { relativeImportPath } from "relative-import-path";
import ts from "typescript/lib/tsserverlibrary";
import {
  CompletionItem,
  CompletionItemKind,
  CompletionItemTag,
  DefinitionLink,
  Diagnostic,
  DiagnosticSeverity,
  DiagnosticTag,
  InsertTextFormat,
  type Range,
  TextEdit,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import * as prettier from "prettier";

import {
  type Extracted,
  type Location,
  Node,
  NodeType,
  type Parsed,
  Project,
  ScriptLang,
  extractScript,
} from "@marko/language-tools";
import { getFSPath, getMarkoFile, processDoc } from "../../utils/file";
import * as documents from "../../utils/text-documents";
import * as workspace from "../../utils/workspace";
import { START_LOCATION } from "../../utils/constants";
import type { Plugin } from "../types";

import { ExtractedSnapshot, patch } from "../../ts-plugin/host";
import printJSDocTag from "./util/print-jsdoc-tag";

// Filter out some syntax errors from the TS compiler which will be surfaced from the marko compiler.
const IGNORE_DIAG_REG =
  /^(?:(?:Expression|Identifier|['"][^\w]['"]) expected|Invalid character)\b/i;

interface TSProject {
  rootDir: string;
  host: ts.LanguageServiceHost;
  service: ts.LanguageService;
  markoScriptLang: ScriptLang;
}

const extractCache = new Map<string, ExtractedSnapshot>();
const snapshotCache = new Map<string, ts.IScriptSnapshot>();
const insertModuleStatementLocCache = new WeakMap<Extracted, Location>();
const markoFileReg = /\.marko$/;
const tsTriggerChars = new Set([".", '"', "'", "`", "/", "@", "<", "#", " "]);
const optionalModifierReg = /\boptional\b/;
const deprecatedModifierReg = /\bdeprecated\b/;
const colorModifierReg = /\bcolor\b/;
const localInternalsPrefix = "__marko_internal_";
const requiredTSCompilerOptions: ts.CompilerOptions = {
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  noEmit: true,
  allowJs: true,
  composite: false,
  declaration: false,
  skipLibCheck: true,
  importHelpers: false,
  isolatedModules: true,
  resolveJsonModule: true,
  skipDefaultLibCheck: true,
  emitDeclarationOnly: false,
  allowNonTsExtensions: true,
  emitDecoratorMetadata: false,
};
const defaultTSConfig = {
  include: [],
  compilerOptions: {
    lib: ["dom", "node", "esnext"],
  } satisfies ts.CompilerOptions,
};
const extraTSCompilerExtensions: readonly ts.FileExtensionInfo[] = [
  {
    extension: ".marko",
    isMixedContent: false,
    scriptKind: ts.ScriptKind.Deferred,
  },
];

const ScriptService: Partial<Plugin> = {
  commands: {
    "$/showScriptOutput": async (uri: string) => {
      const doc = documents.get(uri);
      if (doc?.languageId !== "marko") return;
      const filename = getFSPath(doc);
      if (!filename) return;
      const tsProject = getTSProject(filename);
      const extracted = processScript(doc, tsProject);
      const lang = Project.getScriptLang(
        filename,
        tsProject.markoScriptLang,
        ts,
        tsProject.host,
      );
      const generated = extracted.toString();
      const content = await prettier
        .format(generated, {
          parser: lang === ScriptLang.ts ? "typescript" : "babel",
        })
        .catch(() => generated);
      return {
        language: lang === ScriptLang.ts ? "typescript" : "javascript",
        content,
      };
    },
  },
  async initialize() {
    workspace.onConfigChange(() => {
      snapshotCache.clear();
    });

    documents.onFileChange((doc) => {
      if (doc) {
        const filename = getFSPath(doc)!;
        extractCache.delete(filename);
        snapshotCache.delete(filename);
      } else {
        extractCache.clear();
        snapshotCache.clear();
      }
    });
  },
  async doComplete(doc, params) {
    const fileName = getFSPath(doc);
    if (!fileName) return;

    const project = getTSProject(fileName);
    const extracted = processScript(doc, project);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffset = extracted.generatedOffsetAt(sourceOffset);
    if (generatedOffset === undefined) return;

    const completions = project.service.getCompletionsAtPosition(
      fileName,
      generatedOffset,
      {
        ...(await getPreferences(project.markoScriptLang)),
        ...params.context,
        triggerCharacter: getTSTriggerChar(params.context?.triggerCharacter),
      },
    );
    if (!completions?.entries.length) return;

    const result: CompletionItem[] = [];

    for (const completion of completions.entries) {
      let { name: label, insertText, sortText } = completion;
      if (label.startsWith(localInternalsPrefix)) continue;

      const { replacementSpan } = completion;
      let textEdit: CompletionItem["textEdit"];
      let detail: CompletionItem["detail"];
      let kind: CompletionItem["kind"];
      let tags: CompletionItem["tags"];
      let labelDetails: CompletionItem["labelDetails"];
      let source = completion.source;

      if (source && completion.hasAction) {
        if (source[0] === ".") {
          source = path.resolve(fileName, "..", source);
        }
        detail = relativeImportPath(fileName, source);
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
          replacementSpan,
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
          fileName,
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
    const { fileName } = data;
    if (!fileName) return;
    const doc = documents.get(filenameToURI(fileName));
    if (!doc) return;

    const project = getTSProject(fileName);
    const detail = project.service.getCompletionEntryDetails(
      fileName,
      data.generatedOffset,
      data.originalName,
      {},
      data.originalSource,
      await getPreferences(project.markoScriptLang),
      data.originalData,
    );

    if (!detail?.codeActions) return;

    const extracted = processScript(doc, project);
    const textEdits: CompletionItem["additionalTextEdits"] =
      (item.additionalTextEdits = item.additionalTextEdits || []);

    for (const action of detail.codeActions) {
      for (const change of action.changes) {
        if (change.fileName !== fileName) continue;
        for (const { span, newText: rawText } of change.textChanges) {
          let range: Range | undefined;
          let newText = rawText;

          if (span.length === 0 && /^\s*(?:import|export) /.test(newText)) {
            const cached = insertModuleStatementLocCache.get(extracted);
            newText = newText.replace(/\n\s*$/, "\n");

            if (cached) {
              range = cached;
            } else {
              const { parsed } = getMarkoFile(doc);
              const offset = getInsertModuleStatementOffset(parsed);
              const start = parsed.positionAt(offset);
              range = {
                start,
                end: start,
              };
              insertModuleStatementLocCache.set(extracted, range);
            }
          } else {
            range = sourceLocationAtTextSpan(extracted, span);
          }

          if (range) {
            textEdits.push({ newText, range });
          }
        }
      }
    }

    return item;
  },
  findDefinition(doc, params) {
    const fileName = getFSPath(doc);
    if (!fileName) return;

    const project = getTSProject(fileName);
    const extracted = processScript(doc, project);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffset = extracted.generatedOffsetAt(sourceOffset);
    if (generatedOffset === undefined) return;

    const boundary = project.service.getDefinitionAndBoundSpan(
      fileName,
      generatedOffset,
    );
    if (!boundary?.definitions) return;

    const originSelectionRange = sourceLocationAtTextSpan(
      extracted,
      boundary.textSpan,
    );
    let result: DefinitionLink[] | DefinitionLink | undefined;

    for (const def of boundary.definitions) {
      const targetUri = filenameToURI(def.fileName);
      const defDoc = documents.get(targetUri);
      if (!defDoc) continue;

      let link: DefinitionLink | undefined;

      if (markoFileReg.test(targetUri)) {
        const extracted = processScript(defDoc, project);
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
    const fileName = getFSPath(doc);
    if (!fileName) return;

    const project = getTSProject(fileName);
    const extracted = processScript(doc, project);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffset = extracted.generatedOffsetAt(sourceOffset);
    if (generatedOffset === undefined) return;

    const quickInfo = project.service.getQuickInfoAtPosition(
      fileName,
      generatedOffset,
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
      quickInfo.tags,
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
    const fileName = getFSPath(doc);
    if (!fileName) return;

    const project = getTSProject(fileName);
    const extracted = processScript(doc, project);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffset = extracted.generatedOffsetAt(sourceOffset);
    if (generatedOffset === undefined) return;

    const renameLocations = project.service.findRenameLocations(
      fileName,
      generatedOffset,
      false,
      false,
      false,
    );

    if (!renameLocations) return;

    const changes: { [uri: string]: TextEdit[] } = {};

    for (const rename of renameLocations) {
      const renameURI = filenameToURI(rename.fileName);
      const renameDoc = documents.get(renameURI);
      let edit: TextEdit | undefined;
      if (!renameDoc) continue;
      if (markoFileReg.test(renameURI)) {
        const extracted = processScript(renameDoc, project);
        const sourceRange = sourceLocationAtTextSpan(
          extracted,
          rename.textSpan,
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
    const fileName = getFSPath(doc);
    if (!fileName) return;

    const project = getTSProject(fileName);
    const extracted = processScript(doc, project);

    let results: Diagnostic[] | undefined;
    for (const tsDiag of project.service.getSuggestionDiagnostics(fileName)) {
      addDiag(tsDiag);
    }

    for (const tsDiag of project.service.getSyntacticDiagnostics(fileName)) {
      addDiag(tsDiag);
    }

    for (const tsDiag of project.service.getSemanticDiagnostics(fileName)) {
      addDiag(tsDiag);
    }

    return results;

    function addDiag(tsDiag: ts.Diagnostic) {
      const diag = convertDiag(extracted, tsDiag);
      if (diag && !IGNORE_DIAG_REG.test(diag.message)) {
        if (results) {
          results.push(diag);
        } else {
          results = [diag];
        }
      }
    }
  },
};

function processScript(doc: TextDocument, tsProject: TSProject) {
  return processDoc(doc, ({ filename, parsed, lookup }) => {
    const { host, markoScriptLang } = tsProject;
    return extractScript({
      ts,
      parsed,
      lookup,
      scriptLang: filename
        ? Project.getScriptLang(filename, markoScriptLang, ts, host)
        : markoScriptLang,
      runtimeTypesCode: Project.getTypeLibs(tsProject.rootDir, ts, host)
        ?.markoTypesCode,
    });
  });
}

function getInsertModuleStatementOffset(parsed: Parsed) {
  const { program } = parsed;
  let firstNode: Node.AnyNode | undefined;

  if (program.static.length) {
    // Prefer before the first export, or after the last import.
    let lastImport: Node.Import | undefined;
    for (const node of program.static) {
      switch (node.type) {
        case NodeType.Export:
          return node.start;
        case NodeType.Import:
          lastImport = node;
          break;
      }
    }

    if (lastImport) {
      return lastImport.end + 1;
    }

    firstNode = program.static[0];
  }

  if (program.body.length) {
    if (!firstNode || firstNode.start > program.body[0].start) {
      firstNode = program.body[0];
    }
  }

  // Fall back to after the comments of the first node,
  // or the start of the document.
  if (firstNode) {
    return getOffsetAfterComments(firstNode);
  }

  return 0;
}

function getOffsetAfterComments(node: Node.AnyNode) {
  const { comments } = node as Node.Commentable;
  if (comments) {
    return comments.at(-1)!.end + 1;
  }

  return Math.max(0, node.start - 1);
}

function sourceLocationAtTextSpan(
  extracted: Extracted,
  { start, length }: ts.TextSpan,
) {
  if (start === 0 && length === 0) return START_LOCATION;
  return extracted.sourceLocationAt(start, start + length);
}

function docLocationAtTextSpan(
  doc: TextDocument,
  { start, length }: ts.TextSpan,
) {
  return {
    start: doc.positionAt(start),
    end: doc.positionAt(start + length),
  };
}

function getTSConfigFile(fileName: string) {
  let configFile: string | undefined;
  const docFsDir = path.dirname(fileName);
  const cache = Project.getCache(docFsDir);
  let configFileCache = cache.get(getTSConfigFile) as
    | Map<string, string | undefined>
    | undefined;

  if (configFileCache) {
    configFile = configFileCache.get(docFsDir);
  } else {
    configFileCache = new Map();
    cache.set(getTSConfigFile, configFileCache);
  }

  if (!configFile) {
    configFile =
      ts.findConfigFile(fileName, ts.sys.fileExists, "tsconfig.json") ||
      ts.findConfigFile(fileName, ts.sys.fileExists, "jsconfig.json");
  }

  configFileCache.set(docFsDir, configFile);

  return configFile;
}

function getTSProject(docFsPath: string): TSProject {
  let configFile: string | undefined;
  let markoScriptLang = ScriptLang.js;

  if (docFsPath) {
    configFile = getTSConfigFile(docFsPath);
    if (configFile?.endsWith("tsconfig.json")) {
      markoScriptLang = ScriptLang.ts;
    }
  }

  const rootDir = (configFile && path.dirname(configFile)) || process.cwd();
  const cache = Project.getCache(configFile && rootDir);
  let projectCache = cache.get(getTSProject) as
    | Map<string, TSProject>
    | undefined;
  let cached: TSProject | undefined;

  // The typescript project and it's language service is
  // cached with the Marko compiler cache.
  // This causes the cache to be properly cleared when files change.
  if (projectCache) {
    cached = projectCache.get(rootDir);
    if (cached) return cached;
  } else {
    // Within the compiler cache we store a map
    // of project paths to project info.
    projectCache = new Map();
    cache.set(getTSProject, projectCache);
  }

  const { fileNames, options, projectReferences } =
    ts.parseJsonConfigFileContent(
      (configFile && ts.readConfigFile(configFile, ts.sys.readFile).config) ||
        defaultTSConfig,
      ts.sys,
      rootDir,
      requiredTSCompilerOptions,
      configFile,
      undefined,
      extraTSCompilerExtensions,
    );

  options.rootDir ??= rootDir;

  // Only ts like files can inject globals into the project, so we filter out everything else.
  const potentialGlobalFiles = new Set<string>(
    fileNames.filter((file) => /\.[cm]?ts$/.test(file)),
  );

  const tsPkgFile =
    configFile &&
    ts.resolveModuleName("typescript/package.json", configFile, options, ts.sys)
      .resolvedModule?.resolvedFileName;
  const defaultLibFile = path.join(
    tsPkgFile ? path.join(tsPkgFile, "../lib") : __dirname,
    ts.getDefaultLibFileName(options),
  );

  const resolutionCache = ts.createModuleResolutionCache(
    rootDir,
    getCanonicalFileName,
    options,
  );

  const host: ts.LanguageServiceHost = patch(
    ts,
    configFile,
    extractCache,
    resolutionCache,
    {
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
        return options.rootDir!;
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

      resolveModuleNameLiterals(
        moduleLiterals,
        containingFile,
        redirectedReference,
        options,
        _containingSourceFile,
        _reusedNames,
      ) {
        return moduleLiterals.map((moduleLiteral) => {
          return ts.bundlerModuleNameResolver(
            moduleLiteral.text,
            containingFile,
            options,
            host,
            resolutionCache,
            redirectedReference,
          );
        });
      },

      readDirectory: ts.sys.readDirectory,

      readFile: (filename) => documents.get(filenameToURI(filename))?.getText(),

      fileExists: (filename) => documents.exists(filenameToURI(filename)),

      getScriptFileNames() {
        const result = new Set(potentialGlobalFiles);
        for (const doc of documents.getAllOpen()) {
          const { scheme, fsPath } = URI.parse(doc.uri);
          if (scheme === "file") {
            const projectForFile = getTSProject(fsPath);
            if (projectForFile === tsProject) {
              result.add(fsPath);
            }
          }
        }

        return [...result];
      },

      getScriptVersion(filename) {
        return `${documents.get(filenameToURI(filename))?.version ?? -1}`;
      },

      getScriptKind(filename) {
        switch (path.extname(filename)) {
          case ts.Extension.Js:
          case ts.Extension.Cjs:
          case ts.Extension.Mjs:
            return ts.ScriptKind.JS;
          case ts.Extension.Jsx:
            return ts.ScriptKind.JSX;
          case ts.Extension.Ts:
          case ts.Extension.Cts:
          case ts.Extension.Mts:
            return ts.ScriptKind.TS;
          case ts.Extension.Tsx:
            return ts.ScriptKind.TSX;
          case ts.Extension.Json:
            return ts.ScriptKind.JSON;
          default:
            return ts.ScriptKind.Unknown;
        }
      },

      getScriptSnapshot(filename) {
        let snapshot = snapshotCache.get(filename);
        if (!snapshot) {
          const doc = documents.get(filenameToURI(filename));
          if (!doc) return;
          snapshot = ts.ScriptSnapshot.fromString(doc.getText());
          snapshotCache.set(filename, snapshot);
        }

        return snapshot;
      },
    },
  );

  const tsProject: TSProject = {
    host,
    rootDir: options.rootDir!,
    service: ts.createLanguageService(host),
    markoScriptLang,
  };

  projectCache.set(rootDir, tsProject);
  return tsProject;
}

function filenameToURI(filename: string) {
  return URI.file(filename).toString();
}

async function getPreferences(
  scriptLang: ScriptLang,
): Promise<ts.UserPreferences> {
  const configName = scriptLang === ScriptLang.js ? "javascript" : "typescript";
  const [preferencesConfig, suggestConfig, inlayHintsConfig] =
    await Promise.all([
      workspace.getConfig(`${configName}.preferences`),
      workspace.getConfig(`${configName}.suggest`),
      workspace.getConfig(`${configName}.inlayHints`),
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
  tags: ts.JSDocTagInfo[] | undefined,
) {
  let result = "";
  let sep = "";
  if (docs) {
    result += ts.displayPartsToString(docs);
    sep = "  \n\n";
  }

  if (tags) {
    for (const tag of tags) {
      result += sep + printJSDocTag(tag);
      sep = "  \n\n";
    }
  }

  return result;
}

function convertDiag(
  extracted: Extracted,
  tsDiag: ts.Diagnostic,
): Diagnostic | undefined {
  const sourceRange =
    tsDiag.start === undefined
      ? START_LOCATION
      : sourceLocationAtTextSpan(extracted, tsDiag as ts.TextSpan);

  if (sourceRange) {
    return {
      range: sourceRange,
      source: "script",
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

function getCanonicalFileName(fileName: string) {
  return ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
}

export { ScriptService as default };
