## Hovers
### Ln 5, Col 12
```marko
  3 | }
  4 |
> 5 | -- ${input.name}
    |            ^ (property) Input.name: string
  6 | //         ^?
  7 | -- ${input}
  8 | //    ^?
```

### Ln 7, Col 7
```marko
   5 | -- ${input.name}
   6 | //         ^?
>  7 | -- ${input}
     |       ^ (parameter) input: Input
   8 | //    ^?
   9 | -- ${this.name}
  10 |
```

## Diagnostics
### Ln 9, Col 6
```marko
   7 | -- ${input}
   8 | //    ^?
>  9 | -- ${this.name}
     |      ^^^^ Object is possibly 'undefined'.
  10 |
```

