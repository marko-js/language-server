## Hovers
### Ln 15, Col 3
```marko
  13 |
  14 | <effect() {
> 15 |   a;
     |   ^ const a: "a"
  16 | //^?
  17 |   b;
  18 | //^?
```

### Ln 17, Col 3
```marko
  15 |   a;
  16 | //^?
> 17 |   b;
     |   ^ const b: "b"
  18 | //^?
  19 |   c;
  20 | //^?
```

### Ln 19, Col 3
```marko
  17 |   b;
  18 | //^?
> 19 |   c;
     |   ^ const c: "c"
  20 | //^?
  21 | }/>
```

## Diagnostics
### Ln 2, Col 4
```marko
  1 | <comments>
> 2 |   <@comment#a>
    |    ^^^^^^^^ Type '{ comment: { id: string; renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }; renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; id: string; } | { renderBody: () => MarkoReturn<...>; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<Comment>'.
  Type '{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<Comment>'.
    Property 'id' is missing in type '{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }' but required in type 'Comment'.
  3 |     <@comment#b>
  4 | //    ^?
  5 |       <let/b = "b" as const/>
```

