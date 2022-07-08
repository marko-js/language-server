import type { TextDocument } from "vscode-languageserver-textdocument";
import path from "path";
import { URI } from "vscode-uri";

export function getDocDir(doc: TextDocument) {
  return path.dirname(getDocFile(doc));
}

export function getDocFile(doc: TextDocument) {
  return URI.parse(doc.uri).fsPath;
}
