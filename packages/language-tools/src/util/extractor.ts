import {
  getLines,
  getLocation,
  getPosition,
  type Location,
  type Position,
  type Range,
} from "../parser";

/**
 * The minimal source an {@link Extractor} needs to maintain a source mapping.
 * A Marko `Parsed` satisfies it, as does any other parsed source (eg a CSS
 * module).
 */
export interface ExtractorSource {
  code: string;
  filename: string;
  positionAt(offset: number): Position;
  locationAt(range: Range): Location;
}

const enum Mapping {
  full,
  alias,
  anchor,
}

interface Token {
  generatedStart: number;
  sourceStart: number;
  generatedLength: number;
  sourceLength: number;
  mapping: Mapping;
  linkedSources: Range[] | undefined;
}

const emptyView = {
  offsetAt(_offset: number): undefined {
    return;
  },
  offsetsAt(_offset: number): [] {
    return [];
  },
  rangeAt(_start: number, _end: number): undefined {
    return;
  },
  tokensIn(_start: number, _end: number): [] {
    return [];
  },
};

/**
 * Utility to build up generate code from source ranges while maintaining a source mapping.
 */
export class Extractor {
  #parsed: ExtractorSource;
  #generated = "";
  #tokens: Token[] = [];
  constructor(parsed: ExtractorSource) {
    this.#parsed = parsed;
  }

  write(str: string) {
    this.#generated += str;
    return this;
  }

  /** Current length of the generated output. */
  get length() {
    return this.#generated.length;
  }

  copy(range: Range | Range[] | string | false | void | undefined | null) {
    if (range) {
      if (typeof range === "string") {
        this.#generated += range;
      } else {
        let linkedSources: Range[] | undefined;
        let mapping = Mapping.full;

        if (Array.isArray(range)) {
          // The first range provides the generated text, while the
          // generated range maps back to every provided source range.
          if (!range.length) return this;
          if (range.length > 1) linkedSources = range.slice(1);
          mapping = Mapping.alias;
          range = range[0];
        }

        const { code } = this.#parsed;
        const sourceStart = Math.min(range.start, code.length);
        const length =
          Math.max(sourceStart, Math.min(code.length, range.end)) - sourceStart;
        this.#tokens.push({
          generatedStart: this.#generated.length,
          sourceStart,
          generatedLength: length,
          sourceLength: length,
          mapping,
          linkedSources,
        });
        this.#generated += code.slice(sourceStart, sourceStart + length);
      }
    }

    return this;
  }

  anchor(range: Range | false | void | undefined | null) {
    if (range) {
      const { code } = this.#parsed;
      const sourceStart = Math.min(range.start, code.length);
      const length =
        Math.max(sourceStart, Math.min(code.length, range.end)) - sourceStart;
      this.#tokens.push({
        generatedStart: this.#generated.length,
        sourceStart,
        generatedLength: 0,
        sourceLength: length,
        mapping: Mapping.anchor,
        linkedSources: undefined,
      });
    }

    return this;
  }

  end() {
    return new Extracted(this.#parsed, this.#generated, this.#tokens);
  }
}

export class Extracted {
  #generated: string;
  #tokens: Token[];
  #sourceToGenerated: SourceToGeneratedView | typeof emptyView | undefined;
  #sourceToGeneratedAll: SourceToGeneratedView | typeof emptyView | undefined;
  #generatedToSource: GeneratedToSourceView | typeof emptyView | undefined;
  #cachedGeneratedLines: number[] | undefined;
  constructor(
    public parsed: ExtractorSource,
    generated: string,
    tokens: Token[],
  ) {
    this.#generated = generated;
    this.#tokens = tokens;
  }

  get #generatedLines() {
    return (
      this.#cachedGeneratedLines ||
      (this.#cachedGeneratedLines = getLines(this.#generated))
    );
  }

  get #generatedToSourceView() {
    return (this.#generatedToSource ??= this.#tokens.length
      ? new GeneratedToSourceView(this.#tokens)
      : emptyView);
  }

  get #sourceToGeneratedView() {
    if (this.#sourceToGenerated) return this.#sourceToGenerated;

    let tokens: Token[] | undefined;
    for (const token of this.#tokens) {
      if (token.mapping === Mapping.full) {
        if (tokens) tokens.push(token);
        else tokens = [token];
      }
    }

    return (this.#sourceToGenerated = tokens
      ? new SourceToGeneratedView(tokens.sort(sortBySourceThenGenerated))
      : emptyView);
  }

