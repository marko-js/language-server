---
"@marko/language-server": minor
"@marko/language-tools": patch
"marko-vscode": minor
---

Add semantic token support (`textDocument/semanticTokens` full and range). Custom component tags stop looking like native HTML — `<my-button>` and `<MyButton>` both render in the component/type color, matching how `.tsx` files color `<MyComponent/>`, while `<div>` keeps its tag color. Core tags the grammar doesn't recognize (`<attrs>`, `<effect>`, `<macro>`) pick up core-tag coloring, and identifiers in placeholders, attribute values, tag params/vars, and `static`/`server`/`class` blocks are colored from TypeScript's view of the code. Core-tag detection is now shared with tag-name completions, which as a side effect improves completion documentation for core tags resolved through nested `node_modules`.
