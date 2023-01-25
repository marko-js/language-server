## Hovers
### Ln 14, Col 15
```marko
  12 |
  13 | <effect() {
> 14 |   console.log(el())
     |               ^ const el: () => Element
  15 | }/>
  16 |
  17 | -- ${x}
```

### Ln 17, Col 6
```marko
  15 | }/>
  16 |
> 17 | -- ${x}
     |      ^ const x: number
  18 |
```

## Source Diagnostics
### Ln 13, Col 2
```marko
  11 | </div>
  12 |
> 13 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  14 |   console.log(el())
  15 | }/>
  16 |
```

### Ln 17, Col 6
```marko
  15 | }/>
  16 |
> 17 | -- ${x}
     |      ^ Block-scoped variable 'x' used before its declaration.
  18 |
```

### Ln 17, Col 6
```marko
  15 | }/>
  16 |
> 17 | -- ${x}
     |      ^ Block-scoped variable 'x' used before its declaration.
  18 |
```

