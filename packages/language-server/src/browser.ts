// Browser-consumable surface of the language server.
//
// The Node entry (`./index`) wires the service to an LSP connection; this barrel
// instead exposes the embedded services and the seams a non-Node host must fill
// (a `ts.System`, the Marko compiler, a virtual filesystem) so an embedder -- eg
// the in-browser playground on markojs.com -- can run the same analysis in a Web
// Worker. It deliberately imports none of the Node-only pieces (the
// `vscode-languageserver/node` connection, the jsdom-backed HTML/a11y plugin).
export { createService } from "./service/create-service";
export { default as MarkoPlugin } from "./service/marko";
export { default as ScriptPlugin } from "./service/script";
export { default as StylePlugin } from "./service/style";
export type { Plugin } from "./service/types";
export { clearMarkoCacheForFile } from "./utils/file";
export { default as setupMessages } from "./utils/messages";
export * as documents from "./utils/text-documents";
export { setSystem } from "./utils/ts-system";
export * as workspace from "./utils/workspace";
