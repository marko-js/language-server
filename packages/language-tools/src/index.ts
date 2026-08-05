export * from "./extractors/css-module";
export * from "./extractors/html";
export * from "./extractors/script";
export * from "./extractors/style";
export * from "./parser";
export * as Processors from "./processors";
export { type Extracted } from "./util/extractor";
export { getExt } from "./util/get-ext";
export { isDefinitionFile } from "./util/is-definition-file";
export {
  createLanguageService,
  type CreateLanguageServiceOptions,
  type MarkoLanguageService,
} from "./util/language-service";
export {
  createModuleResolver,
  type CreateModuleResolverOptions,
  type ModuleResolver,
} from "./util/module-resolver";
export { normalizePath } from "./util/normalize-path";
export * as Project from "./util/project";
