import path from "path";
import { parse } from "../utils/parser";
import type { Extracted } from "../utils/extractor";
import { PartialTagDef, extractScripts } from "../service/script/extract";

const markoExt = ".marko";
const markoExtReg = /\.marko$/;
const modulePartsReg = /^((?:@([^/]+).)?(?:[^/]+))(.*)$/;
const htmlTagNameReg =
  /^(?:a(?:(?:bbr|cronym|ddress|pplet|r(?:ea|ticle)|side|udio))?|b(?:(?:ase(?:font)?|d[io]|gsound|ig|l(?:ink|ockquote)|ody|r|utton))?|c(?:a(?:nvas|ption)|enter|ite|o(?:de|l(?:group)?|mmand|ntent))|d(?:ata(?:list)?|d|e(?:l|tails)|fn|i(?:alog|r|v)|l|t)|e(?:lement|m(?:bed)?)|f(?:i(?:eldset|g(?:caption|ure))|o(?:nt|oter|rm)|rame(?:set)?)|h(?:1|2|3|4|5|6|ead(?:er)?|group|r|tml)|i(?:(?:frame|m(?:age|g)|n(?:put|s)|sindex))?|k(?:bd|eygen)|l(?:abel|egend|i(?:(?:nk|sting))?)|m(?:a(?:in|p|r(?:k|quee)|th)|e(?:nu(?:item)?|t(?:a|er))|ulticol)|n(?:av|extid|o(?:br|embed|frames|script))|o(?:bject|l|pt(?:group|ion)|utput)|p(?:(?:aram|icture|laintext|r(?:e|ogress)))?|q|r(?:bc?|p|tc?|uby)|s(?:(?:amp|cript|e(?:ction|lect)|hadow|lot|mall|ource|pa(?:cer|n)|t(?:r(?:ike|ong)|yle)|u(?:b|mmary|p)|vg))?|t(?:able|body|d|e(?:mplate|xtarea)|foot|h(?:ead)?|i(?:me|tle)|r(?:ack)?|t)|ul?|v(?:ar|ideo)|wbr|xmp)$/;
const configuredProjects = new WeakSet<
  import("typescript/lib/tsserverlibrary").server.Project
>();

interface ExtractedSnapshot extends Extracted {
  snapshot: ts.IScriptSnapshot;
}

