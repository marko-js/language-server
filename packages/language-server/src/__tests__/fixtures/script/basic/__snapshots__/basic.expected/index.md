## Hovers
### Ln 7, Col 9
```marko
   5 | <div>
   6 |   <let/x=1/>
>  7 |   ${new Thing()}
     |         ^ any
   8 | //      ^?
   9 |   ${x}
  10 | //  ^?
```

### Ln 9, Col 5
```marko
   7 |   ${new Thing()}
   8 | //      ^?
>  9 |   ${x}
     |     ^ const x: number
  10 | //  ^?
  11 |   ${input.name}
  12 | //        ^?
```

### Ln 11, Col 11
```marko
   9 |   ${x}
  10 | //  ^?
> 11 |   ${input.name}
     |           ^ (property) Input<T>.name: T extends string
  12 | //        ^?
  13 | </div>
  14 |
```

### Ln 15, Col 6
```marko
  13 | </div>
  14 |
> 15 | -- ${x}
     |      ^ const x: number
  16 | //   ^?
```

## Diagnostics
### Ln 7, Col 9
```marko
   5 | <div>
   6 |   <let/x=1/>
>  7 |   ${new Thing()}
     |         ^^^^^ Cannot find name 'Thing'.
   8 | //      ^?
   9 |   ${x}
  10 | //  ^?
```

### Ln 15, Col 6
```marko
  13 | </div>
  14 |
> 15 | -- ${x}
     |      ^ Block-scoped variable 'x' used before its declaration.
  16 | //   ^?
```

### Ln 15, Col 6
```marko
  13 | </div>
  14 |
> 15 | -- ${x}
     |      ^ Variable 'x' is used before being assigned.
  16 | //   ^?
```

