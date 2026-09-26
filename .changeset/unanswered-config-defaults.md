---
"@marko/language-server": patch
"marko-vscode": patch
---

Keep script completions working for clients that do not answer `workspace/configuration` requests, falling back to the default preferences instead of failing the completion.
