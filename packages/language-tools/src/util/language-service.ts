import path from "path";
import type ts from "typescript/lib/tsserverlibrary";

import * as Processors from "../processors";
import { createModuleResolver } from "./module-resolver";

export interface CreateLanguageServiceOptions {
  ts: typeof ts;
  /** Defaults to `ts.sys`. */
  host?: ts.System;
  /** Defaults to the nearest `tsconfig.json`/`jsconfig.json`. */
  configFile?: string;
  compilerOptions?: ts.CompilerOptions;
}

export interface MarkoLanguageService {
  service: ts.LanguageService;
  addRootName(fileName: string): void;
  getProcessor(fileName: string): Processors.Processor | undefined;
}

/**
 * Creates a `ts.LanguageService` that understands processor files
 * (`.marko`, CSS modules).
 */
export function createLanguageService(
  options: CreateLanguageServiceOptions,
): MarkoLanguageService {
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
    noEmit: true,
    allowJs: true,
    skipLibCheck: true,
    allowNonTsExtensions: true,
  };

  const rootNames = new Set(Processors.getRootNames(processors));
  const getScriptVersion = (fileName: string) =>
    `${host.getModifiedTime?.(fileName)?.getTime() ?? 0}`;
  const snapshots = new Map<
    string,
    { version: string; snapshot: ts.IScriptSnapshot }
  >();

  const service = ts.createLanguageService({
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
          extractedCode = "";
        }
      }

      const snapshot = ts.ScriptSnapshot.fromString(extractedCode);
      snapshots.set(fileName, { version, snapshot });
      return snapshot;
    },
    getScriptKind: (fileName) =>
      getProcessor(fileName)?.getScriptKind(fileName) ?? ts.ScriptKind.Unknown,
    resolveModuleNameLiterals: createModuleResolver({
      ts,
      host,
      getProcessor,
      resolutionCache: ts.createModuleResolutionCache(
        dir,
        host.useCaseSensitiveFileNames
          ? (fileName) => fileName
          : (fileName) => fileName.toLowerCase(),
        compilerOptions,
      ),
    }),
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
  });

  return {
    service,
    addRootName(fileName) {
      rootNames.add(path.resolve(dir, fileName));
    },
    getProcessor,
  };
}
