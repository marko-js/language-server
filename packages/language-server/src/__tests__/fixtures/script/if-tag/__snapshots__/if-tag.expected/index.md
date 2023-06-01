## Hovers
### Ln 72, Col 3
```marko
  70 |
  71 | <effect() {
> 72 |   a;
     |   ^ const a: 0 | undefined
  73 | //^?
  74 |   b;
  75 | //^?
```

### Ln 74, Col 3
```marko
  72 |   a;
  73 | //^?
> 74 |   b;
     |   ^ const b: 1 | undefined
  75 | //^?
  76 |   c;
  77 | //^?
```

### Ln 76, Col 3
```marko
  74 |   b;
  75 | //^?
> 76 |   c;
     |   ^ const c: 2 | undefined
  77 | //^?
  78 |   d;
  79 | //^?
```

### Ln 78, Col 3
```marko
  76 |   c;
  77 | //^?
> 78 |   d;
     |   ^ const d: 3 | undefined
  79 | //^?
  80 |   e;
  81 | //^?
```

### Ln 80, Col 3
```marko
  78 |   d;
  79 | //^?
> 80 |   e;
     |   ^ const e: 4 | undefined
  81 | //^?
  82 |   f;
  83 | //^?
```

### Ln 82, Col 3
```marko
  80 |   e;
  81 | //^?
> 82 |   f;
     |   ^ const f: 4 | undefined
  83 | //^?
  84 |   g;
  85 | //^?
```

### Ln 84, Col 3
```marko
  82 |   f;
  83 | //^?
> 84 |   g;
     |   ^ const g: 5 | 6
  85 | //^?
  86 | }/>
  87 |
```

## Diagnostics
### Ln 71, Col 2
```marko
  69 |
  70 |
> 71 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  72 |   a;
  73 | //^?
  74 |   b;
```

