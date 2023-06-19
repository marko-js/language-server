---
"@marko/language-server": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Fix issue where tags exposed from modules with "export maps" were not being discovered if their package.json file was not exported. (This now instead resolves relative to the marko.json file which should be listed in the export map).
