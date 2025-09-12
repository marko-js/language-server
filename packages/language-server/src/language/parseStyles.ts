import { Extracted, extractStyle, parse } from "@marko/language-tools";
import type { CodeMapping, VirtualCode } from "@volar/language-core";

export function parseStyles(
  parsed: ReturnType<typeof parse>,
  taglib: any,
): VirtualCode[] {
  const styles = extractStyle({ parsed, lookup: taglib });

  const result = [];
  for (const [key, style] of styles.entries()) {
    const styleText = style.toString();
    const stylesheetKey = key.slice(1);

    const languageId =
      stylesheetKey === "scss" || stylesheetKey === "less"
        ? stylesheetKey
        : "css";
    result.push({
      id: `style_${key.slice(1)}`,
      languageId,
      snapshot: {
        getText: (start, end) => styleText.substring(start, end),
        getLength: () => styleText.length,
        getChangeRange: () => undefined,
      },
      mappings: generateMappingsFromExtracted(style),
      embeddedCodes: [],
    } satisfies VirtualCode);
  }

  return result;
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
