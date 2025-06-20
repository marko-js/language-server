import { CodeMapping } from "@volar/language-core";
import type { Diagnostic } from "@volar/language-server";
import { TextDocument } from "vscode-languageserver-textdocument";

export function enhanceDiagnosticPositions(
  diagnostics: Diagnostic[],
  document: TextDocument,
  mappings: CodeMapping[],
) {
  return diagnostics.map((diagnostic) => {
    const scriptStartOffset = document.offsetAt(diagnostic.range.start);
    const scriptEndOffset = document.offsetAt(diagnostic.range.end);

    let bestMapping: CodeMapping | null = null;
    let maxOverlap = 0;

    for (const mapping of mappings) {
      const generatedStartOffset = mapping.generatedOffsets[0];
      const generatedEndOffset = generatedStartOffset + mapping.lengths[0];

      // Calculate overlap between diagnostic and mapping
      const overlapStart = Math.max(generatedStartOffset, scriptStartOffset);
      const overlapEnd = Math.min(generatedEndOffset, scriptEndOffset);
      const overlap = Math.max(0, overlapEnd - overlapStart);

      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        bestMapping = mapping;
      }
    }

    if (bestMapping) {
      const start = document.positionAt(bestMapping.generatedOffsets[0]);
      const end = document.positionAt(
        bestMapping.generatedOffsets[0] + bestMapping.lengths[0],
      );
      diagnostic.range.start = start;
      diagnostic.range.end = end;
      return diagnostic;
    }

    return diagnostic;
  });
}