  get #sourceToGeneratedAllView() {
    if (this.#sourceToGeneratedAll) return this.#sourceToGeneratedAll;

    let hasAliases = false;
    for (const token of this.#tokens) {
      if (token.mapping === Mapping.alias) {
        hasAliases = true;
        break;
      }
    }

    if (!hasAliases) {
      return (this.#sourceToGeneratedAll = this.#sourceToGeneratedView);
    }

    const tokens: Token[] = [];
    for (const token of this.#tokens) {
      if (token.mapping === Mapping.anchor) continue;
      tokens.push(token);

      if (token.linkedSources) {
        for (const link of token.linkedSources) {
          const length = Math.min(
            token.generatedLength,
            Math.max(0, link.end - link.start),
          );
          tokens.push({
            generatedStart: token.generatedStart,
            sourceStart: link.start,
            generatedLength: length,
            sourceLength: length,
            mapping: Mapping.alias,
            linkedSources: undefined,
          });
        }
      }
    }

    return (this.#sourceToGeneratedAll = new SourceToGeneratedView(
      tokens.sort(sortBySourceThenGenerated),
    ));
  }

  sourceOffsetAt(generatedOffset: number): number | undefined {
    return this.#generatedToSourceView.offsetAt(generatedOffset);
  }

  sourcePositionAt(generatedOffset: number): Position | undefined {
    const sourceOffset = this.sourceOffsetAt(generatedOffset);
    if (sourceOffset !== undefined) return this.parsed.positionAt(sourceOffset);
  }

  sourceRangeAt(generatedStart: number, generatedEnd: number) {
    return this.#generatedToSourceView.rangeAt(generatedStart, generatedEnd);
  }

  sourceLocationAt(
    generatedStart: number,
    generatedEnd: number,
  ): Location | undefined {
    const sourceRange = this.sourceRangeAt(generatedStart, generatedEnd);
    if (sourceRange) {
      return this.parsed.locationAt(sourceRange);
    }
  }

  generatedOffsetAt(sourceOffset: number): number | undefined {
    return this.#sourceToGeneratedView.offsetAt(sourceOffset);
  }

  generatedOffsetsAt(sourceOffset: number): number[] {
    const offsets = this.#sourceToGeneratedAllView.offsetsAt(sourceOffset);
    return offsets.length > 1
      ? [...new Set(offsets)].sort(compareNumbers)
      : offsets;
  }

  sourceRangesAt(generatedStart: number, generatedEnd: number): Range[] {
    const result: Range[] = [];

    for (const token of this.#generatedToSourceView.tokensIn(
      generatedStart,
      generatedEnd,
    )) {
      if (token.mapping === Mapping.anchor) {
        pushUniqueRange(
          result,
          token.sourceStart,
          token.sourceStart + token.sourceLength,
        );
        continue;
      }

      const relStart = Math.max(0, generatedStart - token.generatedStart);
      const relEnd = Math.min(
        token.generatedLength,
        generatedEnd - token.generatedStart,
      );
      pushUniqueRange(
        result,
        token.sourceStart + relStart,
        token.sourceStart + relEnd,
      );

      if (token.linkedSources) {
        for (const link of token.linkedSources) {
          const linkLength = Math.max(0, link.end - link.start);
          pushUniqueRange(
            result,
            link.start + Math.min(relStart, linkLength),
            link.start + Math.min(relEnd, linkLength),
          );
        }
      }
    }

