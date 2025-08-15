## Hovers
### Ln 7, Col 7
```marko
   5 |   <for|d| of=b>
   6 |     <const/c=a.filter((e) => e.length)/>
>  7 |     ${d}
     |       ^ (parameter) d: "slice" | "dice"
   8 | //    ^?
   9 |   </for>
  10 | </if>
```

### Ln 14, Col 3
```marko
  12 |
  13 | -- ${() => {
> 14 |   a;
     |   ^ const a: readonly ["apples", "oranges"] | undefined
  15 | //^?
  16 |   b;
  17 | //^?
```

### Ln 16, Col 3
```marko
  14 |   a;
  15 | //^?
> 16 |   b;
     |   ^ const b: readonly ["slice", "dice"] | undefined
  17 | //^?
  18 |   c;
  19 | //^?
```

### Ln 18, Col 3
```marko
  16 |   b;
  17 | //^?
> 18 |   c;
     |   ^ const c: ("apples" | "oranges")[] | undefined
  19 | //^?
  20 | }}
  21 |
```

