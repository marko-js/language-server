## Source Diagnostics
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

