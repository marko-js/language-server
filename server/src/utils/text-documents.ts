import fs from "fs";
import { URI } from "vscode-uri";
import { Connection, FileChangeType } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

const docs = new Map<string, TextDocument>();
const openDocs = new Set<TextDocument>();
const missingFiles = new Set<string>();

export function getAllOpen() {
  return openDocs;
}

export function get(uri: string) {
  const doc = docs.get(uri);
  if (doc) return doc;

  const { fsPath, scheme } = URI.parse(uri);
  if (scheme === "file") {
    if (missingFiles.has(uri)) return undefined;
    try {
      const newDoc = TextDocument.create(
        uri,
        getLanguageId(uri),
        0,
        fs.readFileSync(fsPath, "utf8")
      );

      docs.set(uri, newDoc);
      return newDoc;
    } catch {
      missingFiles.add(uri);
    }
  }
}

export function isOpen(doc: TextDocument) {
  return openDocs.has(doc);
}

export function setup(
  connection: Connection,
  onFilesChanged: (document: TextDocument | undefined) => void
) {
  connection.onDidOpenTextDocument((params) => {
    const ref = params.textDocument;
    const existingDoc = docs.get(ref.uri);

    if (existingDoc) {
      if (existingDoc.version === ref.version) {
        openDocs.add(existingDoc);
        return;
      }

      openDocs.delete(existingDoc);
      docs.delete(ref.uri);
    }

    const newDoc = TextDocument.create(
      ref.uri,
      ref.languageId,
      ref.version,
      ref.text
    );

    openDocs.add(newDoc);
    missingFiles.delete(ref.uri);
    docs.set(ref.uri, newDoc);
  });

  connection.onDidChangeTextDocument((params) => {
    const ref = params.textDocument;
    const changes = params.contentChanges;
    const doc = docs.get(ref.uri);
    if (changes.length > 0 && ref.version != null && doc) {
      TextDocument.update(doc, changes, ref.version);
      onFilesChanged(doc);
    }
  });

  connection.onDidCloseTextDocument((params) => {
    const ref = params.textDocument;
    const doc = docs.get(ref.uri);
    if (doc) {
      openDocs.delete(doc);

      if (URI.parse(ref.uri).scheme !== "file") {
        docs.delete(ref.uri);
      }
    }
  });

  connection.onDidChangeWatchedFiles(async (params) => {
    for (const change of params.changes) {
      switch (change.type) {
        case FileChangeType.Created:
          missingFiles.delete(change.uri);
          break;
        case FileChangeType.Deleted:
        case FileChangeType.Changed: {
          // When a file that's in our cache is changed or deleted and not in an open editor
          // we clear the file from the cache since it will be reloaded when read.
          const doc = docs.get(change.uri);
          if (doc && !openDocs.has(doc)) {
            docs.delete(change.uri);
          }
        }
      }
    }

    onFilesChanged(undefined);
  });
}

function getLanguageId(uri: string) {
  const ext = uri.slice(uri.lastIndexOf(".") + 1);
  switch (ext) {
    case "cjs":
    case "mjs":
    case "js":
      return "javascript";
    case "cts":
    case "mts":
    case "ts":
      return "typescript";
    default:
      return ext;
  }
}
