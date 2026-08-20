---
type: bug
impact: med
effort: low
site: packages/language-tools/src/extractors/script/index.ts › #writeAttrs
---

# Emit an unquoted key for identifier-safe attribute names so TypeScript can suggest the near-miss spelling

`#writeAttrs` wraps every named attribute key in quotes, and TypeScript computes an excess-property spelling suggestion only when the key node is an identifier, so every identifier-safe attribute typo loses its "Did you mean...?". `<input onKeydown(e) {}/>` extracts as `"onKeydown"(e){}`, and both `mtc` and the LSP report the bare TS2353 "Object literal may only specify known properties", where the identical object with an identifier key reports TS2561 naming `onKeyDown`. That reads as "this element takes no event handlers" rather than "you got the casing wrong", and the runtime binds it fine (marko's `getEventHandlerName` lowercases everything after `on`), which is exactly why the type layer should name the right spelling. Quoting is required for names that are not valid identifiers (`on-click`, `data-x`, `class:foo`), so gate it: reuse the existing `REG_OBJECT_PROPERTY` and `copy(name)` unquoted when it matches, keeping the `anchor(defaultMapPosition)` mapping for the default-attr case. Snapshots barely move, since prettier already prints these keys unquoted. Distinct from the `#writeTag` unresolved-tag item: that is a missing diagnostic, this is a present diagnostic missing its suggestion.

Check: add `<input onKeydown(e) {}/>` as `packages/language-server/src/__tests__/fixtures/script/attr-name-typo/index.marko`, run `pnpm run test:server`, and read the `## Diagnostics` block of the generated snapshot; it reports TS2353 with no suggestion.
