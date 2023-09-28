---
"@marko/type-check": major
---

Switch to using the build mode for the TypeScript compiler.
This allows using [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) and incremental compilation.

This change now requires that mtc output at least the files for caching and so the `--emit` flag has been removed and enabled by default.
