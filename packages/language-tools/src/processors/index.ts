import type ts from "typescript/lib/tsserverlibrary";

import { Extracted } from "../util/extractor";
import { getExt } from "../util/get-ext";
import cssModule from "./css-module";
import marko from "./marko";

export type ProcessorExtension = `.${string}`;

export interface ProcessorConfig {
  extensions: ProcessorExtension[];
  create(options: CreateProcessorOptions): Processor;
}

export interface CreateProcessorOptions {
  ts: typeof ts;
  host: ts.ModuleResolutionHost;
  configFile: string | undefined;
}

export interface Processor {
  getRootNames?(): string[];
  getScriptExtension(fileName: string): ts.Extension;
  getScriptKind(fileName: string): ts.ScriptKind;
  extract(fileName: string, code: string): Extracted;
  print(context: PrintContext): {
    code: string;
    map?: any;
  };
  printTypes(context: PrintContext): {
    code: string;
    map?: any;
  };
}

export interface PrintContext {
  extracted: Extracted;
  printer: ts.Printer;
  sourceFile: ts.SourceFile;
  typeChecker: ts.TypeChecker;
  formatSettings: Required<ts.FormatCodeSettings>;
}

const configs: ProcessorConfig[] = [marko, cssModule];

// Single-dot extensions (eg `.marko`) vs compound ones (eg `.module.css`),
// which `getExt` cannot detect on its own.
const simpleExtensions = new Set<ProcessorExtension>();
const compoundExtensions: ProcessorExtension[] = [];

for (const config of configs) {
  for (const extension of config.extensions) {
    if (extension.indexOf(".", 1) === -1) {
      simpleExtensions.add(extension);
    } else {
      compoundExtensions.push(extension);
    }
  }
}

const cssModuleExtensions = new Set<ProcessorExtension>(cssModule.extensions);

export const extensions = configs.flatMap(
  (config) => config.extensions,
) as ProcessorExtension[];

export function create(options: CreateProcessorOptions) {
  const result = {} as Record<ProcessorExtension, Processor>;
  for (const config of configs) {
    const processor = config.create(options);
    for (const extension of config.extensions) {
      result[extension] = processor;
    }
  }

  return result;
}

/** Resolve a file's processor extension, including compound `.module.css`. */
export function getProcessorExtension(
  fileName: string,
): ProcessorExtension | undefined {
  const ext = getExt(fileName);
  if (ext && simpleExtensions.has(ext)) return ext;

  if (compoundExtensions.length) {
    const lower = fileName.toLowerCase();
    for (const compound of compoundExtensions) {
      if (lower.endsWith(compound)) return compound;
    }
  }
}

export function has(fileName: string) {
  return getProcessorExtension(fileName) !== undefined;
}

/** Whether a file is a CSS module (`.module.css`, `.module.scss`, `.module.less`). */
export function isCSSModule(fileName: string) {
  const ext = getProcessorExtension(fileName);
  return ext !== undefined && cssModuleExtensions.has(ext);
}
