import path from "path";
import { parse } from "../utils/parser";
import { PartialTagDef, extractScripts } from "../service/script/extract";

const markoExt = ".marko";
const markoExtReg = /\.marko$/;
const modulePartsReg = /^((?:@([^/]+).)?(?:[^/]+))(.*)$/;
const htmlTagNameReg =
  /^(?:a(?:(?:bbr|cronym|ddress|pplet|r(?:ea|ticle)|side|udio))?|b(?:(?:ase(?:font)?|d[io]|gsound|ig|l(?:ink|ockquote)|ody|r|utton))?|c(?:a(?:nvas|ption)|enter|ite|o(?:de|l(?:group)?|mmand|ntent))|d(?:ata(?:list)?|d|e(?:l|tails)|fn|i(?:alog|r|v)|l|t)|e(?:lement|m(?:bed)?)|f(?:i(?:eldset|g(?:caption|ure))|o(?:nt|oter|rm)|rame(?:set)?)|h(?:1|2|3|4|5|6|ead(?:er)?|group|r|tml)|i(?:(?:frame|m(?:age|g)|n(?:put|s)|sindex))?|k(?:bd|eygen)|l(?:abel|egend|i(?:(?:nk|sting))?)|m(?:a(?:in|p|r(?:k|quee)|th)|e(?:nu(?:item)?|t(?:a|er))|ulticol)|n(?:av|extid|o(?:br|embed|frames|script))|o(?:bject|l|pt(?:group|ion)|utput)|p(?:(?:aram|icture|laintext|r(?:e|ogress)))?|q|r(?:bc?|p|tc?|uby)|s(?:(?:amp|cript|e(?:ction|lect)|hadow|lot|mall|ource|pa(?:cer|n)|t(?:r(?:ike|ong)|yle)|u(?:b|mmary|p)|vg))?|t(?:able|body|d|e(?:mplate|xtarea)|foot|h(?:ead)?|i(?:me|tle)|r(?:ack)?|t)|ul?|v(?:ar|ideo)|wbr|xmp)$/;
const configuredProjects = new WeakSet<
  import("typescript/lib/tsserverlibrary").server.Project
>();

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
        ? ts.ScriptKind.TS
        : ts.ScriptKind.JS;
      const snapshotCache = new Map<string, ts.IScriptSnapshot>();

      // const {
      //   createLanguageServiceSourceFile,
      //   updateLanguageServiceSourceFile,
      // } = ts;
      // ts.createLanguageServiceSourceFile = (
      //   fileName,
      //   scriptSnapshot,
      //   scriptTargetOrOptions,
      //   version,
      //   setNodeParents,
      //   scriptKind
      // ) => {
      //   if (markoExtReg.test(fileName)) {
      //     debugger;
      //   }

      //   const sourceFile = createLanguageServiceSourceFile(
      //     fileName,
      //     scriptSnapshot,
      //     scriptTargetOrOptions,
      //     version,
      //     setNodeParents,
      //     scriptKind
      //   );

      //   if (markoExtReg.test(fileName)) {
      //     debugger;
      //   }

      //   return sourceFile;
      // };

      // ts.updateLanguageServiceSourceFile = (
      //   sourceFile,
      //   scriptSnapshot,
      //   version,
      //   textChangeRange,
      //   aggressiveChecks
      // ) => {
      //   const updatedSourceFile = updateLanguageServiceSourceFile(
      //     sourceFile,
      //     scriptSnapshot,
      //     version,
      //     textChangeRange,
      //     aggressiveChecks
      //   );

      //   if (markoExtReg.test(sourceFile.fileName)) {
      //     debugger;
      //   }

      //   return updatedSourceFile;
      // };

      const onSourceFileChanged = (ps as any).onSourceFileChanged;
      (ps as any).onSourceFileChanged = (
        info: ts.server.ScriptInfo,
        eventKind: ts.FileWatcherEventKind
      ) => {
        snapshotCache.delete(info.fileName);
        return onSourceFileChanged(info, eventKind);
      };

      const getScriptKind = lsh.getScriptKind!.bind(lsh);
      lsh.getScriptKind = (fileName: string) => {
        return markoExtReg.test(fileName)
          ? markoScriptKind
          : getScriptKind(fileName);
      };

      const getScriptSnapshot = lsh.getScriptSnapshot!.bind(lsh);
      lsh.getScriptSnapshot = (fileName: string) => {
        if (markoExtReg.test(fileName)) {
          let cached = snapshotCache.get(fileName);
          if (!cached) {
            let code = lsh.readFile(fileName, "utf-8") || "";
            if (code) {
              const extracted = extractScripts(
                code,
                fileName,
                parse(code),
                getTagDef
              );

              code = extracted.generated;
            }

            cached = ts.ScriptSnapshot.fromString(code);
            snapshotCache.set(fileName, cached);
          }

          return cached;
        }

        return getScriptSnapshot(fileName);
      };

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
              const [, nodeModuleName, relativeModulePath] =
                modulePartsReg.exec(moduleName)!;
              const [resolvedModule] = resolveModuleNames(
                [`${nodeModuleName}/package.json`],
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

      return ls;
    },
  };
}

function getTagDef(name: string): PartialTagDef {
  return {
    html: htmlTagNameReg.test(name),
    filename: undefined,
  };
}
