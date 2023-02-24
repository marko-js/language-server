## Hovers
### Ln 21, Col 3
```marko
  19 |
  20 | -- ${() => {
> 21 |   a;
     |   ^ const a: 1
  22 |   b;
  23 |   c;
  24 |   d;
```

### Ln 22, Col 3
```marko
  20 | -- ${() => {
  21 |   a;
> 22 |   b;
     |   ^ const b: "hello!"
  23 |   c;
  24 |   d;
  25 |   e;
```

### Ln 23, Col 3
```marko
  21 |   a;
  22 |   b;
> 23 |   c;
     |   ^ const c: "default"
  24 |   d;
  25 |   e;
  26 |   f;
```

### Ln 24, Col 3
```marko
  22 |   b;
  23 |   c;
> 24 |   d;
     |   ^ const d: 2
  25 |   e;
  26 |   f;
  27 |   g;
```

### Ln 25, Col 3
```marko
  23 |   c;
  24 |   d;
> 25 |   e;
     |   ^ const e: 3
  26 |   f;
  27 |   g;
  28 |   h;
```

### Ln 26, Col 3
```marko
  24 |   d;
  25 |   e;
> 26 |   f;
     |   ^ const f: 4
  27 |   g;
  28 |   h;
  29 |   i;
```

### Ln 27, Col 3
```marko
  25 |   e;
  26 |   f;
> 27 |   g;
     |   ^ const g: {
    other: true;
}
  28 |   h;
  29 |   i;
  30 |   j;
```

### Ln 28, Col 3
```marko
  26 |   f;
  27 |   g;
> 28 |   h;
     |   ^ const h: 1
  29 |   i;
  30 |   j;
  31 | }}
```

### Ln 29, Col 3
```marko
  27 |   g;
  28 |   h;
> 29 |   i;
     |   ^ const i: 2
  30 |   j;
  31 | }}
  32 |
```

### Ln 30, Col 3
```marko
  28 |   h;
  29 |   i;
> 30 |   j;
     |   ^ const j: [4, 5]
  31 | }}
  32 |
```

## Source Diagnostics
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

