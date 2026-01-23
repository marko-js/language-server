## Hovers
### Ln 19, Col 5
```marko
  17 |   <let/[h, i, , ...j]=[1, 2, 3, 4, 5] as const/>
  18 |   ${() => {
> 19 |     a;
     |     ^ const a: 1
  20 |   //^?
  21 |     b;
  22 |   //^?
```

### Ln 21, Col 5
```marko
  19 |     a;
  20 |   //^?
> 21 |     b;
     |     ^ const b: "hello!"
  22 |   //^?
  23 |     c;
  24 |   //^?
```

### Ln 23, Col 5
```marko
  21 |     b;
  22 |   //^?
> 23 |     c;
     |     ^ const c: "default"
  24 |   //^?
  25 |     d;
  26 |   //^?
```

### Ln 25, Col 5
```marko
  23 |     c;
  24 |   //^?
> 25 |     d;
     |     ^ const d: 2
  26 |   //^?
  27 |     e;
  28 |   //^?
```

### Ln 27, Col 5
```marko
  25 |     d;
  26 |   //^?
> 27 |     e;
     |     ^ const e: 3
  28 |   //^?
  29 |     f;
  30 |   //^?
```

### Ln 29, Col 5
```marko
  27 |     e;
  28 |   //^?
> 29 |     f;
     |     ^ const f: 4
  30 |   //^?
  31 |     g;
  32 |   //^?
```

### Ln 31, Col 5
```marko
  29 |     f;
  30 |   //^?
> 31 |     g;
     |     ^ const g: {
    other: true;
}
  32 |   //^?
  33 |     h;
  34 |   //^?
```

### Ln 33, Col 5
```marko
  31 |     g;
  32 |   //^?
> 33 |     h;
     |     ^ const h: 1
  34 |   //^?
  35 |     i;
  36 |   //^?
```

### Ln 35, Col 5
```marko
  33 |     h;
  34 |   //^?
> 35 |     i;
     |     ^ const i: 2
  36 |   //^?
  37 |     j;
  38 |   //^?
```

### Ln 37, Col 5
```marko
  35 |     i;
  36 |   //^?
> 37 |     j;
     |     ^ const j: [4, 5]
  38 |   //^?
  39 |   }}
  40 | </div>
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

