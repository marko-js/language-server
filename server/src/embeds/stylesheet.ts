import type { TaglibLookup } from "@marko/babel-utils";
import { parse, Node, Range, NodeType } from "../utils/parser";

export function extractStylesheet(
  source: string,
  lookup: TaglibLookup | null | undefined
) {
  let output = "";
  const outputMap: number[] = []; // grouped in sets of [outputStart, inputStart, inputEnd] and sorted by outputStart
  const read = (range: Range) => source.slice(range.start, range.end);
  const add = (strs: TemplateStringsArray, ...exprs: (string | Range)[]) => {
    const len = exprs.length;
    for (let i = 0; i < len; i++) {
      const expr = exprs[i];
      output += strs[i];

      if (typeof expr === "string") {
        output += expr;
      } else {
        outputMap.push(output.length, expr.start, expr.end);
        output += source.slice(expr.start, expr.end);
      }
    }

    output += strs[len];
  };

  const visit = (node: Node.ChildNode) => {
    switch (node.type) {
      case NodeType.Tag:
        if (node.body?.length) {
          if (node.nameText === "style") {
            for (const child of node.body) {
              switch (child.type) {
                case NodeType.Text:
                  add`${child}`;
                  break;
              }
            }
          } else {
            if (node.attrs) {
              for (const attr of node.attrs) {
                if (
                  attr.type === NodeType.AttrNamed &&
                  attr.value?.type === NodeType.AttrValue &&
                  /^['"]$/.test(source[attr.value.value.start])
                ) {
                  const name = read(attr.name);

                  if (
                    name === "#style" ||
                    (name === "style" &&
                      lookup &&
                      node.nameText &&
                      name === "style" &&
                      lookup.getTag(node.nameText)?.html)
                  ) {
                    // Add inline "style" attribute and "#style" directive.
                    add`:root{${{
                      start: attr.value.value.start + 1,
                      end: attr.value.value.end - 1,
                    }}}`;
                  }
                }
              }
            }
            for (const child of node.body) {
              visit(child);
            }
          }
        } else if (node.nameText === "style" && node.concise && node.attrs) {
          const block = node.attrs.at(-1)!;
          if (
            block.type === NodeType.AttrNamed &&
            source[block.start] === "{"
          ) {
            add`${{
              start: block.start + 1,
              end: block.end - 1,
            }}`;
          }
        }
        break;
    }
  };

  const { program } = parse(source);
  for (const node of program.body) {
    visit(node);
  }

  const inputMap: typeof outputMap = outputMap.slice(); // grouped in sets of [outputStart, inputStart, inputEnd] and sorted by inputStart
  // Quick sort inputMap by inputStart
  (function sort(left: number, right: number) {
    if (left < right) {
      let next = left;

      for (let i = left; i <= right; i += 3) {
        if (inputMap[i] <= inputMap[right]) {
          [inputMap[next - 1], inputMap[i - 1]] = [
            inputMap[i - 1],
            inputMap[next - 1],
          ];
          [inputMap[next], inputMap[i]] = [inputMap[i], inputMap[next]];
          [inputMap[next + 1], inputMap[i + 1]] = [
            inputMap[i + 1],
            inputMap[next + 1],
          ];
          next += 3;
        }
      }

      next -= 3;
      sort(left, next - 3);
      sort(next + 3, right);
    }
  })(1, inputMap.length - 2);

  return {
    output,
    inputOffsetFrom(outputOffset: number): number | undefined {
      let max = outputMap.length / 3;
      let min = 0;

      while (min < max) {
        const mid = (1 + min + max) >>> 1;

        if (outputMap[mid * 3] <= outputOffset) {
          min = mid;
        } else {
          max = mid - 1;
        }
      }

      const key = min * 3;
      const outputStart = outputMap[key];
      const inputStart = outputMap[key + 1];
      const inputEnd = outputMap[key + 2];
      return inputEnd - inputStart < outputOffset - outputStart
        ? undefined
        : inputStart + (outputOffset - outputStart);
    },
    outputOffsetFrom(inputOffset: number): number | undefined {
      let max = inputMap.length / 3;
      let min = 0;

      while (min < max) {
        const mid = (1 + min + max) >>> 1;

        if (inputMap[mid * 3 + 1] <= inputOffset) {
          min = mid;
        } else {
          max = mid - 1;
        }
      }

      const key = min * 3;
      const inputStart = inputMap[key + 1];
      const inputEnd = inputMap[key + 2];
      if (inputOffset < inputStart || inputOffset >= inputEnd) return undefined;

      const outputStart = inputMap[key];
      return outputStart + (inputOffset - inputStart);
    },
    inputRangeAt(offset: number): Range | undefined {
      let max = outputMap.length / 3;
      let min = 0;

      while (min < max) {
        const mid = (1 + min + max) >>> 1;

        if (outputMap[mid * 3] <= offset) {
          min = mid;
        } else {
          max = mid - 1;
        }
      }

      const key = min * 3;
      const outputStart = outputMap[key];
      const inputStart = outputMap[key + 1];
      const inputEnd = outputMap[key + 2];
      return inputEnd - inputStart < offset - outputStart
        ? undefined
        : { start: inputStart, end: inputEnd };
    },
    outputRangeAt(offset: number): Range | undefined {
      let max = inputMap.length / 3;
      let min = 0;

      while (min < max) {
        const mid = (1 + min + max) >>> 1;

        if (inputMap[mid * 3 + 1] <= offset) {
          min = mid;
        } else {
          max = mid - 1;
        }
      }

      const key = min * 3;
      const inputStart = inputMap[key + 1];
      const inputEnd = inputMap[key + 2];
      if (offset < inputStart || offset >= inputEnd) return undefined;

      const outputStart = inputMap[key];
      const outputEnd = outputStart + inputEnd - inputStart;
      return {
        start: outputStart,
        end: outputEnd,
      };
    },
  };
}
