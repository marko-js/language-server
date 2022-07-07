import type { Plugin } from "../types";
import { doComplete } from "./complete";
import { doValidate } from "./validate";
import { findDefinition } from "./definition";
import { format } from "./format";

export default {
  doComplete,
  doValidate,
  findDefinition,
  format,
} as Plugin;
