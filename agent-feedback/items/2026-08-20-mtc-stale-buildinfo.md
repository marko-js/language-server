---
type: bug
impact: high
effort: med
site: packages/type-check/src/run.ts › requiredTSCompilerOptions
---

# Stop serving stale diagnostics out of the `tsconfig.tsbuildinfo` `mtc` forces onto a `noEmit` project

`requiredTSCompilerOptions` forces `composite` and `incremental` over the project's own options, so `mtc` drops a `tsconfig.tsbuildinfo` next to a tsconfig whose author never asked for one and the next run re-serves the cached per-file semantic diagnostics. `@marko/run` writes `.marko-run/routes.d.ts` as a bag of module augmentations (`declare module "../src/routes/+page.marko"`) that nothing imports, so TypeScript's builder finds no reverse edge from it to any `.marko` file and keeps the previous run's errors after the route types are regenerated: `Run.href("/employees")` reports `Argument of type '"/employees"' is not assignable to parameter of type '"/"'` on a tree that builds and runs. The only cure is `rm tsconfig.tsbuildinfo`, which appears in no documentation and is defeated by the `*.tsbuildinfo` line in every starter `.gitignore`, so a fresh clone that lints before it builds is stuck. Either skip the `tsconfig.tsbuildinfo` write when the resolved config says `noEmit`, or mark the `markoRunGeneratedTypesFile` root that `packages/language-tools/src/processors/marko.ts` › `getRootNames` adds as globally affecting so a rewrite invalidates every file.

Check: in an app scaffolded from marko-js/examples `examples/app`, put `<a href=Run.href("/employees")>` in `src/routes/+page.marko`, then `marko-run build && mtc` (errors, writes `tsconfig.tsbuildinfo`), add `src/routes/employees/+page.marko`, and `marko-run build && mtc` again; today it repeats the same `not assignable to parameter of type '"/"'` error and should report nothing, as it does after `rm tsconfig.tsbuildinfo`.
