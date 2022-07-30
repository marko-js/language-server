import path from "path";

import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

export function getDocDir(doc: TextDocument): string | undefined {
  const filename = getDocFile(doc);
  return filename ? path.dirname(filename) : undefined;
}

export function getDocFile(doc: TextDocument): string | undefined {
  return URI.parse(doc.uri).fsPath;
}
