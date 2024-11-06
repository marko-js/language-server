## Diagnostics
### Ln 6, Col 4
```marko
  4 |
  5 | <test-tag>
> 6 |   <@item x=1>
    |    ^^^^^ Type '{ x: number; renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; } | { renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; x?: undefined; }' is not assignable to type 'AttrTag<{ x: number; renderBody?: Body<[], void> | undefined; }>'.
  Type '{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; x?: undefined; }' is not assignable to type 'AttrTag<{ x: number; renderBody?: Body<[], void> | undefined; }>'.
    Type '{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; x?: undefined; }' is not assignable to type '{ x: number; renderBody?: Body<[], void> | undefined; }'.
      Types of property 'x' are incompatible.
        Type 'undefined' is not assignable to type 'number'.
  7 |     Hello!
  8 |   </>
  9 |
```

### Ln 10, Col 4
```marko
   8 |   </>
   9 |
> 10 |   <@item>
     |    ^^^^^ Type '{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<{ x: number; renderBody?: Body<[], void> | undefined; }>'.
  Property 'x' is missing in type '{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }' but required in type '{ x: number; renderBody?: Body<[], void> | undefined; }'.
  11 |     Hello!
  12 |   </>
  13 | </test-tag>
```

