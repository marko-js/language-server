---
"@marko/language-tools": patch
---

Fix `getComponentName` leaving a trailing `]` in the generated identifier when a component file has a bracketed variant suffix (e.g. `my-button[variant].marko`). The stray `]` produced invalid TypeScript (`const MyButtonVariant] = new …`) which caused TS1005/TS1134/TS1389 parse errors.
