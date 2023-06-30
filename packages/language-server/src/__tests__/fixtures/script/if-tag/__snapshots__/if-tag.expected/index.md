## Hovers
### Ln 86, Col 3
```marko
  84 |
  85 | <effect() {
> 86 |   a;
     |   ^ const a: 0 | undefined
  87 | //^?
  88 |   b;
  89 | //^?
```

### Ln 88, Col 3
```marko
  86 |   a;
  87 | //^?
> 88 |   b;
     |   ^ const b: 1 | undefined
  89 | //^?
  90 |   c;
  91 | //^?
```

### Ln 90, Col 3
```marko
  88 |   b;
  89 | //^?
> 90 |   c;
     |   ^ const c: 2 | undefined
  91 | //^?
  92 |   d;
  93 | //^?
```

### Ln 92, Col 3
```marko
  90 |   c;
  91 | //^?
> 92 |   d;
     |   ^ const d: 3 | undefined
  93 | //^?
  94 |   e;
  95 | //^?
```

### Ln 94, Col 3
```marko
  92 |   d;
  93 | //^?
> 94 |   e;
     |   ^ const e: 4 | undefined
  95 | //^?
  96 |   f;
  97 | //^?
```

### Ln 96, Col 3
```marko
  94 |   e;
  95 | //^?
> 96 |   f;
     |   ^ const f: 4 | undefined
  97 | //^?
  98 |   g;
  99 | //^?
```

### Ln 98, Col 3
```marko
   96 |   f;
   97 | //^?
>  98 |   g;
      |   ^ const g: 5 | 6
   99 | //^?
  100 | }/>
  101 |
```

## Diagnostics
### Ln 98, Col 3
```marko
   96 |   f;
   97 | //^?
>  98 |   g;
      |   ^ Ambiguous reference, variable was defined in multiple places and was not shadowed.
   99 | //^?
  100 | }/>
  101 |
```

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
  87 | //^?
  88 |   b;
```

