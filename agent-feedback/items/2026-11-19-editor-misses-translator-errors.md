---
type: bug
impact: med
effort: med
site: packages/language-server/src/service/marko/validate.ts › compilerConfig
---

# Report the translator's errors in the editor, not only the `migrate` stage's

`getMarkoDiagnostics` compiles with `output: "migrate"`, which stops before the translator analyzes the template, so the editor shows nothing for templates that fail to build: `<if(open)>` ("Tag does not support arguments"), a bare top-level `function` ("Unable to find entry point for custom tag `<function>`") and Tags API `key=` ("did you mean `<for by>`?") are only reported from `output: "html"` or `"dom"`. `mtc` reports them by compiling each template to `html` after the TypeScript build (`packages/type-check/src/run.ts` › `run`). The code actions index into the same diagnostics, so moving `compilerConfig` to `html` needs them to keep lining up, or a second `html` compile for errors only.

Check: in a Marko 6 project, `Project.getCompiler(dir).compileSync(src, file, { ...Project.getConfig(dir), ...compilerConfig }).meta.diagnostics` for `<let/open=false>` then `<if(open)>hi</if>` is `[]`; the same with `output: "html"` has the "Tag does not support arguments" error.
