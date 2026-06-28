import { type Node, NodeType } from "@marko/language-tools";

import { getMarkoFile } from "../../utils/file";
import * as documents from "../../utils/text-documents";
import type { Plugin } from "../types";
import { doCodeActionResolve, doCodeActions, initialize } from "./code-actions";
import { compileDocument, type CompiledOutputTarget } from "./compile";
import { doComplete } from "./complete";
import { findDefinition } from "./definition";
import { findDocumentLinks } from "./document-links";
import { findDocumentSymbols } from "./document-symbols";
import { format, formatDocument, type FormatOptions } from "./format";
import { doHover } from "./hover";
import { doValidate } from "./validate";

/**
 * Whether typing `|` at `offset` would start `tag`'s params: inside the open
 * tag, past the name/shorthands/type params/args/var, and outside any existing
 * params, args or attribute (where `|` is an operator or attribute text).
 */
function tagParamsCanStartAt(
  offset: number,
  tag: Node.Tag | Node.AttrTag,
): boolean {
  const { open } = tag;
  if (offset <= open.start || offset >= open.end) return false;

  let headEnd = tag.name.end;
  for (const part of [
    tag.shorthandId,
    tag.typeArgs,
    tag.typeParams,
    tag.var,
    ...(tag.shorthandClassNames || []),
  ]) {
    if (part && part.end > headEnd) headEnd = part.end;
  }
  if (offset < headEnd) return false;

  for (const range of [tag.params, tag.args, ...(tag.attrs || [])]) {
    if (range && offset > range.start && offset < range.end) return false;
  }
  return true;
}

export default {
  initialize,
  doComplete,
  doValidate,
  doHover,
  doCodeActions,
  doCodeActionResolve,
  findDefinition,
  findDocumentLinks,
  findDocumentSymbols,
  format,
  commands: {
    "$/formatWithMode": async ({
      doc: docURI,
      options,
    }: {
      doc: string;
      options: FormatOptions;
    }) => {
      const doc = documents.get(docURI)!;
      const formatted = await formatDocument(doc, options);
      return formatted;
    },
    "$/showCompiledOutput": async ({
      uri,
      output,
    }: {
      uri: string;
      output: CompiledOutputTarget;
    }) => {
      const doc = documents.get(uri);
      if (doc?.languageId !== "marko") return;
      return compileDocument(doc, output);
    },
    // Reports whether typing `|` at a position would start a tag's params (eg
    // `<for█>` -> `<for|item|>`). This is the only place we want the `|` pair
    // to auto-close; the client uses it to enable that pair there and nowhere
    // else (not in params, attributes, bodies, etc).
    "$/canOpenTagParams": ({
      textDocument,
      position,
    }: {
      textDocument: { uri: string };
      position: { line: number; character: number };
    }) => {
      const doc = documents.get(textDocument.uri);
      if (doc?.languageId !== "marko") return false;
      const { parsed } = getMarkoFile(doc);
      const offset = doc.offsetAt(position);
      let node: Node.AnyNode | undefined = parsed.nodeAt(offset);
      while (
        node &&
        node.type !== NodeType.Tag &&
        node.type !== NodeType.AttrTag
      ) {
        node = node.parent;
      }
      return node ? tagParamsCanStartAt(offset, node) : false;
    },
  },
} as Partial<Plugin>;
