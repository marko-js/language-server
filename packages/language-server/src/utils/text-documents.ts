import fs from "fs";
import { URI } from "vscode-uri";
import {
  DidChangeTextDocumentParams,
  DidChangeWatchedFilesParams,
  DidCloseTextDocumentParams,
  DidOpenTextDocumentParams,
  FileChangeType,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

export type FileChangeHandler = (document: TextDocument | undefined) => void;

const docs = new Map<string, TextDocument>();
const openDocs = new Set<TextDocument>();
const fileExists = new Map<string, boolean>();
const fileChangeHandlers: Set<FileChangeHandler> = new Set();

export let projectVersion = 0;

export function onFileChange(handler: FileChangeHandler) {
  fileChangeHandlers.add(handler);
}

export function getAllOpen() {
  return openDocs;
}

export function get(uri: string) {
  const doc = docs.get(uri);
  if (doc) return doc;

  const { fsPath, scheme } = URI.parse(uri);
  if (scheme === "file") {
    if (fileExists.get(uri) === false) return undefined;
    try {
      const newDoc = TextDocument.create(
        uri,
        getLanguageId(uri),
        fs.statSync(fsPath).mtimeMs,
        fs.readFileSync(fsPath, "utf-8")
      );

      docs.set(uri, newDoc);
      fileExists.set(uri, true);
      return newDoc;
    } catch {
      fileExists.set(uri, false);
    }
  }
}

export function exists(uri: string) {
  const cached = fileExists.get(uri);
  if (cached !== undefined) return cached;

  const { fsPath, scheme } = URI.parse(uri);
  if (scheme === "file") {
    try {
      fs.accessSync(fsPath);
      fileExists.set(uri, true);
      return true;
    } catch {
      fileExists.set(uri, false);
      return false;
    }
  }

  return false;
}

export function isOpen(doc: TextDocument) {
  return openDocs.has(doc);
}

export function doOpen(params: DidOpenTextDocumentParams) {
  const doc = params.textDocument;
  const existingDoc = docs.get(doc.uri);

  if (existingDoc) {
    if (existingDoc.version === doc.version) {
      if (!isOpen(existingDoc)) {
        openDocs.add(existingDoc);
        projectVersion++;
      }
      return;
    }

    openDocs.delete(existingDoc);
    docs.delete(doc.uri);
  }

  const newDoc = TextDocument.create(
    doc.uri,
    doc.languageId,
    doc.version,
    doc.text
  );

  openDocs.add(newDoc);
  fileExists.set(doc.uri, true);
  docs.set(doc.uri, newDoc);
  projectVersion++;
}

export function doChange(params: DidChangeTextDocumentParams) {
  const ref = params.textDocument;
  const changes = params.contentChanges;
  const doc = docs.get(ref.uri);
  if (changes.length > 0 && ref.version != null && doc) {
    TextDocument.update(doc, changes, ref.version);
    emitFileChange(doc);
  }
}

export function doClose(params: DidCloseTextDocumentParams) {
  const ref = params.textDocument;
  const doc = docs.get(ref.uri);
  if (doc) {
    projectVersion++;
    openDocs.delete(doc);

    if (URI.parse(ref.uri).scheme !== "file") {
      docs.delete(ref.uri);
    }
  }
}

export function doChangeWatchedFiles(params: DidChangeWatchedFilesParams) {
  for (const change of params.changes) {
    switch (change.type) {
      case FileChangeType.Created:
        fileExists.set(change.uri, true);
        break;
      case FileChangeType.Deleted:
      case FileChangeType.Changed: {
        fileExists.set(change.uri, change.type === FileChangeType.Changed);

        // When a file that's in our cache is changed or deleted and not in an open editor
        // we clear the file from the cache since it will be reloaded when read.
        const doc = docs.get(change.uri);
        if (doc && !openDocs.has(doc)) {
          docs.delete(change.uri);
        }
      }
    }
  }

  emitFileChange(undefined);
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

function emitFileChange(doc: TextDocument | undefined) {
  projectVersion++;

  for (const handler of fileChangeHandlers) {
    handler(doc);
  }
}
