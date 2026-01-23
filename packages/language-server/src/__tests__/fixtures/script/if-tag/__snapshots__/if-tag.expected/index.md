## Hovers
### Ln 99, Col 3
```marko
   97 |
   98 | <effect() {
>  99 |   a;
      |   ^ const a: ((() => 0) | (() => undefined)) & Iterable<() => 0>
  100 | //^?
  101 |   b;
  102 | //^?
```

### Ln 101, Col 3
```marko
   99 |   a;
  100 | //^?
> 101 |   b;
      |   ^ const b: ((() => 1) | (() => undefined)) & Iterable<() => 1>
  102 | //^?
  103 |   c;
  104 | //^?
```

### Ln 103, Col 3
```marko
  101 |   b;
  102 | //^?
> 103 |   c;
      |   ^ const c: ((() => 2) | (() => undefined)) & Iterable<() => 2>
  104 | //^?
  105 |   d;
  106 | //^?
```

### Ln 105, Col 3
```marko
  103 |   c;
  104 | //^?
> 105 |   d;
      |   ^ const d: ((() => 3) | (() => undefined)) & Iterable<() => 3>
  106 | //^?
  107 |   e;
  108 | //^?
```

### Ln 107, Col 3
```marko
  105 |   d;
  106 | //^?
> 107 |   e;
      |   ^ const e: ((() => 4) | (() => undefined)) & Iterable<() => 4>
  108 | //^?
  109 |   f;
  110 | //^?
```

### Ln 109, Col 3
```marko
  107 |   e;
  108 | //^?
> 109 |   f;
      |   ^ const f: ((() => 4) | (() => undefined)) & Iterable<() => 4>
  110 | //^?
  111 |   g;
  112 | //^?
```

### Ln 111, Col 3
```marko
  109 |   f;
  110 | //^?
> 111 |   g;
      |   ^ const g: ((() => 5) & Iterable<() => 5>) | ((() => 6) & Iterable<() => 6>)
  112 | //^?
  113 |   h;
  114 | //^?
```

### Ln 113, Col 3
```marko
  111 |   g;
  112 | //^?
> 113 |   h;
      |   ^ const h: ((() => 7) | (() => undefined)) & Iterable<() => 7>
  114 | //^?
  115 |   i;
  116 | //^?
```

### Ln 115, Col 3
```marko
  113 |   h;
  114 | //^?
> 115 |   i;
      |   ^ const i: ((() => 8) | (() => undefined)) & Iterable<() => 8>
  116 | //^?
  117 | }/>
  118 |
```

## Diagnostics
### Ln 111, Col 3
```marko
  109 |   f;
  110 | //^?
> 111 |   g;
      |   ^ Ambiguous reference, variable was defined in multiple places and was not shadowed.
  112 | //^?
  113 |   h;
  114 | //^?
```

### Ln 89, Col 5
```marko
  87 | </if>
  88 |
> 89 | <if(show, y)>
     |     ^^^^ Left side of comma operator is unused and has no side effects.
  90 |   Hi
  91 | </if>
  92 |
```

### Ln 89, Col 11
```marko
  87 | </if>
  88 |
> 89 | <if(show, y)>
     |           ^ Cannot find name 'y'.
  90 |   Hi
  91 | </if>
  92 |
```

### Ln 93, Col 5
```marko
  91 | </if>
  92 |
> 93 | <if(show,  y, )>
     |     ^^^^ Left side of comma operator is unused and has no side effects.
  94 |   Hi
  95 | </if>
  96 |
```

### Ln 93, Col 12
```marko
  91 | </if>
  92 |
> 93 | <if(show,  y, )>
     |            ^ Cannot find name 'y'.
  94 |   Hi
  95 | </if>
  96 |
```

