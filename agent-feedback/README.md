# Agent Feedback

Actionable observations that were out of scope for the task that surfaced them. In scope: fix it. Out of scope: file it here. Never expand a task's diff to fix an item recorded here.

One item per file in `items/`, named `YYYY-MM-DD-<slug>.md`.

## When to file

Anything a future contributor should act on:

- `bug`: a suspected defect left unpursued
- `cleanup`: duplication, dead code, inconsistency, refactor opportunity
- `perf`: speed, memory, payload or bundle size, build time
- `dx`: friction in builds, tests, tooling, or repo workflows
- `unclear`: code or docs that were confusing, and what would have clarified them

## Rules

1. **Verify first.** A guess is not feedback. Every item ends with a check that reproduces the claim.
2. **Dedupe first.** `grep -ril '<path or symbol>' agent-feedback/items`. If a file covers it, edit that file only when you add new information.
3. **Check the code site.** An intent comment there means the behavior is deliberate. Do not file it.
4. **Self-contained.** Paths, symbols, reasoning. Never reference conversation context or "earlier analysis".
5. **Cite by stable symbol**, never line number.
6. **State the defect and the check.** Never describe what works. Never narrate a landed fix.
7. **Direction is preventive for `unclear` and `dx`.** Name what would have stopped the trip: a comment, a doc line, a lint rule, a compile error, a debug-only warning. The goal is that the next agent does not hit it.
8. **Resolve by deleting the file in the same PR as the fix.** A partial fix rewrites the file to what remains.
9. **Won't-fix is a maintainer's call, never an agent's.** Add a comment (two lines max) at the code site stating the behavior and why it is deliberate, then delete the file. The comment is what stops re-filing. Never consult git history to learn whether something was resolved; if it is not in `items/` and not commented at the site, it is unresolved.

## Item format

`items/YYYY-MM-DD-<slug>.md`:

```md
---
type: bug | cleanup | perf | dx | unclear
impact: high | med | low
effort: high | med | low
site: <path/to/file.ts> › <nearestStableSymbol>
---

# <one-line imperative title>

<2-6 sentences: the problem, why it matters, a concrete direction. Cut evidence a fixer can re-derive from the site.>

Check: <command, input, or observation that reproduces the claim>
```

`impact`: what breaks or is lost if ignored. `effort`: expected size of the fix. Both are the filer's estimate; triage re-judges.

## Repo notes

pnpm monorepo, four packages under `packages/`: `language-tools` (extraction/analysis, the leaf), `language-server` (LSP), `type-check` (the `mtc` CLI), `vscode` (the extension). Build order is `language-tools -> language-server -> vscode` and `language-tools -> type-check`. Repo-wide conventions live in the root `AGENTS.md`; read it too.

**Build first, always.** TypeScript emits only `.d.ts`; esbuild produces the JS. `pnpm test` at root is `pnpm run build && pnpm -r --if-present run test`. A stale `dist/` is the most common cause of a result that will not reproduce.

**Reproduce a claim.**

- Type-check surface (`mtc`, IDE diagnostics): write a `.marko` file and run `pnpm exec mtc` against it, or add a fixture (below) and read the generated `## Diagnostics` block.
- Extractor output: the fixture snapshots under `packages/language-server/src/__tests__/__snapshots__/` show what the extractor produced, which is usually faster than reasoning about `packages/language-tools/src/extractors/script/index.ts`.

**Guard tests.** Fixture directories under `packages/language-server/src/__tests__/fixtures/<kind>/<name>/` holding `.marko` files. `^?` markers in a fixture define hover positions. Snapshots are individual files under a sibling `__snapshots__/<name>.expected/`. Run and update with `pnpm run test:server` (builds `language-tools` + `language-server`, then runs `test:update`). Mocha timeout is 10s.

**Pre-ship.** `pnpm run lint` (build, then eslint, prettier check, cspell) and `pnpm test`. Add a changeset with `pnpm run change`.

**Gotchas.** The `vscode` package's tests launch VS Code Insiders and need a display server (CI uses `xvfb-run`); several completion tests fail locally against current Insiders builds, so a failure there is not necessarily yours. Snapshot output depends on the installed `marko` / `@marko/runtime-tags` versions, so pin the versions you reproduced against in the item. Many type-surface defects are really upstream in marko-js/marko (`packages/runtime-tags`); name the upstream authority in the item when the fix belongs there.
