---
type: bug
impact: med
effort: med
site: packages/language-tools/marko.internal.d.ts › InputFor
---

# Type dynamic attribute tags against the input object that follows a tag's arguments

`InputFor` reads a body's first parameter (`Args[0]`) as its input, but when a tag is called with arguments (`<Row(n)>`) the runtime passes them positionally and the attributes, body and attribute tags as the trailing object after them, so for `<define/Row|label: number, rest: { row: Marko.AttrTag<{ content: Marko.Body }> }|>` the input is `rest`, not `label`. Attribute tags written under `<for>` or `<if>` inside such a call are typed through `Marko._.attrTagFor`/`Marko._.input`, which use `InputFor`, so they are checked against `number` and report false errors; static attribute tags are unaffected because they are written inline into the trailing object. The extractor knows the argument count at the call (`#getTagInputType`), so it can select the parameter after the arguments.

Check: type-check `<define/Row|label: number, rest: { row: Marko.AttrTag<{ content: Marko.Body }> }|><em>${label}<${rest.row}/></em></define>` followed by `<Row(1)><for|i| of=[1, 2]><@row>${i}</@row></for></Row>` against `@marko/runtime-tags` 6.3.53: it reports `Spread types may only be created from object types` on the `<for>` and `... is not assignable to type 'number'` on the `<@row>`, and should report neither (the same body without `label` and called as `<Row>` reports only that `row` may be undefined).
