---
type: bug
impact: med
effort: med
site: packages/language-server/src/ts-plugin/index.ts › init
---

# List a script name's uses inside Marko templates in the TypeScript plugin's references

In VS Code, references asked from a `.ts` file go to tsserver with this plugin loaded, and for a name a Marko file imports and uses in its template the answer holds the Marko file's import line but not the uses in the template body. The language server's own TypeScript service, given the same files, returns both, so the gap is in how the plugin's program or its result mapping handles template code, not in the extraction. Scripts are where shared helpers live, so "find all references" and rename from them silently miss every template that calls them. Compare what the plugin's language service answers for `findReferences` against the language server's for the same project, and map template locations back the way the server does.

Check: in the extension's VS Code test setup (tsserver 6.0.3 with the plugin), a project of `format.ts` (`export function plural(count: number, noun: string) { return noun; }`), `main.marko` and `other.marko` (each `import { plural } from "./format";` then `<p>${plural(1, "x")}</p>`): `vscode.executeReferenceProvider` at `plural` in `format.ts` returns `main.marko:1:10` and `other.marko:1:10` (the imports) but not `main.marko:3:6` / `other.marko:3:9` (the template calls).
