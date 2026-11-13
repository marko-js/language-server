---
"marko-vscode": patch
---

Highlight like htmljs-parser 5.21: a spaced non-null `!` ends an attribute value (`a=x ! b`), a value continues past leading comments (`x=/* note */ 1`), `<!--->` is a whole comment, and a `/` after a keyword like `typeof` starts a regular expression.
