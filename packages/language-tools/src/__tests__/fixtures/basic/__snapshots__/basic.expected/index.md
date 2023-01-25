## Hovers
### Ln 7, Col 9
```marko
   5 | <div>
   6 |   <let/x=1/>
>  7 |   ${new Thing()}
     |         ^ any
   8 |   ${x}
   9 |   ${input.name}
  10 | </div>
```

### Ln 8, Col 5
```marko
   6 |   <let/x=1/>
   7 |   ${new Thing()}
>  8 |   ${x}
     |     ^ const x: number
   9 |   ${input.name}
  10 | </div>
  11 |
```

### Ln 9, Col 11
```marko
   7 |   ${new Thing()}
   8 |   ${x}
>  9 |   ${input.name}
     |           ^ (property) Input<T>.name: T extends string
  10 | </div>
  11 |
  12 | -- ${x}
```

### Ln 12, Col 6
```marko
  10 | </div>
  11 |
> 12 | -- ${x}
     |      ^ const x: number
```

## Source Diagnostics
### Ln 7, Col 9
```marko
   5 | <div>
   6 |   <let/x=1/>
>  7 |   ${new Thing()}
     |         ^^^^^ Cannot find name 'Thing'.
   8 |   ${x}
   9 |   ${input.name}
  10 | </div>
```

### Ln 12, Col 6
```marko
  10 | </div>
  11 |
> 12 | -- ${x}
     |      ^ Block-scoped variable 'x' used before its declaration.
```

### Ln 12, Col 6
```marko
  10 | </div>
  11 |
> 12 | -- ${x}
     |      ^ Block-scoped variable 'x' used before its declaration.
```

