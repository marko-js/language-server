import path from "path";
import { createRequire } from "module";
import type TS from "typescript/lib/tsserverlibrary";
import type { TaglibLookup } from "@marko/babel-utils";
import type * as Compiler from "@marko/compiler";
import stripJSONComments from "strip-json-comments";
import { ScriptLang } from "../extractors/script";

export interface Meta {
  compiler: typeof Compiler;
  config: Omit<Compiler.Config, "cache" | "translator"> & {
    cache: Map<any, any>;
    translator: {
      runtimeTypes?: string;
      [x: string]: unknown;
    };
  };
}

interface TypeLibs {
  internalTypesFile: string | undefined;
  markoRunTypesFile: string | undefined;
  markoRunGeneratedTypesFile: string | undefined;
  markoTypesFile: string | undefined;
  markoTypesCode: string | undefined;
}

const defaultTypeLibs: Partial<TypeLibs> = {};
let defaultMeta: Meta | undefined;
const ignoreErrors = (_err: Error) => {};
const metaByDir = new Map<string, Meta>();
const metaByCompiler = new Map<string, Meta>();

export function getCompiler(dir?: string) {
  return getMeta(dir).compiler;
}

export function getCache(dir?: string) {
  return getMeta(dir).config.cache!;
}

export function getConfig(dir?: string) {
  return getMeta(dir).config;
}

export function getTagLookup(dir: string) {
  return getTagLookupForProject(getMeta(dir), dir);
}

export function getTypeLibs(
  rootDir: string,
  ts: typeof TS,
  host: TS.ModuleResolutionHost,
) {
  const config = getConfig(rootDir);
  let typeLibs = config.cache.get(getTypeLibs) as
    | undefined
    | {
        internalTypesFile: string;
        markoRunTypesFile: string | undefined;
        markoRunGeneratedTypesFile: string | undefined;
        markoTypesFile: string;
        markoTypesCode: string;
      };
  if (typeLibs) return typeLibs;
  const resolveTypeCompilerOptions: TS.CompilerOptions = {
    moduleResolution: ts.ModuleResolutionKind.Bundler,
  };
  const markoRunGeneratedTypesFile = path.join(
    rootDir,
    ".marko-run/routes.d.ts",
  );
  const resolveFromFile = path.join(rootDir, "_.d.ts");
  const internalTypesFile =
    defaultTypeLibs.internalTypesFile ||
    ts.resolveTypeReferenceDirective(
      "@marko/language-tools/marko.internal.d.ts",
      resolveFromFile,
      resolveTypeCompilerOptions,
      host,
    ).resolvedTypeReferenceDirective?.resolvedFileName;
  const { resolvedTypeReferenceDirective: resolvedMarkoTypes } =
    ts.resolveTypeReferenceDirective(
      (config.translator.runtimeTypes as string | undefined) || "marko",
      resolveFromFile,
      resolveTypeCompilerOptions,
      host,
    );
  const { resolvedTypeReferenceDirective: resolvedMarkoRunTypes } =
    ts.resolveTypeReferenceDirective(
      "@marko/run",
      resolveFromFile,
      resolveTypeCompilerOptions,
      host,
    );
  const markoTypesFile =
    resolvedMarkoTypes?.resolvedFileName || defaultTypeLibs.markoTypesFile;
  const markoRunTypesFile = resolvedMarkoRunTypes?.resolvedFileName;

  if (!internalTypesFile || !markoTypesFile) {
    throw new Error("Could not resolve marko type files.");
  }

  config.cache.set(
    getTypeLibs,
    (typeLibs = {
      internalTypesFile,
      markoTypesFile,
      markoTypesCode: host.readFile(markoTypesFile) || "",
      markoRunTypesFile,
      markoRunGeneratedTypesFile: host.fileExists(markoRunGeneratedTypesFile)
        ? markoRunGeneratedTypesFile
        : undefined,
    }),
  );

  return typeLibs;
}

