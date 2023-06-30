## Hovers
### Ln 14, Col 15
```marko
  12 |
  13 | <effect() {
> 14 |   console.log(el())
     |               ^ const el: any
  15 | //            ^?
  16 | }/>
  17 |
```

### Ln 18, Col 6
```marko
  16 | }/>
  17 |
> 18 | -- ${x}
     |      ^ const x: number
  19 | //   ^?
```

## Diagnostics
### Ln 13, Col 2
```marko
  11 | </div>
  12 |
> 13 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  14 |   console.log(el())
  15 | //            ^?
  16 | }/>
```

### Ln 18, Col 6
```marko
  16 | }/>
  17 |
> 18 | -- ${x}
     |      ^ Block-scoped variable 'x' used before its declaration.
  19 | //   ^?
```

### Ln 18, Col 6
```marko
  16 | }/>
  17 |
> 18 | -- ${x}
     |      ^ Variable 'x' is used before being assigned.
  19 | //   ^?
```

