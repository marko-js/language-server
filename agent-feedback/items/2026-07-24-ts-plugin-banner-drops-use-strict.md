---
type: bug
impact: low
effort: low
site: packages/ts-plugin/build.mts › build
---

# Keep the `"use strict"` prologue when injecting the `import.meta.url` banner

The `banner.js` that defines `_importMetaUrl` is emitted above esbuild's own `"use strict"`, so that string is no longer a directive prologue and the bundle runs in sloppy mode. The same applies to all three `packages/vscode/dist/*.js` bundles, which share the pattern via `packages/vscode/build.mts`. Bundled TS rarely depends on strict semantics, so nothing is known to break today, but silently dropping strict mode is not what either build intends. Fix by prefixing the banner with `"use strict";\n`, as `packages/language-tools/build.mts` does.

Check: `head -2 packages/ts-plugin/dist/index.js` shows the `const` on line 1 and `"use strict";` on line 2.
