import path from "path";
import { createRequire } from "module";
import type TS from "typescript/lib/tsserverlibrary";
import type { TaglibLookup } from "@marko/babel-utils";
import * as defaultCompiler from "@marko/compiler";
import * as defaultConfig from "@marko/compiler/config";
import * as defaultTranslator from "@marko/translator-default";
import stripJSONComments from "strip-json-comments";
import { ScriptLang } from "../extractors/script";

export interface Meta {
  compiler: typeof defaultCompiler;
  config: Omit<defaultCompiler.Config, "cache" | "translator"> & {
    cache: Map<any, any>;
    translator: {
      runtimeTypes?: string;
      [x: string]: unknown;
    };
  };
}

const ignoreErrors = (_err: Error) => {};
const metaByDir = new Map<string, Meta>();
const metaByCompiler = new Map<string, Meta>();
const defaultMeta: Meta = {
  compiler: defaultCompiler,
  config: {
    ...defaultConfig,
    cache: new Map(),
    translator: defaultTranslator,
  },
};

defaultCompiler.configure(defaultMeta.config);

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
  host: TS.ModuleResolutionHost
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
    ".marko-run/routes.d.ts"
  );
  const resolveFromFile = path.join(rootDir, "_.d.ts");
  const { resolvedTypeReferenceDirective: resolvedInternalTypes } =
    ts.resolveTypeReferenceDirective(
      "@marko/language-tools/marko.internal.d.ts",
      resolveFromFile,
      resolveTypeCompilerOptions,
      host
    );

  const { resolvedTypeReferenceDirective: resolvedMarkoTypes } =
    ts.resolveTypeReferenceDirective(
      (config.translator.runtimeTypes as string | undefined) || "marko",
      resolveFromFile,
      resolveTypeCompilerOptions,
      host
    );

  const { resolvedTypeReferenceDirective: resolvedMarkoRunTypes } =
    ts.resolveTypeReferenceDirective(
      "@marko/run",
      resolveFromFile,
      resolveTypeCompilerOptions,
      host
    );

  const internalTypesFile = resolvedInternalTypes?.resolvedFileName;
  const markoTypesFile = resolvedMarkoTypes?.resolvedFileName;
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
    })
  );

  return typeLibs;
}

export function getScriptLang(
  fileName: string,
  defaultScriptLang: ScriptLang,
  ts: typeof TS,
  host: TS.ModuleResolutionHost
): ScriptLang {
  if (fileName.endsWith(".d.marko")) return ScriptLang.ts;

  const dir = path.dirname(fileName);
  const config = getConfig(dir);
  const cache = config.cache.get(getScriptLang) as
    | Map<string, ScriptLang>
    | undefined;
  let scriptLang = cache?.get(dir);

  if (!scriptLang) {
    const configPath = ts.findConfigFile(dir, host.fileExists, "marko.json");

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
  clearCacheForMeta(defaultMeta);
  for (const project of metaByCompiler.values()) {
    clearCacheForMeta(project);
  }
}

function getMeta(dir?: string): Meta {
  if (!dir) return defaultMeta;

  let cached = metaByDir.get(dir);
  if (!cached) {
    try {
      const require = createRequire(dir);
      const compilerConfigPath = require.resolve("@marko/compiler/config");
      cached = metaByCompiler.get(compilerConfigPath);
      if (!cached) {
        const compiler = require(path.join(
          compilerConfigPath,
          ".."
        )) as typeof defaultCompiler;
        const config = interopDefault(
          require(compilerConfigPath)
        ) as defaultCompiler.Config;
        cached = {
          compiler,
          config: {
            ...config,
            cache: new Map(),
            translator: require(config.translator),
          },
        };
        compiler.configure(cached.config);
        metaByCompiler.set(compilerConfigPath, cached);
      }
    } catch {
      cached = defaultMeta;
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
        ignoreErrors
      );
    } catch {
      if (meta !== defaultMeta) {
        lookup = getTagLookupForProject(defaultMeta, dir);
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