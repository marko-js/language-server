# Change Log

## 1.3.1

### Patch Changes

- [#273](https://github.com/marko-js/language-server/pull/273) [`6f1932f`](https://github.com/marko-js/language-server/commit/6f1932f438dc80efc607c3e258ff2ba9c3f696f7) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Ignore modifiers in html extractor

## 1.3.0

### Minor Changes

- [#264](https://github.com/marko-js/language-server/pull/264) [`44cddf7`](https://github.com/marko-js/language-server/commit/44cddf78022568e74c9f4794278de804c925f93e) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Allow formatting with forced mode

### Patch Changes

- [#266](https://github.com/marko-js/language-server/pull/266) [`7dfe34c`](https://github.com/marko-js/language-server/commit/7dfe34c155aa739d2b14bbcb5f3e965ef3100866) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix rootDir

## 1.2.3

### Patch Changes

- [#262](https://github.com/marko-js/language-server/pull/262) [`521a0da`](https://github.com/marko-js/language-server/commit/521a0da14c4dddec61ab324972b6764a60714b9e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with typescript output when using static attr tags, dynamic attr tags and a renderBody all together.

## 1.2.2

### Patch Changes

- [#258](https://github.com/marko-js/language-server/pull/258) [`b7c4fe8`](https://github.com/marko-js/language-server/commit/b7c4fe8e0cbc4c38788073c36681a4038f3f0afe) Thanks [@LuLaValva](https://github.com/LuLaValva)! - prevent $signal from being declared but never read

## 1.2.1

### Patch Changes

- [#255](https://github.com/marko-js/language-server/pull/255) [`7580d1d`](https://github.com/marko-js/language-server/commit/7580d1d7ffde619ba33f9bfd295c0e67e295d9c3) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update dependencies.

## 1.2.0

### Minor Changes

- [#253](https://github.com/marko-js/language-server/pull/253) [`5313aae`](https://github.com/marko-js/language-server/commit/5313aaefe6f7bf977724235e65c32af7821f0911) Thanks [@svallory](https://github.com/svallory)! - Add syntax highlighting for Marko code blocks in Markdown and MDX files

## 1.1.18

### Patch Changes

- [#251](https://github.com/marko-js/language-server/pull/251) [`26e6d44`](https://github.com/marko-js/language-server/commit/26e6d44806c7fdee98a4c2a83eac35a94654189b) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Avoid loading babel config files when validating documents.

- [#251](https://github.com/marko-js/language-server/pull/251) [`1a614e7`](https://github.com/marko-js/language-server/commit/1a614e7ed24006010087ad02ce92c88fb5414f43) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update dependencies

- [#251](https://github.com/marko-js/language-server/pull/251) [`36a769c`](https://github.com/marko-js/language-server/commit/36a769cbf8c81caa7a22cce9b22b5688c9a0950a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Only inject component method completions for event handler attributes. Fixes issue with `no-update-if` directive.

## 1.1.17

### Patch Changes

- [#248](https://github.com/marko-js/language-server/pull/248) [`64478f6`](https://github.com/marko-js/language-server/commit/64478f68cbf216a8eb27153bf2f8eab61a61dfc2) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix regex for component filenames

## 1.1.16

### Patch Changes

- [#244](https://github.com/marko-js/language-server/pull/244) [`8132732`](https://github.com/marko-js/language-server/commit/813273297542cf1bcedb7a003fa8848a350ffea3) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix types for imported d.marko files

- [#243](https://github.com/marko-js/language-server/pull/243) [`6ea5808`](https://github.com/marko-js/language-server/commit/6ea580828a7b3b88bdc2b0500fa70d8c893e185b) Thanks [@LuLaValva](https://github.com/LuLaValva)! - remove false positive from axe

## 1.1.15

### Patch Changes

- [#237](https://github.com/marko-js/language-server/pull/237) [`a59b23d`](https://github.com/marko-js/language-server/commit/a59b23da89ce721dad3d1529d4894362861f7698) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where mtc was striping `Input` type if it was an empty interface with an extends clause.

- [#237](https://github.com/marko-js/language-server/pull/237) [`b0f43ce`](https://github.com/marko-js/language-server/commit/b0f43ce0a2bda2b80f98ef55d2d3346f12b9f960) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Correctly resolve ts errors related to Symbol.iterator in the template.

## 1.1.14

### Patch Changes

- [#235](https://github.com/marko-js/language-server/pull/235) [`4524d4c`](https://github.com/marko-js/language-server/commit/4524d4cb3ce2882c14913dd8e4847de1c013543c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Surface errors from default export at the top of the Marko file.

## 1.1.13

### Patch Changes

- [#233](https://github.com/marko-js/language-server/pull/233) [`05bff91`](https://github.com/marko-js/language-server/commit/05bff9172afea4a3beedd6440a6c8532ef03591b) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with extracted script code debug command.

## 1.1.12

### Patch Changes

- [#229](https://github.com/marko-js/language-server/pull/229) [`6c7e1a9`](https://github.com/marko-js/language-server/commit/6c7e1a97d3177411d7a4145d634da999c50748bd) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add `by` attribute types for `<for>` tag.

## 1.1.11

### Patch Changes

- [#226](https://github.com/marko-js/language-server/pull/226) [`bca7c20`](https://github.com/marko-js/language-server/commit/bca7c20c7b3f17ff5e93049e762bc7d215a12f23) Thanks [@LuLaValva](https://github.com/LuLaValva)! - add new rule filter to a11y linter

## 1.1.10

### Patch Changes

- [#224](https://github.com/marko-js/language-server/pull/224) [`a60e2f9`](https://github.com/marko-js/language-server/commit/a60e2f9297f63730235cc84b8f592156141f0801) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade package dependencies

## 1.1.9

### Patch Changes

- [#219](https://github.com/marko-js/language-server/pull/219) [`301bdf4`](https://github.com/marko-js/language-server/commit/301bdf420bf636250b3213ec6bbcd912ad9a338c) Thanks [@LuLaValva](https://github.com/LuLaValva)! - fix in attribute tags within if statements

## 1.1.8

### Patch Changes

- [#212](https://github.com/marko-js/language-server/pull/212) [`5fbd91d`](https://github.com/marko-js/language-server/commit/5fbd91de84d331c945de4dd4dcd931c9769ff788) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - When considering if a Marko file should be parsed as typescript, it will now default to typescript for any file containing `tsconfig`. Previously this would exclusively match `tsconfig.json` which would fail with files like `tsconfig.build.json`.

- [#214](https://github.com/marko-js/language-server/pull/214) [`97787c2`](https://github.com/marko-js/language-server/commit/97787c2be4d136e335664b0aa9252916125c6f63) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

## 1.1.7

### Patch Changes

- [#209](https://github.com/marko-js/language-server/pull/209) [`dbcee5a`](https://github.com/marko-js/language-server/commit/dbcee5a387bcb58cad93624ec7f3982b27fc093a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

- [#209](https://github.com/marko-js/language-server/pull/209) [`374392e`](https://github.com/marko-js/language-server/commit/374392e78f82671c065426726ff420e90ddf6148) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where directory names instead of file names were being passed to `createRequire` causing some lookups to be one directory too high and missing resolving installed modules.

- [#209](https://github.com/marko-js/language-server/pull/209) [`5b371ff`](https://github.com/marko-js/language-server/commit/5b371ffa26cf691bbb8dbda77319ef9d6cfca9cb) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where default compiler config was not being set properly.

## 1.1.6

### Patch Changes

- [#207](https://github.com/marko-js/language-server/pull/207) [`db71899`](https://github.com/marko-js/language-server/commit/db71899ba0f82dc5f2bbc6033cb0942e0143b09e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with untitled files causing errors in the language server.

## 1.1.5

### Patch Changes

- [#204](https://github.com/marko-js/language-server/pull/204) [`6c97a4a`](https://github.com/marko-js/language-server/commit/6c97a4a68cfb17152b78882949033991778bb1c1) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fallback to loading compiler relative to the Marko runtime if not hoisted.

- [#204](https://github.com/marko-js/language-server/pull/204) [`6c97a4a`](https://github.com/marko-js/language-server/commit/6c97a4a68cfb17152b78882949033991778bb1c1) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - When no default compiler registered, avoid swallowing original error when unable to load compiler.

## 1.1.4

### Patch Changes

- [#200](https://github.com/marko-js/language-server/pull/200) [`e05c6f6`](https://github.com/marko-js/language-server/commit/e05c6f622730160e05581552df6e5bf4bb64ce57) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with default compiler not being found.

- [#200](https://github.com/marko-js/language-server/pull/200) [`7903aa0`](https://github.com/marko-js/language-server/commit/7903aa09acbedddee3f9177cd54ec05b79edc75e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Ensure consistent ordering of results returned from merged language server plugins. Previously response order was determined by the order in which individual plugins (css, typescript, marko and html) responded asynchronously, now it is always in a preset order.

## 1.1.3

### Patch Changes

- [#197](https://github.com/marko-js/language-server/pull/197) [`ab2da8c`](https://github.com/marko-js/language-server/commit/ab2da8c274cc35d7a1a538a9b5c96fd40c79b796) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Lazily load the default compiler and translator.

- [#197](https://github.com/marko-js/language-server/pull/197) [`ab2da8c`](https://github.com/marko-js/language-server/commit/ab2da8c274cc35d7a1a538a9b5c96fd40c79b796) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Move @marko/compiler to a peerDependency of @marko/type-check to avoid conflicts.

## 1.1.2

### Patch Changes

- [#195](https://github.com/marko-js/language-server/pull/195) [`7a07f85`](https://github.com/marko-js/language-server/commit/7a07f8585e4a0c6e0464aa375f5e4e53138b51a6) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - VSCode has a regression which causes all intelisense to break after a completion with a multi choice snippet is provided. The language server currently uses that to provide completions for attributes defined with an `enum` value. To resolve this issue, enum completions are simplified to not provide the choice based completion until this is resolved in vscode or another workaround is found.

## 1.1.1

### Patch Changes

- [#191](https://github.com/marko-js/language-server/pull/191) [`026f4ed`](https://github.com/marko-js/language-server/commit/026f4edf5448e324594ece33a03c0d8d184dda2e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with jsdom not being bundled for the vscode plugin.

## 1.1.0

### Minor Changes

- [#189](https://github.com/marko-js/language-server/pull/189) [`e7f82cc`](https://github.com/marko-js/language-server/commit/e7f82ccbb9d91b2327809dad4343cee1ab01d62d) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add accessibility linting for Marko templates.

### Patch Changes

- [#189](https://github.com/marko-js/language-server/pull/189) [`e7f82cc`](https://github.com/marko-js/language-server/commit/e7f82ccbb9d91b2327809dad4343cee1ab01d62d) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where opening new documents were not triggering validations to run until a file was changed.

## 1.0.23

### Patch Changes

- [#186](https://github.com/marko-js/language-server/pull/186) [`5992e17`](https://github.com/marko-js/language-server/commit/5992e174e64d7106b73a51c878745b84293b3588) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fixes an issue where @marko/type-check was emitting files within node_modules.

## 1.0.22

### Patch Changes

- [#183](https://github.com/marko-js/language-server/pull/183) [`f2c791a`](https://github.com/marko-js/language-server/commit/f2c791af24690ec8d6d7155c6a6d7ed6b6b373e7) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix importing a commonjs component file with JSDOC type generation.

## 1.0.21

### Patch Changes

- [#181](https://github.com/marko-js/language-server/pull/181) [`15cf245`](https://github.com/marko-js/language-server/commit/15cf245555148a07a20ccd3f08a855cc41364260) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fixes an issue where Marko files within node_modules without an explicit `marko.json` were not being loaded. Internally this switches to a new api that should not be tripped up by either export maps and / or a missing `marko.json` when trying to resolve Marko files.

## 1.0.20

### Patch Changes

- [#179](https://github.com/marko-js/language-server/pull/179) [`b743baa`](https://github.com/marko-js/language-server/commit/b743baa9047b6b6eace64c808b5f913cf0864133) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - The format command should now propely output export statements which can be parsed by the Marko parser.

- [#179](https://github.com/marko-js/language-server/pull/179) [`b743baa`](https://github.com/marko-js/language-server/commit/b743baa9047b6b6eace64c808b5f913cf0864133) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Downgrade the strip-json-comments module to match the version used by Marko. The latest version does not work in commonjs environments.

## 1.0.19

### Patch Changes

- [#176](https://github.com/marko-js/language-server/pull/176) [`1ce128e`](https://github.com/marko-js/language-server/commit/1ce128e0009ee3385f83f3dfe975eb8dd40be13c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where tags exposed from modules with "export maps" were not being discovered if their package.json file was not exported. (This now instead resolves relative to the marko.json file which should be listed in the export map).

## 1.0.18

### Patch Changes

- [#173](https://github.com/marko-js/language-server/pull/173) [`fc90d03`](https://github.com/marko-js/language-server/commit/fc90d03519bc27f99624eb030533002cd5b03b72) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Surface new diagnostic information from Marko compiler. Also properly surfaces diagnostic from AggregateErrors thrown in the compiler.

## 1.0.17

### Patch Changes

- [#171](https://github.com/marko-js/language-server/pull/171) [`6259092`](https://github.com/marko-js/language-server/commit/625909231a4e00d0cf9c4669ab1b470d905028d2) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where trailing commas in the arguments of some tags would produce invalid typescript.

- [#171](https://github.com/marko-js/language-server/pull/171) [`70b4703`](https://github.com/marko-js/language-server/commit/70b4703ee585c293b8ec488485001b982f1272aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Use new error location meta data from compiler if available.

## 1.0.16

### Patch Changes

- [#167](https://github.com/marko-js/language-server/pull/167) [`a1df9e4`](https://github.com/marko-js/language-server/commit/a1df9e43cb53398dae3a317adad6d4095655677e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade prettier-plugin-marko

- [#167](https://github.com/marko-js/language-server/pull/167) [`bf5f285`](https://github.com/marko-js/language-server/commit/bf5f2859eefdb5e4817c0122ef9324372c5dbc0a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Strip out attribute modifiers from typescript output.

- [#167](https://github.com/marko-js/language-server/pull/167) [`1be5a8b`](https://github.com/marko-js/language-server/commit/1be5a8b28a7a4171c9a28032107ed323153b8568) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where scriptlets were not able to be mixed with attribute tags.

- [#167](https://github.com/marko-js/language-server/pull/167) [`1be5a8b`](https://github.com/marko-js/language-server/commit/1be5a8b28a7a4171c9a28032107ed323153b8568) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where else/else-if tags with attribute tags were getting incorrect completions.

## 1.0.15

### Patch Changes

- [#164](https://github.com/marko-js/language-server/pull/164) [`50e43f1`](https://github.com/marko-js/language-server/commit/50e43f1387ebbcfb36c8120b7e9e1ce5b7b937ce) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

- [#164](https://github.com/marko-js/language-server/pull/164) [`ec60968`](https://github.com/marko-js/language-server/commit/ec60968f49b1e8679bd33f2c7fc2fda69c4251d1) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Bring printing of hover documentation more inline with the typescript language server.

## 1.0.14

### Patch Changes

- [#162](https://github.com/marko-js/language-server/pull/162) [`67ef015`](https://github.com/marko-js/language-server/commit/67ef0151af21ac9773af36fe7f1ccc20428bf162) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

## 1.0.13

### Patch Changes

- [#160](https://github.com/marko-js/language-server/pull/160) [`a0e13d8`](https://github.com/marko-js/language-server/commit/a0e13d884c70fb3b1d6d8e5bf3fa39c35b1123a0) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where some renderer types were not being constrained enough.

## 1.0.12

### Patch Changes

- [#158](https://github.com/marko-js/language-server/pull/158) [`de0df11`](https://github.com/marko-js/language-server/commit/de0df11ac522b41a0942d0791b69bc7d209aca9c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

## 1.0.11

### Patch Changes

- [#156](https://github.com/marko-js/language-server/pull/156) [`9c78a83`](https://github.com/marko-js/language-server/commit/9c78a832e55de7f34a5bc6f202e9893ab2937227) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with ts-plugins resolver override not correctly resolving when a mix of Marko and JS files were requested.

## 1.0.10

### Patch Changes

- [#153](https://github.com/marko-js/language-server/pull/153) [`c147a8e`](https://github.com/marko-js/language-server/commit/c147a8eb4c12adde889316c2349df60f26ce4291) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix regression that caused ts-plugin to crash and a failure to resolve the internal Marko types.

## 1.0.9

### Patch Changes

- [#151](https://github.com/marko-js/language-server/pull/151) [`25e4131`](https://github.com/marko-js/language-server/commit/25e41314e9d93f89c92ae015bbdc8a9381f66610) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade internal dependencies

- [#151](https://github.com/marko-js/language-server/pull/151) [`25e4131`](https://github.com/marko-js/language-server/commit/25e41314e9d93f89c92ae015bbdc8a9381f66610) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Use cached import resolution in more cases

- [#151](https://github.com/marko-js/language-server/pull/151) [`25e4131`](https://github.com/marko-js/language-server/commit/25e41314e9d93f89c92ae015bbdc8a9381f66610) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Avoid using deprecated TS apis

## 1.0.8

### Patch Changes

- [#148](https://github.com/marko-js/language-server/pull/148) [`e823df5`](https://github.com/marko-js/language-server/commit/e823df5d8c54aecc0dac7476848d89920896b628) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - No longer use a default `Input` type of `Component['input']` for inline class components.

## 1.0.7

### Patch Changes

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Prefer only importing external components files as a type.

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update attr tag generation to be inline with https://github.com/marko-js/marko/pull/1909.

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Remove `resolve-from` as a dependency.

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade internal dependencies.

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve `Input` default types when working inferred from a class / component file.

## 1.0.6

### Patch Changes

- [#144](https://github.com/marko-js/language-server/pull/144) [`6c163f0`](https://github.com/marko-js/language-server/commit/6c163f09ab22a1cd06d736ff3a30ff533429201b) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with ScriptInfo not properly being registered via ts-plugin.

## 1.0.5

### Patch Changes

- [#142](https://github.com/marko-js/language-server/pull/142) [`0f14402`](https://github.com/marko-js/language-server/commit/0f14402328f86ab123cdbf098cf850620a0e76b7) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve typing of @marko/run projects.

- [#142](https://github.com/marko-js/language-server/pull/142) [`ec79775`](https://github.com/marko-js/language-server/commit/ec7977588385accdddc7375ae0f10d5740877c0c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Avoid crashing ts plugin if there's an error in Marko's ts plugin. Better handle some script extraction errors.

- [#142](https://github.com/marko-js/language-server/pull/142) [`fcf9553`](https://github.com/marko-js/language-server/commit/fcf9553e89f3e64b9dc03716cccdd437bbd1dc7a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve the ts language server default / required configs.

## 1.0.4

### Patch Changes

- [#140](https://github.com/marko-js/language-server/pull/140) [`b54f69a`](https://github.com/marko-js/language-server/commit/b54f69af07253c09cf004cf312e3cdb7a26710e5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Avoid using ts.sys.readDirectory for component file scanning (it was extremely slow).

- [#140](https://github.com/marko-js/language-server/pull/140) [`b54f69a`](https://github.com/marko-js/language-server/commit/b54f69af07253c09cf004cf312e3cdb7a26710e5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Ignore errors when loading taglibs.

- [#140](https://github.com/marko-js/language-server/pull/140) [`b54f69a`](https://github.com/marko-js/language-server/commit/b54f69af07253c09cf004cf312e3cdb7a26710e5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Refactor the resolver intercepting for Marko files to avoid first putting Marko file resolution through TypeScripts resolver.

- [#140](https://github.com/marko-js/language-server/pull/140) [`b54f69a`](https://github.com/marko-js/language-server/commit/b54f69af07253c09cf004cf312e3cdb7a26710e5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve compiler loading to hit cache more often

- [#140](https://github.com/marko-js/language-server/pull/140) [`b54f69a`](https://github.com/marko-js/language-server/commit/b54f69af07253c09cf004cf312e3cdb7a26710e5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where taglib lookups where not built against the correct directory.

- [#140](https://github.com/marko-js/language-server/pull/140) [`b54f69a`](https://github.com/marko-js/language-server/commit/b54f69af07253c09cf004cf312e3cdb7a26710e5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with [cm][tj]s files not being loaded properly within Marko files.

## 1.0.3

### Patch Changes

- [#138](https://github.com/marko-js/language-server/pull/138) [`5967d7b`](https://github.com/marko-js/language-server/commit/5967d7b201b18405d00820800baf4c0791adcda2) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fixes some caching issues in the TS plugin.

## 1.0.2

### Patch Changes

- [#135](https://github.com/marko-js/language-server/pull/135) [`7344fbc`](https://github.com/marko-js/language-server/commit/7344fbcc538f3464fb19eb963537b30a684e5313) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update special tags syntax highlighting to include `<context>` and remove `<get>` / `<set>`.

- [#135](https://github.com/marko-js/language-server/pull/135) [`7344fbc`](https://github.com/marko-js/language-server/commit/7344fbcc538f3464fb19eb963537b30a684e5313) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add syntax highlighting for tag type params and tag type args.

- [#135](https://github.com/marko-js/language-server/pull/135) [`7344fbc`](https://github.com/marko-js/language-server/commit/7344fbcc538f3464fb19eb963537b30a684e5313) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix syntax highlighting of tag parameters with types.

- [#137](https://github.com/marko-js/language-server/pull/137) [`033394c`](https://github.com/marko-js/language-server/commit/033394c185af66077926a9c39a54f184a4b61e7c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve location where import/export insertions are added to the document.

- [#135](https://github.com/marko-js/language-server/pull/135) [`7344fbc`](https://github.com/marko-js/language-server/commit/7344fbcc538f3464fb19eb963537b30a684e5313) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix syntax highlighting some tags where they begin with a special tag followed by a dash (eg "<if-test>")

## 1.0.1

### Patch Changes

- [`9385a57`](https://github.com/marko-js/language-server/commit/9385a572c69e7536006e63c7a5dcf6c652e40ed0) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix readme image links

- [`8dca900`](https://github.com/marko-js/language-server/commit/8dca900fb594365f0b8e950a82d61881eab2f216) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with ts-plugin not being registered.

## 1.0.0

### Major Changes

- [#132](https://github.com/marko-js/language-server/pull/132) [`0fbdfa3`](https://github.com/marko-js/language-server/commit/0fbdfa330a3ca7acc84d5f58b939e18b4fe48abc) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Adds TypeScript support.

## 0.17.34

### Patch Changes

- [#128](https://github.com/marko-js/language-server/pull/128) [`3041a4e`](https://github.com/marko-js/language-server/commit/3041a4e0c26968cfa4f2ace464a6b4c2de336b68) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve syntax highlighting for JS style comments in html blocks.

## 0.17.33

### Patch Changes

- [#126](https://github.com/marko-js/language-server/pull/126) [`7eb56d4`](https://github.com/marko-js/language-server/commit/7eb56d4afb6b9ba792a8347f06202c9d20b5a5cf) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade Marko dependencies.

## 0.17.32

### Patch Changes

- [#124](https://github.com/marko-js/language-server/pull/124) [`26c0644`](https://github.com/marko-js/language-server/commit/26c0644cb260723025fbb5c96fbaadb0a5526cf2) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Enable Marko's formatter by default without needing to specify it in your vscode config.

## 0.17.31

### Patch Changes

- [#122](https://github.com/marko-js/language-server/pull/122) [`c748adc`](https://github.com/marko-js/language-server/commit/c748adcd1595d595e093d4b64fd48ce9fd63b65b) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

* [#122](https://github.com/marko-js/language-server/pull/122) [`c748adc`](https://github.com/marko-js/language-server/commit/c748adcd1595d595e093d4b64fd48ce9fd63b65b) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix syntax highlighting for comma after a tag variable.

## 0.17.30

### Patch Changes

- [#120](https://github.com/marko-js/language-server/pull/120) [`536e7f4`](https://github.com/marko-js/language-server/commit/536e7f4044dd85ea23e05331876380d8175bae32) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

* [#120](https://github.com/marko-js/language-server/pull/120) [`7200726`](https://github.com/marko-js/language-server/commit/72007269a8923dd9e042fd019c01f3377154a9e1) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix syntax error in concise mode grammar regexp.

## 0.17.29

### Patch Changes

- [#116](https://github.com/marko-js/language-server/pull/116) [`7ebc777`](https://github.com/marko-js/language-server/commit/7ebc777067b0d3a22c638eee72b31e8b2a4715cd) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implement document symbols provider.

* [#118](https://github.com/marko-js/language-server/pull/118) [`7bb0f9a`](https://github.com/marko-js/language-server/commit/7bb0f9a6a2b611c75fcb81ace49b8c91051d0d2c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implement hover provider for tag names.

## 0.17.28

### Patch Changes

- [#114](https://github.com/marko-js/language-server/pull/114) [`868a0fa`](https://github.com/marko-js/language-server/commit/868a0fa1930722c8461c4755f0be91433247355a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add auto completion for tag import shorthand.

## 0.17.27

### Patch Changes

- [#112](https://github.com/marko-js/language-server/pull/112) [`7930415`](https://github.com/marko-js/language-server/commit/7930415f18e4f8dfcd736be21c414d4b80e8f458) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve filesystem completions.

* [#112](https://github.com/marko-js/language-server/pull/112) [`2312c36`](https://github.com/marko-js/language-server/commit/2312c365472f4f280c251812f7d56f1e30e72b55) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix embedded language config for sass and less.

## 0.17.26

### Patch Changes

- [#109](https://github.com/marko-js/language-server/pull/109) [`5f0ec0d`](https://github.com/marko-js/language-server/commit/5f0ec0d3f54ff36563bc959ed81e82d0da3adf1b) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix regexp errors in syntax highlighting

* [#111](https://github.com/marko-js/language-server/pull/111) [`f88ca6d`](https://github.com/marko-js/language-server/commit/f88ca6d3b57fd3401ab715751cba42af24f5f5fc) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve completions for file system paths.

- [#109](https://github.com/marko-js/language-server/pull/109) [`771a6e7`](https://github.com/marko-js/language-server/commit/771a6e78c515e9c79d86f2dfe43e536d332be40e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implements document links provider.

## 0.17.25

### Patch Changes

- [#106](https://github.com/marko-js/language-server/pull/106) [`0070dc0`](https://github.com/marko-js/language-server/commit/0070dc010f3d8bdfba1643c8bd8df32023aed392) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implements document highlight provider (currently for stylesheets).

* [#108](https://github.com/marko-js/language-server/pull/108) [`2f9195b`](https://github.com/marko-js/language-server/commit/2f9195b06531613fefc74d0436d557107764cec1) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implements references provider (currently for stylesheets).

## 0.17.24

### Patch Changes

- [#105](https://github.com/marko-js/language-server/pull/105) [`09b6a55`](https://github.com/marko-js/language-server/commit/09b6a55e1353317013c68ccc4ba1c0c31fcd4261) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with css extraction

* [#104](https://github.com/marko-js/language-server/pull/104) [`40865d0`](https://github.com/marko-js/language-server/commit/40865d01b7904ffcf874b20f3d663aaef84e3972) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implement document color provider (currently just for stylsheets).

- [#100](https://github.com/marko-js/language-server/pull/100) [`6a23259`](https://github.com/marko-js/language-server/commit/6a232590c60dfccf5be69d92556de55b5746e280) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implement rename provider (currently just for stylsheets).

* [#102](https://github.com/marko-js/language-server/pull/102) [`928d9dc`](https://github.com/marko-js/language-server/commit/928d9dcbecb6c109d5cfde2f70a8ab7808993d2e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implement code action provider (currently just for stylsheets).

## 0.17.23

### Patch Changes

- [#98](https://github.com/marko-js/language-server/pull/98) [`26589ef`](https://github.com/marko-js/language-server/commit/26589ef00a625b0164722c8f0062f394cd00e74e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with diagnostic cache not invalidating.

## 0.17.22

### Patch Changes

- [#96](https://github.com/marko-js/language-server/pull/96) [`7fba1e1`](https://github.com/marko-js/language-server/commit/7fba1e13b8f84e68d53a889525951288da9f6b08) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Better support bracket colorization.

## 0.17.21

### Patch Changes

- [#94](https://github.com/marko-js/language-server/pull/94) [`c724516`](https://github.com/marko-js/language-server/commit/c72451622f4f4411d3dad45cfcc7af9654a9a764) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve syntax highlighting for html mode comments.

* [#94](https://github.com/marko-js/language-server/pull/94) [`bf304da`](https://github.com/marko-js/language-server/commit/bf304dadd5071a01322cef4fa2f5028119221504) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

- [#94](https://github.com/marko-js/language-server/pull/94) [`41b6542`](https://github.com/marko-js/language-server/commit/41b6542834791b4fe4425acd25d5ac2c4b8a38b8) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve synyax highlighting for destructured tag variables.

## 0.17.20

### Patch Changes

- [#92](https://github.com/marko-js/language-server/pull/92) [`f0a97e3`](https://github.com/marko-js/language-server/commit/f0a97e39ddd148f160f0e7bab5af2e295edb1588) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve handling of untitled files.

* [#92](https://github.com/marko-js/language-server/pull/92) [`53521d0`](https://github.com/marko-js/language-server/commit/53521d02bd97bddef9c931bb1769b2133d5f0fc9) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add hover provider for inline stylesheets

## 0.17.19

### Patch Changes

- [#88](https://github.com/marko-js/language-server/pull/88) [`c0b7336`](https://github.com/marko-js/language-server/commit/c0b73363b73cd9803c0e58b521b3e1efa84fee7b) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with extension release script.

## 0.17.18

### Patch Changes

- [#86](https://github.com/marko-js/language-server/pull/86) [`7c35ae3`](https://github.com/marko-js/language-server/commit/7c35ae3b3aeb6e614355db1d1e0b07435768893d) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Refactor to better support embedded services (improved css completions).

* [#86](https://github.com/marko-js/language-server/pull/86) [`7c35ae3`](https://github.com/marko-js/language-server/commit/7c35ae3b3aeb6e614355db1d1e0b07435768893d) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Switch to upgraded parser / cst.

## 0.17.17

### Patch Changes

- [#84](https://github.com/marko-js/language-server/pull/84) [`3b41c78`](https://github.com/marko-js/language-server/commit/3b41c78fe63df02e5d340c08cf6a8719153160bd) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Extension config improvements, including preventing messing with indentation"

## 0.17.16

### Patch Changes

- [#78](https://github.com/marko-js/language-server/pull/78) [`cb1d8a3`](https://github.com/marko-js/language-server/commit/cb1d8a3841fbf1b624a0483cf06425f48d4f5260) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add error highlighting when an extraneous html closing tag is found

* [#76](https://github.com/marko-js/language-server/pull/76) [`1196b8a`](https://github.com/marko-js/language-server/commit/1196b8aef7ac7f28fe1cbaaf130fb962ede551e2) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve highlighting, including concise mode identation tracking, fix issue with commas after attrs and fix cdata/doctype in some cases.

## 0.17.15

### Patch Changes

- [#74](https://github.com/marko-js/language-server/pull/74) [`3e298fc`](https://github.com/marko-js/language-server/commit/3e298fcec6852e2ae1b99a1f4abc0840c243d58e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with unary expressions (eg typeof) in attribute values that were part of a member expression (eg input.typeof) incorrectly highlighting

* [#74](https://github.com/marko-js/language-server/pull/74) [`3e298fc`](https://github.com/marko-js/language-server/commit/3e298fcec6852e2ae1b99a1f4abc0840c243d58e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve attribute value highlighting when the value is unenclosed and spans multiple lines

- [#74](https://github.com/marko-js/language-server/pull/74) [`3e298fc`](https://github.com/marko-js/language-server/commit/3e298fcec6852e2ae1b99a1f4abc0840c243d58e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Make concise mode html delimiters more visible.

## 0.17.14

### Patch Changes

- [#72](https://github.com/marko-js/language-server/pull/72) [`b73b33f`](https://github.com/marko-js/language-server/commit/b73b33fe8d6b83f1a149479bb357b60c569d539b) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve highlighting for tag variables with a typescript type

* [#72](https://github.com/marko-js/language-server/pull/72) [`f76f84d`](https://github.com/marko-js/language-server/commit/f76f84daa80feeccb85f1d14280480af834a512c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Highlight control flow tags differently from other tags.

## 0.17.13

### Patch Changes

- [#70](https://github.com/marko-js/language-server/pull/70) [`2f05e50`](https://github.com/marko-js/language-server/commit/2f05e50a318e75329aa13774cdc29684990fe618) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improves tag variable highlighting, especially with types

## 0.17.12

### Patch Changes

- [#68](https://github.com/marko-js/language-server/pull/68) [`8c0a6af`](https://github.com/marko-js/language-server/commit/8c0a6afdada3d866d3381a5060bb3e06089ed334) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improves the syntax highlighting for the <html-comment> tag.

## 0.17.11

### Patch Changes

- [#66](https://github.com/marko-js/language-server/pull/66) [`6af8083`](https://github.com/marko-js/language-server/commit/6af8083c69fe02d620985b4166bede74eb5901f3) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with builtin tag highlighting when tag name followed by :, - or @.

## 0.17.10

### Patch Changes

- [#64](https://github.com/marko-js/language-server/pull/64) [`cede407`](https://github.com/marko-js/language-server/commit/cede407fbb7676495fe4deb00711f365b50856c4) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with manual css extenion on style block

## 0.17.9

### Patch Changes

- [#62](https://github.com/marko-js/language-server/pull/62) [`08231ee`](https://github.com/marko-js/language-server/commit/08231ee22f13c0fc166d2d97b1ca630a6daf96ef) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade package dependencies.

## 0.17.8

### Patch Changes

- [#54](https://github.com/marko-js/language-server/pull/54) [`bfb111f`](https://github.com/marko-js/language-server/commit/bfb111f701f61d98b3df8a56b84838496b2cb95f) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve highlighting for script tags.

* [#54](https://github.com/marko-js/language-server/pull/54) [`e29b9d1`](https://github.com/marko-js/language-server/commit/e29b9d17bb7129c8fde3822acee70e38efe96a89) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add syntax highlighting for js/ts style tags

- [#54](https://github.com/marko-js/language-server/pull/54) [`0d9b230`](https://github.com/marko-js/language-server/commit/0d9b2309f85622b9cc850aec83a73539da31e599) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve tag variable highlighting

## 0.17.7

### Patch Changes

- [#52](https://github.com/marko-js/language-server/pull/52) [`9fd1c28`](https://github.com/marko-js/language-server/commit/9fd1c280fddf9df9fcd572b24bb30e1ce67794b9) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve syntax highlighting for typescript

## 0.17.6

### Patch Changes

- [#50](https://github.com/marko-js/language-server/pull/50) [`38bf1d7`](https://github.com/marko-js/language-server/commit/38bf1d76edd0e22ecfe20ce9804d807a840c5cf6) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix vscode engine version.

## 0.17.5

### Patch Changes

- [#48](https://github.com/marko-js/language-server/pull/48) [`5236ac4`](https://github.com/marko-js/language-server/commit/5236ac464faa7efdad9a7eefd5dfc3c30c3b9e32) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with prettier-marko not being bundled or found

## 0.17.4

### Patch Changes

- [#46](https://github.com/marko-js/language-server/pull/46) [`ec6ff7b`](https://github.com/marko-js/language-server/commit/ec6ff7bc284c65fe6f52017df617475acfa51567) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve syntax highlighting, including improved support for future typescript highlighting.

## 0.17.3

### Patch Changes

- [`ec40058`](https://github.com/marko-js/language-server/commit/ec40058651fd9d0158109f5348d22cd5a27b4627) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Attempt to fix issue with github release generation

## 0.17.2

### Patch Changes

- [#43](https://github.com/marko-js/language-server/pull/43) [`75b6947`](https://github.com/marko-js/language-server/commit/75b69472509ad820d6e1afa5c3c4fe97fd072d1d) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update example image urls

## 0.17.1

### Patch Changes

- [#41](https://github.com/marko-js/language-server/pull/41) [`a4d8a71`](https://github.com/marko-js/language-server/commit/a4d8a719620de49ee296b6c81f7402a9818171c4) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Issue with demo images not included in extension.

## 0.17.0

### Minor Changes

- 26a76b7: Upgrade internal tooling. VSCode extension is now bundled for faster startup.

# [0.16.0](https://github.com/marko-js/language-server/compare/marko-vscode@0.15.1...marko-vscode@0.16.0) (2021-11-29)

### Features

- improve support for using custom translators ([02ade04](https://github.com/marko-js/language-server/commit/02ade04fa1dd4dbeb5f40a2ac0259710ce06f455))

## [0.15.1](https://github.com/marko-js/language-server/compare/marko-vscode@0.15.0...marko-vscode@0.15.1) (2021-11-22)

**Note:** Version bump only for package marko-vscode

# [0.15.0](https://github.com/marko-js/language-server/compare/marko-vscode@0.14.1...marko-vscode@0.15.0) (2021-10-22)

### Features

- upgrade marko ([e88875c](https://github.com/marko-js/language-server/commit/e88875cd014ac5539778ab186ff3b9afd4cfbfbe))

## [0.14.1](https://github.com/marko-js/language-server/compare/marko-vscode@0.14.0...marko-vscode@0.14.1) (2021-10-13)

**Note:** Version bump only for package marko-vscode

# [0.14.0](https://github.com/marko-js/language-server/compare/marko-vscode@0.13.6...marko-vscode@0.14.0) (2021-10-13)

### Features

- improve code formatting command ([1733d69](https://github.com/marko-js/language-server/commit/1733d694c16c0ddad72986486b5d53d7fd3b491c))

## [0.13.6](https://github.com/marko-js/language-server/compare/marko-vscode@0.13.5...marko-vscode@0.13.6) (2021-10-12)

**Note:** Version bump only for package marko-vscode

## [0.13.5](https://github.com/marko-js/language-server/compare/marko-vscode@0.13.4...marko-vscode@0.13.5) (2021-10-09)

**Note:** Version bump only for package marko-vscode

## [0.13.4](https://github.com/marko-js/language-server/compare/marko-vscode@0.13.3...marko-vscode@0.13.4) (2021-08-12)

**Note:** Version bump only for package marko-vscode

## [0.13.3](https://github.com/marko-js/language-server/compare/marko-vscode@0.13.2...marko-vscode@0.13.3) (2021-07-29)

**Note:** Version bump only for package marko-vscode

## [0.13.2](https://github.com/marko-js/language-server/compare/marko-vscode@0.13.1...marko-vscode@0.13.2) (2021-07-28)

**Note:** Version bump only for package marko-vscode

## [0.13.1](https://github.com/marko-js/language-server/compare/marko-vscode@0.13.0...marko-vscode@0.13.1) (2021-07-26)

**Note:** Version bump only for package marko-vscode

# [0.13.0](https://github.com/marko-js/language-server/compare/marko-vscode@0.12.1...marko-vscode@0.13.0) (2021-07-26)

### Features

- upgrade to Marko 5, stop surfacing taglib errors ([e9b3a7e](https://github.com/marko-js/language-server/commit/e9b3a7e9a9e14ab31983e52b906b780dd49528a6))

## [0.12.1](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.12.0...marko-vscode@0.12.1) (2021-07-21)

**Note:** Version bump only for package marko-vscode

# [0.12.0](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.11.0...marko-vscode@0.12.0) (2021-07-13)

### Features

- syntax highlight new tags, binding syntax and method shorthand ([9c86b38](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/9c86b38373b364d5a5cd10f7b53373dfa8acc529))

# [0.11.0](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.10.7...marko-vscode@0.11.0) (2021-06-30)

### Features

- update syntax highlighting ([bc377ae](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/bc377ae2696d4e737958ceca05f00575784f0877))

## [0.10.7](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.10.6...marko-vscode@0.10.7) (2021-05-05)

**Note:** Version bump only for package marko-vscode

## [0.10.6](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.10.5...marko-vscode@0.10.6) (2021-03-10)

**Note:** Version bump only for package marko-vscode

## [0.10.5](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.10.4...marko-vscode@0.10.5) (2021-03-10)

### Bug Fixes

- **marko-vscode:** tag variable destructuring syntax highlighting ([0cb8ee6](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/0cb8ee6c86a162464b9c2fbdd95eee8aabb118cb))

## [0.10.4](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.10.3...marko-vscode@0.10.4) (2021-02-23)

### Bug Fixes

- **marko-vscode:** concise mode text content shorthand highlight ([1e97a66](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/1e97a669253d54ff1ffdac24ca74577ef2881f12))

## [0.10.3](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.10.2...marko-vscode@0.10.3) (2021-02-19)

### Bug Fixes

- **marko-vscode:** syntax highlighting improvements ([4228c48](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/4228c48068204fe6f098a3a59e88234e62d1c668))

## [0.10.2](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.10.1...marko-vscode@0.10.2) (2021-02-11)

### Bug Fixes

- **marko-vscode:** syntax highlighting for attributes with numbers ([79f4012](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/79f4012b651a728e4f21bd12982d462928bb7a89))

## [0.10.1](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.10.0...marko-vscode@0.10.1) (2021-02-08)

**Note:** Version bump only for package marko-vscode

# [0.10.0](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.9.0...marko-vscode@0.10.0) (2021-02-07)

### Features

- improve support for future atom client ([54edd9e](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/54edd9e4d0c27938714b3241a01a9c5bf03e5134))

# [0.9.0](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.8.4...marko-vscode@0.9.0) (2021-02-05)

### Features

- update with latest vscode deps, some refactoring ([006238a](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/006238aa8d972b0a3683a0eaf0038d37af5235fc))

## [0.8.4](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.8.3...marko-vscode@0.8.4) (2020-12-11)

### Bug Fixes

- **marko-vscode:** improve regexp highlighting ([0183e76](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/0183e76))

## [0.8.3](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.8.2...marko-vscode@0.8.3) (2020-12-10)

### Bug Fixes

- **marko-vscode:** improve syntax highlighting ([290a478](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/290a478))

## [0.8.2](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.8.1...marko-vscode@0.8.2) (2020-11-18)

### Bug Fixes

- **marko-vscode:** improve tag var highlighting ([0372458](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/0372458))

## [0.8.1](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.8.0...marko-vscode@0.8.1) (2020-09-25)

### Bug Fixes

- **marko-vscode:** syntax highlight attribute modifiers ([4291e0d](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/4291e0d))

# [0.8.0](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.7.1...marko-vscode@0.8.0) (2020-09-22)

### Features

- **marko-vscode:** improve syntax highlighting ([196041f](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/196041f))

## [0.7.1](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.7.0...marko-vscode@0.7.1) (2020-09-18)

### Bug Fixes

- **marko-vscode:** highlight event handlers ([b3e60a7](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/b3e60a7))

# [0.7.0](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.6.1...marko-vscode@0.7.0) (2020-09-18)

### Features

- **marko-vscode:** add syntax highlight for shorthand methods ([6f7dc30](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/6f7dc30))

## [0.6.1](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.6.0...marko-vscode@0.6.1) (2020-08-28)

### Bug Fixes

- make attribute highlight the same as assignments ([ffd164f](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/ffd164f))

# [0.6.0](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.5.0...marko-vscode@0.6.0) (2020-08-28)

### Features

- improve syntax highlighting ([abd890e](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/abd890e))

# [0.5.0](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.4.1...marko-vscode@0.5.0) (2020-08-18)

### Features

- **marko-vscode:** allow breakpoints in Marko files ([7d3b872](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/7d3b872))

## [0.4.1](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.4.0...marko-vscode@0.4.1) (2019-12-04)

### Bug Fixes

- never attribute takes precidence ([93a1b44](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/93a1b44))

# [0.4.0](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.3.1...marko-vscode@0.4.0) (2019-12-04)

### Features

- add never type to attr def to allow blacklisting attrs ([0ef17c6](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/0ef17c6))

## [0.3.1](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.3.0...marko-vscode@0.3.1) (2019-10-18)

### Bug Fixes

- **language-server:** improve syntax highlighting for embedded js ([7f5760b](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/7f5760b))

# [0.3.0](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.2.7...marko-vscode@0.3.0) (2019-10-18)

### Features

- **language-server:** add support for legacy dynamic attrs ([6ea0ddd](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/6ea0ddd))

## [0.2.7](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.2.6...marko-vscode@0.2.7) (2019-10-18)

### Bug Fixes

- **language-server:** issue with checking for older Marko versions ([c8315f8](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/c8315f8))

## [0.2.6](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.2.5...marko-vscode@0.2.6) (2019-10-16)

### Bug Fixes

- clear Marko caches between completions ([677fc01](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/677fc01))

## [0.2.5](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.2.4...marko-vscode@0.2.5) (2019-08-27)

**Note:** Version bump only for package marko-vscode

## [0.2.4](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.2.3...marko-vscode@0.2.4) (2019-08-22)

### Bug Fixes

- **marko-vscode:** add vscodeignore file ([b5ef205](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/b5ef205))

## [0.2.3](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.2.2...marko-vscode@0.2.3) (2019-08-22)

### Bug Fixes

- postpublish script ([dd44896](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/dd44896))

## [0.2.2](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.2.1...marko-vscode@0.2.2) (2019-08-22)

### Bug Fixes

- missing tslib dependency ([fa86608](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/fa86608))

## [0.2.1](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.2.0...marko-vscode@0.2.1) (2019-08-22)

### Bug Fixes

- improve deployment scripts ([51e5915](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/51e5915))

# [0.2.0](https://github.com/marko-js/language-server/tree/main/clients/vscode/compare/marko-vscode@0.0.3...marko-vscode@0.2.0) (2019-08-22)

### Bug Fixes

- gif url to include raw as query param ([1fdedd9](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/1fdedd9))

### Features

- javascript autocomplete and fixed issues with style ([9b84dd2](https://github.com/marko-js/language-server/tree/main/clients/vscode/commit/9b84dd2))
