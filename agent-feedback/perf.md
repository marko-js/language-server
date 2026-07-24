# Performance

Runtime speed and bundle size opportunities. Format and rules: [README.md](README.md).

## Debounce or scope axe re-runs for large inlined extractions

`packages/language-server/src/service/html/index.ts` › `doValidate` | 2026-07-24 | impact:high | effort:high

With child template inlining, layout/page templates that pull in site chrome become 10-50x larger in interactive/ARIA-dense elements, and every content keystroke rebuilds a fresh JSDOM and re-runs the full axe pass: measured 541ms/keystroke on marko-js/website `src/routes/playground/+page.marko` and 648ms on evo-web `src/routes/_index/+layout.marko` (vs 25/41ms on main; component-sized files stay ≤~40ms). CPU profiles attribute ~90% to jsdom + its `@asamuzakjp/dom-selector` engine + axe, ~1% to extraction, so the fix is fewer/smaller axe runs, not faster extraction. Rule pruning does not help: batched axe on the 50kB layout costs 325ms with all 84 rules, 189ms with only the 69 fragment rules, and 258ms with only the 15 document-level rules, so the shared tree build dominates. The promising shape is tiered validation: an immediate non-inlined pass (measured ~36ms on the same file, i.e. main-level latency) plus a deferred full inlined pass on a longer idle (and/or in a worker thread so the server loop never blocks). `src/__tests__/phase-timing.ts` reproduces the phase and per-rule numbers. Re-verify with `tsx src/__tests__/project-bench.ts edit <out> <list>` on those two files (see `src/__tests__/project-bench-results.md`).

## Key the child template cache per template instead of per projectVersion

`packages/language-server/src/service/html/index.ts` › `getChildTemplate` | 2026-07-24 | impact:low | effort:med

`childTemplateCache` is a single Map discarded whenever `projectVersion` changes, so every keystroke anywhere in the workspace re-extracts every child template inlined into the open page (~6ms/keystroke across ~127 inlined nodes on evo-web `src/routes/_index/+layout.marko`; grows with component count). Child extractions only change when their own document (or a transitive child) changes, so keying on the child doc's version — or reusing entries whose `Parsed` identity is unchanged — would keep them warm across unrelated edits. Re-verify by logging `extractChildTemplate` call counts during the `project-bench.ts` edit loop.

## Avoid re-serializing the extraction to test the validation cache

`packages/language-server/src/service/html/index.ts` › `extractionKey` | 2026-07-24 | impact:low | effort:low

`extractionKey` concatenates the full extracted HTML plus every nodeDetails/inlineRegions entry into a fresh string on every `doValidate`, an O(document) allocation even when the cache hits (50kB+ on evo-web's docs layout, twice per comparison including the cached key). A cheap content hash, or comparing the parts incrementally, would make cache hits allocation-free. Re-verify with the `comment-edit` phase of `tsx src/__tests__/project-bench.ts edit` on a large page (currently ~1-10ms, dominated by this key build plus re-extraction).

## Adopt happy-dom (or batching) to cut the a11y linter's raw DOM+axe cost

`packages/language-server/src/service/html/index.ts` › `createDom` | 2026-07-24 | impact:high | effort:med

Two cache-free speedups are implemented behind env flags and measured across 3060 real templates in marko-js/website and evo-web (see `src/__tests__/project-bench-results.md`): `A11Y_DOM=happy` swaps jsdom for happy-dom (1.6-1.9x per corpus, half the worst-page keystroke cost, diagnostics identical on 3057/3060 files — the 3 diffs favor happy-dom, see the modal-suppression entry in bugs.md; one `<marquee>` fixture differs) and `A11Y_PRUNE=1` excludes anchor-free inlined subtrees from axe evaluation (website playground keystroke 539→51ms, exact parity everywhere, self-gating where it cannot win). Promoting these to defaults needs a decision on the happy-dom dependency and the `<marquee>`/dialog-visibility rule differences. For a future CLI batch mode, one axe run over many wrapped fragment extractions measured 19.9→1.0ms/file (19x); fragments containing `aria-modal`/open `<dialog>` markup must run solo or they scope the whole batch. Re-verify with `tsx src/__tests__/project-bench.ts sweep` under each flag.
