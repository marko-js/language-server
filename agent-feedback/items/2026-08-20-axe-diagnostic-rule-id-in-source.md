---
type: bug
impact: med
effort: low
site: packages/language-server/src/service/html/index.ts › doValidate
---

# Publish the axe rule id as a diagnostic `code`, not inside the `source` string

Accessibility diagnostics are published with the rule id interpolated into `source` as `axe-core(<rule>)` and no `code`, so the one stable identifier a client could filter, suppress or look up is glued into a display string that also has to be parsed to recover it: an `<img>` with no alt arrives as `{"source":"axe-core(image-alt)","severity":3,"message":"Fix any of the following: ..."}`. TypeScript diagnostics from the script plugin carry `code: 2304`, so a client cannot treat the two uniformly, and "disable this rule on this line" cannot be built on top of what the server publishes today. The violation axe returns also carries `helpUrl`, which the `flatMap` over `violations` currently drops along with the rest of the rule metadata, so `source: "axe-core"`, `code: ruleId` and `codeDescription: { href: helpUrl }` are all available at that same line. Marko's own parse diagnostics have the same gap, but the compiler's `Diagnostic` interface (`type`, `label`, `loc`, `fix`) has no id to forward, so giving those a code needs an upstream field in marko-js/marko first.

Check: `didOpen` a template containing `<img src="x.png">` and read the published diagnostic; today it is `{"source":"axe-core(image-alt)"}` with no `code`, and it should be `{"source":"axe-core","code":"image-alt"}` with a `codeDescription.href` pointing at the rule's help page.
