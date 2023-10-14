import {
  type Location,
  type Parsed,
  type Position,
  type Range,
  getLines,
  getLocation,
  getPosition,
} from "../parser";

interface Token {
  generatedStart: number;
  sourceStart: number;
  length: number;
}

const emptyView = {
  offsetAt(_offset: number): undefined {
    return;
  },
  rangeAt(_start: number, _end: number): undefined {
    return;
  },
};

// TODO: really need to figure out how to handle multiple tokens
// that map to the same source location, currently just prefers the first.

/**
 * Utility to build up generate code from source ranges while maintaining a source mapping.
 */
export class Extractor {
  #parsed: Parsed;
  #generated = "";
  #tokens: Token[] = [];
  constructor(parsed: Parsed) {
    this.#parsed = parsed;
  }

  write(str: string) {
    this.#generated += str;
    return this;
  }

  copy(range: Range | string | false | void | undefined | null) {
    if (range) {
      if (typeof range === "string") {
        this.#generated += range;
      } else {
        this.#tokens.push({
          generatedStart: this.#generated.length,
          sourceStart: range.start,
          length: Math.min(this.#parsed.code.length, range.end) - range.start,
        });
        this.#generated += this.#parsed.read(range);
      }
    }

    return this;
  }

  end() {
    return new Extracted(this.#parsed, this.#generated, this.#tokens);
  }
}

export class Extracted {
  #generated: string;
  #sourceToGenerated: SourceToGeneratedView | typeof emptyView;
  #generatedToSource: GeneratedToSourceView | typeof emptyView;
  #cachedGeneratedLines: number[] | undefined;
  constructor(
    public parsed: Parsed,
    generated: string,
    tokens: Token[],
  ) {
    this.#generated = generated;

    if (tokens.length === 0) {
      this.#generatedToSource = this.#sourceToGenerated = emptyView;
    } else {
      this.#generatedToSource = new GeneratedToSourceView(tokens);
      this.#sourceToGenerated = new SourceToGeneratedView(
        [...tokens].sort(sortBySourceThenGenerated),
      );
    }
  }

  get #generatedLines() {
    return (
      this.#cachedGeneratedLines ||
      (this.#cachedGeneratedLines = getLines(this.#generated))
    );
  }

  sourceOffsetAt(generatedOffset: number): number | undefined {
    return this.#generatedToSource.offsetAt(generatedOffset);
  }

  sourcePositionAt(generatedOffset: number): Position | undefined {
    const sourceOffset = this.sourceOffsetAt(generatedOffset);
    if (sourceOffset !== undefined) return this.parsed.positionAt(sourceOffset);
  }

  sourceLocationAt(
    generatedStart: number,
    generatedEnd: number,
  ): Location | undefined {
    const sourceRange = this.#generatedToSource.rangeAt(
      generatedStart,
      generatedEnd,
    );
    if (sourceRange) {
      return this.parsed.locationAt(sourceRange);
    }
  }

  generatedOffsetAt(sourceOffset: number): number | undefined {
    return this.#sourceToGenerated.offsetAt(sourceOffset);
  }

  generatedPositionAt(sourceOffset: number): Position | undefined {
    const generatedOffset = this.generatedOffsetAt(sourceOffset);
    if (generatedOffset !== undefined) {
      return getPosition(this.#generatedLines, generatedOffset);
    }
  }

  generatedLocationAt(
    sourceStart: number,
    sourceEnd: number,
  ): Location | undefined {
    const generatedRange = this.#sourceToGenerated.rangeAt(
      sourceStart,
      sourceEnd,
    );
    if (generatedRange) {
      return getLocation(
        this.#generatedLines,
        generatedRange.start,
        generatedRange.end,
      );
    }
  }

  toString() {
    return this.#generated;
  }
}

/**
 * Acts as a view into our token list
 * array, providing methods to access the values.
 *
 * The view type is used to determine if we are
 * searching for a source or generated offset.
 *
 * The provided token array must be sorted based
 * on the view type.
 */
abstract class TokenView {
  #tokens: Token[];
  #last: number;
  abstract inStart(token: Token): number;
  abstract outStart(token: Token): number;
  constructor(tokens: Token[]) {
    this.#tokens = tokens;
    this.#last = tokens.length - 1;
  }

  offsetAt(offset: number) {
    let min = 0;
    let max = this.#last;

    while (min < max) {
      const mid = (1 + min + max) >>> 1;

      if (this.inStart(this.#tokens[mid]) <= offset) {
        min = mid;
      } else {
        max = mid - 1;
      }
    }

    const token = this.#tokens[min];
    const index = offset - this.inStart(token);
    if (index >= 0 && index <= token.length) {
      return this.outStart(token) + index;
    }
  }

  rangeAt(inStart: number, inEnd: number) {
    let min = 0;
    let max = this.#last;

    while (min < max) {
      const mid = (min + max) >> 1;
      const token = this.#tokens[mid];
      const tokenInEnd = this.inStart(token) + token.length;

      if (tokenInEnd > inStart) {
        max = mid;
      } else {
        min = mid + 1;
      }
    }

    const startToken = this.#tokens[max];
    const startTokenInStart = this.inStart(startToken);
    if (startTokenInStart >= inEnd) return;

    max = this.#last;

    while (min < max) {
      const mid = (1 + min + max) >>> 1;
      const token = this.#tokens[mid];
      const tokenEnd = this.inStart(token) + token.length;

      if (tokenEnd <= inEnd) {
        min = mid;
      } else {
        max = mid - 1;
      }
    }

    const endToken = this.#tokens[min];
    const endTokenInStart = this.inStart(endToken);
    const endTokenInEnd = endTokenInStart + endToken.length;
    if (endTokenInEnd < inStart) return;

    const startIndex = inStart - startTokenInStart;
    const endIndex = inEnd - endTokenInStart;
    const start = this.outStart(startToken) + Math.max(0, startIndex);
    const end = this.outStart(endToken) + Math.min(endToken.length, endIndex);
    return { start, end };
  }
}

class GeneratedToSourceView extends TokenView {
  inStart(token: Token) {
    return token.generatedStart;
  }

  outStart(token: Token) {
    return token.sourceStart;
  }
}

class SourceToGeneratedView extends TokenView {
  inStart(token: Token) {
    return token.sourceStart;
  }

  outStart(token: Token) {
    return token.generatedStart;
  }
}

function sortBySourceThenGenerated(a: Token, b: Token) {
  const delta = a.sourceStart - b.sourceStart;
  return delta === 0 ? b.generatedStart - a.generatedStart : delta;
}
