---
type: bug
impact: med
effort: low
site: packages/language-server/src/service/script/index.ts › getTSProject
---

# Search every Marko file the tsconfig includes for references and rename asked from a Marko file

The TypeScript program `getTSProject` builds holds the config's `.ts` files (`potentialGlobalFiles`), the open documents and what they import, so `findReferences`, `prepareRename` and `doRename` asked from a `.marko` document never see a closed Marko file that nothing open imports: its uses are missing from the list, and a rename leaves them unrenamed. It reproduces in VS Code, where references and rename on a `.marko` document come only from this server (the extension's TypeScript plugin entry declares no `languages`). Inside tsserver the TypeScript plugin's `getExternalFiles` makes every Marko file a root; the language server could do the same on the first references or rename query from a Marko file and keep them, so sessions of only diagnostics, completion and hover keep the smaller program.

Check: in a directory with its own `tsconfig.json`, `format.ts` (`export function plural(count: number, noun: string) { return noun; }`), `index.marko` and `other.marko` (each `import { plural } from "./format";` then `<p>${plural(1, "x")}</p>`), `didOpen` only `index.marko` and ask `textDocument/references` (or `textDocument/rename`) at its `plural(`; the answer has `format.ts` and `index.marko` but nothing in `other.marko`.
