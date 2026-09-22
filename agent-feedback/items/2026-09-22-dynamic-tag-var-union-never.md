---
type: bug
impact: med
effort: med
site: packages/language-tools/src/extractors/script/index.ts › renderDynamicTag
---

# Type a dynamic tag's tag variable from its resolved element instead of `Element` or `never`

A tag variable on a dynamic native tag loses its element type, and a common falsy-guard tag expression collapses it to `never` even when read below the declaring tag. `<${"button"}/$btn>` types `$btn` as `() => Element`, so `$btn().focus()` reports `TS2339 Property 'focus' does not exist on type 'Element'` where a static `<button/$btn>` yields `() => HTMLButtonElement`. Worse, `<${cond && "button"}/$btn>` — the standard "render a button only when labelled" pattern — types `$btn` as `never`, so even a truthiness-guarded `$btn()` reports `TS2349 This expression is not callable. Type 'never' has no call signatures`, and any object containing it (e.g. a `<return>`) poisons consumers across templates. The tag name expression's string literal types are known, so the variable should type as `() => HTMLElementTagNameMap[T]`, unioned with `undefined` when the expression admits falsy values. Today the only workaround is `as unknown as (() => HTMLButtonElement) | undefined` at every read.

Check: type-check a template containing `<${input.label && "button"}/$btn type="button">x</>` followed by `<script>if ($btn) $btn();</script>`; `mtc` reports `TS2349` on the guarded call today and should report nothing.
