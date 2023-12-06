import type ts from "typescript/lib/tsserverlibrary";
import { Extracted, Processors, Project } from "@marko/language-tools";
import { START_POSITION } from "../utils/constants";
import { ExtractedSnapshot, patch } from "./host";
import "../utils/project-defaults";

const markoTaglibFilesReg = /[\\/]marko(?:-tag)\.json$/;
const getStartLineCharacter = () => START_POSITION;
// TODO: improve the import name for Marko components.

export interface InitOptions {
  typescript: typeof ts;
}

export function init({ typescript: ts }: InitOptions): ts.server.PluginModule {
  return {
    getExternalFiles(project) {
      return project
        .getFileNames(false, true)
        .filter((it) => Processors.has(it));
    },
    create(info) {
      const {
        project: tsProject,
        languageService: ls,
        languageServiceHost: lsh,
      } = info;

      try {
        const { projectService: ps } = tsProject;
        const extraExtensions = (ps as any)?.hostConfiguration
          ?.extraFileExtensions;

        if (extraExtensions) {
          let processedExtCount = 0;
          for (const { extension } of extraExtensions) {
            if (Processors.extensions.includes(extension)) processedExtCount++;
          }

          if (processedExtCount !== Processors.extensions.length) {
            // The first time we install the plugin we update the config to allow our processed extensions.
            // This will cause the plugin to be called again, so we check that the extension is not already added.
            ps.setHostConfiguration({
              extraFileExtensions: extraExtensions.concat(
                Processors.extensions.map((extension) => ({
                  extension,
                  isMixedContent: false,
                  scriptKind: ts.ScriptKind.Deferred,
                })),
              ),
            });
          }
        }

        const extractCache = new Map<string, ExtractedSnapshot>();
        patch(
          ts,
          (tsProject as ts.server.ConfiguredProject).canonicalConfigFilePath,
          extractCache,
          (tsProject as any).getModuleResolutionCache(),
          lsh,
          ps,
        );

        /**
         * Here we invalidate our snapshot cache when TypeScript invalidates the file.
         */
        const onSourceFileChanged = (ps as any).onSourceFileChanged?.bind(ps);

        if (onSourceFileChanged) {
          (ps as any).onSourceFileChanged = (
            info: ts.server.ScriptInfo,
            eventKind: ts.FileWatcherEventKind,
          ) => {
            if (markoTaglibFilesReg.test(info.fileName)) {
              Project.clearCaches();
            }

            extractCache.delete(info.fileName);
            return onSourceFileChanged(info, eventKind);
          };
        }

        /**
         * Whenever TypeScript requests line/character info we return with the source
         * file line/character if it exists.
         */
        const toLineColumnOffset = (
          ls.toLineColumnOffset || getStartLineCharacter
        ).bind(ls);
        ls.toLineColumnOffset = (fileName, pos) => {
          if (pos === 0) return START_POSITION;

          const extracted = extractCache.get(fileName);
          if (extracted) {
            return extracted.sourcePositionAt(pos) || START_POSITION;
          }

          return toLineColumnOffset(fileName, pos);
        };

        const findReferences = ls.findReferences.bind(ls);
        ls.findReferences = (fileName, position) => {
          const symbols = findReferences(fileName, position);
          if (!symbols) return;

          const result: ts.ReferencedSymbol[] = [];
          for (const symbol of symbols) {
            let definition: ts.ReferencedSymbolDefinitionInfo | undefined =
              symbol.definition;
            const defExtracted = extractCache.get(definition.fileName);

            if (defExtracted) {
              definition = mapTextSpans(defExtracted, definition);
              if (!definition) continue;
            }

            const references: ts.ReferencedSymbolEntry[] = [];
            for (const reference of symbol.references) {
              const refExtracted = extractCache.get(reference.fileName);
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

        const findRenameLocations = ls.findRenameLocations.bind(ls);
        ls.findRenameLocations = (
          fileName,
          position,
          findInStrings,
          findInComments,
          preferences,
        ) => {
          const renames = findRenameLocations(
            fileName,
            position,
            findInStrings,
            findInComments,
            preferences as any,
          );
          if (!renames) return;

          const result: ts.RenameLocation[] = [];
          for (const rename of renames) {
            const extracted = extractCache.get(rename.fileName);
            if (extracted) {
              const updated = mapTextSpans(extracted, rename);
              if (updated) result.push(updated);
            } else {
              result.push(rename);
            }
          }

          return result;
        };
      } catch (err) {
        console.error(err);
      }

      return ls;
    },
  };
}

function mapTextSpans<
  T extends {
    textSpan: ts.TextSpan;
    contextSpan?: ts.TextSpan;
  },
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
  { start, length }: ts.TextSpan,
): ts.TextSpan | undefined {
  const sourceStart = extracted.sourceOffsetAt(start);
  if (sourceStart !== undefined) {
    return {
      start: sourceStart,
      length,
    };
  }
}
