# @marko/ts-plugin

## 3.1.6

### Patch Changes

- [#547](https://github.com/marko-js/language-server/pull/547) [`58e58ef`](https://github.com/marko-js/language-server/commit/58e58ef96578334c2251812933cab8f674031bb2) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade `htmljs-parser` to `^5.12.1`, which fixes a parse error where a `<`/`>` comparison inside a `static`/`server`/`client` function with a return-type annotation was treated as a generic bracket, swallowing the rest of the template (e.g. breaking "Show Extracted Script Output").

## 3.1.5

### Patch Changes

- [#541](https://github.com/marko-js/language-server/pull/541) [`6d688b7`](https://github.com/marko-js/language-server/commit/6d688b7860d36f80a69a343843f4c8892689ac80) Thanks [@vwong](https://github.com/vwong)! - Fix `getComponentName` leaving a trailing `]` in the generated identifier when a component file has a bracketed variant suffix (e.g. `my-button[variant].marko`). The stray `]` produced invalid TypeScript (`const MyButtonVariant] = new …`) which caused TS1005/TS1134/TS1389 parse errors.

## 3.1.4

### Patch Changes

- [#532](https://github.com/marko-js/language-server/pull/532) [`2b7a1ba`](https://github.com/marko-js/language-server/commit/2b7a1badf817175d9873c8eaed0d36e75426ef56) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Stop the TypeScript Server plugin from interfering with other plugins (such as Vue's) in projects that don't use Marko. Because the plugin is injected into the editor's shared TypeScript Server for every workspace, it previously patched the shared language service host even where no Marko files exist, which broke diagnostics, go-to-definition, and rename in `.vue` files. It now stays inert unless the project actually uses Marko.

## 3.1.3

### Patch Changes

- [`8570e73`](https://github.com/marko-js/language-server/commit/8570e73b357851c2c6ddf66c251249a60db3933e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

## 3.1.2

### Patch Changes

- [`0753651`](https://github.com/marko-js/language-server/commit/0753651af3c06b79eb4b28e4bea4162e93108513) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade language tools.

## 3.1.1

### Patch Changes

- [#507](https://github.com/marko-js/language-server/pull/507) [`3401932`](https://github.com/marko-js/language-server/commit/3401932f256c3e564e1249316a067b4600f709cc) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Detect the `Input` type when it is imported into the module scope (eg `import { Input } from "..."` or `import type { Input } from "..."`) instead of only an inline `interface`/`type` declaration.

## 3.1.0

### Minor Changes

- [#505](https://github.com/marko-js/language-server/pull/505) [`9b1af9f`](https://github.com/marko-js/language-server/commit/9b1af9faba20d753acf699f9d8d92f71de135afe) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add `@marko/ts-plugin`, a standalone TypeScript Server plugin that resolves Marko (`.marko`) imports with types inside `.ts`/`.tsx` files. It packages the same plugin the VS Code extension bundles so other editors (Zed, Neovim, ...) can register it with their TypeScript server.
