---
type: unclear
impact: low
effort: low
site: AGENTS.md › Test
---

# List every package with a mocha test script in AGENTS.md

The root `AGENTS.md` Test section says "Only two packages have tests" (language-server and vscode) and headings language-tools as "bench only". In fact `@marko/language-tools` and `@marko/type-check` both run `mocha './src/**/__tests__/*.test.ts'` from `pnpm test`, so an agent looking for a guard-test family skips their unit tests and reaches for a language-server fixture instead. List all four tested packages in that section, and mention the language-tools/type-check unit tests in the "Guard tests" note of `agent-feedback/README.md`, which names only the language-server fixtures.

Check: `grep -n '"test"' packages/*/package.json` lists language-server, language-tools, type-check and vscode.
