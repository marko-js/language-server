---
type: bug
impact: high
effort: med
site: packages/language-tools/src/extractors/script/index.ts › #writeTag
---

# Surface a "cannot resolve tag" diagnostic for unresolved custom tags instead of typing them as dynamic tags

A custom tag that fails to resolve, whether a component referenced by kebab tag name with no `import` or a typo'd tag name, is a hard build error but produces zero diagnostics under `mtc`, the type-check tool agents are told to run. Marko 6 auto-discovers only `tags/` dirs, so `src/components/*.marko` is not auto-registered: `<user-card name="X" age="alsoWrong" bogus=true/>` with no import and the typo `<char-cont max="wrong"/>` both pass `mtc` with exit 0, while the build throws `Unable to find entry point for custom tag <user-card>`. The identical wrong attribute on a resolved tag correctly errors TS2322, proving tag resolution rather than the attribute is the gate: `#writeTag` lowers an unresolvable tag to `renderDynamicTag(...)` whose input is `Record<string, unknown>`, so every attribute and callback param goes unchecked. This is the worst shape for an agent whose verify loop is `mtc`: it references a component by tag, sees a clean type-check, and ships wrong props or a misspelled tag, then the build fails with an "entry point" error that looks unrelated. Emit a distinct "cannot resolve tag `<x>`" diagnostic mirroring the compiler instead of degrading to an untyped dynamic tag. The compiler-side authority is marko-js/marko's `packages/compiler/src/babel-utils/tags.js` › `resolveTagImport` and `custom-tag.ts` › `tagNotFoundError`.

Check: in a @marko/run scaffold, reference a `src/components/*.marko` component by kebab tag name with no import and run `mtc`; it exits 0 today while `marko-run build` fails.
