## Hovers
### Ln 7, Col 7
```marko
   5 |   <for|baz| of=b>
   6 |     <const/c=a.filter((e) => e.length)/>
>  7 |     ${baz}
     |       ^ (parameter) baz: "slice" | "dice"
   8 | //    ^?
   9 |   </for>
  10 | </if>
```

### Ln 21, Col 3
```marko
  19 |
  20 | -- ${() => {
> 21 |   a;
     |   ^ const a: readonly ["apples", "oranges"] | undefined
  22 | //^?
  23 |   b;
  24 | //^?
```

### Ln 23, Col 3
```marko
  21 |   a;
  22 | //^?
> 23 |   b;
     |   ^ const b: readonly ["slice", "dice"] | undefined
  24 | //^?
  25 |   c;
  26 | //^?
```

### Ln 25, Col 3
```marko
  23 |   b;
  24 | //^?
> 25 |   c;
     |   ^ const c: ("apples" | "oranges")[] | undefined
  26 | //^?
  27 |   d;
  28 | //^?
```

### Ln 27, Col 3
```marko
  25 |   c;
  26 | //^?
> 27 |   d;
     |   ^ const d: 1 | 2
  28 | //^?
  29 | }}
  30 |
```

## Diagnostics
### Ln 27, Col 3
```marko
  25 |   c;
  26 | //^?
> 27 |   d;
     |   ^ Ambiguous reference, variable was defined in multiple places and was not shadowed.
  28 | //^?
  29 | }}
  30 |
```

