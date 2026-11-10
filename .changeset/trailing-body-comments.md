---
"@marko/language-tools": patch
---

Stop writing a comment that ends a tag's body into the next tag's generated code, where a trailing `// @ts-ignore` or `// @ts-expect-error` applied to that tag.
