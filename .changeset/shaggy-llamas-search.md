---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Fix several smaller Windows path handling issues: auto import completion details no longer show absolute paths, go to definition for tags declared in a `marko.json` now jumps to the tag's entry, and tags discovered from npm packages show their package documentation again. Also fix taglib cache invalidation not firing for `marko.json` changes (only `marko-tag.json`) and a stateful regex that could flip the default script language between projects.