export function init({
  typescript: ts,
}: {
  typescript: typeof import("typescript/lib/tsserverlibrary");
}): ts.server.PluginModule {
  return {
    getExternalFiles(project) {
      return project
        .getFileNames(true, true)
        .filter((it) => markoExtReg.test(it));
    },
    create(info) {
      const { project, languageService: ls, languageServiceHost: lsh } = info;
      const { projectService: ps } = project;

      if (!configuredProjects.has(project)) {
        // The first time we install the plugin we update the config to allow `.marko` extensions.
        // This will cause the plugin to be called again, so we check that the extension is not already added.
        configuredProjects.add(project);
        ps.setHostConfiguration({
          extraFileExtensions: (
            (ps as any).hostConfiguration?.extraFileExtensions || []
          ).concat({
            extension: markoExt,
            isMixedContent: false,
            scriptKind: ts.ScriptKind.Deferred,
          }),
        });

        // This will invalidate the plugin so we early return.
        return ls;
      }

      const { canonicalConfigFilePath } =
        info.project as ts.server.ConfiguredProject;
      const markoScriptKind = /[/\\]tsconfig.json$/.test(
        canonicalConfigFilePath || ""
      )
        ? // If we have a `tsconfig.json` then Marko files will be processed as ts, otherwise js.
          ts.ScriptKind.TS
        : ts.ScriptKind.JS;
      const snapshotCache = new Map<string, ExtractedSnapshot>();

      /**
       * SourceFile is used to store metadata about any file processed by TypeScript.
       * We patch this to ensure that methods which return line/character info point to the original Marko file.
       */
      const {
        createLanguageServiceSourceFile,
        updateLanguageServiceSourceFile,
      } = ts;
      ts.createLanguageServiceSourceFile = (
        fileName,
        scriptSnapshot,
        scriptTargetOrOptions,
        version,
        setNodeParents,
        scriptKind
      ) => {
        const sourceFile = createLanguageServiceSourceFile(
          fileName,
          scriptSnapshot,
          scriptTargetOrOptions,
          version,
          setNodeParents,
          scriptKind
        );

        const extracted = snapshotCache.get(fileName);

        if (extracted) {
          patchExtractedSourceFile(sourceFile, extracted);
        }

        return sourceFile;
      };

      ts.updateLanguageServiceSourceFile = (
        sourceFile,
        scriptSnapshot,
        version,
        textChangeRange,
        aggressiveChecks
      ) => {
        const updatedSourceFile = updateLanguageServiceSourceFile(
          sourceFile,
          scriptSnapshot,
          version,
          textChangeRange,
          aggressiveChecks
        );

        const extracted = snapshotCache.get(sourceFile.fileName);

        if (extracted) {
          patchExtractedSourceFile(sourceFile, extracted);
        }

        return updatedSourceFile;
      };

      /**
       * Here we invalidate our snapshot cache when TypeScripy invalidates the file.
       */
      const onSourceFileChanged = (ps as any).onSourceFileChanged;
      (ps as any).onSourceFileChanged = (
        info: ts.server.ScriptInfo,
        eventKind: ts.FileWatcherEventKind
      ) => {
        snapshotCache.delete(info.fileName);
        return onSourceFileChanged(info, eventKind);
      };

      /**
       * Trick TypeScript into thinking Marko files are TS/JS files.
       */
      const getScriptKind = lsh.getScriptKind!.bind(lsh);
      lsh.getScriptKind = (fileName: string) => {
        return markoExtReg.test(fileName)
          ? markoScriptKind
          : getScriptKind(fileName);
      };

      /**
       * A script snapshot is an immuatble string of text representing the contents of a file.
       * We patch it so that Marko files instead return their extracted ts code.
       */
      const getScriptSnapshot = lsh.getScriptSnapshot!.bind(lsh);
      lsh.getScriptSnapshot = (fileName: string) => {
        if (markoExtReg.test(fileName)) {
          let cached = snapshotCache.get(fileName);
          if (!cached) {
            const code = lsh.readFile(fileName, "utf-8") || "";
            cached = extractScripts(
              code,
              fileName,
              parse(code),
              getTagDef
            ) as ExtractedSnapshot;

            cached.snapshot = ts.ScriptSnapshot.fromString(cached.generated);
            snapshotCache.set(fileName, cached);
          }

          return cached.snapshot;
        }

        return getScriptSnapshot(fileName);
      };

      /**
       * This ensures that any directory reads with specific file extensions also include Marko.
       * It is used for example when completing the `from` property of the `import` statement.
       */
      const readDirectory = lsh.readDirectory!.bind(lsh);
      lsh.readDirectory = (path, extensions, exclude, include, depth) => {
        return readDirectory(
          path,
          extensions?.concat(markoExt),
          exclude,
          include,
          depth
        );
      };

      /**
       * TypeScript doesn't know how to resolve `.marko` files.
       * Below we first try to use TypeScripts normal resolution, and then fallback
       * to seeing if a `.marko` file exists at the same location.
       */
      const resolveModuleNames = lsh.resolveModuleNames!.bind(lsh);
      lsh.resolveModuleNames = (
        moduleNames,
        containingFile,
        reusedNames,
        redirectedReference,
        options,
        sourceFile
      ) => {
        const resolvedModules: (
          | ts.ResolvedModuleFull
          | ts.ResolvedModule
          | undefined
        )[] = resolveModuleNames!(
          moduleNames,
          containingFile,
          reusedNames,
          redirectedReference,
          options,
          sourceFile
        );

        for (let i = resolveModuleNames.length; i--; ) {
          const moduleName = moduleNames[i];
          if (!resolvedModules[i] && markoExtReg.test(moduleName)) {
            if (moduleName[0] === ".") {
              // For relative paths just see if it exists on disk.
              const resolvedFileName = path.resolve(
                containingFile,
                "..",
                moduleName
              );
              if (lsh.fileExists(resolvedFileName)) {
                resolvedModules[i] = {
                  resolvedFileName,
                  extension: ts.Extension.Ts,
                  isExternalLibraryImport: false,
                };
              }
            } else {
              // For other paths we treat it as a node_module and try resolving
              // that modules `marko.json`. If the `marko.json` exists then we'll
              // try resolving the `.marko` file relative to that.
              const [, nodeModuleName, relativeModulePath] =
                modulePartsReg.exec(moduleName)!;
              const [resolvedModule] = resolveModuleNames(
                [`${nodeModuleName}/marko.json`],
                containingFile,
                reusedNames,
                redirectedReference,
                options,
                sourceFile
              );

              if (resolvedModule) {
                const resolvedFileName = path.join(
                  resolvedModule.resolvedFileName,
                  "..",
                  relativeModulePath
                );
                if (lsh.fileExists(resolvedFileName)) {
                  resolvedModules[i] = {
                    resolvedFileName,
                    extension: ts.Extension.Ts,
                    isExternalLibraryImport: true,
                  };
                }
              }
            }
          }
        }

        return resolvedModules;
      };

      const findReferences = ls.findReferences!.bind(ls);
      ls.findReferences = (fileName, position) => {
        const original = findReferences(fileName, position);
        if (!original) return;

        const result: ts.ReferencedSymbol[] = [];
        for (const referenced of original) {
          let definition: ts.ReferencedSymbolDefinitionInfo | undefined =
            referenced.definition;
          const defExtracted = snapshotCache.get(definition.fileName);

          if (defExtracted) {
            definition = mapReferencedSymbolDefinitionInfo(
              defExtracted,
              definition
            );
            if (!definition) continue;
          }

          const references: ts.ReferencedSymbolEntry[] = [];
          for (const ref of referenced.references) {
            const refExtracted = snapshotCache.get(ref.fileName);
            if (refExtracted) {
              const mappedRef = mapReferencedSymbolEntry(refExtracted, ref);
              if (mappedRef) references.push(mappedRef);
            } else {
              references.push(ref);
            }
          }

          result.push({
            definition,
            references,
          });
        }

        return result;
      };

      return ls;
    },
  };
}

