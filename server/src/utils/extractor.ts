import type { Range } from "./parser";

/**
 * Utility to build up generate code from source ranges while maintaining a source mapping.
 */
export function createExtractor(code: string) {
  let generated = "";
  const generatedMap: number[] = []; // grouped in sets of [generatedStart, sourceStart, sourceEnd] and sorted by generatedStart
  return {
    write(strs: TemplateStringsArray, ...exprs: (string | Range)[]) {
      const len = exprs.length;
      for (let i = 0; i < len; i++) {
        const expr = exprs[i];
        generated += strs[i];

        if (typeof expr === "string") {
          generated += expr;
        } else {
          generatedMap.push(generated.length, expr.start, expr.end);
          generated += code.slice(expr.start, expr.end);
        }
      }

      generated += strs[len];
    },
    end() {
      const sourceMap: typeof generatedMap = generatedMap.slice(); // grouped in sets of [generatedStart, sourceStart, sourceEnd] and sorted by sourceStart
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
          const sourceStart = generatedMap[key + 1];
          const sourceEnd = generatedMap[key + 2];
          return sourceEnd - sourceStart <= generatedOffset - generatedStart
            ? undefined
            : sourceStart + (generatedOffset - generatedStart);
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
          const sourceEnd = sourceMap[key + 2];
          if (sourceOffset < sourceStart || sourceOffset > sourceEnd)
            return undefined;

          const generatedStart = sourceMap[key];
          return generatedStart + (sourceOffset - sourceStart);
        },
      };
    },
  };
}
