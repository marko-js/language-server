---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Fix incorrect diagnostic and mapping positions on Windows. File paths are now canonicalized to native separators before script extraction so the generated code (which embeds relative import paths for custom tags) is identical regardless of how the file name was spelled, and extracted snapshot caches now use canonicalized keys so cache eviction works when TypeScript and the file system disagree on path separators.
