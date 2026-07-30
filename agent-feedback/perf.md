# Performance

Runtime speed and bundle size opportunities. Format and rules: [README.md](README.md).

## Tag-var hoisting is unconditional — no reference analysis

`packages/language-tools/src/extractors/script/util/attach-scopes.ts` › `attachScopes` | 2026-07-30 | impact:low | effort:high

Every tag-var binding is pushed to `potentialHoists` unconditionally, and every nested tag var whose walk reaches program scope becomes a `HoistedBinding` — whether or not anything outside its section references it. Each such binding costs a program-level `Marko._.hoist(...)` const plus `readScope`/`readScopes` machinery in the extracted TS, which the TypeScript checker must then evaluate per template. A reference-aware pass (only hoist names actually referenced outside their declaring scope) would shrink extracted output and checker work on templates with many tag vars. Re-verify: extract any template with a tag var inside an `<if>` that is never referenced elsewhere and observe the emitted `hoist`/`readScope` code.
