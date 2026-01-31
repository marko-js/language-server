## Diagnostics
### Ln 6, Col 4
```marko
  4 |
  5 | <test-tag>
> 6 |   <@item x=1>
    |    ^^^^^ Type 'AttrTag<{ x: number; renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }> | AttrTag<{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }>' is not assignable to type 'AttrTag<{ x: number; renderBody?: Body<[], void> | undefined; }>'.
  Type 'AttrTag<{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }>' is not assignable to type 'AttrTag<{ x: number; renderBody?: Body<[], void> | undefined; }>'.
    Property 'x' is missing in type 'AttrTag<{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }>' but required in type '{ x: number; renderBody?: Body<[], void> | undefined; }'.
  7 |     Hello!
  8 |   </>
  9 |
```

