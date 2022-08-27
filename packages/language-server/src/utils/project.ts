import type { TaglibLookup } from "@marko/babel-utils";
import * as defaultCompiler from "@marko/compiler";
import * as defaultTranslator from "@marko/translator-default";
import lassoPackageRoot from "lasso-package-root";
import resolveFrom from "resolve-from";

const cwd = process.cwd();
const kTaglib = Symbol("taglib");
const projectsByDir = new Map<string, MarkoProject>();
const defaultProject: MarkoProject = {
  rootDir: cwd,
  cache: new Map(),
  lookup: defaultCompiler.taglib.buildLookup(cwd, defaultTranslator),
  compiler: defaultCompiler,
  translator: defaultTranslator,
};
defaultCompiler.configure({ translator: defaultTranslator });

export type MarkoProject = {
  rootDir: string;
  cache: Map<unknown, unknown>;
  lookup: TaglibLookup;
  compiler: typeof import("@marko/compiler");
  translator: defaultCompiler.Config["translator"];
};

export function getMarkoProject(dir?: string): MarkoProject {
  if (!dir) return defaultProject;

  let project = projectsByDir.get(dir);
  if (!project) {
    project = loadProject(dir);
    projectsByDir.set(dir, project);
  }

  return project;
}

export function getMarkoProjects() {
  return new Set(projectsByDir.values());
}

function loadProject(dir: string): MarkoProject {
  const rootDir = lassoPackageRoot.getRootDir(dir) || cwd;
  const pkgPath = resolveFrom.silent(rootDir, "@marko/compiler/package.json");
  const pkg = pkgPath && require(pkgPath);
  const cache = new Map();
  let translator = defaultTranslator;
  let compiler = defaultCompiler;

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
      let lookup: TaglibLookup = cache.get(kTaglib);
      if (lookup === undefined) {
        // Lazily build the lookup, and ensure it's re-created whenever the cache is cleared.
        try {
          lookup = compiler.taglib.buildLookup(dir, translator);
        } catch {
          lookup = defaultProject.lookup;
        }

        cache.set(kTaglib, lookup);
      }

      return lookup;
    },
    compiler,
    translator,
  };
}
