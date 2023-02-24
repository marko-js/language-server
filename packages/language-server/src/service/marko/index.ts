import type { Plugin } from "../types";

import { doComplete } from "./complete";
import { doValidate } from "./validate";
import { doHover } from "./hover";
import { findDefinition } from "./definition";
import { findDocumentLinks } from "./document-links";
import { findDocumentSymbols } from "./document-symbols";
import { format } from "./format";

export default {
  doComplete,
  doValidate,
  doHover,
  findDefinition,
  findDocumentLinks,
  findDocumentSymbols,
  format,
} as Plugin;
