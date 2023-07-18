# @marko/language-tools

## 2.1.2

### Patch Changes

- [#200](https://github.com/marko-js/language-server/pull/200) [`e05c6f6`](https://github.com/marko-js/language-server/commit/e05c6f622730160e05581552df6e5bf4bb64ce57) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with default compiler not being found.

## 2.1.1

### Patch Changes

- [#197](https://github.com/marko-js/language-server/pull/197) [`ab2da8c`](https://github.com/marko-js/language-server/commit/ab2da8c274cc35d7a1a538a9b5c96fd40c79b796) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Lazily load the default compiler and translator.

- [#197](https://github.com/marko-js/language-server/pull/197) [`ab2da8c`](https://github.com/marko-js/language-server/commit/ab2da8c274cc35d7a1a538a9b5c96fd40c79b796) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Move @marko/compiler to a peerDependency of @marko/type-check to avoid conflicts.

## 2.1.0

### Minor Changes

- [#189](https://github.com/marko-js/language-server/pull/189) [`e7f82cc`](https://github.com/marko-js/language-server/commit/e7f82ccbb9d91b2327809dad4343cee1ab01d62d) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add accessibility linting for Marko templates.

## 2.0.11

### Patch Changes

- [#186](https://github.com/marko-js/language-server/pull/186) [`5992e17`](https://github.com/marko-js/language-server/commit/5992e174e64d7106b73a51c878745b84293b3588) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fixes an issue where @marko/type-check was emitting files within node_modules.

## 2.0.10

### Patch Changes

- [#183](https://github.com/marko-js/language-server/pull/183) [`f2c791a`](https://github.com/marko-js/language-server/commit/f2c791af24690ec8d6d7155c6a6d7ed6b6b373e7) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix importing a commonjs component file with JSDOC type generation.

## 2.0.9

### Patch Changes

- [#181](https://github.com/marko-js/language-server/pull/181) [`15cf245`](https://github.com/marko-js/language-server/commit/15cf245555148a07a20ccd3f08a855cc41364260) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fixes an issue where Marko files within node_modules without an explicit `marko.json` were not being loaded. Internally this switches to a new api that should not be tripped up by either export maps and / or a missing `marko.json` when trying to resolve Marko files.

## 2.0.8

### Patch Changes

- [#179](https://github.com/marko-js/language-server/pull/179) [`b743baa`](https://github.com/marko-js/language-server/commit/b743baa9047b6b6eace64c808b5f913cf0864133) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - The format command should now propely output export statements which can be parsed by the Marko parser.

- [#179](https://github.com/marko-js/language-server/pull/179) [`b743baa`](https://github.com/marko-js/language-server/commit/b743baa9047b6b6eace64c808b5f913cf0864133) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Downgrade the strip-json-comments module to match the version used by Marko. The latest version does not work in commonjs environments.

## 2.0.7

### Patch Changes

- [#171](https://github.com/marko-js/language-server/pull/171) [`6259092`](https://github.com/marko-js/language-server/commit/625909231a4e00d0cf9c4669ab1b470d905028d2) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where trailing commas in the arguments of some tags would produce invalid typescript.

## 2.0.6

### Patch Changes

- [#167](https://github.com/marko-js/language-server/pull/167) [`bf5f285`](https://github.com/marko-js/language-server/commit/bf5f2859eefdb5e4817c0122ef9324372c5dbc0a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Strip out attribute modifiers from typescript output.

- [#167](https://github.com/marko-js/language-server/pull/167) [`1be5a8b`](https://github.com/marko-js/language-server/commit/1be5a8b28a7a4171c9a28032107ed323153b8568) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where scriptlets were not able to be mixed with attribute tags.

- [#167](https://github.com/marko-js/language-server/pull/167) [`1be5a8b`](https://github.com/marko-js/language-server/commit/1be5a8b28a7a4171c9a28032107ed323153b8568) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where else/else-if tags with attribute tags were getting incorrect completions.

## 2.0.5

### Patch Changes

- [#164](https://github.com/marko-js/language-server/pull/164) [`50e43f1`](https://github.com/marko-js/language-server/commit/50e43f1387ebbcfb36c8120b7e9e1ce5b7b937ce) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

## 2.0.4

### Patch Changes

- [#162](https://github.com/marko-js/language-server/pull/162) [`67ef015`](https://github.com/marko-js/language-server/commit/67ef0151af21ac9773af36fe7f1ccc20428bf162) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

- [#162](https://github.com/marko-js/language-server/pull/162) [`52bc92f`](https://github.com/marko-js/language-server/commit/52bc92fffdd866f6b826cad4c55bb100b2513a72) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Ensure Marko directives added to all tag input types.

## 2.0.3

### Patch Changes

- [#160](https://github.com/marko-js/language-server/pull/160) [`a0e13d8`](https://github.com/marko-js/language-server/commit/a0e13d884c70fb3b1d6d8e5bf3fa39c35b1123a0) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where some renderer types were not being constrained enough.

## 2.0.2

### Patch Changes

- [#158](https://github.com/marko-js/language-server/pull/158) [`de0df11`](https://github.com/marko-js/language-server/commit/de0df11ac522b41a0942d0791b69bc7d209aca9c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

## 2.0.1

### Patch Changes

- [#153](https://github.com/marko-js/language-server/pull/153) [`c147a8e`](https://github.com/marko-js/language-server/commit/c147a8eb4c12adde889316c2349df60f26ce4291) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix regression that caused ts-plugin to crash and a failure to resolve the internal Marko types.

## 2.0.0

### Major Changes

- [#151](https://github.com/marko-js/language-server/pull/151) [`25e4131`](https://github.com/marko-js/language-server/commit/25e41314e9d93f89c92ae015bbdc8a9381f66610) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Refactor script extractor and expose Processor helpers (shared between CLI and language server)

### Patch Changes

- [#151](https://github.com/marko-js/language-server/pull/151) [`25e4131`](https://github.com/marko-js/language-server/commit/25e41314e9d93f89c92ae015bbdc8a9381f66610) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade internal dependencies

## 1.0.3

### Patch Changes

- [#148](https://github.com/marko-js/language-server/pull/148) [`e823df5`](https://github.com/marko-js/language-server/commit/e823df5d8c54aecc0dac7476848d89920896b628) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - No longer use a default `Input` type of `Component['input']` for inline class components.

## 1.0.2

### Patch Changes

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Prefer only importing external components files as a type.

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update attr tag generation to be inline with https://github.com/marko-js/marko/pull/1909.

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Remove `resolve-from` as a dependency.

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade internal dependencies.

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve `Input` default types when working inferred from a class / component file.

## 1.0.1

### Patch Changes

- [#142](https://github.com/marko-js/language-server/pull/142) [`0f14402`](https://github.com/marko-js/language-server/commit/0f14402328f86ab123cdbf098cf850620a0e76b7) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve typing of @marko/run projects.

## 1.0.0

### Major Changes

- [#132](https://github.com/marko-js/language-server/pull/132) [`0fbdfa3`](https://github.com/marko-js/language-server/commit/0fbdfa330a3ca7acc84d5f58b939e18b4fe48abc) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Adds TypeScript support.
