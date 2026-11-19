# @marko/ts-plugin

## 3.4.0

### Minor Changes

- [#665](https://github.com/marko-js/language-server/pull/665) [`cea7961`](https://github.com/marko-js/language-server/commit/cea79616b43e0daa2c67d480336caa726215d48f) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - A template's declaration is now the one TypeScript emits for its script, which `mtc` writes as `x.d.marko.ts` (where it wrote a Marko syntax `x.d.marko`). It names only Marko's public types, as one written by hand would, so it is typed by whatever tools and runtime read it: `Marko.Template<Input, Return>`, or for a generic template `Marko.TemplateOf<<T>(input: Input<T>) => Return>`, its signature (which Marko's types declare as of `marko` 5.41 and 6.5, so a generic template is typed with at least those), from which a tag infers its type arguments. A generic template's own methods (`render`, `mount`, …) take its input for its type parameters' constraints, so a caller with a given input asserts it as a template of that input: `const numbers = List as Marko.Template<Input<number>>;`. A tag of a template is checked against the template's input alone, so its errors name that input, and Marko 5's directives (`key`, `no-update`, …), which a Class API template checks apart, are no longer offered among its attributes; a Tags API template has none, so they are attributes passed to its input. A legacy `x.d.marko` written by hand beside a template still stands in for it, and ships as it is written. A template no longer exports `"~api"`, the API it is written in: `@marko/run` reads that from a Class API template's `Component`.

  A template's code is checked as the function the template's value is typed from: `input` is its parameter (its hover reads `(parameter) input: Input`) and `this` is the module's `undefined`, so reading a property of `this` reports that it is possibly undefined.

  `Processors`' `printTypes`, the print context's `printer`, `typeChecker`, `sourceFile` and `formatSettings`, and the `INTERNAL_API_VAR` and `INTERNAL_API_EXPORT_NAME` exports are removed from `@marko/language-tools`: the declaration is TypeScript's own.

## 3.3.0

### Minor Changes

- [#655](https://github.com/marko-js/language-server/pull/655) [`a6bfe6f`](https://github.com/marko-js/language-server/commit/a6bfe6ffb1d1788f836c456b32ed682237d5f9ad) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - A template with a `x.d.marko.ts` beside it is typed by that declaration in the editor and in `mtc`, as a `.js` file is by its `.d.ts`, and as TypeScript itself reads one for an import of `x.marko`. A legacy Marko syntax `x.d.marko` is read as before, where there is no `x.d.marko.ts`. `@marko/language-tools` adds `getTemplateDeclaration`, which finds a template's declaration as they do.

## 3.2.1

### Patch Changes

- [#629](https://github.com/marko-js/language-server/pull/629) [`34cec3a`](https://github.com/marko-js/language-server/commit/34cec3a631ccc1636e7b0970d08000c18ceb09d3) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Build against `@marko/compiler` 5.43 and `marko` 5.40, whose taglib discovery reads only what is used. A project without Marko installed is read with them, and the bundled Marko types read a template's input and return types from `Marko.Template` alone. A tag whose `marko.json` entry or `marko-tag.json` fails to load is reported on the tags that use it.

- [#616](https://github.com/marko-js/language-server/pull/616) [`ab15839`](https://github.com/marko-js/language-server/commit/ab1583931e2bb5f9961a644af3b6accd38a9883a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Run the bundles in strict mode as intended: the `import.meta.url` banner sat above esbuild's `"use strict"` directive, so it no longer counted.

## 3.2.0

### Minor Changes

- [#588](https://github.com/marko-js/language-server/pull/588) [`9b627df`](https://github.com/marko-js/language-server/commit/9b627df21b63f9aeecd04780b9336ac3b734fa17) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Support the `async` shorthand method modifier, eg `<button async onClick() { await save() }>`, so its body type-checks as an async function.

## 3.1.10

### Patch Changes

- [#584](https://github.com/marko-js/language-server/pull/584) [`4e2cedc`](https://github.com/marko-js/language-server/commit/4e2cedc587c45f1991dc42ef1d886540665a0684) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Stop leaking the internal `"~api"` export into generated `.d.marko` files.

## 3.1.9

### Patch Changes

- [#577](https://github.com/marko-js/language-server/pull/577) [`23c88e8`](https://github.com/marko-js/language-server/commit/23c88e878dcae24d13cacf4793a8b63be4bdab0c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update `@marko/compiler` to 5.41.7 and `marko` to 5.39.27.

## 3.1.8

### Patch Changes

- [#575](https://github.com/marko-js/language-server/pull/575) [`c42fed4`](https://github.com/marko-js/language-server/commit/c42fed47194b731f769ac19a5346e6c4128c0940) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Load the shipped `marko.internal.d.ts` from the installed `@marko/language-tools` rather than resolving it from the project being checked, so `mtc` no longer fails with "Could not resolve marko type files." in pnpm projects where `@marko/language-tools` is only a transitive dependency.

## 3.1.7

### Patch Changes

- [#566](https://github.com/marko-js/language-server/pull/566) [`e193905`](https://github.com/marko-js/language-server/commit/e1939050cc5ba6a4a77014c91fa7bc1194458938) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update `@marko/compiler`, `marko`, and `prettier-plugin-marko` to their latest releases.

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
