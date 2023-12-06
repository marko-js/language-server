import path from "path";
import * as defaultCompiler from "@marko/compiler";
import defaultConfig from "@marko/compiler/config";
import * as defaultTranslator from "@marko/translator-default";
import { Project } from "@marko/language-tools";

Project.setDefaultTypePaths({
  internalTypesFile: path.join(__dirname, "marko.internal.d.ts"),
  markoTypesFile: path.join(__dirname, "marko.runtime.d.ts"),
});
Project.setDefaultCompilerMeta(defaultCompiler, {
  ...defaultConfig,
  translator: defaultTranslator,
});
