---
"@marko/language-server": patch
"marko-vscode": patch
---

VSCode has a regression which causes all intelisense to break after a completion with a multi choice snippet is provided. The language server currently uses that to provide completions for attributes defined with an `enum` value. To resolve this issue, enum completions are simplified to not provide the choice based completion until this is resolved in vscode or another workaround is found.
