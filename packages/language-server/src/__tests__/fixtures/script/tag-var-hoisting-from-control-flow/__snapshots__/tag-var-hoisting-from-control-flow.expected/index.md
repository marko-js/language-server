## Hovers
### Ln 2, Col 10
```marko
  1 | <if=$global.foo>
> 2 |   <const/a=["apples", "oranges"] as const/>
    |          ^ const a: readonly ["apples", "oranges"]
  3 |       // ^?
  4 |   <const/b=["slice", "dice"] as const/>
  5 |       // ^?
```

### Ln 4, Col 10
```marko
  2 |   <const/a=["apples", "oranges"] as const/>
  3 |       // ^?
> 4 |   <const/b=["slice", "dice"] as const/>
    |          ^ const b: readonly ["slice", "dice"]
  5 |       // ^?
  6 |   <for|baz| of=b>
  7 |     <const/c=() => a.filter((e) => e.length)/>
```

### Ln 8, Col 7
```marko
   6 |   <for|baz| of=b>
   7 |     <const/c=() => a.filter((e) => e.length)/>
>  8 |     ${baz}
     |       ^ (parameter) baz: "slice" | "dice"
   9 | //    ^?
  10 |   </for>
  11 | </if>
```

### Ln 22, Col 3
```marko
  20 |
  21 | -- ${() => {
> 22 |   a;
     |   ^ const a: never
  23 | //^?
  24 |   b;
  25 | //^?
```

### Ln 24, Col 3
```marko
  22 |   a;
  23 | //^?
> 24 |   b;
     |   ^ const b: never
  25 | //^?
  26 |   c;
  27 | //^?
```

### Ln 26, Col 3
```marko
  24 |   b;
  25 | //^?
> 26 |   c;
     |   ^ const c: ((() => ("apples" | "oranges")[]) | (() => undefined)) & Iterable<() => ("apples" | "oranges")[]>
  27 | //^?
  28 |   d;
  29 | //^?
```

### Ln 28, Col 3
```marko
  26 |   c;
  27 | //^?
> 28 |   d;
     |   ^ const d: ((() => 1) & Iterable<() => 1>) | ((() => 2) & Iterable<() => 2>)
  29 | //^?
  30 | }}
  31 |
```

## Diagnostics
### Ln 28, Col 3
```marko
  26 |   c;
  27 | //^?
> 28 |   d;
     |   ^ Ambiguous reference, variable was defined in multiple places and was not shadowed.
  29 | //^?
  30 | }}
  31 |
```

