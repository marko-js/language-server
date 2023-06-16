## Hovers
### Ln 86, Col 3
```marko
  84 |
  85 | <effect() {
> 86 |   a;
     |   ^ const a: 0 | undefined
  87 |   b;
  88 |   c;
  89 |   d;
```

### Ln 87, Col 3
```marko
  85 | <effect() {
  86 |   a;
> 87 |   b;
     |   ^ const b: 1 | undefined
  88 |   c;
  89 |   d;
  90 |   e;
```

### Ln 88, Col 3
```marko
  86 |   a;
  87 |   b;
> 88 |   c;
     |   ^ const c: 2 | undefined
  89 |   d;
  90 |   e;
  91 |   f;
```

### Ln 89, Col 3
```marko
  87 |   b;
  88 |   c;
> 89 |   d;
     |   ^ const d: 3 | undefined
  90 |   e;
  91 |   f;
  92 |   g;
```

### Ln 90, Col 3
```marko
  88 |   c;
  89 |   d;
> 90 |   e;
     |   ^ const e: 4 | undefined
  91 |   f;
  92 |   g;
  93 | }/>
```

### Ln 91, Col 3
```marko
  89 |   d;
  90 |   e;
> 91 |   f;
     |   ^ const f: 4 | undefined
  92 |   g;
  93 | }/>
  94 |
```

### Ln 92, Col 3
```marko
  90 |   e;
  91 |   f;
> 92 |   g;
     |   ^ const g: 5 | 6
  93 | }/>
  94 |
```

## Source Diagnostics
### Ln 77, Col 5
```marko
  75 | </if>
  76 |
> 77 | <if(show, y)>
     |     ^^^^ Left side of comma operator is unused and has no side effects.
  78 |   Hi
  79 | </if>
  80 |
```

### Ln 77, Col 11
```marko
  75 | </if>
  76 |
> 77 | <if(show, y)>
     |           ^ Cannot find name 'y'.
  78 |   Hi
  79 | </if>
  80 |
```

### Ln 81, Col 5
```marko
  79 | </if>
  80 |
> 81 | <if(show,  y, )>
     |     ^^^^ Left side of comma operator is unused and has no side effects.
  82 |   Hi
  83 | </if>
  84 |
```

### Ln 81, Col 12
```marko
  79 | </if>
  80 |
> 81 | <if(show,  y, )>
     |            ^ Cannot find name 'y'.
  82 |   Hi
  83 | </if>
  84 |
```

### Ln 85, Col 2
```marko
  83 | </if>
  84 |
> 85 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  86 |   a;
  87 |   b;
  88 |   c;
```

