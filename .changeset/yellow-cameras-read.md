---
"@marko/language-tools": patch
---

Refactor extractor to have "anchor" feature which allows mapping back arbitrary code points from the typescript to arbitrary source code. Previously we relied on injected comment mapping and whitespace copying which was both brittle and noisy.
