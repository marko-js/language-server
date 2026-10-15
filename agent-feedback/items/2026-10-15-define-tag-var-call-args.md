---
type: bug
impact: high
effort: med
site: packages/language-tools/marko.internal.d.ts › DynamicRenderer
---

# Type a `<define>` tag var call's arguments against the define's params

A `<define>` tag var is a tags API value holding `content`, but `DynamicRenderer` only matches the default body key of the Marko 5 types (`renderBody`), and `ContentFor` keys a call's body as `renderBody`, so a call to a define falls to `DefaultRenderer`: one unconstrained parameter. Two or more arguments, or arguments plus a body or attribute tags, report `TS2554 Expected 1 arguments`, and a single argument is never checked against the define's param. The same happens through a dynamic tag whose value may be a define (`<${input.other ? Other : Item}(n)>`, or a union with a native tag name). Direction: have `DynamicRenderer` strip `undefined`/`null`/`false` before choosing a renderer and type each union member by the body it renders (a body, a `content` value, or a template or native name taking its input), and key the body as `content` in `ContentFor` when any member is a tags API template or value.

Check: add a `packages/language-server/src/__tests__/fixtures/script/<name>/index.marko` holding

```marko
<let/n=1/>
<define/One|v: number|><b>${v}</b></define>
<One("not a number")/>
<define/Two|a: number, b: string|><b>${a}${b}</b></define>
<Two(n, "s")/>
<define/Item|label: number, rest: { content: Marko.Body }|><span>${label}:<${rest.content}/></span></define>
<Item(n)>body</Item>
```

and run `pnpm exec mocha './src/**/__tests__/*.test.ts' --update -g <name>` in `packages/language-server`: the generated `index.md` reports `Expected 1 arguments, but got 2` on `<Two(n, "s")/>` and `<Item(n)>` and nothing on `<One("not a number")/>`; it should report only that `"not a number"` is not a `number`.
