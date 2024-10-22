import "../utils/project-defaults";
import { create as createCssService } from "volar-service-css";
import { create as createTypeScriptTwoSlashService } from "volar-service-typescript-twoslash-queries";
import { create as createTypeScriptServices } from "volar-service-typescript";
import type { Connection } from "@volar/language-server";
import { Project } from "@marko/language-tools";
import ts from "typescript";
import { create as createAccessibilityService } from "./marko-accessibility";
import { create as createMarkoService } from "./marko";
import { getMarkoLanguagePlugin } from "./core/marko-plugin";
import { createMarkoPrettierService } from "./prettier";
import { create as createMarkoDebugService } from "./marko-debug";
import { create as createMarkoFormatActionService } from "./marko-action-format";
import { create as createMarkoHtmlService } from "./html";

const decoratedHosts = new WeakSet<ts.LanguageServiceHost>();

export function addMarkoTypes(
  rootDir: string,
  ts: typeof import("typescript"),
  host: ts.LanguageServiceHost,
) {
  if (decoratedHosts.has(host)) {
    return;
  }
  decoratedHosts.add(host);

  const getScriptFileNames = host.getScriptFileNames.bind(host);

  host.getScriptFileNames = () => {
    const addedFileNames = [];

    const typeLibs = Project.getTypeLibs(rootDir, ts, host);

    addedFileNames.push(typeLibs.internalTypesFile);
    if (typeLibs.markoRunTypesFile) {
      addedFileNames.push(typeLibs.markoRunTypesFile);
    }
    if (typeLibs.markoRunGeneratedTypesFile) {
      addedFileNames.push(typeLibs.markoRunGeneratedTypesFile);
    }
    addedFileNames.push(typeLibs.markoTypesFile);

    return [...getScriptFileNames(), ...addedFileNames];
  };
}

export function getLanguagePlugins(ts: typeof import("typescript")) {
  return [getMarkoLanguagePlugin(ts)];
}

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
