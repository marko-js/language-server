---
type: bug
impact: med
effort: med
site: packages/language-server/src/service/marko/validate.ts › compilerConfig
---

# Surface the compiler's analyze-time errors in the editor, not only parse and migrate errors

`compilerConfig` compiles with `output: "migrate"` and `errorRecovery: true`, so `getMarkoDiagnostics` never reaches the translator's analyze stage, which is where Marko 6 core tags reject malformed tag shapes. `<for|a,b,c| of=[1]>${a}</for>`, `<html-comment foo=1>hi</html-comment>`, `<let value=1/>` and `<await/x=Promise.resolve(1)>hi</await>` each get no Marko diagnostic in the editor. Of the four, the extracted TypeScript reports only the `<html-comment>` attribute (the `<for>` gets unused-parameter hints), so for the other three the first real error is a framed CompileError from the build. Direction: compile through analyze (for example `output: "html"` with `code: false`) and keep the code-action provider on the same config so fix indices still line up. This depends on marko-js/marko skipping translate once parse or analyze has recorded an error under `errorRecovery` (`packages/compiler/src/babel-plugin/index.js` › `getMarkoFile`). Until then, the same `<let value=1/>` compiled that way throws `Cannot read properties of undefined (reading 'extra')` instead of returning its diagnostic.

Check: in marko-js/marko, write a `./x.tmp.mjs` at the repo root that runs `compileSync(src, "/abs/x.marko", { translator: "@marko/runtime-tags/translator", code: false, output: "migrate", errorRecovery: true, babelConfig: { babelrc: false, configFile: false } })` for each of the four templates, and run it with `node -r ~ts`. Each returns `meta.diagnostics` with length 0. The same sources compiled with `output: "dom"` and no `errorRecovery` each throw; for the `<for>` one the error says the tag "only provides `|item, index|` with `of=`". A language-server fixture `script/<name>/tags/` holding the four templates gets no Marko diagnostic from `pnpm run test:server`.
