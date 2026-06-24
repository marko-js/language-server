---
"@marko/language-server": minor
---

Surface Marko compiler diagnostic fixes as in-editor code actions. Compiler plugins can attach a `fix` to a diagnostic (an in-place AST edit, e.g. the `data` -> `input` migration), and the language server now offers these as:

- per-diagnostic `quickfix` actions, and
- a batched `source.fixAll.marko` source action that applies every auto-fixable issue in a single compile pass — so it plugs into VS Code's "Fix All" command and `editor.codeActionsOnSave`.

Applying a fix re-runs the compiler asking it to apply the relevant fix(es), reprints the result, formats it with prettier, and produces a minimal text edit so the rest of the document is left untouched. Edits are resolved lazily via `codeAction/resolve` (when the client supports it) and the diagnostics compile is shared with validation, so nothing extra is compiled until a fix is actually used.
