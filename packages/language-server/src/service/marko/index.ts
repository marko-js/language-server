import * as documents from "../../utils/text-documents";
import type { Plugin } from "../types";
import { doCodeActionResolve, doCodeActions, initialize } from "./code-actions";
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
  },
} as Partial<Plugin>;
