## Hovers
### Ln 1, Col 24
```marko
> 1 | export interface Input<T = string> {
    |                        ^ (type parameter) T in Input<T = string>
  2 | //                     ^?
  3 |   options: T[];
  4 | //         ^?
```

### Ln 3, Col 12
```marko
  1 | export interface Input<T = string> {
  2 | //                     ^?
> 3 |   options: T[];
    |            ^ (type parameter) T in Input<T = string>
  4 | //         ^?
  5 |   onChange: (option: T) => unknown;
  6 | //                   ^?
```

### Ln 5, Col 22
```marko
  3 |   options: T[];
  4 | //         ^?
> 5 |   onChange: (option: T) => unknown;
    |                      ^ (type parameter) T in Input<T = string>
  6 | //                   ^?
  7 | }
  8 |
```

### Ln 9, Col 12
```marko
   7 | }
   8 |
>  9 | -- ${input.options}
     |            ^ (property) Input<T>.options: T[]
  10 | //         ^?
  11 | -- ${input.onChange}
  12 | //         ^?
```

### Ln 11, Col 12
```marko
   9 | -- ${input.options}
  10 | //         ^?
> 11 | -- ${input.onChange}
     |            ^ (property) Input<T>.onChange: (option: T) => unknown
  12 | //         ^?
  13 |
```

