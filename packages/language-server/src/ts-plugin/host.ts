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
  cache: Map<string, ExtractedSnapshot>,
  host: ts.LanguageServiceHost
) {
  const projectTypeLibs = getProjectTypeLibs(
    getMarkoProject(host.getCurrentDirectory()),
    ts,
    host
  );

  const isMarkoTSFile = (fileName: string) =>
    getScriptLang(fileName, ts, host, scriptLang) === ScriptLang.ts;

  /**
   * Ensure the Marko runtime definitions are always loaded.
   */
  const getScriptFileNames = host.getScriptFileNames.bind(host);
  host.getScriptFileNames = () => [
    ...new Set([
      ...getScriptFileNames(),
      projectTypeLibs.internalTypesFile,
      projectTypeLibs.markoTypesFile,
    ]),
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
        const markoProject = getMarkoProject(path.dirname(filename));
        cached = extractScript({
          ts,
          parsed: parse(code, filename),
          lookup: markoProject.lookup,
          scriptLang: getScriptLang(filename, ts, host, scriptLang),
          runtimeTypesCode: projectTypeLibs.markoTypesCode,
          componentFilename: getComponentFilename(filename, host),
        }) as ExtractedSnapshot;

        cached.snapshot = ts.ScriptSnapshot.fromString(cached.toString());
        cache.set(filename, cached);
      }

      return cached.snapshot;
    }

    return getScriptSnapshot(filename);
  };

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
      const resolvedModules: (
        | ts.ResolvedModuleFull
        | ts.ResolvedModule
        | undefined
      )[] = resolveModuleNames(
        moduleNames,
        containingFile,
        reusedNames,
        redirectedReference,
        options,
        sourceFile
      );

      for (let i = resolvedModules.length; i--; ) {
        const moduleName = moduleNames[i];
        if (!resolvedModules[i] && markoExtReg.test(moduleName)) {
          if (fsPathReg.test(moduleName)) {
            // For fs paths just see if it exists on disk.
            const resolvedFileName = path.resolve(
              containingFile,
              "..",
              moduleName
            );
            if (host.fileExists(resolvedFileName)) {
              resolvedModules[i] = {
                resolvedFileName,
                extension: isMarkoTSFile(resolvedFileName)
                  ? ts.Extension.Ts
                  : ts.Extension.Js,
                isExternalLibraryImport: false,
              };
            }
          } else if (moduleName[0] !== "*") {
            // For other paths we treat it as a node_module and try resolving
            // that modules `marko.json`. If the `marko.json` exists then we'll
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
              const resolvedFileName = path.join(
                resolvedModule.resolvedFileName,
                "..",
                relativeModulePath
              );
              if (host.fileExists(resolvedFileName)) {
                const isTS = isMarkoTSFile(resolvedFileName);
                resolvedModules[i] = {
                  resolvedFileName,
                  extension: isTS ? ts.Extension.Ts : ts.Extension.Js,
                  isExternalLibraryImport: isTS,
                };
              }
            }
          }
        }
      }

      return resolvedModules;
    };
  }

  return host;
}
