# Change Log

## 1.0.12

### Patch Changes

- [#162](https://github.com/marko-js/language-server/pull/162) [`67ef015`](https://github.com/marko-js/language-server/commit/67ef0151af21ac9773af36fe7f1ccc20428bf162) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

- Updated dependencies [[`67ef015`](https://github.com/marko-js/language-server/commit/67ef0151af21ac9773af36fe7f1ccc20428bf162), [`52bc92f`](https://github.com/marko-js/language-server/commit/52bc92fffdd866f6b826cad4c55bb100b2513a72)]:
  - @marko/language-tools@2.0.4

## 1.0.11

### Patch Changes

- [#160](https://github.com/marko-js/language-server/pull/160) [`a0e13d8`](https://github.com/marko-js/language-server/commit/a0e13d884c70fb3b1d6d8e5bf3fa39c35b1123a0) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where some renderer types were not being constrained enough.

- Updated dependencies [[`a0e13d8`](https://github.com/marko-js/language-server/commit/a0e13d884c70fb3b1d6d8e5bf3fa39c35b1123a0)]:
  - @marko/language-tools@2.0.3

## 1.0.10

### Patch Changes

- [#158](https://github.com/marko-js/language-server/pull/158) [`de0df11`](https://github.com/marko-js/language-server/commit/de0df11ac522b41a0942d0791b69bc7d209aca9c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

- Updated dependencies [[`de0df11`](https://github.com/marko-js/language-server/commit/de0df11ac522b41a0942d0791b69bc7d209aca9c)]:
  - @marko/language-tools@2.0.2

## 1.0.9

### Patch Changes

- [#156](https://github.com/marko-js/language-server/pull/156) [`9c78a83`](https://github.com/marko-js/language-server/commit/9c78a832e55de7f34a5bc6f202e9893ab2937227) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with ts-plugins resolver override not correctly resolving when a mix of Marko and JS files were requested.

## 1.0.8

### Patch Changes

- [#153](https://github.com/marko-js/language-server/pull/153) [`c147a8e`](https://github.com/marko-js/language-server/commit/c147a8eb4c12adde889316c2349df60f26ce4291) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix regression that caused ts-plugin to crash and a failure to resolve the internal Marko types.

- Updated dependencies [[`c147a8e`](https://github.com/marko-js/language-server/commit/c147a8eb4c12adde889316c2349df60f26ce4291)]:
  - @marko/language-tools@2.0.1

## 1.0.7

### Patch Changes

- [#151](https://github.com/marko-js/language-server/pull/151) [`25e4131`](https://github.com/marko-js/language-server/commit/25e41314e9d93f89c92ae015bbdc8a9381f66610) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade internal dependencies

- [#151](https://github.com/marko-js/language-server/pull/151) [`25e4131`](https://github.com/marko-js/language-server/commit/25e41314e9d93f89c92ae015bbdc8a9381f66610) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Use cached import resolution in more cases

- [#151](https://github.com/marko-js/language-server/pull/151) [`25e4131`](https://github.com/marko-js/language-server/commit/25e41314e9d93f89c92ae015bbdc8a9381f66610) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Avoid using deprecated TS apis

- Updated dependencies [[`25e4131`](https://github.com/marko-js/language-server/commit/25e41314e9d93f89c92ae015bbdc8a9381f66610), [`25e4131`](https://github.com/marko-js/language-server/commit/25e41314e9d93f89c92ae015bbdc8a9381f66610)]:
  - @marko/language-tools@2.0.0

## 1.0.6

### Patch Changes

- [#148](https://github.com/marko-js/language-server/pull/148) [`e823df5`](https://github.com/marko-js/language-server/commit/e823df5d8c54aecc0dac7476848d89920896b628) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - No longer use a default `Input` type of `Component['input']` for inline class components.

- Updated dependencies [[`e823df5`](https://github.com/marko-js/language-server/commit/e823df5d8c54aecc0dac7476848d89920896b628)]:
  - @marko/language-tools@1.0.3

## 1.0.5

### Patch Changes

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Prefer only importing external components files as a type.

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update attr tag generation to be inline with https://github.com/marko-js/marko/pull/1909.

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Remove `resolve-from` as a dependency.

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade internal dependencies.

- [#146](https://github.com/marko-js/language-server/pull/146) [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve `Input` default types when working inferred from a class / component file.

- Updated dependencies [[`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa), [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa), [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa), [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa), [`6dcc3b6`](https://github.com/marko-js/language-server/commit/6dcc3b60df36e72e0de1c11611002df7aa0933aa)]:
  - @marko/language-tools@1.0.2

## 1.0.4

### Patch Changes

- [#144](https://github.com/marko-js/language-server/pull/144) [`6c163f0`](https://github.com/marko-js/language-server/commit/6c163f09ab22a1cd06d736ff3a30ff533429201b) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with ScriptInfo not properly being registered via ts-plugin.

## 1.0.3

### Patch Changes

- [#142](https://github.com/marko-js/language-server/pull/142) [`0f14402`](https://github.com/marko-js/language-server/commit/0f14402328f86ab123cdbf098cf850620a0e76b7) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve typing of @marko/run projects.

- [#142](https://github.com/marko-js/language-server/pull/142) [`ec79775`](https://github.com/marko-js/language-server/commit/ec7977588385accdddc7375ae0f10d5740877c0c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Avoid crashing ts plugin if there's an error in Marko's ts plugin. Better handle some script extraction errors.

- [#142](https://github.com/marko-js/language-server/pull/142) [`fcf9553`](https://github.com/marko-js/language-server/commit/fcf9553e89f3e64b9dc03716cccdd437bbd1dc7a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve the ts language server default / required configs.

- Updated dependencies [[`0f14402`](https://github.com/marko-js/language-server/commit/0f14402328f86ab123cdbf098cf850620a0e76b7)]:
  - @marko/language-tools@1.0.1

## 1.0.2

### Patch Changes

- [#140](https://github.com/marko-js/language-server/pull/140) [`b54f69a`](https://github.com/marko-js/language-server/commit/b54f69af07253c09cf004cf312e3cdb7a26710e5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Avoid using ts.sys.readDirectory for component file scanning (it was extremely slow).

- [#140](https://github.com/marko-js/language-server/pull/140) [`b54f69a`](https://github.com/marko-js/language-server/commit/b54f69af07253c09cf004cf312e3cdb7a26710e5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Ignore errors when loading taglibs.

- [#140](https://github.com/marko-js/language-server/pull/140) [`b54f69a`](https://github.com/marko-js/language-server/commit/b54f69af07253c09cf004cf312e3cdb7a26710e5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Refactor the resolver intercepting for Marko files to avoid first putting Marko file resolution through TypeScripts resolver.

- [#140](https://github.com/marko-js/language-server/pull/140) [`b54f69a`](https://github.com/marko-js/language-server/commit/b54f69af07253c09cf004cf312e3cdb7a26710e5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve compiler loading to hit cache more often

- [#140](https://github.com/marko-js/language-server/pull/140) [`b54f69a`](https://github.com/marko-js/language-server/commit/b54f69af07253c09cf004cf312e3cdb7a26710e5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where taglib lookups where not built against the correct directory.

- [#140](https://github.com/marko-js/language-server/pull/140) [`b54f69a`](https://github.com/marko-js/language-server/commit/b54f69af07253c09cf004cf312e3cdb7a26710e5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with [cm][tj]s files not being loaded properly within Marko files.

## 1.0.1

### Patch Changes

- [#137](https://github.com/marko-js/language-server/pull/137) [`033394c`](https://github.com/marko-js/language-server/commit/033394c185af66077926a9c39a54f184a4b61e7c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve location where import/export insertions are added to the document.

## 1.0.0

### Major Changes

- [#132](https://github.com/marko-js/language-server/pull/132) [`0fbdfa3`](https://github.com/marko-js/language-server/commit/0fbdfa330a3ca7acc84d5f58b939e18b4fe48abc) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Adds TypeScript support.

### Patch Changes

- Updated dependencies [[`0fbdfa3`](https://github.com/marko-js/language-server/commit/0fbdfa330a3ca7acc84d5f58b939e18b4fe48abc)]:
  - @marko/language-tools@1.0.0

## 0.12.17

### Patch Changes

- [#128](https://github.com/marko-js/language-server/pull/128) [`3041a4e`](https://github.com/marko-js/language-server/commit/3041a4e0c26968cfa4f2ace464a6b4c2de336b68) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve syntax highlighting for JS style comments in html blocks.

## 0.12.16

### Patch Changes

- [#126](https://github.com/marko-js/language-server/pull/126) [`7eb56d4`](https://github.com/marko-js/language-server/commit/7eb56d4afb6b9ba792a8347f06202c9d20b5a5cf) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade Marko dependencies.

## 0.12.15

### Patch Changes

- [#122](https://github.com/marko-js/language-server/pull/122) [`c748adc`](https://github.com/marko-js/language-server/commit/c748adcd1595d595e093d4b64fd48ce9fd63b65b) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

* [#122](https://github.com/marko-js/language-server/pull/122) [`c748adc`](https://github.com/marko-js/language-server/commit/c748adcd1595d595e093d4b64fd48ce9fd63b65b) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with displaying invalid diagnostics.

## 0.12.14

### Patch Changes

- [#120](https://github.com/marko-js/language-server/pull/120) [`536e7f4`](https://github.com/marko-js/language-server/commit/536e7f4044dd85ea23e05331876380d8175bae32) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

## 0.12.13

### Patch Changes

- [#116](https://github.com/marko-js/language-server/pull/116) [`7ebc777`](https://github.com/marko-js/language-server/commit/7ebc777067b0d3a22c638eee72b31e8b2a4715cd) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implement document symbols provider.

* [#118](https://github.com/marko-js/language-server/pull/118) [`7bb0f9a`](https://github.com/marko-js/language-server/commit/7bb0f9a6a2b611c75fcb81ace49b8c91051d0d2c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implement hover provider for tag names.

## 0.12.12

### Patch Changes

- [#114](https://github.com/marko-js/language-server/pull/114) [`868a0fa`](https://github.com/marko-js/language-server/commit/868a0fa1930722c8461c4755f0be91433247355a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add auto completion for tag import shorthand.

## 0.12.11

### Patch Changes

- [#112](https://github.com/marko-js/language-server/pull/112) [`7930415`](https://github.com/marko-js/language-server/commit/7930415f18e4f8dfcd736be21c414d4b80e8f458) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve filesystem completions.

## 0.12.10

### Patch Changes

- [#111](https://github.com/marko-js/language-server/pull/111) [`f88ca6d`](https://github.com/marko-js/language-server/commit/f88ca6d3b57fd3401ab715751cba42af24f5f5fc) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve completions for file system paths.

* [#109](https://github.com/marko-js/language-server/pull/109) [`771a6e7`](https://github.com/marko-js/language-server/commit/771a6e78c515e9c79d86f2dfe43e536d332be40e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implements document links provider.

## 0.12.9

### Patch Changes

- [#106](https://github.com/marko-js/language-server/pull/106) [`0070dc0`](https://github.com/marko-js/language-server/commit/0070dc010f3d8bdfba1643c8bd8df32023aed392) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implements document highlight provider (currently for stylesheets).

* [#108](https://github.com/marko-js/language-server/pull/108) [`2f9195b`](https://github.com/marko-js/language-server/commit/2f9195b06531613fefc74d0436d557107764cec1) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implements references provider (currently for stylesheets).

## 0.12.8

### Patch Changes

- [#105](https://github.com/marko-js/language-server/pull/105) [`09b6a55`](https://github.com/marko-js/language-server/commit/09b6a55e1353317013c68ccc4ba1c0c31fcd4261) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with css extraction

* [#104](https://github.com/marko-js/language-server/pull/104) [`40865d0`](https://github.com/marko-js/language-server/commit/40865d01b7904ffcf874b20f3d663aaef84e3972) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implement document color provider (currently just for stylsheets).

- [#100](https://github.com/marko-js/language-server/pull/100) [`6a23259`](https://github.com/marko-js/language-server/commit/6a232590c60dfccf5be69d92556de55b5746e280) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implement rename provider (currently just for stylsheets).

* [#102](https://github.com/marko-js/language-server/pull/102) [`928d9dc`](https://github.com/marko-js/language-server/commit/928d9dcbecb6c109d5cfde2f70a8ab7808993d2e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Implement code action provider (currently just for stylsheets).

## 0.12.7

### Patch Changes

- [#98](https://github.com/marko-js/language-server/pull/98) [`26589ef`](https://github.com/marko-js/language-server/commit/26589ef00a625b0164722c8f0062f394cd00e74e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with diagnostic cache not invalidating.

## 0.12.6

### Patch Changes

- [#94](https://github.com/marko-js/language-server/pull/94) [`bf304da`](https://github.com/marko-js/language-server/commit/bf304dadd5071a01322cef4fa2f5028119221504) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

## 0.12.5

### Patch Changes

- [#92](https://github.com/marko-js/language-server/pull/92) [`f0a97e3`](https://github.com/marko-js/language-server/commit/f0a97e39ddd148f160f0e7bab5af2e295edb1588) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve handling of untitled files.

* [#92](https://github.com/marko-js/language-server/pull/92) [`53521d0`](https://github.com/marko-js/language-server/commit/53521d02bd97bddef9c931bb1769b2133d5f0fc9) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add hover provider for inline stylesheets

## 0.12.4

### Patch Changes

- [#86](https://github.com/marko-js/language-server/pull/86) [`7c35ae3`](https://github.com/marko-js/language-server/commit/7c35ae3b3aeb6e614355db1d1e0b07435768893d) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Refactor to better support embedded services (improved css completions).

* [#86](https://github.com/marko-js/language-server/pull/86) [`7c35ae3`](https://github.com/marko-js/language-server/commit/7c35ae3b3aeb6e614355db1d1e0b07435768893d) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Switch to upgraded parser / cst.

## 0.12.3

### Patch Changes

- [#79](https://github.com/marko-js/language-server/pull/79) [`f9198dd`](https://github.com/marko-js/language-server/commit/f9198dd026431ece0159c3c08322d8f69218d65a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade depencencies

* [#81](https://github.com/marko-js/language-server/pull/81) [`4bcca51`](https://github.com/marko-js/language-server/commit/4bcca515615e800e5297564494e6b7f6aaf530a3) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fixes an issue where goto definitions were erroring.

## 0.12.2

### Patch Changes

- [#62](https://github.com/marko-js/language-server/pull/62) [`08231ee`](https://github.com/marko-js/language-server/commit/08231ee22f13c0fc166d2d97b1ca630a6daf96ef) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade package dependencies.

## 0.12.1

### Patch Changes

- [#48](https://github.com/marko-js/language-server/pull/48) [`5236ac4`](https://github.com/marko-js/language-server/commit/5236ac464faa7efdad9a7eefd5dfc3c30c3b9e32) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with prettier-marko not being bundled or found

## 0.12.0

### Minor Changes

- 26a76b7: Upgrade internal tooling. VSCode extension is now bundled for faster startup.

# [0.11.0](https://github.com/marko-js/language-server/compare/@marko/language-server@0.10.1...@marko/language-server@0.11.0) (2021-11-29)

### Features

- improve support for using custom translators ([02ade04](https://github.com/marko-js/language-server/commit/02ade04fa1dd4dbeb5f40a2ac0259710ce06f455))

## [0.10.1](https://github.com/marko-js/language-server/compare/@marko/language-server@0.10.0...@marko/language-server@0.10.1) (2021-11-22)

### Bug Fixes

- use fallback if cannot load user compiler ([9164a45](https://github.com/marko-js/language-server/commit/9164a45baf2b0a6300e9776d543522e1ba4472be))

# [0.10.0](https://github.com/marko-js/language-server/compare/@marko/language-server@0.9.1...@marko/language-server@0.10.0) (2021-10-22)

### Features

- upgrade marko ([e88875c](https://github.com/marko-js/language-server/commit/e88875cd014ac5539778ab186ff3b9afd4cfbfbe))

## [0.9.1](https://github.com/marko-js/language-server/compare/@marko/language-server@0.9.0...@marko/language-server@0.9.1) (2021-10-13)

### Bug Fixes

- formatting untitled files ([f976ead](https://github.com/marko-js/language-server/commit/f976eadb25c962d87ff36f9130f368bdca87dd45))

# [0.9.0](https://github.com/marko-js/language-server/compare/@marko/language-server@0.8.0...@marko/language-server@0.9.0) (2021-10-13)

### Features

- improve code formatting command ([1733d69](https://github.com/marko-js/language-server/commit/1733d694c16c0ddad72986486b5d53d7fd3b491c))

# [0.8.0](https://github.com/marko-js/language-server/compare/@marko/language-server@0.7.5...@marko/language-server@0.8.0) (2021-10-12)

### Features

- switch to prettier based formatter ([439ef33](https://github.com/marko-js/language-server/commit/439ef339da2bba5ab2bbd5741d42239251db5d8f))

## [0.7.5](https://github.com/marko-js/language-server/compare/@marko/language-server@0.7.4...@marko/language-server@0.7.5) (2021-10-09)

### Bug Fixes

- issue with parser not emitting events ([c7ce48d](https://github.com/marko-js/language-server/commit/c7ce48d5591aaa71bfd41ca797fb20cd14201cd9))

## [0.7.4](https://github.com/marko-js/language-server/compare/@marko/language-server@0.7.3...@marko/language-server@0.7.4) (2021-08-12)

### Bug Fixes

- **server:** issue loading compiler ([b71fef5](https://github.com/marko-js/language-server/commit/b71fef5b67f01cbb1678689246c8e4e1c6637057))

## [0.7.3](https://github.com/marko-js/language-server/compare/@marko/language-server@0.7.2...@marko/language-server@0.7.3) (2021-07-29)

**Note:** Version bump only for package @marko/language-server

## [0.7.2](https://github.com/marko-js/language-server/compare/@marko/language-server@0.7.1...@marko/language-server@0.7.2) (2021-07-28)

**Note:** Version bump only for package @marko/language-server

## [0.7.1](https://github.com/marko-js/language-server/compare/@marko/language-server@0.7.0...@marko/language-server@0.7.1) (2021-07-26)

### Bug Fixes

- add missing dep ([89293e4](https://github.com/marko-js/language-server/commit/89293e43721354489d28ab9b214355a3f394ece6))

# [0.7.0](https://github.com/marko-js/language-server/compare/@marko/language-server@0.6.2...@marko/language-server@0.7.0) (2021-07-26)

### Features

- upgrade to Marko 5, stop surfacing taglib errors ([e9b3a7e](https://github.com/marko-js/language-server/commit/e9b3a7e9a9e14ab31983e52b906b780dd49528a6))

## [0.6.2](https://github.com/marko-js/language-server/tree/main/server/compare/@marko/language-server@0.6.1...@marko/language-server@0.6.2) (2021-05-05)

**Note:** Version bump only for package @marko/language-server

## [0.6.1](https://github.com/marko-js/language-server/tree/main/server/compare/@marko/language-server@0.6.0...@marko/language-server@0.6.1) (2021-02-08)

### Bug Fixes

- **language-server:** handle errors thrown while parsing ([3cc2b32](https://github.com/marko-js/language-server/tree/main/server/commit/3cc2b32ca42c7f5a24e75554baf0bc1ef59e12e5))

# [0.6.0](https://github.com/marko-js/language-server/tree/main/server/compare/@marko/language-server@0.5.0...@marko/language-server@0.6.0) (2021-02-07)

### Features

- improve support for future atom client ([54edd9e](https://github.com/marko-js/language-server/tree/main/server/commit/54edd9e4d0c27938714b3241a01a9c5bf03e5134))

# [0.5.0](https://github.com/marko-js/language-server/tree/main/server/compare/@marko/language-server@0.4.1...@marko/language-server@0.5.0) (2021-02-05)

### Features

- update with latest vscode deps, some refactoring ([006238a](https://github.com/marko-js/language-server/tree/main/server/commit/006238aa8d972b0a3683a0eaf0038d37af5235fc))

## [0.4.1](https://github.com/marko-js/language-server/tree/main/server/compare/@marko/language-server@0.4.0...@marko/language-server@0.4.1) (2019-12-04)

### Bug Fixes

- never attribute takes precidence ([93a1b44](https://github.com/marko-js/language-server/tree/main/server/commit/93a1b44))

# [0.4.0](https://github.com/marko-js/language-server/tree/main/server/compare/@marko/language-server@0.3.0...@marko/language-server@0.4.0) (2019-12-04)

### Features

- add never type to attr def to allow blacklisting attrs ([0ef17c6](https://github.com/marko-js/language-server/tree/main/server/commit/0ef17c6))

# [0.3.0](https://github.com/marko-js/language-server/tree/main/server/compare/@marko/language-server@0.2.4...@marko/language-server@0.3.0) (2019-10-18)

### Features

- **language-server:** add support for legacy dynamic attrs ([6ea0ddd](https://github.com/marko-js/language-server/tree/main/server/commit/6ea0ddd))

## [0.2.4](https://github.com/marko-js/language-server/tree/main/server/compare/@marko/language-server@0.2.3...@marko/language-server@0.2.4) (2019-10-18)

### Bug Fixes

- **language-server:** issue with checking for older Marko versions ([c8315f8](https://github.com/marko-js/language-server/tree/main/server/commit/c8315f8))

## [0.2.3](https://github.com/marko-js/language-server/tree/main/server/compare/@marko/language-server@0.2.2...@marko/language-server@0.2.3) (2019-10-16)

### Bug Fixes

- clear Marko caches between completions ([677fc01](https://github.com/marko-js/language-server/tree/main/server/commit/677fc01))

## [0.2.2](https://github.com/marko-js/language-server/tree/main/server/compare/@marko/language-server@0.2.1...@marko/language-server@0.2.2) (2019-08-27)

### Bug Fixes

- **language-server:** paths now work on windows ([1f2bbb0](https://github.com/marko-js/language-server/tree/main/server/commit/1f2bbb0))

## [0.2.1](https://github.com/marko-js/language-server/tree/main/server/compare/@marko/language-server@0.2.0...@marko/language-server@0.2.1) (2019-08-22)

### Bug Fixes

- improve deployment scripts ([51e5915](https://github.com/marko-js/language-server/tree/main/server/commit/51e5915))
- missing tslib dependency ([fa86608](https://github.com/marko-js/language-server/tree/main/server/commit/fa86608))

# [0.2.0](https://github.com/marko-js/language-server/tree/main/server/compare/@marko/language-server@0.0.3...@marko/language-server@0.2.0) (2019-08-22)

### Features

- javascript autocomplete and fixed issues with style ([9b84dd2](https://github.com/marko-js/language-server/tree/main/server/commit/9b84dd2))
