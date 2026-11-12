---
type: cleanup
impact: low
effort: low
site: packages/language-server/src/__tests__/util/language-service.ts › createLanguageService
---

# Delete the unused `@typescript/vfs` test helper and its dependency

`createLanguageService` is the only importer of `@typescript/vfs`, and nothing imports it. The dependency is declared in `packages/language-tools/package.json`, not in language-server where the helper lives, so the import only resolves through hoisting. Delete the helper and drop `@typescript/vfs` from language-tools' devDependencies (it is a devDependency upgraded with every tooling bump for no use).

Check: `grep -rn "util/language-service" packages/*/src` finds nothing; `grep -rn "@typescript/vfs" packages --include=*.ts` finds only the helper.
