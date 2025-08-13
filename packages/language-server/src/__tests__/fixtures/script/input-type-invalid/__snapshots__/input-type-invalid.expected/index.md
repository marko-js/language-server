## Diagnostics
### Ln 2, Col 3
```marko
  1 | export interface Input {
> 2 |   %: string;
    |   ^ Unexpected token
  3 | }
  4 |
```

### Ln 2, Col 3
```marko
  1 | export interface Input {
> 2 |   %: string;
    |   ^ Property or signature expected.
  3 | }
  4 |
```

### Ln 3, Col 1
```marko
  1 | export interface Input {
  2 |   %: string;
> 3 | }
    | ^ Declaration or statement expected.
  4 |
```

### Ln 2, Col 6
```marko
  1 | export interface Input {
> 2 |   %: string;
    |      ^^^^^^ 'string' only refers to a type, but is being used as a value here.
  3 | }
  4 |
```

