---
type: perf
impact: med
effort: med
site: packages/language-tools/marko.internal.d.ts › BodyRenderer
---

# Cut the per-call cost of a body whose only parameter is an object

Every call to a body with exactly one object parameter, which is how a `<define>` with attributes (`<define/Card|{ title }: { title: string }|>`) and an `input.content: Marko.Body<[{ ... }]>` are typed, costs about 1,150 type instantiations, against about 70 when the same body takes an optional second parameter. TypeScript relates the unlabeled tuple it infers for `__marko_internal_input` from the call's arguments to the body's labeled parameter tuple (`[input: { title: string }]`); the two tuple targets differ, so it compares them member by member across every `Array` method, and it does so per call because each call's argument type is fresh. Moving the same signature out of the generic `BodyRenderer<Body>` interface into a non-generic declaration makes it cheap, as does a non-intersected nested conditional (`[P] extends [I] ? ([I] extends [P] ? I : P) : P`) outside the interface, so the direction is to keep the arguments tuple from being related to the labeled parameter tuple inside the generic signature (eg infer the input object rather than the whole arguments tuple) while keeping the excess-property and wider-argument checks `Relate` gives today.

Check: with `marko.internal.d.ts` and `@marko/runtime-tags`' `index.d.ts` as root files, type-check a `.ts` file declaring `declare const A: { content: (input: { a: number }) => typeof Marko._.voidReturn }` followed by 60 lines of `Marko._.renderDynamicTag(A)()()({ a: 1 });`: `tsc --extendedDiagnostics` reports about 70,000 instantiations; with `(input: { a: number }, b?: number)` it reports about 4,200.
