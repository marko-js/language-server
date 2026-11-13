## Hovers
### Ln 8, Col 16
```marko
   6 |
   7 | export function consume(el: Element) {
>  8 |   ClassCounter.render;
     |                ^ (method) render(input: Marko.TemplateInput<Input>, streamOrCallback?: {
    write: (chunk: string) => void;
    end: (chunk?: string) => void;
} | ((err: Error | null, result: Marko.RenderResult<Marko.Component>) => void)): Marko.Out<Marko.Component>
---
Asynchronously render the template, to a stream or (with a callback) in buffered mode.
   9 |   //           ^?
  10 |   ClassCounter.renderSync;
  11 |   //           ^?
```

### Ln 10, Col 16
```marko
   8 |   ClassCounter.render;
   9 |   //           ^?
> 10 |   ClassCounter.renderSync;
     |                ^ (method) renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Marko.Component>
---
Synchronously render the template.
  11 |   //           ^?
  12 |   ClassCounter.renderToString;
  13 |   //           ^?
```

### Ln 12, Col 16
```marko
  10 |   ClassCounter.renderSync;
  11 |   //           ^?
> 12 |   ClassCounter.renderToString;
     |                ^ (method) renderToString(input: Marko.TemplateInput<Input>): string
---
Synchronously render a template to a string.
  13 |   //           ^?
  14 |   ClassCounter.stream;
  15 |   //           ^?
```

### Ln 14, Col 16
```marko
  12 |   ClassCounter.renderToString;
  13 |   //           ^?
> 14 |   ClassCounter.stream;
     |                ^ (method) stream(input: Marko.TemplateInput<Input>): ReadableStream<string> & NodeJS.ReadableStream
---
Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment.
  15 |   //           ^?
  16 |   ClassCounter.mount;
  17 |   //           ^?
```

### Ln 16, Col 16
```marko
  14 |   ClassCounter.stream;
  15 |   //           ^?
> 16 |   ClassCounter.mount;
     |                ^ (method) mount(input: Marko.TemplateInput<Input>, reference: Node, position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend"): Marko.MountedTemplate<Marko.TemplateInput<Input>, void>
---
Render and attach the template to a DOM node.
  17 |   //           ^?
  18 |   ClassCounter.createOut;
  19 |   //           ^?
```

### Ln 18, Col 16
```marko
  16 |   ClassCounter.mount;
  17 |   //           ^?
> 18 |   ClassCounter.createOut;
     |                ^ (method) createOut(): Marko.Out
---
Creates a Marko compatible output stream.
  19 |   //           ^?
  20 |   const component = ClassCounter.renderSync({ start: 1 }).getComponent();
  21 |   //    ^?
```

### Ln 20, Col 9
```marko
  18 |   ClassCounter.createOut;
  19 |   //           ^?
> 20 |   const component = ClassCounter.renderSync({ start: 1 }).getComponent();
     |         ^ const component: Marko.Component<unknown, unknown>
  21 |   //    ^?
  22 |   TagsCounter.renderSync;
  23 |   //          ^?
```

### Ln 22, Col 15
```marko
  20 |   const component = ClassCounter.renderSync({ start: 1 }).getComponent();
  21 |   //    ^?
> 22 |   TagsCounter.renderSync;
     |               ^ (method) renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Marko.Component>
---
Synchronously render the template.
  23 |   //          ^?
  24 |   TagsCounter.mount;
  25 |   //          ^?
```

### Ln 24, Col 15
```marko
  22 |   TagsCounter.renderSync;
  23 |   //          ^?
> 24 |   TagsCounter.mount;
     |               ^ (method) mount(input: Marko.TemplateInput<Input>, reference: Node, position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend"): Marko.MountedTemplate<Marko.TemplateInput<Input>, {
    value: number;
}>
---
Render and attach the template to a DOM node.
  25 |   //          ^?
  26 |   ClassGeneric.render;
  27 |   //           ^?
```

### Ln 26, Col 16
```marko
  24 |   TagsCounter.mount;
  25 |   //          ^?
> 26 |   ClassGeneric.render;
     |                ^ (method) render<T>(input: Marko.TemplateInput<Input<T>>, streamOrCallback?: {
    write: (chunk: string) => void;
    end: (chunk?: string) => void;
} | ((err: Error | null, result: Marko.RenderResult<Marko.Component>) => void) | undefined): Marko.Out<Marko.Component<unknown, unknown>>
---
Asynchronously render the template, to a stream or (with a callback) in buffered mode.
  27 |   //           ^?
  28 |   ClassGeneric.renderSync;
  29 |   //           ^?
```

