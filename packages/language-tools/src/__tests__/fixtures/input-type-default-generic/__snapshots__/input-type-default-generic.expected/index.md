## Hovers
### Ln 1, Col 24
```marko
> 1 | export interface Input<T = string> {
    |                        ^ (type parameter) T in Input<T = string>
  2 |   options: T[];
  3 |   onChange: (option: T) => unknown;
  4 | }
```

### Ln 2, Col 12
```marko
  1 | export interface Input<T = string> {
> 2 |   options: T[];
    |            ^ (type parameter) T in Input<T = string>
  3 |   onChange: (option: T) => unknown;
  4 | }
  5 |
```

### Ln 3, Col 22
```marko
  1 | export interface Input<T = string> {
  2 |   options: T[];
> 3 |   onChange: (option: T) => unknown;
    |                      ^ (type parameter) T in Input<T = string>
  4 | }
  5 |
  6 | -- ${input.options}
```

### Ln 6, Col 12
```marko
  4 | }
  5 |
> 6 | -- ${input.options}
    |            ^ (property) Input<T>.options: T[]
  7 | -- ${input.onChange}
  8 |
```

### Ln 7, Col 12
```marko
  5 |
  6 | -- ${input.options}
> 7 | -- ${input.onChange}
    |            ^ (property) Input<T>.onChange: (option: T) => unknown
  8 |
```

