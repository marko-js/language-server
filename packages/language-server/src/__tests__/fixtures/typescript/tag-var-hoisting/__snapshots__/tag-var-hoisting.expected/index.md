## Hovers
### Ln 21, Col 3
```marko
  19 |
  20 | -- ${() => {
> 21 |   a;
     |   ^ const a: never
  22 | //^?
  23 |   b;
  24 | //^?
```

### Ln 23, Col 3
```marko
  21 |   a;
  22 | //^?
> 23 |   b;
     |   ^ const b: never
  24 | //^?
  25 |   c;
  26 | //^?
```

### Ln 25, Col 3
```marko
  23 |   b;
  24 | //^?
> 25 |   c;
     |   ^ const c: never
  26 | //^?
  27 |   d;
  28 | //^?
```

### Ln 27, Col 3
```marko
  25 |   c;
  26 | //^?
> 27 |   d;
     |   ^ const d: never
  28 | //^?
  29 |   e;
  30 | //^?
```

### Ln 29, Col 3
```marko
  27 |   d;
  28 | //^?
> 29 |   e;
     |   ^ const e: never
  30 | //^?
  31 |   f;
  32 | //^?
```

### Ln 31, Col 3
```marko
  29 |   e;
  30 | //^?
> 31 |   f;
     |   ^ const f: never
  32 | //^?
  33 |   g;
  34 | //^?
```

### Ln 33, Col 3
```marko
  31 |   f;
  32 | //^?
> 33 |   g;
     |   ^ const g: never
  34 | //^?
  35 |   h;
  36 | //^?
```

### Ln 35, Col 3
```marko
  33 |   g;
  34 | //^?
> 35 |   h;
     |   ^ const h: never
  36 | //^?
  37 |   i;
  38 | //^?
```

### Ln 37, Col 3
```marko
  35 |   h;
  36 | //^?
> 37 |   i;
     |   ^ const i: never
  38 | //^?
  39 |   j;
  40 | //^?
```

### Ln 39, Col 3
```marko
  37 |   i;
  38 | //^?
> 39 |   j;
     |   ^ const j: never
  40 | //^?
  41 | }}
  42 |
```

## Diagnostics
### Ln 8, Col 15
```marko
   6 |     nested: {
   7 |       d: 2,
>  8 |       dChange(v: number) {
     |               ^ 'v' is declared but its value is never read.
   9 |
  10 |       }
  11 |     },
```

