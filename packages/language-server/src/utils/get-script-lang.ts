import stripJSONComments from "strip-json-comments";
import { ScriptLang } from "@marko/language-tools";
import type TS from "typescript/lib/tsserverlibrary";
import type { MarkoProject } from "./project";

export default function getMarkoScriptLang(
  fileName: string,
  dir: string,
  defaultScriptLang: ScriptLang,
  markoProject: MarkoProject,
  ts: typeof TS,
  host: TS.ModuleResolutionHost
): ScriptLang {
  if (fileName.endsWith(".d.marko")) return ScriptLang.ts;

  const key = `script-lang:${dir}`;
  let scriptLang = markoProject.cache.get(key) as ScriptLang | undefined;

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

    markoProject.cache.set(key, scriptLang);
  }

  return scriptLang;
}

function tryParseJSONWithComments(content: string) {
  try {
    return JSON.parse(stripJSONComments(content));
  } catch {
    return undefined;
  }
}
