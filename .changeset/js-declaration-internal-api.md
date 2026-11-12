---
"@marko/language-tools": patch
"@marko/type-check": patch
---

Leave the internal `__marko_internal_api` export out of the `.d.marko` that `mtc` writes for a JavaScript template, as for a TypeScript one. It was printed as `export { __marko_internal_api as ~api };`, which does not parse, so a package built from JavaScript templates shipped broken declarations.
