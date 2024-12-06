import { create as createCssService } from "volar-service-css";
import { create as createTypeScriptTwoSlashService } from "volar-service-typescript-twoslash-queries";
import { create as createTypeScriptServices } from "volar-service-typescript";
import type { Connection } from "@volar/language-server";
import { create as createAccessibilityService } from "./marko-accessibility";
import { create as createMarkoService } from "./marko";
import { createMarkoPrettierService } from "./prettier";
import { create as createMarkoDebugService } from "./marko-debug";
import { create as createMarkoFormatActionService } from "./marko-action-format";
import { create as createMarkoHtmlService } from "./html";

export function getLanguageServicePlugins(
  connection: Connection,
  ts: typeof import("typescript"),
) {
  const result = [
    createMarkoService(ts),
    createMarkoHtmlService(),
    createCssService(),
    ...createTypeScriptServices(ts),
    createTypeScriptTwoSlashService(ts),
    createMarkoPrettierService(connection),
    createAccessibilityService(),
    createMarkoDebugService(),
    createMarkoFormatActionService(),
  ];
  return result;
}
