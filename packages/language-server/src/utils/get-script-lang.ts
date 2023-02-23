import { ScriptLang } from "@marko/language-tools";
import type { LanguageServiceHost } from "typescript/lib/tsserverlibrary";
import type TS from "typescript/lib/tsserverlibrary";

export default function getScriptLang(
  filename: string,
  ts: typeof TS,
  host: LanguageServiceHost,
  projectScriptLang: ScriptLang
) {
  const configPath = ts.findConfigFile(
    filename,
    host.fileExists.bind(host),
    "marko.json"
  );

  if (configPath) {
    try {
      const markoConfig = JSON.parse(
        host.readFile(configPath, "utf-8") || "{}"
      );

      const scriptLang = markoConfig["script-lang"] || markoConfig.scriptLang;
      if (scriptLang !== undefined) {
        return scriptLang === ScriptLang.ts ? ScriptLang.ts : ScriptLang.js;
      }
    } catch {
      // ignore
    }
  }

  return /[/\\]node_modules[/\\]/.test(filename)
    ? ScriptLang.js
    : projectScriptLang;
}
