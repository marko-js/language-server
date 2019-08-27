import fs from "fs";
import { URI } from "vscode-uri";
import {
  CompletionList,
  TextDocument,
  TextEdit,
  Position,
  Range
} from "vscode-languageserver";
import { ParserEvents } from "./htmljs-parser";

export const START_OF_FILE = Range.create(
  Position.create(0, 0),
  Position.create(0, Number.MAX_SAFE_INTEGER)
);

export function findNonControlFlowParent(tag: ParserEvents.OpenTagName) {
  let parent = tag.parent;

  while (parent) {
    if (!/^(?:else-)?if|else|for|while$/.test(parent.tagName)) {
      return parent;
    }

    parent = parent.parent;
  }

  return null;
}

export function rangeFromEvent(
  document: TextDocument,
  event: ParserEvents.Any
) {
  return Range.create(
    document.positionAt(event.pos),
    document.positionAt(event.endPos)
  );
}

export function createTextDocument(filename: string): TextDocument {
  const uri = URI.file(filename).toString();
  const content = fs.readFileSync(filename, "utf-8");
  return TextDocument.create(uri, "plaintext", 0, content);
}

export function shiftCompletionRanges(list: CompletionList, offset: Position) {
  list.items.forEach(item => {
    if (item.additionalTextEdits) {
      item.additionalTextEdits.forEach(edit => shiftRange(edit, offset));
    }

    if (item.textEdit) {
      shiftRange(item.textEdit, offset);
    }
  });

  return list;
}

export function shiftRange({ range }: TextEdit, offset: Position) {
  if (range) {
    shiftPosition(range.start, offset);
    shiftPosition(range.end, offset);
  }
}

export function shiftPosition(pos: Position, offset: Position) {
  if (pos.line === 0) {
    pos.character += offset.character;
  }

  pos.line += offset.line;
  return pos;
}
