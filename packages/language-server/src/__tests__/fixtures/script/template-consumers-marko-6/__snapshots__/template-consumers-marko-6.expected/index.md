## Hovers
### Ln 1, Col 8
```marko
> 1 | import Counter from "./tags/counter.marko";
    |        ^ (alias) interface Counter
(alias) const Counter: Template
import Counter
  2 | //     ^?
  3 | import Generic from "./tags/generic.marko";
  4 | import JsTags from "./js/tags/js-tags.marko";
```

### Ln 8, Col 9
```marko
   6 |
   7 | export function consume(el: Element) {
>  8 |   const html = Counter.render({ start: 1 });
     |         ^ const html: Marko.RenderedTemplate
   9 |   //    ^?
  10 |   const mounted = Counter.mount({ start: 1 }, el);
  11 |   //    ^?
```

### Ln 10, Col 9
```marko
   8 |   const html = Counter.render({ start: 1 });
   9 |   //    ^?
> 10 |   const mounted = Counter.mount({ start: 1 }, el);
     |         ^ const mounted: Marko.MountedTemplate<Marko.TemplateInput<Input>, {
    value: number;
    valueChange(next: number): void;
}>
  11 |   //    ^?
  12 |   mounted.value = mounted.value + 1;
  13 |   //      ^?
```

### Ln 12, Col 11
```marko
  10 |   const mounted = Counter.mount({ start: 1 }, el);
  11 |   //    ^?
> 12 |   mounted.value = mounted.value + 1;
     |           ^ (property) value: number
  13 |   //      ^?
  14 |   const genericValue = Generic.mount({ value: "x" }, el).value;
  15 |   //    ^?
```

### Ln 14, Col 9
```marko
  12 |   mounted.value = mounted.value + 1;
  13 |   //      ^?
> 14 |   const genericValue = Generic.mount({ value: "x" }, el).value;
     |         ^ const genericValue: string
  15 |   //    ^?
  16 |   const jsName = JsTags.mount({ name: "x" }, el).value;
  17 |   //    ^?
```

### Ln 16, Col 9
```marko
  14 |   const genericValue = Generic.mount({ value: "x" }, el).value;
  15 |   //    ^?
> 16 |   const jsName = JsTags.mount({ name: "x" }, el).value;
     |         ^ const jsName: string
  17 |   //    ^?
  18 |   const jsGenericValue = JsGeneric.mount({ value: 1 }, el).value;
  19 |   //    ^?
```

### Ln 18, Col 9
```marko
  16 |   const jsName = JsTags.mount({ name: "x" }, el).value;
  17 |   //    ^?
> 18 |   const jsGenericValue = JsGeneric.mount({ value: 1 }, el).value;
     |         ^ const jsGenericValue: number
  19 |   //    ^?
  20 |   Counter.render;
  21 |   //      ^?
```

### Ln 20, Col 11
```marko
  18 |   const jsGenericValue = JsGeneric.mount({ value: 1 }, el).value;
  19 |   //    ^?
> 20 |   Counter.render;
     |           ^ (method) render(input: Marko.TemplateInput<Input>): Marko.RenderedTemplate
---
Render the template to a string.
  21 |   //      ^?
  22 |   Counter.mount;
  23 |   //      ^?
```

### Ln 22, Col 11
```marko
  20 |   Counter.render;
  21 |   //      ^?
> 22 |   Counter.mount;
     |           ^ (method) mount(input: Marko.TemplateInput<Input>, reference: Node, position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend"): Marko.MountedTemplate<Marko.TemplateInput<Input>, {
    value: number;
    valueChange(next: number): void;
}>
---
Render and attach the template to a DOM node.
  23 |   //      ^?
  24 |   Generic.render;
  25 |   //      ^?
```

### Ln 24, Col 11
```marko
  22 |   Counter.mount;
  23 |   //      ^?
> 24 |   Generic.render;
     |           ^ (method) render<T>(input: Marko.TemplateInput<Input<T>>): Marko.RenderedTemplate
---
Render the template to a string.
  25 |   //      ^?
  26 |   Generic.mount;
  27 |   //      ^?
```

### Ln 26, Col 11
```marko
  24 |   Generic.render;
  25 |   //      ^?
> 26 |   Generic.mount;
     |           ^ (method) mount<T>(input: Marko.TemplateInput<Input<T>>, reference: Node, position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend" | undefined): Marko.MountedTemplate<Marko.TemplateInput<Input<T>>, {
    value: T;
    valueChange(next: T): void;
}>
---
Render and attach the template to a DOM node.
  27 |   //      ^?
  28 |   JsGeneric.mount;
  29 |   //        ^?
```

### Ln 28, Col 13
```marko
  26 |   Generic.mount;
  27 |   //      ^?
> 28 |   JsGeneric.mount;
     |             ^ (method) mount<T>(input: Marko.TemplateInput<Input<T>>, reference: Node, position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend" | undefined): Marko.MountedTemplate<Marko.TemplateInput<Input<T>>, {
    value: T;
}>
---
Render and attach the template to a DOM node.
  29 |   //        ^?
  30 |   Counter.mount({ start: "bad" }, el);
  31 |   Generic.render({});
```

