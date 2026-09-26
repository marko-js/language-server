---
type: bug
impact: med
effort: med
site: packages/language-tools/src/extractors/script/util/get-runtime-api.ts › getRuntimeAPI
---

# Detect a template's API with the compiler's rules so interop Tags API files are not typed as Class API

When the translator does not set `preferAPI: "tags"` (a Marko 5 project that uses Tags API files through interop), `getRuntimeAPI` infers each file's API, and it disagrees with the compiler's `isTagsAPI` in marko-js/marko's `packages/runtime-tags/src/translator/interop/feature-detection.ts`. `detectAPIFromTag` lacks the Tags API core tags `attrs`, `effect` and `show`, and it returns class for any attribute name containing `:`, a rule the compiler does not have. `detectAPIFromProgram` reads only `program.comments[0]`, but the parser fills `program.comments` with trailing comments only, so a leading `<!-- use tags -->` is never seen. Each such file compiles with `meta.api === "tags"` but is extracted as Class API (`component, state, out` in scope, `~api` exported as `"class"`), so the editor type-checks it against the wrong model. Direction: mirror `getFeatureTypeFromCoreTagName`, drop the `:` rule, and scan every comment the compiler scans, including the ones the parser attaches to the next node; a keyword list shared with the compiler would stop the lists from drifting again.

Check: add a language-server fixture `script/<name>/` with `use-tags-comment.marko` (`<!-- use tags -->` then `<div>hi</div>`), `show-tag.marko` (`<show=input.open>hi</show>`) and `xlink-attr.marko` (`<svg><use xlink:href="#icon"/></svg>`, `<let/x=1/>`, `<div>${x}</div>`). `pnpm run test:server` writes three `.ts` snapshots that each contain `const __marko_internal_api = "class"`. In marko-js/marko, compiling each file with `translator: "marko/translator"` and `babelConfig: { babelrc: false, configFile: false }` from a `components/` directory gives `meta.api === "tags"` (a file named `show.marko` there would shadow the core `<show>` tag).
