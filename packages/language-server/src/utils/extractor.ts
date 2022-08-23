import {
  type Location,
  type Parsed,
  type Position,
  type Range,
  getLines,
  getLocation,
  getPosition,
} from "./parser";

export type Extractor = ReturnType<typeof createExtractor>;
export type Extracted = ReturnType<Extractor["end"]>;

/**
 * Utility to build up generate code from source ranges while maintaining a source mapping.
 */
export function createExtractor({ read, positionAt, locationAt }: Parsed) {
  let generated = "";
  const generatedMap: number[] = []; // grouped in sets of [generatedStart, sourceStart, length] and sorted by generatedStart
  return {
    write(strs: TemplateStringsArray, ...exprs: (string | Range)[]) {
      const len = exprs.length;
      for (let i = 0; i < len; i++) {
        const expr = exprs[i];
        generated += strs[i];

        if (typeof expr === "string") {
          generated += expr;
        } else {
          generatedMap.push(
            generated.length,
            expr.start,
            expr.end - expr.start
          );
          generated += read(expr);
        }
      }

      generated += strs[len];
    },
    end() {
      const sourceMap: typeof generatedMap = generatedMap.slice(); // grouped in sets of [generatedStart, sourceStart, length] and sorted by sourceStart
      let generatedLines: number[] | undefined;
      // Quick sort generatedMap by sourceStart
      (function sort(left: number, right: number) {
        if (left < right) {
          let next = left;

          for (let i = left; i <= right; i += 3) {
            if (sourceMap[i] <= sourceMap[right]) {
              [sourceMap[next - 1], sourceMap[i - 1]] = [
                sourceMap[i - 1],
                sourceMap[next - 1],
              ];
              [sourceMap[next], sourceMap[i]] = [sourceMap[i], sourceMap[next]];
              [sourceMap[next + 1], sourceMap[i + 1]] = [
                sourceMap[i + 1],
                sourceMap[next + 1],
              ];
              next += 3;
            }
          }

          next -= 3;
          sort(left, next - 3);
          sort(next + 3, right);
        }
      })(1, sourceMap.length - 2);
      return {
        generated,
        sourceOffsetAt(generatedOffset: number): number | undefined {
          let max = generatedMap.length / 3;
          let min = 0;

          while (min < max) {
            const mid = (1 + min + max) >>> 1;

            if (generatedMap[mid * 3] <= generatedOffset) {
              min = mid;
            } else {
              max = mid - 1;
            }
          }

          const key = min * 3;
          const generatedStart = generatedMap[key];
          if (generatedOffset >= generatedStart) {
            const length = generatedMap[key + 2];
            const index = generatedOffset - generatedStart;
            if (index <= length) {
              const sourceStart = generatedMap[key + 1];
              return sourceStart + index;
            }
          }
        },

        sourcePositionAt(generatedOffset: number): Position | undefined {
          const sourceOffset = this.sourceOffsetAt(generatedOffset);
          if (sourceOffset !== undefined) return positionAt(sourceOffset);
        },

        sourceLocationAt(
          generatedStart: number,
          generatedEnd: number
        ): Location | undefined {
          const start = this.sourceOffsetAt(generatedStart);
          if (start === undefined) return;
          const end = this.sourceOffsetAt(generatedEnd);
          if (end === undefined) return;
          return locationAt({ start, end });
        },

        generatedOffsetAt(sourceOffset: number): number | undefined {
          let max = sourceMap.length / 3;
          let min = 0;

          while (min < max) {
            const mid = (1 + min + max) >>> 1;

            if (sourceMap[mid * 3 + 1] <= sourceOffset) {
              min = mid;
            } else {
              max = mid - 1;
            }
          }

          const key = min * 3;
          const sourceStart = sourceMap[key + 1];
          if (sourceOffset >= sourceStart) {
            const length = sourceMap[key + 2];
            const index = sourceOffset - sourceStart;
            if (index <= length) {
              const generatedStart = sourceMap[key];
              return generatedStart + index;
            }
          }
        },

        generatedPositionAt(sourceOffset: number): Position | undefined {
          const generatedOffset = this.generatedOffsetAt(sourceOffset);
          if (generatedOffset !== undefined) {
            return getPosition(
              generatedLines || (generatedLines = getLines(generated)),
              generatedOffset
            );
          }
        },

        generatedLocationAt(
          sourceStart: number,
          sourceEnd: number
        ): Location | undefined {
          const generatedStart = this.generatedOffsetAt(sourceStart);
          if (generatedStart === undefined) return;
          const generatedEnd = this.generatedOffsetAt(sourceEnd);
          if (generatedEnd === undefined) return;
          return getLocation(
            generatedLines || (generatedLines = getLines(generated)),
            generatedStart,
            generatedEnd
          );
        },
      };
    },
  };
}