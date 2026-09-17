---
"@marko/type-check": patch
---

Fix TS6059/TS6307 errors when a component resolves to a `.d.marko` file outside the project (such as a sibling workspace package) by treating it as a declaration file.
