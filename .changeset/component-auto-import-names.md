---
"@marko/language-tools": patch
---

Name the default export of auto-discoverable Marko components (files under a `components`/`tags` directory) after the tag, so auto-imports read `import MyButton from "..."` instead of TypeScript's file-derived `MyButtonMarko` (and `Foo` instead of `index` for `foo/index.marko`).
