---
type: dx
impact: low
effort: med
site: packages/vscode/src/__tests__
---

# Pin or skip the vscode completion tests that fail against current VS Code Insiders

`pnpm --filter marko-vscode run test` (VS Code Insiders via `@vscode/test-electron`) fails 7 of 17 locally: `tag name`, `open tag close`, `attr name`, `attr modifier`, `css prop`, `empty tag`, and `multi line attrs`, all completion-related. The same 7 failed identically under the old npm setup and under pnpm, so the failures track the current Insiders build rather than the dependency layout. Because the suite is red for reasons unrelated to any given change, an agent cannot use it as a signal and learns to ignore it. Either pin the tested VS Code version so the suite is deterministic, or mark the known-failing cases so a real regression stands out.

Check: `pnpm --filter marko-vscode run test` reports 7 failures on a clean checkout.
