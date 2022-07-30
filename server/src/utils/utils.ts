import fs from "fs";

import { URI } from "vscode-uri";
import { Position, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

export const START_OF_FILE = Range.create(
  Position.create(0, 0),
  Position.create(0, 0)
);

export function createTextDocument(filename: string): TextDocument {
  const uri = URI.file(filename).toString();
  const content = fs.readFileSync(filename, "utf-8");
  return TextDocument.create(uri, "plaintext", 0, content);
}
