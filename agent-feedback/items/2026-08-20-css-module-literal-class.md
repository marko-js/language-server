---
type: bug
impact: med
effort: med
site: packages/language-tools/src/extractors/script/index.ts › #getStyleModuleSelectors
---

# Flag a literal `class` string that names a CSS-module selector declared in the same template

`<style/{ demo }>.demo{...}</style>` beside `<div class="demo">` compiles, type-checks, lints and builds completely clean, and the page renders unstyled: the CSS-modules pipeline emits `._demo_118fn_2` while the literal attribute stays `demo`. `noUnusedLocals` does not catch the now-unused binding either, because `#writeProgram` ends every extracted file with `Marko._.noop({ ...bindings })`, so no Marko tag variable is ever reported unused -- a fix aimed at the binding will not work. `#getStyleModuleSelectors` already collects the module's class and id names to type the tag var, so the extractor holds both halves and can diagnose a string `class`/`id` attribute in the same file that matches one of them and point at the binding instead. This is the most common CSS-modules mistake and it is the one thing in a `.marko` file that no gate in the toolchain covers.

Check: type-check a template containing `<style/{ demo }>.demo{color:red}</style>` and `<div class="demo">x</div>` under `noUnusedLocals: true`; `mtc` reports nothing today and should report that `"demo"` names a class from the `<style/{ demo }>` above it and will not match the emitted name.
