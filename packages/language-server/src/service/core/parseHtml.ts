import { Extracted, extractHTML } from "@marko/language-tools";
import type { CodeMapping, VirtualCode } from "@volar/language-core";

export function parseHtml(
  parsed: ReturnType<typeof extractHTML>,
): VirtualCode[] {
  const scriptText = parsed.extracted.toString();
  const mappings: CodeMapping[] = generateMappingsFromExtracted(
    parsed.extracted,
  );

  if (mappings.length > 0) {
    return [
      {
        id: "html",
        languageId: "html",
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

function generateMappingsFromExtracted(extracted: Extracted): CodeMapping[] {
  return extracted.tokens.map((it) => {
    return {
      sourceOffsets: [it.sourceStart],
      generatedOffsets: [it.generatedStart],
      lengths: [it.length],
      data: {
        completion: true,
        format: false,
        navigation: true,
        semantic: true,
        structure: true,
        verification: true,
      },
    };
  });
}
