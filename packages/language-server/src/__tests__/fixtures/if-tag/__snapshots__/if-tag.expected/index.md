## Hovers
### Ln 72, Col 3
```marko
  70 |
  71 | <effect() {
> 72 |   a;
     |   ^ const a: 0 | undefined
  73 |   b;
  74 |   c;
  75 |   d;
```

### Ln 73, Col 3
```marko
  71 | <effect() {
  72 |   a;
> 73 |   b;
     |   ^ const b: 1 | undefined
  74 |   c;
  75 |   d;
  76 |   e;
```

### Ln 74, Col 3
```marko
  72 |   a;
  73 |   b;
> 74 |   c;
     |   ^ const c: 2 | undefined
  75 |   d;
  76 |   e;
  77 |   f;
```

### Ln 75, Col 3
```marko
  73 |   b;
  74 |   c;
> 75 |   d;
     |   ^ const d: 3 | undefined
  76 |   e;
  77 |   f;
  78 |   g;
```

### Ln 76, Col 3
```marko
  74 |   c;
  75 |   d;
> 76 |   e;
     |   ^ const e: 4 | undefined
  77 |   f;
  78 |   g;
  79 | }/>
```

### Ln 77, Col 3
```marko
  75 |   d;
  76 |   e;
> 77 |   f;
     |   ^ const f: 4 | undefined
  78 |   g;
  79 | }/>
  80 |
```

### Ln 78, Col 3
```marko
  76 |   e;
  77 |   f;
> 78 |   g;
     |   ^ const g: 5 | 6
  79 | }/>
  80 |
```

## Source Diagnostics
### Ln 71, Col 2
```marko
  69 |
  70 |
> 71 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  72 |   a;
  73 |   b;
  74 |   c;
```

