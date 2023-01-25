import fs from "fs";
import path from "path";
import ts from "typescript";
import {
  createFSBackedSystem,
  createVirtualLanguageServiceHost,
} from "@typescript/vfs";
import { Extracted } from "../../util/extractor";

const rootDir = process.cwd();
const libFixtureDir = path.join(__dirname, "../lib-fixtures");
const libRuntimeFsMap = loadDir(libFixtureDir, new Map());
const startPosition: ts.LineAndCharacter = {
  line: 0,
  character: 0,
};

export type Processors = Record<
  string,
  {
    ext: ts.Extension;
    kind: ts.ScriptKind;
    extract(filename: string, code: string): Extracted;
  }
>;

export function createLanguageService(
  fsMap: Map<string, string>,
  processors: Processors
) {
  const compilerOptions: ts.CompilerOptions = {
    ...ts.getDefaultCompilerOptions(),
    rootDir,
    strict: true,
    skipLibCheck: true,
    noEmitOnError: true,
    noImplicitAny: true,
    esModuleInterop: true,
    skipDefaultLibCheck: true,
    allowNonTsExtensions: true,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
  };
  const rootFiles = [...libRuntimeFsMap.keys(), ...fsMap.keys()];
  const sys = createFSBackedSystem(
    new Map([...libRuntimeFsMap.entries(), ...fsMap.entries()]),
    rootDir,
    ts
  );

  const { languageServiceHost: lsh } = createVirtualLanguageServiceHost(
    sys,
    rootFiles,
    compilerOptions,
    ts
  );

  const ls = ts.createLanguageService(lsh);
  const snapshotCache = new Map<string, [Extracted, ts.IScriptSnapshot]>();

  /**
   * Trick TypeScript into thinking Marko files are TS/JS files.
   */
  lsh.getScriptKind = (filename: string) => {
    const processor = processors[getExt(filename)];
    return processor ? processor.kind : ts.ScriptKind.TS;
  };

  /**
   * A script snapshot is an immutable string of text representing the contents of a file.
   * We patch it so that Marko files instead return their extracted ts code.
   */
  const getScriptSnapshot = lsh.getScriptSnapshot!.bind(lsh);
  lsh.getScriptSnapshot = (filename: string) => {
    const processor = processors[getExt(filename)];
    if (processor) {
      let cached = snapshotCache.get(filename);
      if (!cached) {
        const extracted = processor.extract(
          filename,
          lsh.readFile(filename, "utf-8") || ""
        );
        snapshotCache.set(
          filename,
          (cached = [
            extracted,
            ts.ScriptSnapshot.fromString(extracted.toString()),
          ])
        );
      }

      return cached[1];
    }

    return getScriptSnapshot(filename);
  };

  /**
   * This ensures that any directory reads with specific file extensions also include Marko.
   * It is used for example when completing the `from` property of the `import` statement.
   */
  const readDirectory = lsh.readDirectory!.bind(lsh);
  const additionalExts = Object.keys(processors);
  lsh.readDirectory = (path, extensions, exclude, include, depth) => {
    return readDirectory(
      path,
      extensions?.concat(additionalExts),
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
  lsh.resolveModuleNames = (moduleNames, containingFile) => {
    const resolvedModules: (
      | ts.ResolvedModuleFull
      | ts.ResolvedModule
      | undefined
    )[] = moduleNames.map<ts.ResolvedModule | undefined>(
      (moduleName) =>
        ts.resolveModuleName(moduleName, containingFile, compilerOptions, sys)
          .resolvedModule
    );

    for (let i = resolvedModules.length; i--; ) {
      if (!resolvedModules[i]) {
        const moduleName = moduleNames[i];
        const processor = processors[getExt(moduleName)];
        if (processor && moduleName[0] === ".") {
          // For relative paths just see if it exists on disk.
          const resolvedFileName = path.resolve(
            containingFile,
            "..",
            moduleName
          );
          if (lsh.fileExists(resolvedFileName)) {
            resolvedModules[i] = {
              resolvedFileName,
              extension: processor.ext,
              isExternalLibraryImport: false,
            };
          }
        }
      }
    }

    return resolvedModules;
  };

  /**
   * Whenever TypeScript requests line/character info we return with the source
   * file line/character if it exists.
   */
  const toLineColumnOffset = ls.toLineColumnOffset!;
  ls.toLineColumnOffset = (fileName, pos) => {
    if (pos === 0) return startPosition;

    const extracted = snapshotCache.get(fileName)?.[0];
    if (extracted) {
      return extracted.sourcePositionAt(pos) || startPosition;
    }

    return toLineColumnOffset(fileName, pos);
  };

  return ls;
}

export function loadDir(dir: string, map: Map<string, string>) {
  for (const entry of fs.readdirSync(dir)) {
    const file = path.join(dir, entry);
    const stat = fs.statSync(file);
    if (stat.isFile()) {
      map.set(file, fs.readFileSync(file, "utf-8"));
    } else if (stat.isDirectory() && entry !== "__snapshots__") {
      loadDir(file, map);
    }
  }

  return map;
}

function getExt(fileName: string) {
  return fileName.slice(fileName.lastIndexOf(".") + 1);
}
