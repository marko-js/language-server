# @marko/ts-plugin

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
