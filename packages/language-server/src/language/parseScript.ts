import { TaglibLookup } from "@marko/compiler/babel-utils";
import { extractScript, parse, ScriptLang } from "@marko/language-tools";
import { Meta } from "@marko/language-tools/src/util/project";
import type { CodeMapping, VirtualCode } from "@volar/language-core";

export function parseScripts(
  parsed: ReturnType<typeof parse>,
  ts: typeof import("typescript"),
  tagLookup: TaglibLookup,
  translator: Meta["config"]["translator"],
): VirtualCode[] {
  const script = extractScript({
    parsed,
    scriptLang: ScriptLang.ts,
    lookup: tagLookup,
    ts: ts,
    translator,
  });
  const scriptText = script.toString();
  const mappings: CodeMapping[] = [];
  for (const token of script.tokens) {
    mappings.push({
      sourceOffsets: [token.sourceStart],
      generatedOffsets: [token.generatedStart],
      lengths: [token.length],
      data: {
        completion: true,
        format: false,
        navigation: true,
        semantic: true,
        structure: true,
        verification: true,
      },
    });
  }

  if (mappings.length > 0) {
    return [
      {
        id: "script",
        languageId: "ts",
        snapshot: {
          getText: (start, end) => scriptText.substring(start, end),
          getLength: () => scriptText.length,
          getChangeRange: () => undefined,
        },
        mappings: mappings,
        embeddedCodes: [],
      },
    ];
  }

  return [];
}
