---
"@marko/language-server": patch
---

Clear caches only when a watched file is created or deleted, or a `marko.json`, `marko-tag.json`, `package.json`, `tsconfig.json`, `jsconfig.json` or lockfile changes, instead of on every save. A document's cached parse is now freed along with the document.
