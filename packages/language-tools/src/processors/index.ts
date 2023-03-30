import type ts from "typescript/lib/tsserverlibrary";
import { Extracted } from "../util/extractor";
import marko from "./marko";

export type ProcessorExtension = `.${string}`;

export interface ProcessorConfig {
  extension: ProcessorExtension;
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
  print(context: ReturnType<this["extract"]> & PrintContext): {
    code: string;
    map?: any;
  };
  printTypes(context: ReturnType<this["extract"]> & PrintContext): {
    code: string;
    map?: any;
  };
}

export interface PrintContext {
  printer: ts.Printer;
  sourceFile: ts.SourceFile;
  typeChecker: ts.TypeChecker;
  formatSettings: Required<ts.FormatCodeSettings>;
}

export const extensions = [marko.extension] as ProcessorExtension[];

export function create(options: Parameters<ProcessorConfig["create"]>[0]) {
  return {
    [marko.extension]: marko.create(options),
  } as Record<ProcessorExtension, Processor>;
}

export function has(fileName: string) {
  const ext = getExt(fileName);
  return !!(ext && extensions.includes(ext));
}

export function getExt(fileName: string) {
  const extIndex = fileName.lastIndexOf(".");
  if (extIndex !== -1) return fileName.slice(extIndex) as `.${string}`;
}

export function isDefinitionFile(fileName: string) {
  return /\.d\.[^.]+$/.test(fileName);
}
