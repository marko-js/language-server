import { NodeType } from "@marko/language-tools";

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
    // Reports whether a position sits inside one of a tag's TS-type regions
    // (its params, type params or type args), where a `|` is a union operator
    // rather than the start of tag params. The client uses this to suppress
    // auto-closing the `|` pair there.
    "$/inTagParams": ({
      textDocument,
      position,
    }: {
      textDocument: { uri: string };
      position: { line: number; character: number };
    }) => {
      const doc = documents.get(textDocument.uri);
      if (doc?.languageId !== "marko") return false;
      const { parsed } = getMarkoFile(doc);
      const node = parsed.nodeAt(doc.offsetAt(position));
      switch (node?.type) {
        case NodeType.TagParams:
        case NodeType.TagTypeParams:
        case NodeType.TagTypeArgs:
          return true;
        default:
          return false;
      }
    },
  },
} as Partial<Plugin>;
