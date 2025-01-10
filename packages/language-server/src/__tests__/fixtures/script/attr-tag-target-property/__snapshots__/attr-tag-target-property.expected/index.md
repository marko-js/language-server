## Diagnostics
### Ln 6, Col 4
```marko
  4 |
  5 | <test-tag>
> 6 |   <@item x=1>
    |    ^^^^^ Type '{ readonly x: 1; readonly renderBody: () => MarkoReturn<void>; readonly [Symbol.iterator]: any; } | { readonly renderBody: () => MarkoReturn<void>; readonly [Symbol.iterator]: any; readonly x?: undefined; }' is not assignable to type 'AttrTag<{ x: number; renderBody?: Body<[], void> | undefined; }>'.
  Type '{ readonly renderBody: () => MarkoReturn<void>; readonly [Symbol.iterator]: any; readonly x?: undefined; }' is not assignable to type 'AttrTag<{ x: number; renderBody?: Body<[], void> | undefined; }>'.
    Type '{ readonly renderBody: () => MarkoReturn<void>; readonly [Symbol.iterator]: any; readonly x?: undefined; }' is not assignable to type '{ x: number; renderBody?: Body<[], void> | undefined; }'.
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
     |    ^^^^^ Type '{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }' is not assignable to type '{ x: number; renderBody?: Body<[], void> | undefined; } & { [Symbol.iterator](): Iterator<{ x: number; renderBody?: Body<[], void> | undefined; }, any, any>; } & { ...; }'.
  Property 'x' is missing in type '{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }' but required in type '{ x: number; renderBody?: Body<[], void> | undefined; }'.
  11 |     Hello!
  12 |   </>
  13 | </test-tag>
```

