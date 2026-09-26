---
type: bug
impact: low
effort: med
site: packages/language-tools/src/parser.ts › Builder.onOpenTagName
---

# Take a tag's body parse mode from the taglib instead of a hardcoded name list

`Builder.onOpenTagName` chooses void, text or html bodies from a fixed switch, while the compiler derives the body mode from `tagDef.parseOptions`. Marko 6 gives `<title>` `parseOptions.text` (Marko 5's taglib overrides it back to html), so `<title>Hi <b class=1>x</b></title>` compiles to literal text while the editor extracts and type-checks `<b>` as an element. Any new void or text core tag, and any `parse-options` in a user taglib, drifts the same way without a warning; `isControlFlowTag` is the same kind of fixed list standing in for `parseOptions.controlFlow`. Direction: pass the project's taglib lookup, or a parse-mode callback, into `parse` and read `parseOptions` from it. Keep the `style {` block detection, and keep the current table as a fallback for callers with no lookup.

Check: in this repo, `pnpm exec tsx` a `.tmp.mts` that calls `parse("<title>Hi <b class=1>x</b></title>")` from `packages/language-tools/src/parser.ts`; the title's body is a `Text` node plus a `Tag` named `b`. In marko-js/marko, `pnpm run compile -- -o html -d x.marko` on the same line emits `_html("<title>Hi <b class=1>x</b></title>")`, and `taglib.buildLookup(dir, "@marko/runtime-tags/translator").getTag("title").parseOptions` (with `taglib` from `@marko/compiler`) is `{ text: true }`.
