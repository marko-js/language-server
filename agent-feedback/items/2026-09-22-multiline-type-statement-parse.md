---
type: bug
impact: med
effort: med
site: packages/language-tools/src/extractors/script/util/script-parser.ts › ScriptParser
---

# Parse multi-line top-level type declarations in .marko files

A top-level `interface` or `type` statement in a `.marko` file only parses when everything up to its opening `{` sits on one line. `export interface X\n  extends\n    Omit<Base, "a">\n{ ... }` (the `{` on its own line) reports a position-less `TS1005 ',' expected`, and `type Y = Omit<\n  Base,\n  "a" | "b"\n>;` reports a cascade of `TS1005` (`','`/`':' expected`) pointing into the union members — both are valid TypeScript that Prettier happily produces, so any formatted declaration wide enough to wrap breaks the template. The statement splitter appears to end the declaration at a newline instead of tracking bracket/generic depth. The workaround is keeping the header on a single line regardless of length, which fights formatters.

Check: type-check a `.marko` file containing `type Y = Omit<\n  { a?: string; b?: string },\n  "a" | "b"\n>;` above any tag; `mtc` reports cascading `TS1005` today and should report nothing.
