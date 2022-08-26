import type { TaglibLookup } from "@marko/babel-utils";
import * as builtinCompiler from "@marko/compiler";
import * as builtinTranslator from "@marko/translator-default";
import lassoPackageRoot from "lasso-package-root";
import resolveFrom from "resolve-from";

const cwd = process.cwd();
const lookupKey = Symbol();
const compilerInfoByDir = new Map<string, CompilerInfo>();
const builtinInfo: CompilerInfo = {
  rootDir: cwd,
  cache: new Map(),
  lookup: builtinCompiler.taglib.buildLookup(cwd, builtinTranslator),
  compiler: builtinCompiler,
  translator: builtinTranslator,
};
builtinCompiler.configure({ translator: builtinTranslator });

export type Compiler = typeof import("@marko/compiler");
export type CompilerInfo = {
  rootDir: string;
  cache: Map<unknown, unknown>;
  lookup: TaglibLookup;
  compiler: Compiler;
  translator: builtinCompiler.Config["translator"];
};

export function getCompilerInfo(dir?: string): CompilerInfo {
  if (!dir) return builtinInfo;

  let info = compilerInfoByDir.get(dir);
  if (!info) {
    info = loadCompilerInfo(dir);
    compilerInfoByDir.set(dir, info);
  }

  return info;
}

export function getCompilerInfos() {
  return new Set(compilerInfoByDir.values());
}

function loadCompilerInfo(dir: string): CompilerInfo {
  const rootDir = lassoPackageRoot.getRootDir(dir) || cwd;
  const pkgPath = resolveFrom.silent(rootDir, "@marko/compiler/package.json");
  const pkg = pkgPath && require(pkgPath);
  const cache = new Map();
  let translator = builtinTranslator;
  let compiler = builtinCompiler;

  if (pkg && /^5\./.test(pkg.version)) {
    try {
      // Ensure translator is available in local package, or fallback to built in compiler.
      let checkTranslator = ([] as string[])
        .concat(
          Object.keys(pkg.dependencies),
          Object.keys(pkg.peerDependencies),
          Object.keys(pkg.devDependencies)
        )
        .find((name) => /^marko$|^(@\/marko\/|marko-)translator-/.test(name));

      if (checkTranslator === "marko" || !checkTranslator) {
        // Fallback to compiler default translator
        checkTranslator = require(resolveFrom(dir, "@marko/compiler/config"))
          .translator as string;
      }

      [compiler, translator] = [
        require(resolveFrom(dir, "@marko/compiler")),
        require(resolveFrom(dir, checkTranslator)),
      ];
      // eslint-disable-next-line no-empty
    } catch {}
  }

  return {
    rootDir,
    cache,
    get lookup() {
      let lookup: TaglibLookup = cache.get(lookupKey);
      if (lookup === undefined) {
        // Lazily build the lookup, and ensure it's re-created whenever the cache is cleared.
        try {
          lookup = compiler.taglib.buildLookup(dir, translator);
        } catch {
          lookup = builtinInfo.lookup;
        }

        cache.set(lookupKey, lookup);
      }

      return lookup;
    },
    compiler,
    translator,
  };
}
