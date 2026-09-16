---
"@marko/type-check": patch
---

Mark imports that resolve to a pre-built `.d.marko` file as external library imports. Previously, when tag discovery or a relative import surfaced a dependency's `.d.marko` as a filesystem path (pnpm workspaces, `node_modules/.pnpm` paths), TypeScript treated the file as project source and reported TS6307 ("not listed within the file list") and TS6059 ("not under rootDir").
