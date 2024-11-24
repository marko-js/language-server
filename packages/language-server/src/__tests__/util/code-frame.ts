import { codeFrameColumns } from "@babel/code-frame";
import type { Location, Position } from "htmljs-parser";

export function codeFrame(code: string, message: string, loc: Location) {
  return codeFrameColumns(code, toBabelLocation(loc), { message });
}

function toBabelLocation({ start, end }: Location) {
  if (start.line === end.line && start.character === end.character) {
    return { start: toBabelPosition(start) };
  }

  return {
    start: toBabelPosition(start),
    end: toBabelPosition(end),
  };
}

function toBabelPosition({ line, character }: Position) {
  return {
    // Babel lines start at 1 and use "column" instead of "character".
    line: line + 1,
    column: character + 1,
  };
}
