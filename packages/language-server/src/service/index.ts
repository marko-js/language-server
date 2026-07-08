import {
  doChange,
  doChangeWatchedFiles,
  doClose,
  doOpen,
  get,
} from "../utils/text-documents";
export const documents = {
  get,
  doChange,
  doOpen,
  doClose,
  doChangeWatchedFiles,
};

import { createService } from "./create-service";
import HtmlPlugin from "./html";
import MarkoPlugin from "./marko";
import ScriptPlugin from "./script";
import StylePlugin from "./style";

/**
 * Facade to all embedded plugins, eg css, typescript and our own.
 */
const service = createService([
  MarkoPlugin,
  ScriptPlugin,
  StylePlugin,
  HtmlPlugin,
]);

export { service as default };