export function getScriptLang(
  fileName: string,
  defaultScriptLang: ScriptLang,
  ts: typeof TS,
  host: TS.ModuleResolutionHost,
): ScriptLang {
  if (fileName.endsWith(".d.marko")) return ScriptLang.ts;

  const dir = path.dirname(fileName);
  const config = getConfig(dir);
  const cache = config.cache.get(getScriptLang) as
    | Map<string, ScriptLang>
    | undefined;
  let scriptLang = cache?.get(dir);

  if (!scriptLang) {
    const configPath = ts.findConfigFile(
      dir,
      host.fileExists.bind(host),
      "marko.json",
    );

    if (configPath) {
      try {
        const configSource = host.readFile(configPath);
        if (configSource) {
          const config = tryParseJSONWithComments(configSource);

          if (config) {
            const definedScriptLang =
              config["script-lang"] || config.scriptLang;
            if (definedScriptLang !== undefined) {
              scriptLang =
                definedScriptLang === ScriptLang.ts
                  ? ScriptLang.ts
                  : ScriptLang.js;
            }
          }
        }
      } catch {
        // ignore
      }
    }

    if (scriptLang === undefined) {
      scriptLang = /[/\\]node_modules[/\\]/.test(dir)
        ? ScriptLang.js
        : defaultScriptLang;
    }

    if (cache) {
      cache.set(dir, scriptLang);
    } else {
      config.cache.set(getScriptLang, new Map([[dir, scriptLang]]));
    }
  }

  return scriptLang;
}

export function clearCaches() {
  if (defaultMeta) {
    clearCacheForMeta(defaultMeta);
  }

  for (const project of metaByCompiler.values()) {
    clearCacheForMeta(project);
  }
}

export function setDefaultTypePaths(defaults: typeof defaultTypeLibs) {
  Object.assign(defaultTypeLibs, defaults);
}

export function setDefaultCompilerMeta(
  compiler: typeof Compiler,
  config: Compiler.Config,
) {
  const { translator } = config;
  if (typeof translator !== "object") {
    throw new Error("Translator must be fully resolved and loaded.");
  }

  defaultMeta = {
    compiler,
    config: {
      ...config,
      cache: new Map(),
      translator,
    },
  };

  compiler.configure(defaultMeta.config);
}

function getMeta(dir?: string): Meta {
  if (!dir) {
    if (!defaultMeta) {
      throw new Error(
        "@marko/compiler must be installed or compiler registered.",
      );
    }

    return defaultMeta;
  }

  if (defaultMeta) {
    try {
      return loadMeta(dir);
    } catch {
      metaByDir.set(dir, defaultMeta);
      return defaultMeta;
    }
  }

  return loadMeta(dir);
}

function loadMeta(dir: string): Meta {
  let cached = metaByDir.get(dir);
  if (!cached) {
    const require = createRequire(path.join(dir, "_.js"));
    const configPath: string = require.resolve("@marko/compiler/config");
    cached = metaByCompiler.get(configPath);

    if (!cached) {
      const compiler = require(path.dirname(configPath)) as typeof Compiler;
      const config = interopDefault(require(configPath)) as Compiler.Config;
      cached = {
        compiler,
        config: {
          ...config,
          cache: new Map(),
          translator: require(config.translator),
        },
      };
      compiler.configure(cached.config);
      metaByCompiler.set(configPath, cached);
    }

    metaByDir.set(dir, cached);
  }

  return cached;
}

function getTagLookupForProject(meta: Meta, dir: string): TaglibLookup {
  const cache = meta.config.cache.get(getTagLookupForProject) as
    | undefined
    | Map<string, TaglibLookup>;
  let lookup = cache?.get(dir);

  if (lookup === undefined) {
    // Lazily build the lookup, and ensure it's re-created whenever the cache is cleared.
    try {
      lookup = meta.compiler.taglib.buildLookup(
        dir,
        meta.config.translator,
        ignoreErrors,
      );
    } catch {
      if (meta !== defaultMeta) {
        lookup = getTagLookupForProject(getMeta(), dir);
      }
    }

    if (cache) {
      cache.set(dir, lookup!);
    } else {
      meta.config.cache.set(getTagLookupForProject, new Map([[dir, lookup]]));
    }
  }

  return lookup!;
}

function clearCacheForMeta(meta: Meta) {
  meta.config.cache.clear();
  meta.compiler.taglib.clearCaches();
}

function tryParseJSONWithComments(content: string) {
  try {
    return JSON.parse(stripJSONComments(content));
  } catch {
    return undefined;
  }
}

function interopDefault(mod: any) {
  return mod.default || mod;
}
