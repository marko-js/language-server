---
"@marko/language-server": patch
---

Register file watchers with the client so on-disk changes to Marko-relevant files (imported components, TS modules, styles, tag definitions, tsconfig, and dependency manifests) invalidate the server's caches. Previously only VS Code — which watches these files client-side — stayed in sync; editors like Zed left intellisense stale until the server restarted.
