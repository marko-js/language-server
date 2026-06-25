---
"@marko/language-server": patch
---

Complete the tag name inside a shorthand import string (eg `import Foo from "<foo>"`) the same way an open tag name is completed: suggestions filter and sort on the bare tag name, are prioritized above TypeScript's module-specifier completions, and only add the closing `>` when it isn't already present.
