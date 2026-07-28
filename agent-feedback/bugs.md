# Suspected Bugs

Out-of-scope defects noticed while working on something else. Format and rules: [README.md](README.md).

- The `@marko/language-server` snapshot tests are not reproducible from the manifests alone: a fresh dependency resolution (delete lockfile + reinstall) picks up marko 5.39.25 / `@marko/runtime-tags` 6.3.16 and two fixtures fail against the committed snapshots — `attr-tags-params-js` and `for-tag` (in `packages/language-server/src/__tests__/fixtures/script/`). The previous `package-lock.json` masked this because it pinned marko 5.39.11 / runtime-tags 6.1.17 even though the manifests require `marko@^5.39.24` (the lock was stale relative to the ranges). Note marko 5.39.24 is worse still: with it, ~40 fixtures fail (attr-tag hoisting/bound-attr diagnostics like "Argument of type '{ section: never; }' is not assignable to parameter of type 'never'"); 5.39.25 fixed most of that upstream. The two remaining snapshot mismatches should be investigated against current marko and either fixed upstream or snapshotted.

- The `marko-vscode` extension tests (`pnpm --filter marko-vscode run test`, VS Code Insiders via `@vscode/test-electron`) fail 7 of 17 locally (`tag name`, `open tag close`, `attr name`, `attr modifier`, `css prop`, `empty tag`, `multi line attrs` — all completion-related, in `packages/vscode/src/__tests__`) identically under both the old npm setup and pnpm, so the failures track the current VS Code Insiders build rather than the dependency layout.

## Honor union type annotations on tag variables instead of collapsing to the initializer's type

`packages/language-tools/src/extractors/script/index.ts` › `#writeTag` | 2026-07-18 | impact:med | effort:med

A parenthesized union annotation on a tag variable parses, compiles, and runs, but `mtc` (@marko/type-check 3.1.2) narrows the variable to the initializer's type instead of the declared union: `<let/e:(number | string) = 5>` then `e = "hi"` in a handler errors TS2322 "'string' is not assignable to type 'number'", and `<let/x:(number | undefined) = undefined>` types x as `undefined` so every later assignment errors. Non-union annotations ARE honored (`<let/d:string = 5>` correctly rejects the initializer), so the annotation isn't ignored wholesale — the union is re-inferred/intersected against the initializer, unlike plain TS `let e: number | string = 5` which keeps the union. This defeats the main reason to annotate a tag variable (widening beyond the initial value); the only working spelling today is casting the initializer, `<let/x=(undefined as number | undefined)>`. The tag variable is emitted where `tag.var` is copied in `#writeTag`; the annotation should become the `T` type argument of the `Input<T, K = T>` declared by marko-js/marko's `packages/runtime-tags/tags/let.d.marko`, rather than an inference site combined with the value.

## Widen `<for by>`'s typed return to `string | number` so numeric keys type-check

`packages/language-tools/marko.internal.d.ts` › `forOfTag` | 2026-07-19 | impact:med | effort:low

The runtime accepts a string OR number loop key — `assertValidLoopKey` throws only when `typeof key !== "string" && typeof key !== "number"` (`common/errors.ts:65`), the key is used directly as a `Map` key with no string coercion (`dom/control-flow.ts:811-816`), and the runtime `by` callback is typed `=> unknown` (`control-flow.ts:739`). But the type surface consumed by `mtc`/IDE narrows every `by` to `=> string`: `forOfTag`/`forInTag`/`forToTag`/`forUntilTag` and the merged `forTag` type `by` as `((item, index) => string) | string`. So `by=(todo) => todo.id` where `id: number | string` fails `TS2322` ("Type 'number' is not assignable to type 'string'"), while the string-shorthand `by="id"` (which returns the same numeric key at runtime) type-checks — an internal inconsistency, since both yield a numeric runtime key and both render/hydrate correctly. The 5→6 migration guide recommends the failing spelling (`skills/marko-5-to-6-migration/api-mapping.md:26`, `by=(item) => item.id`), so porting the flagship TodoMVC (keys off a numeric `id`) hits a type error out of the box and forces `String(todo.id)`. Fix: change the `=> string` returns to `=> string | number` (not `PropertyKey` — the runtime rejects symbols); the runtime authority for the contract is marko-js/marko's `common/errors.ts` `assertValidLoopKey`. This mirrors the existing `bugs.md` language-tools entry that files a type-check bug under marko while noting the fix lives upstream — and is distinct from both union-annotation entries (those concern `<let>`/`<const>` annotations, not the built-in `<for by>` return type).

## Surface a "cannot resolve tag" diagnostic in mtc for unresolved custom tags instead of typing them as untyped dynamic tags

`packages/language-tools/src/extractors/script/index.ts` › `#writeTag` | 2026-07-19 | impact:high | effort:med

