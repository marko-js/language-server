import { init } from "../../language-server/src/ts-plugin";

// CommonJS export so the TypeScript Server can load this module as a plugin
// (`compilerOptions.plugins: [{ name: "@marko/ts-plugin" }]`). This is the same
// plugin the Marko VS Code extension bundles, published standalone so other
// editors (Zed, Neovim, ...) can register it with their TypeScript server.
export = init;