    return result;
  }

  generatedPositionAt(sourceOffset: number): Position | undefined {
    const generatedOffset = this.generatedOffsetAt(sourceOffset);
    if (generatedOffset !== undefined) {
      return getPosition(this.#generatedLines, generatedOffset);
    }
  }

  generatedRangeAt(sourceStart: number, sourceEnd: number) {
    return this.#sourceToGeneratedView.rangeAt(sourceStart, sourceEnd);
  }

  generatedLocationAt(
    sourceStart: number,
    sourceEnd: number,
  ): Location | undefined {
    const generatedRange = this.generatedRangeAt(sourceStart, sourceEnd);
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
 * The provided token array must be sorted by `inStart`.
 * Token ranges may overlap in the input space (eg the same source
 * range copied to multiple generated locations); lookups scan
 * backward through overlapping candidates using a prefix max of
 * token ends so every covered offset resolves.
 */
abstract class TokenView {
  #tokens: Token[];
  #last: number;
  #maxEnds: number[] | undefined;
  abstract inStart(token: Token): number;
  abstract inLength(token: Token): number;
  abstract outStart(token: Token): number;
  constructor(tokens: Token[]) {
    this.#tokens = tokens;
    this.#last = tokens.length - 1;
  }

  get #inMaxEnds() {
    if (this.#maxEnds) return this.#maxEnds;
    const tokens = this.#tokens;
    const maxEnds: number[] = new Array(tokens.length);
    let max = -1;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const end = this.inStart(token) + this.inLength(token);
      if (end > max) max = end;
      maxEnds[i] = max;
    }

    return (this.#maxEnds = maxEnds);
  }

  offsetAt(offset: number) {
    const token = this.#tokenAt(offset);
    if (token) {
      return this.outStart(token) + (offset - this.inStart(token));
    }
  }

  offsetsAt(offset: number) {
    const result: number[] = [];
    const tokens = this.#tokens;
    let min = 0;
    let max = this.#last;

    while (min < max) {
      const mid = (1 + min + max) >>> 1;

      if (this.inStart(tokens[mid]) <= offset) {
        min = mid;
      } else {
        max = mid - 1;
      }
    }

    const maxEnds = this.#inMaxEnds;

    for (let i = min; i >= 0 && maxEnds[i] >= offset; i--) {
      const token = tokens[i];
      const index = offset - this.inStart(token);
      if (index >= 0 && index <= this.inLength(token)) {
        result.push(this.outStart(token) + index);
      }
    }

    return result;
  }

  tokensIn(inStart: number, inEnd: number) {
    const result: Token[] = [];
    const tokens = this.#tokens;
    if (!tokens.length) return result;

    const maxEnds = this.#inMaxEnds;
    let min = 0;
    let max = this.#last;
    if (maxEnds[max] <= inStart) return result;

    while (min < max) {
      const mid = (min + max) >> 1;

      if (maxEnds[mid] > inStart) {
        max = mid;
      } else {
        min = mid + 1;
      }
    }

    for (let i = max; i < tokens.length; i++) {
      const token = tokens[i];
      const tokenInStart = this.inStart(token);
      if (tokenInStart >= inEnd) break;
      if (tokenInStart + this.inLength(token) > inStart) {
        result.push(token);
      }
    }

    return result;
  }

  rangeAt(inStart: number, inEnd: number) {
    if (inStart >= inEnd) {
      return this.#pointAt(inStart);
    }

    const tokens = this.#tokens;
    const maxEnds = this.#inMaxEnds;
    let min = 0;
    let max = this.#last;

    if (maxEnds[max] <= inStart) return this.#pointAt(inStart);

    while (min < max) {
      const mid = (min + max) >> 1;

      if (maxEnds[mid] > inStart) {
        max = mid;
      } else {
        min = mid + 1;
      }
    }

    const startToken = tokens[max];
    const startTokenInStart = this.inStart(startToken);
    if (startTokenInStart >= inEnd) return this.#pointAt(inStart);

    max = this.#last;

    while (min < max) {
      const mid = (1 + min + max) >>> 1;

      if (this.inStart(tokens[mid]) < inEnd) {
        min = mid;
      } else {
        max = mid - 1;
      }
    }

    const endToken = tokens[min];
    const start =
      this.outStart(startToken) + Math.max(0, inStart - startTokenInStart);
    const end =
      this.outStart(endToken) +
      (endToken.mapping === Mapping.anchor
        ? endToken.sourceLength
        : Math.min(this.inLength(endToken), inEnd - this.inStart(endToken)));

    if (end < start) {
      return {
        start,
        end:
          this.outStart(startToken) +
          (startToken.mapping === Mapping.anchor
            ? startToken.sourceLength
            : Math.min(this.inLength(startToken), inEnd - startTokenInStart)),
      };
    }

    return { start, end };
  }

  #pointAt(offset: number) {
    const out = this.offsetAt(offset);
    if (out !== undefined) return { start: out, end: out };
  }

  #tokenAt(offset: number) {
    const tokens = this.#tokens;
    let min = 0;
    let max = this.#last;

    while (min < max) {
      const mid = (1 + min + max) >>> 1;

      if (this.inStart(tokens[mid]) <= offset) {
        min = mid;
      } else {
        max = mid - 1;
      }
    }

    const maxEnds = this.#inMaxEnds;

    for (let i = min; i >= 0 && maxEnds[i] >= offset; i--) {
      const token = tokens[i];
      const index = offset - this.inStart(token);
      if (index >= 0 && index <= this.inLength(token)) {
        return token;
      }
    }
  }
}

class GeneratedToSourceView extends TokenView {
  inStart(token: Token) {
    return token.generatedStart;
  }

  inLength(token: Token) {
    return token.generatedLength;
  }

  outStart(token: Token) {
    return token.sourceStart;
  }
}

class SourceToGeneratedView extends TokenView {
  inStart(token: Token) {
    return token.sourceStart;
  }

  inLength(token: Token) {
    return token.sourceLength;
  }

  outStart(token: Token) {
    return token.generatedStart;
  }
}

function sortBySourceThenGenerated(a: Token, b: Token) {
  const delta = a.sourceStart - b.sourceStart;
  return delta === 0 ? b.generatedStart - a.generatedStart : delta;
}

function compareNumbers(a: number, b: number) {
  return a - b;
}

function pushUniqueRange(ranges: Range[], start: number, end: number) {
  for (const range of ranges) {
    if (range.start === start && range.end === end) return;
  }

  ranges.push({ start, end });
}
