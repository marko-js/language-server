---
"@marko/language-tools": minor
"@marko/language-server": minor
---

Take child templates into account in the accessibility linter, and enable page-scoped rules for fully static documents.

The linter also validates faster: axe now runs against happy-dom instead of jsdom (which also drops jsdom's bundling patches), skips result-selector generation, skips subtrees that cannot anchor a diagnostic, and reuses child template extractions across edits until one of their source files actually changes.
