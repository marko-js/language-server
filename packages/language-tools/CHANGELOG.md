# @marko/language-tools

## 2.5.23

### Patch Changes

- [#365](https://github.com/marko-js/language-server/pull/365) [`1fc5558`](https://github.com/marko-js/language-server/commit/1fc555848bbed07ca8c15967cbedd7433cca547b) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update caches to be based on translator resolved path instead of compiler path.

## 2.5.22

### Patch Changes

- [#361](https://github.com/marko-js/language-server/pull/361) [`9b54683`](https://github.com/marko-js/language-server/commit/9b546832e7fcc44fc68fff1fb658a790403ab7f9) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix type stub issue

## 2.5.21

### Patch Changes

- [#359](https://github.com/marko-js/language-server/pull/359) [`31106f0`](https://github.com/marko-js/language-server/commit/31106f055243697697763b06bd26700da04e1924) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Ensure empty tag name types default to "div".

## 2.5.20

### Patch Changes

- [#357](https://github.com/marko-js/language-server/pull/357) [`9e243c1`](https://github.com/marko-js/language-server/commit/9e243c1c6013e65b0ee1776ac6c38dae1059b191) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix TS for `<for of>` loops

## 2.5.19

### Patch Changes

- [#351](https://github.com/marko-js/language-server/pull/351) [`aa8d9d5`](https://github.com/marko-js/language-server/commit/aa8d9d5ae7b9bfb36741d53ad1ecf9179fa6aa8a) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix HTML comments that contain `*/`

- [#353](https://github.com/marko-js/language-server/pull/353) [`4e3d8b8`](https://github.com/marko-js/language-server/commit/4e3d8b84e2f0461c6b3706aa265b6552b51848c5) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix semicolon bug

## 2.5.18

### Patch Changes

- [#349](https://github.com/marko-js/language-server/pull/349) [`4ec0467`](https://github.com/marko-js/language-server/commit/4ec0467ab39b7ea8309535860149194ded45ed68) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix tag vars in unreachable bodies

## 2.5.17

### Patch Changes

- [#346](https://github.com/marko-js/language-server/pull/346) [`71b049b`](https://github.com/marko-js/language-server/commit/71b049b5ab573aab953b58799fcbcbe3babbde6a) Thanks [@LuLaValva](https://github.com/LuLaValva)! - A11y liter: remove false positives for empty-heading rule

- [#348](https://github.com/marko-js/language-server/pull/348) [`70494a1`](https://github.com/marko-js/language-server/commit/70494a14fbcb61c69e8ba740718d6c70000c1b61) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix setters to tag vars in parent scopes in presence of tag params

## 2.5.16

### Patch Changes

- [#344](https://github.com/marko-js/language-server/pull/344) [`ed43a8d`](https://github.com/marko-js/language-server/commit/ed43a8d40cdac6c9e8f5511e7daf74d480c190fb) Thanks [@rturnq](https://github.com/rturnq)! - Ignore types for non-Marko templates to remove errors for missing types

## 2.5.15

### Patch Changes

- [#342](https://github.com/marko-js/language-server/pull/342) [`263a8f5`](https://github.com/marko-js/language-server/commit/263a8f56fa1d2ae169a6aa8760308c508bd27d2e) Thanks [@rturnq](https://github.com/rturnq)! - Reduce recursion in complex input types to prevent excessive depth errors

## 2.5.14

### Patch Changes

- [#340](https://github.com/marko-js/language-server/pull/340) [`4607c2d`](https://github.com/marko-js/language-server/commit/4607c2d476bf756a8b7d6f128d9ffffb1673e5d8) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where tag var mutations at multiple levels were causing higher levels to be non writable.

## 2.5.13

### Patch Changes

- [#338](https://github.com/marko-js/language-server/pull/338) [`7226d59`](https://github.com/marko-js/language-server/commit/7226d5922e4c61e367e9e1fad2625fb836170a75) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Avoid outputting `component` related code when targeting tags api.

## 2.5.12

### Patch Changes

- [#336](https://github.com/marko-js/language-server/pull/336) [`a4954b6`](https://github.com/marko-js/language-server/commit/a4954b67084889e8eaf3841aa504237bf6e70036) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix type narrowing for attr tags, reducing need for `as const`

## 2.5.11

### Patch Changes

- [#334](https://github.com/marko-js/language-server/pull/334) [`b87f4b2`](https://github.com/marko-js/language-server/commit/b87f4b2970c02c1e84cdc0d688eca4fcb3523e96) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix some flawed boolean logic

## 2.5.10

### Patch Changes

- [#332](https://github.com/marko-js/language-server/pull/332) [`f21cfe4`](https://github.com/marko-js/language-server/commit/f21cfe40011b6d706d3890546d69d75a4f927545) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix TypeScript for nested attribute tags in for-of loops

## 2.5.9

### Patch Changes

- [#330](https://github.com/marko-js/language-server/pull/330) [`808a3b5`](https://github.com/marko-js/language-server/commit/808a3b5b4b6c02926066465e348cab0ec18d5798) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve fallback for dynamic tag.

## 2.5.8

### Patch Changes

- [#328](https://github.com/marko-js/language-server/pull/328) [`091726b`](https://github.com/marko-js/language-server/commit/091726b9f6347e5c27284c12ecdfcf6e319f3f13) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve attribute tag type generation and completions.

## 2.5.7

### Patch Changes

- [#326](https://github.com/marko-js/language-server/pull/326) [`b65c79b`](https://github.com/marko-js/language-server/commit/b65c79bd5afb960129a00d1455048d51a5d9800a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix type issue in the internal language tool types.

## 2.5.6

### Patch Changes

- [#324](https://github.com/marko-js/language-server/pull/324) [`258fa7a`](https://github.com/marko-js/language-server/commit/258fa7a712970fcfc20abf558a332f6bed3abde5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve body content processing for tags api.

- [#324](https://github.com/marko-js/language-server/pull/324) [`258fa7a`](https://github.com/marko-js/language-server/commit/258fa7a712970fcfc20abf558a332f6bed3abde5) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve repeated attribute tag processing.

## 2.5.5

### Patch Changes

- [#322](https://github.com/marko-js/language-server/pull/322) [`c99ca6c`](https://github.com/marko-js/language-server/commit/c99ca6c448da7ed5adbe260752856efd53fb4353) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve `<for>` tag codegen and types.

## 2.5.4

### Patch Changes

- [#320](https://github.com/marko-js/language-server/pull/320) [`b806534`](https://github.com/marko-js/language-server/commit/b806534db87002674dcf56141876b0953e52b350) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade all deps.

## 2.5.3

### Patch Changes

- [#316](https://github.com/marko-js/language-server/pull/316) [`11f8953`](https://github.com/marko-js/language-server/commit/11f89532b330e31621cbbc6fe5bda11e0128788d) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Allow await inside script tags.

## 2.5.2

### Patch Changes

- [#314](https://github.com/marko-js/language-server/pull/314) [`a839384`](https://github.com/marko-js/language-server/commit/a8393841d60a29341e3c2854378246e653c1749f) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Ensure script tags are only processed as javascript when they contain no other attributes or placeholders in the body content.

## 2.5.1

### Patch Changes

- [#311](https://github.com/marko-js/language-server/pull/311) [`7019798`](https://github.com/marko-js/language-server/commit/701979852ae652bb4afc0aff62dc46638d795606) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix catastrophic backtracking in some regexps.

## 2.5.0

### Minor Changes

- [#309](https://github.com/marko-js/language-server/pull/309) [`6f91eec`](https://github.com/marko-js/language-server/commit/6f91eec8bde53e62f833faf56ad31db84b4d8288) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Include script tag contents in script output.

### Patch Changes

- [#309](https://github.com/marko-js/language-server/pull/309) [`d51d086`](https://github.com/marko-js/language-server/commit/d51d086bc8b69219016546e913c1dd1aff02f0a1) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add highlighting for html-script and html-style tags.

## 2.4.8

### Patch Changes

- [#307](https://github.com/marko-js/language-server/pull/307) [`38b62ec`](https://github.com/marko-js/language-server/commit/38b62ecfd5d3b444772194e8dbeae216f1c617f2) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update core tag names to align with Marko 6.

## 2.4.7

### Patch Changes

- [#305](https://github.com/marko-js/language-server/pull/305) [`2414702`](https://github.com/marko-js/language-server/commit/241470257cead224f48ab7e2b533c858de3dccc1) Thanks [@LuLaValva](https://github.com/LuLaValva)! - `client` and `server` statements, `satisfies` keyword, explicit type annotations on `let`

## 2.4.6

### Patch Changes

- [#304](https://github.com/marko-js/language-server/pull/304) [`124ad10`](https://github.com/marko-js/language-server/commit/124ad10b8ccc05c716e727fff2eacf83b320520d) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Improve script parsing performance.

- [#304](https://github.com/marko-js/language-server/pull/304) [`f3ca04a`](https://github.com/marko-js/language-server/commit/f3ca04a36216a5484bb972acb1b19f3cc54ca367) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update deps.

## 2.4.5

### Patch Changes

- [#292](https://github.com/marko-js/language-server/pull/292) [`f46beb1`](https://github.com/marko-js/language-server/commit/f46beb15c36450a8e7f7b61edfc3db6738c6bc32) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

## 2.4.4

### Patch Changes

- [#290](https://github.com/marko-js/language-server/pull/290) [`9c5ad9b`](https://github.com/marko-js/language-server/commit/9c5ad9b9dd7e6944079f98e8e6ec804b00a8dd3d) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade deps.

## 2.4.3

### Patch Changes

- [#288](https://github.com/marko-js/language-server/pull/288) [`bfbdd4b`](https://github.com/marko-js/language-server/commit/bfbdd4b18c28ce77ec62f51a6646f6fc42c613c1) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade deps

## 2.4.2

### Patch Changes

- [#286](https://github.com/marko-js/language-server/pull/286) [`f585449`](https://github.com/marko-js/language-server/commit/f585449654947fe82fb0a56cc4e8a443589e574c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Revert change to renderBody codegen which caused a regression with the `<await>` tag.

## 2.4.1

### Patch Changes

- [#284](https://github.com/marko-js/language-server/pull/284) [`f2f3c2c`](https://github.com/marko-js/language-server/commit/f2f3c2cb03d07052e78315ad3a0c43fa33a1828e) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix type errors with nested conditional change

## 2.4.0

### Minor Changes

- [#281](https://github.com/marko-js/language-server/pull/281) [`aff5f68`](https://github.com/marko-js/language-server/commit/aff5f68db713660665149e266b6d19ac9d658d84) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Align attribute tag type generation with new types from Marko core.

### Patch Changes

- [#277](https://github.com/marko-js/language-server/pull/277) [`2f0f701`](https://github.com/marko-js/language-server/commit/2f0f70142b6abd6a6f58991babf578dc7c621a99) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Allow type narrowing when attr tags are in for loops

- [#279](https://github.com/marko-js/language-server/pull/279) [`2ad9437`](https://github.com/marko-js/language-server/commit/2ad943706818e3a02229b478544c67a38c54f922) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade deps, fix issues related to recent typescript changes.

- [#279](https://github.com/marko-js/language-server/pull/279) [`aefe17d`](https://github.com/marko-js/language-server/commit/aefe17de52172078bfe611a4b6c065a1530a822e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update local variable tag name interpolation to align with Marko 6 and only support PascalCase identifiers.

- [#280](https://github.com/marko-js/language-server/pull/280) [`abbb30a`](https://github.com/marko-js/language-server/commit/abbb30ae2343aa46e8c9d10040e9082ad4b32cea) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Align tag arguments type generation with Marko 6.

## 2.3.1

### Patch Changes

- [#273](https://github.com/marko-js/language-server/pull/273) [`6f1932f`](https://github.com/marko-js/language-server/commit/6f1932f438dc80efc607c3e258ff2ba9c3f696f7) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Ignore modifiers in html extractor

## 2.3.0

### Minor Changes

- [#264](https://github.com/marko-js/language-server/pull/264) [`44cddf7`](https://github.com/marko-js/language-server/commit/44cddf78022568e74c9f4794278de804c925f93e) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Allow formatting with forced mode

## 2.2.6

### Patch Changes

- [#262](https://github.com/marko-js/language-server/pull/262) [`521a0da`](https://github.com/marko-js/language-server/commit/521a0da14c4dddec61ab324972b6764a60714b9e) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue with typescript output when using static attr tags, dynamic attr tags and a renderBody all together.

## 2.2.5

### Patch Changes

- [#258](https://github.com/marko-js/language-server/pull/258) [`b7c4fe8`](https://github.com/marko-js/language-server/commit/b7c4fe8e0cbc4c38788073c36681a4038f3f0afe) Thanks [@LuLaValva](https://github.com/LuLaValva)! - prevent $signal from being declared but never read

## 2.2.4

### Patch Changes

- [#257](https://github.com/marko-js/language-server/pull/257) [`4a90968`](https://github.com/marko-js/language-server/commit/4a90968ae6ab45c4506778666c4fab35797150fe) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add typeings for $signal variable in tags api.

- [#255](https://github.com/marko-js/language-server/pull/255) [`7580d1d`](https://github.com/marko-js/language-server/commit/7580d1d7ffde619ba33f9bfd295c0e67e295d9c3) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update dependencies.

## 2.2.3

### Patch Changes

- [#251](https://github.com/marko-js/language-server/pull/251) [`1a614e7`](https://github.com/marko-js/language-server/commit/1a614e7ed24006010087ad02ce92c88fb5414f43) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Update dependencies

- [#251](https://github.com/marko-js/language-server/pull/251) [`36a769c`](https://github.com/marko-js/language-server/commit/36a769cbf8c81caa7a22cce9b22b5688c9a0950a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Only inject component method completions for event handler attributes. Fixes issue with `no-update-if` directive.

## 2.2.2

### Patch Changes

- [#248](https://github.com/marko-js/language-server/pull/248) [`64478f6`](https://github.com/marko-js/language-server/commit/64478f68cbf216a8eb27153bf2f8eab61a61dfc2) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix regex for component filenames

## 2.2.1

### Patch Changes

- [#244](https://github.com/marko-js/language-server/pull/244) [`8132732`](https://github.com/marko-js/language-server/commit/813273297542cf1bcedb7a003fa8848a350ffea3) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Fix types for imported d.marko files

## 2.2.0

### Minor Changes

- [#241](https://github.com/marko-js/language-server/pull/241) [`842b5ba`](https://github.com/marko-js/language-server/commit/842b5ba18ca9efd559df45b710df77a6201609bc) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Automatically add `.js` extensions where necessary in files output by `@marko/type-check` to work better with native es modules.

## 2.1.11

### Patch Changes

- [#237](https://github.com/marko-js/language-server/pull/237) [`a59b23d`](https://github.com/marko-js/language-server/commit/a59b23da89ce721dad3d1529d4894362861f7698) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where mtc was striping `Input` type if it was an empty interface with an extends clause.

- [#237](https://github.com/marko-js/language-server/pull/237) [`b0f43ce`](https://github.com/marko-js/language-server/commit/b0f43ce0a2bda2b80f98ef55d2d3346f12b9f960) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Correctly resolve ts errors related to Symbol.iterator in the template.

## 2.1.10

### Patch Changes

- [#235](https://github.com/marko-js/language-server/pull/235) [`4524d4c`](https://github.com/marko-js/language-server/commit/4524d4cb3ce2882c14913dd8e4847de1c013543c) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Surface errors from default export at the top of the Marko file.

## 2.1.9

### Patch Changes

- [#231](https://github.com/marko-js/language-server/pull/231) [`52187ac`](https://github.com/marko-js/language-server/commit/52187acf6c14cd049b6b68c93436830a53a45de6) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix missing package dependency for language-tools package

## 2.1.8

### Patch Changes

- [#229](https://github.com/marko-js/language-server/pull/229) [`6c7e1a9`](https://github.com/marko-js/language-server/commit/6c7e1a97d3177411d7a4145d634da999c50748bd) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Add `by` attribute types for `<for>` tag.

## 2.1.7

### Patch Changes

- [#221](https://github.com/marko-js/language-server/pull/221) [`f2646bd`](https://github.com/marko-js/language-server/commit/f2646bd4be9e2fa3f5ab5a05737b9d233d64943a) Thanks [@LuLaValva](https://github.com/LuLaValva)! - Improve axe-core linter

- [#224](https://github.com/marko-js/language-server/pull/224) [`a60e2f9`](https://github.com/marko-js/language-server/commit/a60e2f9297f63730235cc84b8f592156141f0801) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade package dependencies

## 2.1.6

### Patch Changes

- [#219](https://github.com/marko-js/language-server/pull/219) [`301bdf4`](https://github.com/marko-js/language-server/commit/301bdf420bf636250b3213ec6bbcd912ad9a338c) Thanks [@LuLaValva](https://github.com/LuLaValva)! - fix in attribute tags within if statements

## 2.1.5

### Patch Changes

- [#212](https://github.com/marko-js/language-server/pull/212) [`5fbd91d`](https://github.com/marko-js/language-server/commit/5fbd91de84d331c945de4dd4dcd931c9769ff788) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - When considering if a Marko file should be parsed as typescript, it will now default to typescript for any file containing `tsconfig`. Previously this would exclusively match `tsconfig.json` which would fail with files like `tsconfig.build.json`.

- [#214](https://github.com/marko-js/language-server/pull/214) [`97787c2`](https://github.com/marko-js/language-server/commit/97787c2be4d136e335664b0aa9252916125c6f63) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

## 2.1.4

### Patch Changes

- [#209](https://github.com/marko-js/language-server/pull/209) [`dbcee5a`](https://github.com/marko-js/language-server/commit/dbcee5a387bcb58cad93624ec7f3982b27fc093a) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Upgrade dependencies.

- [#209](https://github.com/marko-js/language-server/pull/209) [`374392e`](https://github.com/marko-js/language-server/commit/374392e78f82671c065426726ff420e90ddf6148) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fix issue where directory names instead of file names were being passed to `createRequire` causing some lookups to be one directory too high and missing resolving installed modules.

## 2.1.3

### Patch Changes

- [#204](https://github.com/marko-js/language-server/pull/204) [`6c97a4a`](https://github.com/marko-js/language-server/commit/6c97a4a68cfb17152b78882949033991778bb1c1) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - Fallback to loading compiler relative to the Marko runtime if not hoisted.

- [#204](https://github.com/marko-js/language-server/pull/204) [`6c97a4a`](https://github.com/marko-js/language-server/commit/6c97a4a68cfb17152b78882949033991778bb1c1) Thanks [@DylanPiercey](https://github.com/DylanPiercey)! - When no default compiler registered, avoid swallowing original error when unable to load compiler.

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