### Ln 28, Col 16
```marko
  26 |   ClassGeneric.render;
  27 |   //           ^?
> 28 |   ClassGeneric.renderSync;
     |                ^ (method) renderSync<T>(input: Marko.TemplateInput<Input<T>>): Marko.RenderResult<Marko.Component<unknown, unknown>>
---
Synchronously render the template.
  29 |   //           ^?
  30 |   ClassGeneric.createOut;
  31 |   //           ^?
```

### Ln 30, Col 16
```marko
  28 |   ClassGeneric.renderSync;
  29 |   //           ^?
> 30 |   ClassGeneric.createOut;
     |                ^ (method) createOut(): Marko.Out
---
Creates a Marko compatible output stream.
  31 |   //           ^?
  32 |   TagsGeneric.mount;
  33 |   //          ^?
```

### Ln 32, Col 15
```marko
  30 |   ClassGeneric.createOut;
  31 |   //           ^?
> 32 |   TagsGeneric.mount;
     |               ^ (method) mount<T>(input: Marko.TemplateInput<Input<T>>, reference: Node, position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend" | undefined): Marko.MountedTemplate<Marko.TemplateInput<Input<T>>, {
    value: T;
}>
---
Render and attach the template to a DOM node.
  33 |   //          ^?
  34 |   JsCounter.renderSync;
  35 |   //        ^?
```

### Ln 34, Col 13
```marko
  32 |   TagsGeneric.mount;
  33 |   //          ^?
> 34 |   JsCounter.renderSync;
     |             ^ (method) renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Marko.Component>
---
Synchronously render the template.
  35 |   //        ^?
  36 |   ClassCounter.renderToString({ start: "bad" });
  37 |   ClassCounter.renderSync({});
```

### Ln 47, Col 22
```marko
  45 | export const classTemplate: Marko.Template = ClassCounter;
  46 | export const genericTemplate: Marko.Template<any, any> = ClassGeneric;
> 47 | export declare const tagsReturn: Marko.Return<typeof TagsCounter>;
     |                      ^ const tagsReturn: {
    value: number;
}
  48 | //                   ^?
  49 |
```

## Diagnostics
### Ln 36, Col 33
```marko
  34 |   JsCounter.renderSync;
  35 |   //        ^?
> 36 |   ClassCounter.renderToString({ start: "bad" });
     |                                 ^^^^^ Type 'string' is not assignable to type 'number'.
  37 |   ClassCounter.renderSync({});
  38 |   ClassGeneric.render({ value: 1 }, { write() {}, end() {} });
  39 |   ClassGeneric.render({ value: 1 }, (err, result) => result.getComponent());
```

### Ln 37, Col 27
```marko
  35 |   //        ^?
  36 |   ClassCounter.renderToString({ start: "bad" });
> 37 |   ClassCounter.renderSync({});
     |                           ^^ Argument of type '{}' is not assignable to parameter of type 'TemplateInput<Input>'.
  Property 'start' is missing in type '{}' but required in type 'Input'.
  38 |   ClassGeneric.render({ value: 1 }, { write() {}, end() {} });
  39 |   ClassGeneric.render({ value: 1 }, (err, result) => result.getComponent());
  40 |   TagsCounter.mount({ start: "bad" }, el);
```

### Ln 39, Col 38
```marko
  37 |   ClassCounter.renderSync({});
  38 |   ClassGeneric.render({ value: 1 }, { write() {}, end() {} });
> 39 |   ClassGeneric.render({ value: 1 }, (err, result) => result.getComponent());
     |                                      ^^^ 'err' is declared but its value is never read.
  40 |   TagsCounter.mount({ start: "bad" }, el);
  41 |   JsCounter.renderToString({});
  42 |   return component;
```

### Ln 40, Col 23
```marko
  38 |   ClassGeneric.render({ value: 1 }, { write() {}, end() {} });
  39 |   ClassGeneric.render({ value: 1 }, (err, result) => result.getComponent());
> 40 |   TagsCounter.mount({ start: "bad" }, el);
     |                       ^^^^^ Type 'string' is not assignable to type 'number'.
  41 |   JsCounter.renderToString({});
  42 |   return component;
  43 | }
```

### Ln 41, Col 28
```marko
  39 |   ClassGeneric.render({ value: 1 }, (err, result) => result.getComponent());
  40 |   TagsCounter.mount({ start: "bad" }, el);
> 41 |   JsCounter.renderToString({});
     |                            ^^ Argument of type '{}' is not assignable to parameter of type 'TemplateInput<Input>'.
  Property 'start' is missing in type '{}' but required in type 'Input'.
  42 |   return component;
  43 | }
  44 |
```