/**
 * Patches the `sourceFile` (which uses our extracted ts/js from the Marko code)
 * to source map back to the original Marko file.
 */
function patchExtractedSourceFile(
  sourceFile: ts.SourceFile,
  extracted: Extracted
) {
  sourceFile.getLineAndCharacterOfPosition = (generatedOffset) => {
    return (
      extracted.sourcePositionAt(generatedOffset) || {
        line: 0,
        character: 0,
      }
    );
  };
}

function mapReferencedSymbolDefinitionInfo(
  extracted: ExtractedSnapshot,
  info: ts.ReferencedSymbolDefinitionInfo
) {
  const textSpan = sourceTextSpan(extracted, info.textSpan);
  if (!textSpan) return;

  // todo: originalFile

  return {
    ...info,
    textSpan,
    contextSpan:
      info.contextSpan && sourceTextSpan(extracted, info.contextSpan),
  };
}

function mapReferencedSymbolEntry(
  extracted: ExtractedSnapshot,
  entry: ts.ReferencedSymbolEntry
) {
  const textSpan = sourceTextSpan(extracted, entry.textSpan);
  if (!textSpan) return;

  // todo: originalFile

  return {
    ...entry,
    textSpan,
    contextSpan:
      entry.contextSpan && sourceTextSpan(extracted, entry.contextSpan),
  };
}

function sourceTextSpan(
  extracted: Extracted,
  { start, length }: ts.TextSpan
): ts.TextSpan | undefined {
  const sourceStart = extracted.sourceOffsetAt(start);
  if (sourceStart !== undefined) {
    return {
      start: sourceStart,
      length,
    };
  }
}

function getTagDef(name: string): PartialTagDef {
  return {
    html: htmlTagNameReg.test(name),
    filename: undefined,
  };
}