A custom tag that fails to resolve (a component referenced by kebab tag name with no `import`, or a typo'd tag name) is a hard build error but produces ZERO diagnostics under `mtc` — the type-check tool agents are told to run. Reproduced in a real @marko/run scaffold: Marko 6 auto-discovers only `tags/` dirs (`runtime-tags` sets `tagDiscoveryDirs = ["tags"]` at `packages/runtime-tags/src/translator/index.ts:40`), so `src/components/*.marko` is NOT auto-registered — `<user-card name="X" age="alsoWrong" bogus=true/>` (no import) and the typo `<char-cont max="wrong" nope=1/>` both pass `mtc` with exit 0, while `npm run compile -o html` / `marko-run build` throw `Unable to find entry point for custom tag <user-card>` (`resolveTagImport` at `tags.js:353`; `tagNotFoundError` at `packages/runtime-tags/src/translator/visitors/tag/custom-tag.ts:411`). The identical wrong attr on a RESOLVED tag correctly errors TS2322 (verified against `<char-count max="not-a-number">`), proving tag resolution — not the attribute — is the gate: `#writeTag` lowers an unresolvable tag to `renderDynamicTag(...)` whose input is `Record<string, unknown>`, so every attribute and callback param goes unchecked. This is the worst shape for an agent whose deterministic verify loop is `mtc`: it creates a component, references it by tag (natural for anyone used to auto-registering `components/` dirs), sees a clean type-check, and ships wrong props or a misspelled tag; the build then fails with an "entry point" error that looks unrelated to the type loop. Direction: have @marko/language-tools emit a distinct "cannot resolve tag `<x>`" diagnostic mirroring the compiler instead of degrading to an untyped dynamic tag. The compiler-side authority is marko-js/marko's `packages/compiler/src/babel-utils/tags.js` › `resolveTagImport` and `custom-tag.ts` › `tagNotFoundError`. Distinct from the run dx.md route-types entries (missing `Run` global / stale `routes.d.ts`), which concern generated route types, not custom-tag resolution.

## Guard `Extracted.sourceRangeAt` consumers against anchor-token expansion and cross-token spans

`packages/language-tools/src/util/extractor.ts` › `Extracted` | 2026-07-27 | impact:med | effort:med

Two hazards exist for a consumer that maps a generated range back to source and assumes the length is preserved. A zero-width `Mapping.anchor` token (`generatedLength === 0`, `sourceLength > 0`) matches a query at exactly its `generatedStart`, and `rangeAt`/`sourceRangesAt` then contribute the anchor's entire unrelated source range. Separately, `rangeAt` pairs the first overlapping start token with the last end token, spanning any unmapped glue between two different tokens, so the returned source range can be longer than and textually different from the queried generated span; `sourceLocationAtTextSpan` in `packages/language-server/src/service/script/index.ts` relies on `sourceLocationAt` and can therefore report oversized or misplaced ranges for TS results whose spans straddle mappings. Consumers that need length preservation should use `sourceRangesAt`, which returns every overlapping mapping, and validate per feature: semantic tokens require a single result of exact width with byte-identical text, while highlights legitimately accept each returned range. Alternatively `rangeAt` could learn to reject cross-token spans. Re-verify: query `sourceRangeAt` over a generated span that begins at an `anchor` offset (the anchors emitted in `extractors/script/index.ts` around tag names) and compare the returned width to the queried width.

## Add `macro` and `effect` to the TextMate grammar's core-tag keyword lists

`packages/vscode/syntaxes/marko.tmLanguage.json` › `#tag-name` | 2026-07-27 | impact:low | effort:low

The `#tag-name` rule hardcodes two alternations for Marko core tags (`for|if|while|else-if|else|try|await|return` scoped `keyword.control.flow.marko` and `const|context|debug|define|id|let|log|lifecycle` scoped `support.function.marko`), and `macro` and `effect` appear in neither, so both color as ordinary user-defined tags (`entity.name.tag.marko`). `grep -n "macro" packages/vscode/syntaxes/marko.tmLanguage.json` returns no hits today, and both are real core tags: `macro` is recognized in `packages/language-tools/src/extractors/script/util/get-runtime-api.ts`. The fix is adding the two names to the alternations. Re-verify: open a `.marko` file containing `<macro|...|/foo>` and check the scope with VS Code's "Developer: Inspect Editor Tokens and Scopes".

## Keep the `"use strict"` prologue when injecting the `import.meta.url` banner

`packages/ts-plugin/build.mts` › `build` | 2026-07-24 | impact:low | effort:low

The `banner.js` that defines `_importMetaUrl` is emitted above esbuild's own `"use strict"`, so that string is no longer a directive prologue and the bundle runs in sloppy mode: `head -2 packages/ts-plugin/dist/index.js` shows the `const` on line 1 and `"use strict";` on line 2. The same applies to all three `packages/vscode/dist/*.js` bundles, which share the pattern via `packages/vscode/build.mts`. Bundled TS rarely depends on strict semantics, so nothing is known to break today, but silently dropping strict mode is not what either build intends. Fix by prefixing the banner with `"use strict";\n` (as `packages/language-tools/build.mts` does); re-verify with `head -2` on each bundle.

## Make `clearMarkoCacheForFile` clear the same cache `getMarkoFile` populates for non-file documents

`packages/language-server/src/utils/file.ts` › `clearMarkoCacheForFile` | 2026-07-28 | impact:med | effort:low

`getMarkoFile` caches a non-`file:` (e.g. `untitled:`) document under `Project.getCache(process.cwd())`, but `clearMarkoCacheForFile` deletes from `Project.getCache(getFSDir(doc))`, which is `getCache(undefined)` for those documents. When the cwd resolves a local marko install those are different maps, the delete is a no-op, and edits to untitled documents keep serving the stale parse; reproduced live, where document symbols requested after an edit that inserted a new tag still returned only the pre-edit symbols. Fix by extracting one shared helper that computes the cache directory identically for both call sites. Re-verify: open an untitled marko doc, request symbols, apply an edit adding a tag, and request symbols again; the new tag is currently missing.

## Invalidate the compiler-diagnostics cache on watched-file changes, not just document versions

`packages/language-server/src/service/marko/validate.ts` › `getMarkoDiagnostics` | 2026-07-28 | impact:med | effort:low

The compiler diagnostics cache is keyed per `(doc, doc.version)`, but a watched-file event (e.g. creating the component a template references) triggers revalidation without changing the document's version, so stale cached diagnostics such as an unresolved-tag error the on-disk change just fixed are re-sent until the user edits the document itself. Key the cache additionally on a cache generation such as `documents.projectVersion`, or clear it from the watched-files path. Re-verify: open a doc referencing a missing component, create the component file on disk, fire the watched-files event, and re-validate; the error should clear without editing the doc.

## Recover from a whitespace-containing close tag instead of swallowing the rest of the file

`packages/language-tools/src/parser.ts` › `Builder` | 2026-07-28 | impact:med | effort:med

A close tag with trailing whitespace before `>` (e.g. `</if >`) leaves the close range `UNFINISHED` and the parser absorbs the entire remainder of the file into it, so every feature that walks the CST (symbols, links, semantic tokens) loses everything below that point; mid-keystroke this visibly strips highlighting for the rest of the file. The runtime compiler accepts the same input, so the gap is in parser recovery rather than in the language definition. Re-verify: parse `<if=1>a</if >\n<for|x| of=[1]>${x}</for>` and observe that the `<for>` tag is missing from `program.body` because it lives inside the `if` close range.

## Bound recursion (or go iterative) in the script extractor and remaining CST walkers

`packages/language-tools/src/extractors/script/index.ts` › `ScriptExtractor` | 2026-07-28 | impact:low | effort:med

Roughly 5,000 levels of nested unclosed tags overflow the call stack in the recursive script extractor, as well as in the remaining recursive walkers in `packages/language-server/src/service/marko/document-symbols.ts` and `document-links.ts`, and the facade's `Promise.allSettled` swallows the `RangeError`, so features return empty results for the document with no error surfaced. The semantic-token walkers were converted to explicit stacks during review; the extractor and the two remaining walkers still recurse. Re-verify: use `"<if=1>".repeat(5000)` as a document body and request document symbols, which currently returns empty with a swallowed RangeError.

## Wrap plugin calls in `createService` merge arms so synchronous throws are isolated

`packages/language-server/src/service/create-service.ts` › `createService` | 2026-07-28 | impact:low | effort:low

Every merge arm except `getSemanticTokens` calls `plugin.method?.(...)` directly inside the `plugins.map(...)` passed to `Promise.allSettled`, so a plugin method that throws synchronously (several script-plugin handlers are synchronous) throws out of the `.map` callback before `allSettled` can isolate it, rejecting the entire feature instead of that one plugin's contribution. `getSemanticTokens` wraps the call in an `async` closure to isolate such throws; the same one-word change applies to the other arms. Re-verify: a test plugin whose `findDocumentHighlights` throws synchronously currently rejects the whole facade call rather than being skipped.

## Classify mutation targets of tag variables in the extracted script

`packages/language-tools/marko.internal.d.ts` › `change` | 2026-07-28 | impact:low | effort:med

The assignment target of a mutated `<let>` variable is rewritten to a generated property access (`__marko_internal_change__x.x = ...`), and TypeScript emits no semantic classification for that property because the `Marko._.change(...)` type does not resolve it to a named property symbol, even though plain TS classifies write targets (`o.p = 2` classifies `p` as property). In editors with semantic highlighting, the one place a reactive variable is written is therefore the one occurrence left uncolored. A candidate fix is making the change-handler type in the internal types carry a real named property. Re-verify: request semantic tokens for `<let/count=1/><button onClick() { count = count + 1 }>`; the assignment LHS `count` has no token while the RHS does.
