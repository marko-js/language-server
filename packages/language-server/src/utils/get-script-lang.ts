import { ScriptLang } from "@marko/language-tools";
import type { LanguageServiceHost } from "typescript/lib/tsserverlibrary";
import type TS from "typescript/lib/tsserverlibrary";

export default function getScriptLang(
  filename: string,
  ts: typeof TS,
  host: LanguageServiceHost,
  defaultLang: ScriptLang
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
      if (
        (markoConfig["script-lang"] || markoConfig.scriptLang) === ScriptLang.ts
      ) {
        return ScriptLang.ts;
      }
    } catch {
      // ignore
    }
  }

  return defaultLang;
}
