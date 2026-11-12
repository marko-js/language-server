---
"@marko/language-server": patch
"marko-vscode": patch
---

Check accessibility with jsdom 31, which reads CSS with its own engine instead of css-tree: the extension's server bundle is 1.3 MB smaller. jsdom 31 declares Node `^22.22.2 || ^24.15.0 || >=26`; the extension still runs on the Node 22.22.1 of VS Code 1.116.
