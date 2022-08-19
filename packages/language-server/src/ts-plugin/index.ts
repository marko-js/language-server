import path from "path";
const markoExt = ".marko";
const markoExtReg = /\.marko$/;
const modulePartsReg = /^((?:@([^/]+).)?(?:[^/]+))(.*)/;
const configuredProjects = new WeakSet<
  import("typescript/lib/tsserverlibrary").server.Project
>();

// TODO:
// track file move/remove/change and update snapshot cache.

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
      //   return createLanguageServiceSourceFile(
      //     fileName,
      //     scriptSnapshot,
      //     scriptTargetOrOptions,
      //     version,
      //     setNodeParents,
      //     scriptKind
      //   );
      // };

      // ts.updateLanguageServiceSourceFile = (
      //   sourceFile,
      //   scriptSnapshot,
      //   version,
      //   textChangeRange,
      //   aggressiveChecks
      // ) => {
      //   debugger;
      //   return updateLanguageServiceSourceFile(
      //     sourceFile,
      //     scriptSnapshot,
      //     version,
      //     textChangeRange,
      //     aggressiveChecks
      //   );
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
            cached = ts.ScriptSnapshot.fromString("export default 1");
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
              resolvedModules[i] = {
                resolvedFileName: path.resolve(
                  containingFile,
                  "..",
                  moduleName
                ),
                extension: ts.Extension.Dts,
                isExternalLibraryImport: false,
              };
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
                resolvedModules[i] = {
                  resolvedFileName: path.join(
                    resolvedModule.resolvedFileName,
                    "..",
                    relativeModulePath
                  ),
                  extension: ts.Extension.Dts,
                  isExternalLibraryImport: true,
                };
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
