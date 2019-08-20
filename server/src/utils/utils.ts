import fs from "fs";
import { URI } from "vscode-uri";
import { TextDocument, Position, Range } from "vscode-languageserver";
import { ParserEvents } from "./htmljs-parser";

export const START_OF_FILE = Range.create(
  Position.create(0, 0),
  Position.create(0, 0)
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
