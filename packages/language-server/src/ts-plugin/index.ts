import path from "path";
import { parse } from "../utils/parser";
import { START_POSITION } from "../utils/constants";
import type { Extracted } from "../utils/extractor";
import { extractScripts } from "../service/script/extract";
import { getMarkoProject } from "../utils/project";

const markoExt = ".marko";
const markoExtReg = /\.marko$/;
const modulePartsReg = /^((?:@([^/]+).)?(?:[^/]+))(.*)$/;
const configuredProjects = new WeakSet<
  import("typescript/lib/tsserverlibrary").server.Project
>();
const getStartLineCharacter = () => START_POSITION;
// TODO: improve the import name for Marko components.

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
      const {
        project: tsProject,
        languageService: ls,
        languageServiceHost: lsh,
      } = info;
      const { projectService: ps } = tsProject;

      if (!configuredProjects.has(tsProject)) {
        // The first time we install the plugin we update the config to allow `.marko` extensions.
        // This will cause the plugin to be called again, so we check that the extension is not already added.
        configuredProjects.add(tsProject);
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
        tsProject as ts.server.ConfiguredProject;
      const markoScriptKind = /[/\\]tsconfig.json$/.test(
        canonicalConfigFilePath || ""
      )
        ? // If we have a `tsconfig.json` then Marko files will be processed as ts, otherwise js.
          ts.ScriptKind.TS
        : ts.ScriptKind.JS;
      const snapshotCache = new Map<string, ExtractedSnapshot>();

      /**
       * Here we invalidate our snapshot cache when TypeScript invalidates the file.
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
       * Whenever TypeScript requests line/character info we return with the source
       * file line/character if it exists.
       */
      const { toLineColumnOffset = getStartLineCharacter } = ls;
      ls.toLineColumnOffset = (fileName, pos) => {
        if (pos === 0) return START_POSITION;

        const extracted = snapshotCache.get(fileName);
        if (extracted) {
          return extracted.sourcePositionAt(pos) || START_POSITION;
        }

        return toLineColumnOffset(fileName, pos);
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
      lsh.getScriptSnapshot = (filename: string) => {
        if (markoExtReg.test(filename)) {
          let cached = snapshotCache.get(filename);
          if (!cached) {
            const code = lsh.readFile(filename, "utf-8") || "";
            const markoProject = getMarkoProject(path.dirname(filename));
            cached = extractScripts({
              code,
              filename,
              parsed: parse(code),
              project: markoProject,
            }) as ExtractedSnapshot;

            cached.snapshot = ts.ScriptSnapshot.fromString(cached.generated);
            snapshotCache.set(filename, cached);
          }

          return cached.snapshot;
        }

        return getScriptSnapshot(filename);
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

      const { findReferences } = ls;
      ls.findReferences = (fileName, position) => {
        const symbols = findReferences(fileName, position);
        if (!symbols) return;

        const result: ts.ReferencedSymbol[] = [];
        for (const symbol of symbols) {
          let definition: ts.ReferencedSymbolDefinitionInfo | undefined =
            symbol.definition;
          const defExtracted = snapshotCache.get(definition.fileName);

          if (defExtracted) {
            definition = mapTextSpans(defExtracted, definition);
            if (!definition) continue;
          }

          const references: ts.ReferencedSymbolEntry[] = [];
          for (const reference of symbol.references) {
            const refExtracted = snapshotCache.get(reference.fileName);
            if (refExtracted) {
              const updated = mapTextSpans(refExtracted, reference);
              if (updated) references.push(updated);
            } else {
              references.push(reference);
            }
          }

          result.push({
            definition,
            references,
          });
        }

        return result;
      };

      const { findRenameLocations } = ls;
      ls.findRenameLocations = (
        fileName,
        position,
        findInStrings,
        findInComments,
        providePrefixAndSuffixTextForRename
      ) => {
        const renames = findRenameLocations(
          fileName,
          position,
          findInStrings,
          findInComments,
          providePrefixAndSuffixTextForRename
        );
        if (!renames) return;

        const result: ts.RenameLocation[] = [];
        for (const rename of renames) {
          const extracted = snapshotCache.get(rename.fileName);
          if (extracted) {
            const updated = mapTextSpans(extracted, rename);
            if (updated) result.push(updated);
          } else {
            result.push(rename);
          }
        }

        return result;
      };

      return ls;
    },
  };
}

function mapTextSpans<
  T extends {
    textSpan: ts.TextSpan;
    contextSpan?: ts.TextSpan;
  }
>(extracted: ExtractedSnapshot, data: T) {
  const textSpan = sourceTextSpan(extracted, data.textSpan);
  if (textSpan) {
    return {
      ...data,
      textSpan,
      contextSpan:
        data.contextSpan && sourceTextSpan(extracted, data.contextSpan),
    };
  }
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
