import { getLines, getLocation, getPosition, type Range } from "../../parser";
import {
  type Extracted,
  Extractor,
  type ExtractorSource,
} from "../../util/extractor";
import { findStyleSelectors } from "../../util/find-style-selectors";
import { normalizePath } from "../../util/normalize-path";

export interface ExtractCSSModuleOptions {
  code: string;
  fileName: string;
}

/**
 * Produce a virtual TypeScript module typing a CSS module's default export as
 * an object of its class/id names. The type is exported directly (not via a
 * named `const`) so no internal binding name leaks into hover/go-to-definition,
 * and each name is mapped back to every selector it was defined at.
 */
export function extractCSSModule(opts: ExtractCSSModuleOptions): Extracted {
  const { code, fileName } = opts;
  const extractor = new Extractor(createSource(code, fileName));

  extractor.write("export default {} as unknown as ");
  writeStyleModuleType(extractor, findStyleSelectors(code));
  extractor.write(";\n");

  return extractor.end();
}

/**
 * Write an object type whose properties are the given CSS module class/id
 * names, each source-mapped to the selector(s) it was defined at. Shared by the
 * standalone `.module.css` extractor and the embedded `<style/var>` extractor.
 */
export function writeStyleModuleType(
  extractor: Extractor,
  selectors: Map<string, Range[]>,
) {
  extractor.write("{");
  for (const ranges of selectors.values()) {
    extractor.write(' "').copy(ranges).write('": string;');
  }
  extractor.write(" }");
}

function createSource(code: string, fileName: string): ExtractorSource {
  const lines = getLines(code);
  return {
    code,
    filename: normalizePath(fileName),
    positionAt: (offset) => getPosition(lines, offset),
    locationAt: (range) => getLocation(lines, range.start, range.end),
  };
}
