import path from "path";
import type ts from "typescript/lib/tsserverlibrary";

import * as Processors from "../processors";
import { createModuleResolver } from "./module-resolver";

export interface CreateLanguageServiceOptions {
  ts: typeof ts;
  /** Filesystem access for the service, defaults to `ts.sys`. */
  host?: ts.System;
  /**
   * Path to a `tsconfig.json`/`jsconfig.json`. Discovered from the host's
   * current directory when omitted.
   */
  configFile?: string;
  /** Extra compiler options merged over those from the config file. */
  compilerOptions?: ts.CompilerOptions;
}

export interface MarkoLanguageServiceHost {
  /** A host ready to pass to `ts.createLanguageService`. */
  host: ts.LanguageServiceHost;
  /** Adds a file to the program's root file names (deduped). */
  addRootName(fileName: string): void;
  /** The processor responsible for a file, if any. */
  getProcessor(fileName: string): Processors.Processor | undefined;
}

export interface MarkoLanguageService extends Omit<
  MarkoLanguageServiceHost,
  "host"
> {
  service: ts.LanguageService;
}

/**
 * Creates a `ts.LanguageServiceHost` that understands processor files
 * (`.marko`, CSS modules): script snapshots are the extracted TypeScript (a
 * file that fails to parse checks as an empty file), module specifiers resolve
 * through the processors (including `import Tag from "<tag>"`), script
 * versions track the host's modified times so long-lived services pick up
 * edits, and root names are seeded from the processors' own requirements.
 */
export function createLanguageServiceHost(
  options: CreateLanguageServiceOptions,
): MarkoLanguageServiceHost {
  const { ts, host = ts.sys } = options;
  const dir = host.getCurrentDirectory();
  const configFile =
    options.configFile ??
    (ts.findConfigFile(dir, host.fileExists, "tsconfig.json") ||
      ts.findConfigFile(dir, host.fileExists, "jsconfig.json"));
  const processors = Processors.create({ ts, host, configFile });
  const getProcessor = (fileName: string) => {
    const ext = Processors.getProcessorExtension(fileName);
    return ext ? processors[ext] : undefined;
  };

  const compilerOptions: ts.CompilerOptions = {
    ...(configFile
      ? ts.getParsedCommandLineOfConfigFile(configFile, undefined, {
          ...host,
          onUnRecoverableConfigFileDiagnostic() {},
        })?.options
      : undefined),
    ...options.compilerOptions,
    // Processor files must be allowed into the program regardless of the
    // project's own settings, and a service over extracted sources can
    // neither emit nor usefully re-check the libs.
    noEmit: true,
    allowJs: true,
    skipLibCheck: true,
    allowNonTsExtensions: true,
  };
  const resolutionCache = ts.createModuleResolutionCache(
    dir,
    host.useCaseSensitiveFileNames
      ? (fileName) => fileName
      : (fileName) => fileName.toLowerCase(),
    compilerOptions,
  );
  const resolveModuleNameLiterals = createModuleResolver({
    ts,
    host,
    getProcessor,
    resolutionCache,
  });

  const rootNames = new Set(Processors.getRootNames(processors));
  const getScriptVersion = (fileName: string) =>
    `${host.getModifiedTime?.(fileName)?.getTime() ?? 0}`;
  const snapshots = new Map<
    string,
    { version: string; snapshot: ts.IScriptSnapshot }
  >();

  return {
    host: {
      getCompilationSettings: () => compilerOptions,
      getScriptFileNames: () => [...rootNames],
      getScriptVersion,
      getScriptSnapshot(fileName) {
        const version = getScriptVersion(fileName);
        const cached = snapshots.get(fileName);
        if (cached && cached.version === version) return cached.snapshot;

        const code = host.readFile(fileName);
        if (code === undefined) return undefined;

        let extractedCode = code;
        const processor = getProcessor(fileName);
        if (processor) {
          try {
            extractedCode = processor.extract(fileName, code).toString();
          } catch {
            // Parse errors check as an empty file.
            extractedCode = "";
          }
        }

        const snapshot = ts.ScriptSnapshot.fromString(extractedCode);
        snapshots.set(fileName, { version, snapshot });
        return snapshot;
      },
      getScriptKind: (fileName) =>
        getProcessor(fileName)?.getScriptKind(fileName) ??
        ts.ScriptKind.Unknown,
      resolveModuleNameLiterals: (
        moduleLiterals,
        containingFile,
        redirectedReference,
        options,
      ) =>
        resolveModuleNameLiterals(
          moduleLiterals,
          containingFile,
          redirectedReference,
          options,
        ),
      readDirectory: (path, extensions, exclude, include, depth) =>
        host.readDirectory(
          path,
          extensions?.concat(Processors.extensions),
          exclude,
          include,
          depth,
        ),
      readFile: host.readFile,
      fileExists: host.fileExists,
      directoryExists: host.directoryExists,
      getDirectories: host.getDirectories,
      realpath: host.realpath,
      getCurrentDirectory: () => dir,
      getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
      useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames,
    },
    addRootName(fileName) {
      rootNames.add(path.resolve(dir, fileName));
    },
    getProcessor,
  };
}

/**
 * Creates a `ts.LanguageService` over the host from
 * `createLanguageServiceHost`, for tools that need a type checker over
 * processor files without owning any of the host plumbing.
 */
export function createLanguageService(
  options: CreateLanguageServiceOptions,
): MarkoLanguageService {
  const { host, addRootName, getProcessor } =
    createLanguageServiceHost(options);
  return {
    service: options.ts.createLanguageService(host),
    addRootName,
    getProcessor,
  };
}
