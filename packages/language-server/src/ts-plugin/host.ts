import path from "path";
import {
  type Extracted,
  ScriptLang,
  extractScript,
  parse,
} from "@marko/language-tools";
import { getMarkoProject } from "../utils/project";
import getProjectTypeLibs from "../utils/get-runtime-types";
import getScriptLang from "../utils/get-script-lang";
import getComponentFilename from "../utils/get-component-filename";

const markoExt = ".marko";
const markoExtReg = /\.marko$/;
const modulePartsReg = /^((?:@(?:[^/]+)\/)?(?:[^/]+))(.*)$/;
const fsPathReg = /^(?:[./\\]|[A-Z]:)/i;

export interface ExtractedSnapshot extends Extracted {
  snapshot: ts.IScriptSnapshot;
}

export function patch(
  ts: typeof import("typescript/lib/tsserverlibrary"),
  scriptLang: ScriptLang,
  cache: Map<string, ExtractedSnapshot | { snapshot: ts.IScriptSnapshot }>,
  host: ts.LanguageServiceHost,
  ps?: ts.server.ProjectService
) {
  const rootDir = host.getCurrentDirectory();
  const projectTypeLibs = getProjectTypeLibs(
    rootDir,
    getMarkoProject(rootDir),
    ts,
    host
  );
  const projectTypeLibsFiles = [
    projectTypeLibs.internalTypesFile,
    projectTypeLibs.markoTypesFile,
  ];

  if (projectTypeLibs.markoRunTypesFile) {
    projectTypeLibsFiles.push(projectTypeLibs.markoRunTypesFile);
  }

  if (projectTypeLibs.markoRunGeneratedTypesFile) {
    projectTypeLibsFiles.push(projectTypeLibs.markoRunGeneratedTypesFile);
  }

  const isMarkoTSFile = (fileName: string) =>
    getScriptLang(fileName, ts, host, scriptLang) === ScriptLang.ts;

  /**
   * Ensure the Marko runtime definitions are always loaded.
   */
  const getScriptFileNames = host.getScriptFileNames.bind(host);
  host.getScriptFileNames = () => [
    ...new Set(projectTypeLibsFiles.concat(getScriptFileNames())),
  ];

  /**
   * Trick TypeScript into thinking Marko files are TS/JS files.
   */
  const getScriptKind = host.getScriptKind?.bind(host);
  if (getScriptKind) {
    host.getScriptKind = (fileName: string) => {
      return markoExtReg.test(fileName)
        ? isMarkoTSFile(fileName)
          ? ts.ScriptKind.TS
          : ts.ScriptKind.JS
        : getScriptKind(fileName);
    };
  }

  /**
   * A script snapshot is an immutable string of text representing the contents of a file.
   * We patch it so that Marko files instead return their extracted ts code.
   */
  const getScriptSnapshot = host.getScriptSnapshot.bind(host);
  host.getScriptSnapshot = (filename: string) => {
    if (markoExtReg.test(filename)) {
      let cached = cache.get(filename);
      if (!cached) {
        const code = host.readFile(filename, "utf-8") || "";
        const dir = path.dirname(filename);

        try {
          const markoProject = getMarkoProject(dir);
          cached = extractScript({
            ts,
            parsed: parse(code, filename),
            lookup: markoProject.getLookup(dir),
            scriptLang: getScriptLang(filename, ts, host, scriptLang),
            runtimeTypesCode: projectTypeLibs.markoTypesCode,
            componentFilename: getComponentFilename(filename),
          }) as ExtractedSnapshot;

          cached.snapshot = ts.ScriptSnapshot.fromString(cached.toString());
        } catch {
          cached = { snapshot: ts.ScriptSnapshot.fromString("") };
        }

        // Ensure the project service knows about the file.
        // Without this the project never registers a `ScriptInfo`.
        // TODO: maybe we should patch readFile instead of getScriptSnapshot?
        ps?.getOrCreateScriptInfoForNormalizedPath(
          filename as any,
          false,
          undefined,
          ts.ScriptKind.Deferred,
          false,
          host
        );

        cache.set(filename, cached);
      }

      return cached.snapshot;
    }

    return getScriptSnapshot(filename);
  };

  if (host.getProjectVersion) {
    const getScriptVersion = host.getScriptVersion.bind(host);
    host.getScriptVersion = (filename: string) => {
      if (markoExtReg.test(filename)) {
        return host.getProjectVersion!();
      }
      return getScriptVersion(filename);
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
        extensions?.concat(markoExt),
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
  const resolveModuleNames = host.resolveModuleNames?.bind(host);

  if (resolveModuleNames) {
    host.resolveModuleNames = (
      moduleNames,
      containingFile,
      reusedNames,
      redirectedReference,
      options,
      sourceFile
    ) => {
      let normalModuleNames = moduleNames;
      let resolvedModules:
        | undefined
        | (ts.ResolvedModule | ts.ResolvedModuleFull | undefined | null)[];

      for (let i = 0; i < moduleNames.length; i++) {
        const moduleName = moduleNames[i];
        const shouldProcess =
          moduleName[0] !== "*" ? markoExtReg.test(moduleName) : undefined;
        if (shouldProcess) {
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
            const { resolvedModule } = ts.resolveModuleName(
              `${nodeModuleName}/package.json`,
              containingFile,
              options,
              host
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
            normalModuleNames = [];
            for (let j = 0; j < i; j++) {
              resolvedModules.push(undefined);
              normalModuleNames.push(moduleNames[j]);
            }
          }

          resolvedModules.push(
            resolvedFileName && host.fileExists(resolvedFileName)
              ? {
                  resolvedFileName,
                  extension: isMarkoTSFile(resolvedFileName)
                    ? ts.Extension.Ts
                    : ts.Extension.Js,
                  isExternalLibraryImport: false,
                }
              : null
          );
        } else if (resolvedModules) {
          resolvedModules.push(undefined);
        }
      }

      const normalResolvedModules = normalModuleNames.length
        ? resolveModuleNames(
            normalModuleNames,
            containingFile,
            reusedNames,
            redirectedReference,
            options,
            sourceFile
          )
        : undefined;

      if (resolvedModules) {
        if (normalResolvedModules) {
          for (let i = 0, j = 0; i < resolvedModules.length; i++) {
            switch (resolvedModules[i]) {
              case undefined:
                resolvedModules[i] = normalResolvedModules[j++];
                break;
              case null:
                resolvedModules[i] = undefined;
                break;
            }
          }
        } else {
          for (let i = resolvedModules.length; i--; ) {
            if (resolvedModules[i] === null) {
              resolvedModules[i] = undefined;
            }
          }
        }
        return resolvedModules as (ts.ResolvedModule | undefined)[];
      } else {
        return normalResolvedModules!;
      }
    };
  }

  return host;
}
