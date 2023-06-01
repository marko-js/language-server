## Hovers
### Ln 7, Col 12
```marko
  5 | }
  6 |
> 7 | -- ${input.fullName}
    |            ^ (property) Input<FirstName, LastName, Extra>.fullName: `${FirstName} ${LastName}`
  8 | //         ^?
```

## Diagnostics
### Ln 1, Col 75
```marko
> 1 | export interface Input<FirstName extends string, LastName extends string, Extra> {
    |                                                                           ^^^^^ 'Extra' is declared but its value is never read.
  2 |   firstName: FirstName,
  3 |   lastName: LastName,
  4 |   fullName: `${FirstName} ${LastName}`
```

