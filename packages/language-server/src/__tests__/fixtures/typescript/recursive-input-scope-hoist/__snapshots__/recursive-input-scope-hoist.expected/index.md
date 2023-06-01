## Hovers
### Ln 15, Col 3
```marko
  13 |
  14 | <effect() {
> 15 |   a;
     |   ^ const a: "a"
  16 | //^?
  17 |   b;
  18 | //^?
```

### Ln 17, Col 3
```marko
  15 |   a;
  16 | //^?
> 17 |   b;
     |   ^ const b: "b"
  18 | //^?
  19 |   c;
  20 | //^?
```

### Ln 19, Col 3
```marko
  17 |   b;
  18 | //^?
> 19 |   c;
     |   ^ const c: "c"
  20 | //^?
  21 | }/>
```

## Diagnostics
### Ln 14, Col 2
```marko
  12 | </comments>
  13 |
> 14 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  15 |   a;
  16 | //^?
  17 |   b;
```

