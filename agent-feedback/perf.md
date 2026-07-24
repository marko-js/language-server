# Performance

Runtime speed and bundle size opportunities. Format and rules: [README.md](README.md).

## Debounce or scope axe re-runs for large inlined extractions

`packages/language-server/src/service/html/index.ts` › `doValidate` | 2026-07-24 | impact:high | effort:high

With child template inlining, layout/page templates that pull in site chrome become 10-50x larger in interactive/ARIA-dense elements, and every content keystroke rebuilds a fresh JSDOM and re-runs the full axe pass: measured 541ms/keystroke on marko-js/website `src/routes/playground/+page.marko` and 648ms on evo-web `src/routes/_index/+layout.marko` (vs 25/41ms on main; component-sized files stay ≤~40ms). CPU profiles attribute ~90% to jsdom + its `@asamuzakjp/dom-selector` engine + axe, ~1% to extraction, so the fix is fewer/smaller axe runs, not faster extraction: debounce validation when the extraction exceeds a size threshold, or cache axe results per inlined region since child content is immutable between child edits. Re-verify with `tsx src/__tests__/project-bench.ts edit <out> <list>` on those two files (see `src/__tests__/project-bench-results.md`).

## Key the child template cache per template instead of per projectVersion

`packages/language-server/src/service/html/index.ts` › `getChildTemplate` | 2026-07-24 | impact:low | effort:med

`childTemplateCache` is a single Map discarded whenever `projectVersion` changes, so every keystroke anywhere in the workspace re-extracts every child template inlined into the open page (~6ms/keystroke across ~127 inlined nodes on evo-web `src/routes/_index/+layout.marko`; grows with component count). Child extractions only change when their own document (or a transitive child) changes, so keying on the child doc's version — or reusing entries whose `Parsed` identity is unchanged — would keep them warm across unrelated edits. Re-verify by logging `extractChildTemplate` call counts during the `project-bench.ts` edit loop.

## Avoid re-serializing the extraction to test the validation cache

`packages/language-server/src/service/html/index.ts` › `extractionKey` | 2026-07-24 | impact:low | effort:low

`extractionKey` concatenates the full extracted HTML plus every nodeDetails/inlineRegions entry into a fresh string on every `doValidate`, an O(document) allocation even when the cache hits (50kB+ on evo-web's docs layout, twice per comparison including the cached key). A cheap content hash, or comparing the parts incrementally, would make cache hits allocation-free. Re-verify with the `comment-edit` phase of `tsx src/__tests__/project-bench.ts edit` on a large page (currently ~1-10ms, dominated by this key build plus re-extraction).
