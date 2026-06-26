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
 * Whether `offset` is at a spot in a tag's open tag where typing `|` would
 * start its params. Params come after the tag name, its shorthands, type
 * params/args and var, and before any args or attributes, so the cursor has to
 * be past the former and outside the (interiors of the) latter.
 */
function tagParamsCanStartAt(
  offset: number,
  tag: Node.Tag | Node.AttrTag,
): boolean {
  const { open } = tag;
  // Must be within the open tag (`<name ...>`), not its body.
  if (offset <= open.start || offset >= open.end) return false;

  let headEnd = tag.name.end;
  for (const part of [tag.shorthandId, tag.typeArgs, tag.typeParams, tag.var]) {
    if (part && part.end > headEnd) headEnd = part.end;
  }
  if (tag.shorthandClassNames) {
    for (const className of tag.shorthandClassNames) {
      if (className.end > headEnd) headEnd = className.end;
    }
  }
  if (offset < headEnd) return false;

  // Not inside an existing params/args list or an attribute, where `|` is a
  // TS/JS operator or attribute text rather than the start of params.
  if (insideInterior(offset, tag.params)) return false;
  if (insideInterior(offset, tag.args)) return false;
  if (tag.attrs) {
    for (const attr of tag.attrs) {
      if (insideInterior(offset, attr)) return false;
    }
  }
  return true;
}

function insideInterior(
  offset: number,
  range: { start: number; end: number } | undefined,
): boolean {
  return range !== undefined && offset > range.start && offset < range.end;
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
