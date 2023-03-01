import path from "path";
import type { TaglibLookup } from "@marko/babel-utils";
import * as defaultCompiler from "@marko/compiler";
import * as defaultTranslator from "@marko/translator-default";
import resolveFrom from "resolve-from";

const ignoreErrors = (_err: Error) => {};
const cwd = process.cwd();
const kTaglib = Symbol("taglib");
const projectsByDir = new Map<string, MarkoProject>();
const projectsByCompiler = new Map<string, MarkoProject>();
const defaultProject: MarkoProject = {
  cache: new Map(),
  get lookup() {
    let lookup = defaultProject.cache.get(kTaglib) as TaglibLookup;
    if (!lookup) {
      defaultProject.cache.set(
        kTaglib,
        (lookup = defaultCompiler.taglib.buildLookup(
          cwd,
          defaultTranslator,
          ignoreErrors
        ))
      );
    }
    return lookup;
  },
  compiler: defaultCompiler,
  translator: defaultTranslator,
};
defaultCompiler.configure({ translator: defaultTranslator });

export type MarkoProject = {
  cache: Map<unknown, unknown>;
  lookup: TaglibLookup;
  compiler: typeof defaultCompiler;
  translator: any;
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
  return projectsByCompiler.values();
}

export function clearMarkoProjectCaches() {
  for (const project of getMarkoProjects()) {
    project.cache.clear();
    project.compiler.taglib.clearCaches();
  }
}

function loadProject(dir: string): MarkoProject {
  try {
    const compilerConfigPath = resolveFrom(dir, "@marko/compiler/config");
    const cachedProject = projectsByCompiler.get(compilerConfigPath);
    if (cachedProject) return cachedProject;

    const [compiler, translator] = [
      require(path.join(compilerConfigPath, "..")),
      require(resolveFrom(
        dir,
        interopDefault(require(compilerConfigPath)).translator
      )),
    ];

    const project = {
      cache: new Map(),
      get lookup() {
        let lookup: TaglibLookup = project.cache.get(kTaglib);
        if (lookup === undefined) {
          // Lazily build the lookup, and ensure it's re-created whenever the cache is cleared.
          try {
            lookup = compiler.taglib.buildLookup(dir, translator, ignoreErrors);
          } catch {
            lookup = defaultProject.lookup;
          }

          project.cache.set(kTaglib, lookup);
        }

        return lookup;
      },
      compiler,
      translator,
    };
    projectsByCompiler.set(compilerConfigPath, project);
    return project;
  } catch {
    return defaultProject;
  }
}

function interopDefault(mod: any) {
  return mod.default || mod;
}
