---
"@marko/language-server": patch
---

Fix the path in a custom tag's "discovered from" hover, which was computed against the importing file instead of its directory. A sibling `counter.marko` showed as `../counter.marko`; it now reads `counter.marko`.
