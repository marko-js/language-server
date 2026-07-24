# a11y linter perf: child template inlining vs `main`

Results from `project-bench.ts` (2026-07-24, Linux container, Node 22, tsx).
Three configurations over the same corpora:

- **main** — `origin/main` (a11y linter without child template inlining)
- **no-inline** — this branch with `A11Y_BENCH_NO_INLINE=1`
- **branch** — this branch as shipped (inlining enabled)

Corpora: all `.marko` files in `marko-js/website` (`src/`, 41 files),
`LuLaValva/evo-web` docs routes (`src/`, 343), `@evo-web/marko` tags (1176,
tests/stories excluded), `@ebay/ebayui-core` components (1500, Marko 5). Zero
harness errors in all 12 runs, including all Marko 5 files.

## Cold validation sweep (one `doValidate` per file)

Per-file slowdown of branch relative to main:

| corpus         | files | main p50 | branch p50 | delta p50 | delta p95 | worst file                        |
| -------------- | ----- | -------- | ---------- | --------- | --------- | --------------------------------- |
| website        | 41    | 29.5ms   | 38.8ms     | +2.6ms    | +278ms    | playground `+page` 16→553ms (35x) |
| evo-web routes | 343   | 31.4ms   | 33.9ms     | +2.0ms    | +24ms     | `_index/+layout` 91→981ms (11x)   |
| evo-marko tags | 1176  | 11.9ms   | 15.9ms     | +3.7ms    | +11ms     | evo-3d-viewer 215→255ms           |
| ebayui-core    | 1500  | 12.8ms   | 15.0ms     | +2.0ms    | +7ms      | ebay-3d-viewer 28→76ms            |

The **no-inline** config tracks main within noise everywhere, so the entire
regression is attributable to inlining, not the branch's other changes.

## Keystroke latency (edit loop, 15 iterations after warmup)

`content-edit` toggles visible text (extraction changes); `comment-edit`
toggles a comment (extraction unchanged).

| file                                                 | main  | branch content-edit | branch comment-edit    |
| ---------------------------------------------------- | ----- | ------------------- | ---------------------- |
| website playground `+page`                           | 25ms  | **541ms**           | 1ms (main: 18ms)       |
| website `+layout`                                    | 26ms  | 114ms               | 1ms (main: 31ms)       |
| website `_home/+page`                                | 17ms  | 163ms               | 1ms (main: 15ms)       |
| evo-web `_index/+layout`                             | 41ms  | **648ms**           | 3ms (main: 28ms)       |
| evo-web `+404`                                       | 19ms  | 109ms               | 1ms (main: 19ms)       |
| evo-web toggle-button-group `css+page` (96kB static) | 505ms | 522ms               | 10ms (main: **467ms**) |
| evo-marko evo-button                                 | 22ms  | 32ms                | 0ms                    |
| ebayui ebay-carousel                                 | 32ms  | 37ms                | 1ms                    |

Two headlines:

1. **Composite pages regress badly on content edits.** Layouts and pages that
   pull in site chrome or app UI go from ~20–40ms to 500–650ms per keystroke,
   well past interactive latency budgets.
2. **Source-only edits got dramatically faster than main.** The new
   extraction-keyed validation cache skips axe entirely when the extraction is
   unchanged (comments, scriptlets, event handlers, types): 467ms → 10ms on the
   worst static page. Component-sized files (the overwhelming majority of both
   projects: ~2700 of ~3060 files) stay within ~+3ms.

## Where the time goes

`--cpu-prof` over the evo-web `_index/+layout` edit loop (~650ms/keystroke,
23.6s sampled):

| module                                                                | self time | share |
| --------------------------------------------------------------------- | --------- | ----- |
| jsdom (DOM construction + wrappers)                                   | 9.0s      | 38%   |
| `@asamuzakjp/dom-selector` (jsdom CSS selector engine, driven by axe) | 5.3s      | 23%   |
| GC                                                                    | 1.5s      | 6%    |
| axe-core proper                                                       | 1.7s      | 7%    |
| symbol-tree (jsdom traversal)                                         | 1.1s      | 5%    |
| parse5 (jsdom HTML parse)                                             | 1.0s      | 4%    |
| language-tools extraction + language-server                           | 0.2s      | ~1%   |

The inlining computation itself is negligible (extraction p50 stays ≤0.2ms;
worst first-time extraction 171ms, cached thereafter). The cost is downstream:
inlining makes composite pages 10–50x larger in _interactive/ARIA-dense_
elements (`role`, `aria-*`, focusable controls), and each content keystroke
rebuilds a fresh JSDOM and re-runs the full axe pass over it. Axe cost scales
with interactive element count, not bytes — the 5.8kB playground extraction
(70 inlined nodes full of menus/tabs/contenteditable) costs 553ms while a 23kB
mostly-static page costs 297ms.

## Bottlenecks worth pursuing (recorded in `agent-feedback/perf.md`)

1. Per-keystroke full JSDOM + axe re-run on composite pages — debounce
   validation for large extractions, or cache axe results per inlined region
   (child template content is immutable between child edits).
2. `childTemplateCache` is cleared on every `projectVersion` bump, so every
   keystroke re-extracts every child template on the page (~6ms/keystroke on
   the evo layout; grows with component count).
3. `extractionKey` re-serializes the entire extraction per validation to test
   the cache — O(document) string build even on cache hits.
