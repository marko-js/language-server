import type { Plugin } from "../types";
import { doComplete } from "./complete";
import { doValidate } from "./validate";
import { format } from "./format";

export default {
  doComplete,
  doValidate,
  format,
} as Plugin;
