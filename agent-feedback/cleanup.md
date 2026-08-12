# Cleanup

Duplication, dead code, inconsistencies, refactor opportunities. Format and rules: [README.md](README.md).

## Plumb the source node (or tag kind) through `getProgramBindings`

`packages/language-tools/src/extractors/script/util/attach-scopes.ts` › `getProgramBindings` | 2026-07-30 | impact:low | effort:med

`ProgramBinding` exposes only `{ name, sources }` (plus mutation info), dropping the declaring node/tag. This makes it impossible for the script extractor's program-level hoist emission (`packages/language-tools/src/extractors/script/index.ts` › `#writeProgram`) to treat any tag kind specially — e.g. declaring a `<style/styles>` CSS-module var with its statically known selector type at program scope instead of routing it through `Marko._.hoist`. If per-tag-kind program-level typing is ever wanted, the binding needs to carry its `Node.Tag` (or at least the tag name). Re-verify: inspect the `ProgramBinding` interface in attach-scopes.ts and confirm it has no node reference.
