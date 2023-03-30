import path from "path";
import type ts from "typescript/lib/tsserverlibrary";
import {
  type Extracted,
  Processors,
  getExt,
  isDefinitionFile,
} from "@marko/language-tools";

const fsPathReg = /^(?:[./\\]|[A-Z]:)/i;
const modulePartsReg = /^((?:@(?:[^/]+)\/)?(?:[^/]+))(.*)$/;

export interface ExtractedSnapshot extends Extracted {
  snapshot: ts.IScriptSnapshot;
}

export function patch(
  ts: typeof import("typescript/lib/tsserverlibrary"),
  configFile: string | undefined,
  extractCache: Map<
    string,
    ExtractedSnapshot | { snapshot: ts.IScriptSnapshot }
  >,
  resolutionCache: ts.ModuleResolutionCache | undefined,
  host: ts.LanguageServiceHost,
  ps?: InstanceType<typeof ts.server.ProjectService>
) {
  const processors = Processors.create({
    ts,
    host,
    configFile,
  });
  const rootNames = Object.values(processors)
    .map((processor) => processor.getRootNames?.())
    .flat()
    .filter(Boolean) as string[];

  /**
   * Ensure the processor runtime definitions are always loaded.
   */
  const getScriptFileNames = host.getScriptFileNames.bind(host);
  host.getScriptFileNames = () => [
    ...new Set(rootNames.concat(getScriptFileNames())),
  ];

  /**
   * Trick TypeScript into thinking Marko files are TS/JS files.
   */
  const getScriptKind = host.getScriptKind?.bind(host);
  if (getScriptKind) {
    host.getScriptKind = (fileName: string) => {
      const processor = getProcessor(fileName);
      if (processor) return processor.getScriptKind(fileName);
      return getScriptKind(fileName);
    };
  }

  /**
   * A script snapshot is an immutable string of text representing the contents of a file.
   * We patch it so that Marko files instead return their extracted ts code.
   */
  const getScriptSnapshot = host.getScriptSnapshot.bind(host);
  host.getScriptSnapshot = (fileName: string) => {
    const processor = getProcessor(fileName);
    if (processor) {
      let cached = extractCache.get(fileName);
      if (!cached) {
        const code = host.readFile(fileName, "utf-8") || "";

        try {
          cached = processor.extract(fileName, code) as ExtractedSnapshot;
          cached.snapshot = ts.ScriptSnapshot.fromString(cached.toString());
        } catch {
          cached = { snapshot: ts.ScriptSnapshot.fromString("") };
        }

        // Ensure the project service knows about the file.
        // Without this the project never registers a `ScriptInfo`.
        // TODO: maybe we should patch readFile instead of getScriptSnapshot?

        ps?.getOrCreateScriptInfoForNormalizedPath(
          fileName as any,
          false,
          undefined,
          ts.ScriptKind.Deferred,
          false,
          host
        );

        extractCache.set(fileName, cached);
      }

      return cached.snapshot;
    }

    return getScriptSnapshot(fileName);
  };

  if (host.getProjectVersion) {
    const getScriptVersion = host.getScriptVersion.bind(host);
    host.getScriptVersion = (fileName: string) => {
      const processor = getProcessor(fileName);
      if (processor) return host.getProjectVersion!();
      return getScriptVersion(fileName);
    };
  }

  /**
   * This ensures that any directory reads with specific file extensions also include Marko.
   * It is used for example when completing the `from` property of the `import` statement.
   */
  const readDirectory = host.readDirectory?.bind(host);
  if (readDirectory) {
    host.readDirectory = (path, extensions, exclude, include, depth) => {
      return readDirectory(
        path,
        extensions?.concat(Processors.extensions),
        exclude,
        include,
        depth
      );
    };
  }

  /**
   * TypeScript doesn't know how to resolve `.marko` files.
   * Below we first try to use TypeScripts normal resolution, and then fallback
   * to seeing if a `.marko` file exists at the same location.
   */
  const resolveModuleNameLiterals = host.resolveModuleNameLiterals?.bind(host);

  if (resolveModuleNameLiterals) {
    host.resolveModuleNameLiterals = (
      moduleLiterals,
      containingFile,
      redirectedReference,
      options,
      containingSourceFile,
      reusedNames
    ) => {
      let normalModuleLiterals = moduleLiterals as ts.StringLiteralLike[];
      let resolvedModules:
        | undefined
        | (ts.ResolvedModuleWithFailedLookupLocations | undefined)[];

      for (let i = 0; i < moduleLiterals.length; i++) {
        const moduleName = moduleLiterals[i].text;
        const processor =
          moduleName[0] !== "*" ? getProcessor(moduleName) : undefined;
        if (processor) {
          let resolvedFileName: string | undefined;
          if (fsPathReg.test(moduleName)) {
            // For fs paths just see if it exists on disk.
            resolvedFileName = path.resolve(containingFile, "..", moduleName);
          } else {
            // For other paths we treat it as a node_module and try resolving
            // that modules `package.json`. If the `package.json` exists then we'll
            // try resolving the `.marko` file relative to that.
            const [, nodeModuleName, relativeModulePath] =
              modulePartsReg.exec(moduleName)!;
            const { resolvedModule } = ts.bundlerModuleNameResolver(
              `${nodeModuleName}/package.json`,
              containingFile,
              options,
              host,
              resolutionCache
            );

            if (resolvedModule) {
              resolvedFileName = path.join(
                resolvedModule.resolvedFileName,
                "..",
                relativeModulePath
              );
            }
          }

          if (!resolvedModules) {
            resolvedModules = [];
            normalModuleLiterals = [];
            for (let j = 0; j < i; j++) {
              resolvedModules.push(undefined);
              normalModuleLiterals.push(moduleLiterals[j]);
            }
          }

          if (resolvedFileName) {
            if (isDefinitionFile(resolvedFileName)) {
              if (!host.fileExists(resolvedFileName)) {
                resolvedFileName = undefined;
              }
            } else {
              const ext = getExt(resolvedFileName)!;
              const definitionFile = `${resolvedFileName.slice(
                0,
                -ext.length
              )}.d${ext}`;
              if (host.fileExists(definitionFile)) {
                resolvedFileName = definitionFile;
              } else if (!host.fileExists(resolvedFileName)) {
                resolvedFileName = undefined;
              }
            }
          }

          resolvedModules.push({
            resolvedModule: resolvedFileName
              ? {
                  resolvedFileName,
                  extension: processor.getScriptExtension(resolvedFileName),
                  isExternalLibraryImport: false,
                }
              : undefined,
          });
        } else if (resolvedModules) {
          resolvedModules.push(undefined);
        }
      }

      const normalResolvedModules = normalModuleLiterals.length
        ? resolveModuleNameLiterals(
            normalModuleLiterals,
            containingFile,
            redirectedReference,
            options,
            containingSourceFile,
            reusedNames
          )
        : undefined;

      if (resolvedModules) {
        if (normalResolvedModules) {
          for (let i = 0, j = 0; i < resolvedModules.length; i++) {
            if (!resolvedModules[i]) {
              resolvedModules[i] = normalResolvedModules[j++];
            }
          }
        }
        return resolvedModules as readonly ts.ResolvedModuleWithFailedLookupLocations[];
      } else {
        return normalResolvedModules!;
      }
    };
  }

  return host;

  function getProcessor(fileName: string) {
    const ext = getExt(fileName);
    return ext ? processors[ext] : undefined;
  }
}
