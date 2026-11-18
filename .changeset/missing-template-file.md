---
"@marko/language-tools": patch
"@marko/language-server": patch
---

Report a tag whose taglib names a file that does not exist (eg a `types` path in `marko.json`) with TypeScript's "Cannot find module" at the tag, in the editor too, where it was not reported.