### Ln 36, Col 22
```marko
  34 | }
  35 |
> 36 | export declare const counterInput: Marko.Input<typeof Counter>;
     |                      ^ const counterInput: Input
  37 | //                   ^?
  38 | export declare const genericInput: Marko.Input<typeof Generic>;
  39 | //                   ^?
```

### Ln 38, Col 22
```marko
  36 | export declare const counterInput: Marko.Input<typeof Counter>;
  37 | //                   ^?
> 38 | export declare const genericInput: Marko.Input<typeof Generic>;
     |                      ^ const genericInput: Input<unknown>
  39 | //                   ^?
  40 | export declare const jsInput: Marko.Input<typeof JsTags>;
  41 | //                   ^?
```

### Ln 40, Col 22
```marko
  38 | export declare const genericInput: Marko.Input<typeof Generic>;
  39 | //                   ^?
> 40 | export declare const jsInput: Marko.Input<typeof JsTags>;
     |                      ^ const jsInput: Input
  41 | //                   ^?
  42 | export declare const counterReturn: Marko.Return<typeof Counter>;
  43 | //                   ^?
```

### Ln 42, Col 22
```marko
  40 | export declare const jsInput: Marko.Input<typeof JsTags>;
  41 | //                   ^?
> 42 | export declare const counterReturn: Marko.Return<typeof Counter>;
     |                      ^ const counterReturn: {
    value: number;
    valueChange(next: number): void;
}
  43 | //                   ^?
  44 | export const genericTemplate: Marko.Template<any, any> = Generic;
  45 | export const jsGenericTemplate: Marko.Template<any, any> = JsGeneric;
```

### Ln 51, Col 28
```marko
  49 | <Counter/countByName start=2/>
  50 | <${Counter}/countDynamic start=3/>
> 51 | <generic|item| value="x">${item}</generic>
     |                            ^ (parameter) item: string
  52 | //                         ^?
  53 | <${Generic}|item| value=1>${item}</>
  54 | //                          ^?
```

### Ln 53, Col 29
```marko
  51 | <generic|item| value="x">${item}</generic>
  52 | //                         ^?
> 53 | <${Generic}|item| value=1>${item}</>
     |                             ^ (parameter) item: number
  54 | //                          ^?
  55 | <JsTags/name name="x"/>
  56 | <div>${count} ${countByName} ${countDynamic} ${name}</div>
```

### Ln 56, Col 9
```marko
  54 | //                          ^?
  55 | <JsTags/name name="x"/>
> 56 | <div>${count} ${countByName} ${countDynamic} ${name}</div>
     |         ^ const count: number
  57 | //      ^?      ^?             ^?              ^?
  58 |
```

### Ln 56, Col 17
```marko
  54 | //                          ^?
  55 | <JsTags/name name="x"/>
> 56 | <div>${count} ${countByName} ${countDynamic} ${name}</div>
     |                 ^ const countByName: number
  57 | //      ^?      ^?             ^?              ^?
  58 |
```

### Ln 56, Col 32
```marko
  54 | //                          ^?
  55 | <JsTags/name name="x"/>
> 56 | <div>${count} ${countByName} ${countDynamic} ${name}</div>
     |                                ^ const countDynamic: number
  57 | //      ^?      ^?             ^?              ^?
  58 |
```

### Ln 56, Col 48
```marko
  54 | //                          ^?
  55 | <JsTags/name name="x"/>
> 56 | <div>${count} ${countByName} ${countDynamic} ${name}</div>
     |                                                ^ const name: string
  57 | //      ^?      ^?             ^?              ^?
  58 |
```

## Diagnostics
### Ln 30, Col 19
```marko
  28 |   JsGeneric.mount;
  29 |   //        ^?
> 30 |   Counter.mount({ start: "bad" }, el);
     |                   ^^^^^ Type 'string' is not assignable to type 'number'.
  31 |   Generic.render({});
  32 |   JsTags.mount({ name: 1 }, el);
  33 |   return [html, genericValue, jsName, jsGenericValue];
```

### Ln 31, Col 18
```marko
  29 |   //        ^?
  30 |   Counter.mount({ start: "bad" }, el);
> 31 |   Generic.render({});
     |                  ^^ Argument of type '{}' is not assignable to parameter of type 'TemplateInput<Input<unknown>>'.
  Property 'value' is missing in type '{}' but required in type 'Input<unknown>'.
  32 |   JsTags.mount({ name: 1 }, el);
  33 |   return [html, genericValue, jsName, jsGenericValue];
  34 | }
```

### Ln 32, Col 18
```marko
  30 |   Counter.mount({ start: "bad" }, el);
  31 |   Generic.render({});
> 32 |   JsTags.mount({ name: 1 }, el);
     |                  ^^^^ Type 'number' is not assignable to type 'string'.
  33 |   return [html, genericValue, jsName, jsGenericValue];
  34 | }
  35 |
```

### Ln 48, Col 10
```marko
  46 |
  47 | <counter/count start=1/>
> 48 | <counter start="bad"/>
     |          ^^^^^ Type 'string' is not assignable to type 'number'.
  49 | <Counter/countByName start=2/>
  50 | <${Counter}/countDynamic start=3/>
  51 | <generic|item| value="x">${item}</generic>
```

