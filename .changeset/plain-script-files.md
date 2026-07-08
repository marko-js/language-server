---
"@marko/language-server": patch
---

Handle standalone `.ts`/`.js` files in the script service. A non-Marko script file was previously run through Marko extraction, so its diagnostics, hover and completion were dropped or mispositioned. Plain script files are now mapped one-to-one to the TypeScript language service, letting an embedder without a native TypeScript service (eg the in-browser playground) get language features for them.
