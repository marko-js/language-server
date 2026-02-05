## Diagnostics
### Ln 6, Col 4
```marko
  4 |
  5 | <test-tag>
> 6 |   <@item x=1>
    |    ^^^^^ Type 'AttrTag<{ readonly x: 1; readonly renderBody: () => MarkoReturn<void>; readonly [Symbol.iterator]: any; }> | AttrTag<{ readonly renderBody: () => MarkoReturn<void>; readonly [Symbol.iterator]: any; }>' is not assignable to type 'AttrTag<{ x: number; renderBody?: Body<[], void> | undefined; }>'.
  Type 'AttrTag<{ readonly renderBody: () => MarkoReturn<void>; readonly [Symbol.iterator]: any; }>' is not assignable to type 'AttrTag<{ x: number; renderBody?: Body<[], void> | undefined; }>'.
    Property 'x' is missing in type 'AttrTag<{ readonly renderBody: () => MarkoReturn<void>; readonly [Symbol.iterator]: any; }>' but required in type '{ x: number; renderBody?: Body<[], void> | undefined; }'.
  7 |     Hello!
  8 |   </>
  9 |
```

