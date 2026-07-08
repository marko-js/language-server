import {
  type Extracted,
  extractScript,
  type Location,
  type Node,
  NodeType,
  normalizePath,
  type Parsed,
  Processors,
  Project,
  ScriptLang,
} from "@marko/language-tools";
import path from "path";
import * as prettier from "prettier";
import { relativeImportPath } from "relative-import-path";
import ts from "typescript/lib/tsserverlibrary";
import {
  CompletionItem,
  CompletionItemKind,
  CompletionItemTag,
  type DefinitionLink,
  Diagnostic,
  DiagnosticSeverity,
  DiagnosticTag,
  type DocumentHighlight,
  DocumentHighlightKind,
  InsertTextFormat,
  type Location as LSPLocation,
  type Range,
  TextEdit,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import { type ExtractedSnapshot, patch } from "../../ts-plugin/host";
import { START_LOCATION } from "../../utils/constants";
import {
  getFSPath,
  getMarkoFile,
  type MarkoFile,
  processDoc,
} from "../../utils/file";
import * as documents from "../../utils/text-documents";
import { system } from "../../utils/ts-system";
import * as workspace from "../../utils/workspace";
import type { Plugin } from "../types";
import printJSDocTag from "./util/print-jsdoc-tag";

// Filter out some syntax errors from the TS compiler which will be surfaced from the marko compiler.
const IGNORE_DIAG_REG =
  /^(?:(?:Expression|Identifier|['"][^\w]['"]) expected|Invalid character)\b/i;

export interface TSProject {
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
// `system` is read at call time, not captured: on the browser build it is
// installed (via `setSystem`) after this module is first evaluated, so this must
// reflect the current system rather than the initial value. When it is not yet
// available, fall back to case-sensitive (the virtual disk).
function getCanonicalFileName(fileName: string) {
  return system?.useCaseSensitiveFileNames === false
    ? fileName.toLocaleLowerCase()
    : fileName;
}
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
        detail = relativeImportPath(fileName, normalizePath(source));
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

    // A class/id inside a `<style/var>` block has no real definition (it is
    // one), so navigate to its usages like a standalone CSS module.
    if (isInStyleModuleBlock(getMarkoFile(doc), sourceOffset)) {
      return findStyleModuleUsages(
        project,
        fileName,
        extracted.generatedOffsetsAt(sourceOffset),
      );
    }

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

      const links: DefinitionLink[] = [];
      const extracted = getTargetExtracted(project, def.fileName, defDoc);

      if (extracted) {
        const sourceRanges = extracted.sourceRangesAt(
          def.textSpan.start,
          def.textSpan.start + def.textSpan.length,
        );

        if (sourceRanges.length) {
          const contextRange =
            def.contextSpan &&
            extracted.sourceRangeAt(
              def.contextSpan.start,
              def.contextSpan.start + def.contextSpan.length,
            );

          for (const sourceRange of sourceRanges) {
            const targetSelectionRange =
              extracted.parsed.locationAt(sourceRange);
            links.push({
              targetUri,
              targetRange:
                contextRange &&
                contextRange.start <= sourceRange.start &&
                sourceRange.end <= contextRange.end
                  ? extracted.parsed.locationAt(contextRange)
                  : targetSelectionRange,
              targetSelectionRange,
              originSelectionRange,
            });
          }
        } else {
          links.push({
            targetUri,
            targetRange:
              (def.contextSpan &&
                sourceLocationAtTextSpan(extracted, def.contextSpan)) ||
              START_LOCATION,
            targetSelectionRange: START_LOCATION,
            originSelectionRange,
          });
        }
      } else {
        links.push({
          targetUri,
          targetRange: def.contextSpan
            ? docLocationAtTextSpan(defDoc, def.contextSpan)
            : START_LOCATION,
          targetSelectionRange: docLocationAtTextSpan(defDoc, def.textSpan),
          originSelectionRange,
        });
      }

      for (const link of links) {
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
  findReferences(doc, params) {
    const fileName = getFSPath(doc);
    if (!fileName) return;

    const project = getTSProject(fileName);
    const extracted = processScript(doc, project);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffsets = extracted.generatedOffsetsAt(sourceOffset);
    if (!generatedOffsets.length) return;

    const includeDeclaration = params.context?.includeDeclaration ?? true;
    const result: LSPLocation[] = [];
    const seen = new Set<string>();

    for (const generatedOffset of generatedOffsets) {
      const symbols = project.service.findReferences(fileName, generatedOffset);
      if (!symbols) continue;

      for (const symbol of symbols) {
        for (const entry of symbol.references) {
          if (!includeDeclaration && entry.isDefinition) continue;
          forEachSourceLocation(project, entry, (uri, range) => {
            const key = `${uri}:${rangeKey(range)}`;
            if (seen.has(key)) return;
            seen.add(key);
            result.push({ uri, range });
          });
        }
      }
    }

    return result.length ? result : undefined;
  },
  findDocumentHighlights(doc, params) {
    const fileName = getFSPath(doc);
    if (!fileName) return;

    const project = getTSProject(fileName);
    const extracted = processScript(doc, project);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffsets = extracted.generatedOffsetsAt(sourceOffset);
    if (!generatedOffsets.length) return;

    const result: DocumentHighlight[] = [];
    const seen = new Set<string>();

    for (const generatedOffset of generatedOffsets) {
      const highlights = project.service.getDocumentHighlights(
        fileName,
        generatedOffset,
        [fileName],
      );
      if (!highlights) continue;

      for (const { highlightSpans } of highlights) {
        for (const span of highlightSpans) {
          for (const sourceRange of extracted.sourceRangesAt(
            span.textSpan.start,
            span.textSpan.start + span.textSpan.length,
          )) {
            const range = extracted.parsed.locationAt(sourceRange);
            const key = rangeKey(range);
            if (seen.has(key)) continue;
            seen.add(key);
            result.push({
              range,
              kind:
                span.kind === ts.HighlightSpanKind.writtenReference
                  ? DocumentHighlightKind.Write
                  : DocumentHighlightKind.Read,
            });
          }
        }
      }
    }

    return result.length ? result : undefined;
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
  prepareRename(doc, params) {
    const fileName = getFSPath(doc);
    if (!fileName) return;

    const project = getTSProject(fileName);
    const extracted = processScript(doc, project);
    const generatedOffsets = extracted.generatedOffsetsAt(
      doc.offsetAt(params.position),
    );

    for (const generatedOffset of generatedOffsets) {
      const info = project.service.getRenameInfo(fileName, generatedOffset, {});
      if (info.canRename) {
        // Select exactly the range we will edit, so eg a CSS module class is
        // renamed without its leading `.`/`#`.
        const range = sourceLocationAtTextSpan(extracted, info.triggerSpan);
        if (range) return range;
      }
    }
  },
  doRename(doc, params) {
    const fileName = getFSPath(doc);
    if (!fileName) return;

    const project = getTSProject(fileName);
    const extracted = processScript(doc, project);
    const sourceOffset = doc.offsetAt(params.position);
    const generatedOffsets = extracted.generatedOffsetsAt(sourceOffset);
    if (!generatedOffsets.length) return;

    const changes: { [uri: string]: TextEdit[] } = {};
    const seenEdits = new Set<string>();
    let hasChanges = false;

    for (const generatedOffset of generatedOffsets) {
      const renameLocations = project.service.findRenameLocations(
        fileName,
        generatedOffset,
        false,
        false,
        false,
      );

      if (!renameLocations) continue;

      for (const rename of renameLocations) {
        forEachSourceLocation(project, rename, (uri, range) => {
          const key = `${uri}:${rangeKey(range)}`;
          if (seenEdits.has(key)) return;
          seenEdits.add(key);
          hasChanges = true;

          (changes[uri] ||= []).push({ newText: params.newName, range });
        });
      }
    }

    if (!hasChanges) return;

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
      if (
        diag &&
        !IGNORE_DIAG_REG.test(
          typeof diag.message === "string" ? diag.message : diag.message.value,
        )
      ) {
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
  return processDoc(doc, ({ filename, parsed, lookup, dirname }) => {
    const { host, markoScriptLang } = tsProject;
    return extractScript({
      ts,
      parsed,
      lookup,
      translator: Project.getConfig(dirname).translator,
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

function rangeKey({ start, end }: Range) {
  return `${start.line}:${start.character}:${end.line}:${end.character}`;
}

function forEachSourceLocation(
  project: TSProject,
  { fileName, textSpan }: ts.DocumentSpan,
  cb: (uri: string, range: Range) => void,
) {
  const uri = filenameToURI(fileName);
  const targetDoc = documents.get(uri);
  if (!targetDoc) return;

  const extracted = getTargetExtracted(project, fileName, targetDoc);
  if (extracted) {
    for (const sourceRange of extracted.sourceRangesAt(
      textSpan.start,
      textSpan.start + textSpan.length,
    )) {
      cb(uri, extracted.parsed.locationAt(sourceRange));
    }
  } else {
    cb(uri, docLocationAtTextSpan(targetDoc, textSpan));
  }
}

/**
 * The {@link Extracted} mapping for a target file, so generated TS locations
 * map back to source. Marko files use the marko cache; other processed files
 * (eg `.module.css`) use the TS host's extract cache.
 */
function getTargetExtracted(
  project: TSProject,
  fileName: string,
  doc: TextDocument,
) {
  if (markoFileReg.test(fileName)) {
    return processScript(doc, project);
  }

  if (Processors.has(fileName)) {
    // A failed extraction caches a snapshot-only placeholder (see the TS host);
    // only return a real source-mapped extract so callers can map locations.
    const cached = extractCache.get(normalizePath(fileName));
    if (cached && "sourceRangesAt" in cached) return cached;
  }
}

/**
 * The non-declaration usages of a CSS module class/id, used to navigate from a
 * `<style/var>` selector to its Marko/TS uses.
 */
function findStyleModuleUsages(
  project: TSProject,
  fileName: string,
  generatedOffsets: number[],
) {
  const result: LSPLocation[] = [];
  const seen = new Set<string>();

  for (const generatedOffset of generatedOffsets) {
    const symbols = project.service.findReferences(fileName, generatedOffset);
    if (!symbols) continue;

    for (const symbol of symbols) {
      for (const entry of symbol.references) {
        if (entry.isDefinition) continue;
        forEachSourceLocation(project, entry, (uri, range) => {
          const key = `${uri}:${rangeKey(range)}`;
          if (seen.has(key)) return;
          seen.add(key);
          result.push({ uri, range });
        });
      }
    }
  }

  return result.length ? result : undefined;
}

/** Whether the offset is inside a `<style/var>` (CSS module) block. */
function isInStyleModuleBlock({ parsed }: MarkoFile, offset: number) {
  let node: Node.AnyNode | undefined = parsed.nodeAt(offset);
  while (node) {
    if (node.type === NodeType.Tag && node.nameText === "style" && node.var) {
      // The tag's own `var` resolves through normal TS definition lookup; only
      // selector content inside the block navigates to its usages.
      const { start, end } = node.var.value;
      return offset < start || offset >= end;
    }
    node = node.parent;
  }

  return false;
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
      ts.findConfigFile(fileName, system.fileExists, "tsconfig.json") ||
      ts.findConfigFile(fileName, system.fileExists, "jsconfig.json");
  }

  configFileCache.set(docFsDir, configFile);

  return configFile;
}

export function getTSProject(docFsPath: string): TSProject {
  let configFile: string | undefined;
  let markoScriptLang = ScriptLang.js;

  if (docFsPath) {
    configFile = getTSConfigFile(docFsPath);
    if (configFile?.endsWith("tsconfig.json")) {
      markoScriptLang = ScriptLang.ts;
    }
  }

  const basePath = (configFile && path.dirname(configFile)) || process.cwd();
  const cache = Project.getCache(configFile && basePath);
  let projectCache = cache.get(getTSProject) as
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
    cache.set(getTSProject, projectCache);
  }

  const { fileNames, options, projectReferences } =
    ts.parseJsonConfigFileContent(
      (configFile && ts.readConfigFile(configFile, system.readFile).config) ||
        defaultTSConfig,
      system,
      basePath,
      requiredTSCompilerOptions,
      configFile,
      undefined,
      extraTSCompilerExtensions,
    );

  options.rootDir = basePath;

  // Only ts like files can inject globals into the project, so we filter out everything else.
  const potentialGlobalFiles = new Set<string>(
    fileNames.filter((file) => /\.[cm]?ts$/.test(file)),
  );

  const tsPkgFile =
    configFile &&
    ts.resolveModuleName("typescript/package.json", configFile, options, system)
      .resolvedModule?.resolvedFileName;
  const defaultLibFile = path.join(
    tsPkgFile ? path.join(tsPkgFile, "../lib") : __dirname,
    ts.getDefaultLibFileName(options),
  );

  const resolutionCache = ts.createModuleResolutionCache(
    basePath,
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
        return system.newLine;
      },

      useCaseSensitiveFileNames() {
        return system.useCaseSensitiveFileNames;
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

      readDirectory: system.readDirectory,

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
        const cacheKey = normalizePath(filename);
        let snapshot = snapshotCache.get(cacheKey);
        if (!snapshot) {
          const doc = documents.get(filenameToURI(filename));
          if (!doc) return;
          snapshot = ts.ScriptSnapshot.fromString(doc.getText());
          snapshotCache.set(cacheKey, snapshot);
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

  projectCache.set(basePath, tsProject);
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

export { ScriptService as default };
