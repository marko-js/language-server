---
"marko-vscode": patch
---

Highlight concise lines the way the parser now reads them: a line starting with `;` is empty (only comments may follow it), one starting with `[` is an attribute group after an empty tag name, and one starting with `-` and a word character (eg `-if`) is a tag whose name starts with `-`.
