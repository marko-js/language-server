## Hovers
### Ln 1, Col 24
```marko
> 1 | export interface Input<T = string> {
    |                        ^ (type parameter) T in Input<T = string>
  2 | //                     ^?
  3 |   value: T;
  4 | //       ^?
```

### Ln 3, Col 10
```marko
  1 | export interface Input<T = string> {
  2 | //                     ^?
> 3 |   value: T;
    |          ^ (type parameter) T in Input<T = string>
  4 | //       ^?
  5 | }
  6 |
```

