---
type: bug
impact: high
effort: med
site: packages/language-server/src/service/script/index.ts › doValidate
---

# Offer the TypeScript quick fixes for the diagnostics the script plugin publishes

The script plugin publishes the full TypeScript diagnostic set out of `doValidate` -- `[script/2552] Cannot find name 'formatName'. Did you mean 'FormData'?`, `[script/6133] 'VERSION' is declared but its value is never read` -- but it implements no `doCodeActions`, so `textDocument/codeAction` answers `null` for every one of them, at the diagnostic's own range, over the whole document, with `only: ["quickfix"]` and with `only: ["source.fixAll.marko"]` alike. The server advertises `codeActionProvider` with `markoCodeActionKinds`, and that promise is kept only by `service/marko/code-actions.ts` (diagnostics that carry a Marko-compiler `fix`) and by the style plugin inside a `<style>` block, so in an ordinary `.marko` file the editor shows "No code actions available" and auto-import -- the most-used action in a TypeScript codebase -- does not exist. `ts.LanguageService.getCodeFixesAtPosition` is already reachable through the same `getTSProject`/`processScript` pair the plugin's `doComplete` and `doHover` use, and the generated-to-source mapping needed to translate the edits back is the same one `doRename` already applies.

Check: `didOpen` a `.marko` file that calls an un-imported export of a sibling `util.ts`, wait for the published `[script/2552]`, then request `textDocument/codeAction` at that diagnostic's range; today the result is `null` and it should contain the TypeScript "Add import from './util'" fix.
