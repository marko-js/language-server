## Hovers
### Ln 1, Col 24
```marko
> 1 | export interface Input<T = string> {
    |                        ^ (type parameter) T in Input<T = string>
  2 |   value: T;
  3 | }
  4 |
```

### Ln 2, Col 10
```marko
  1 | export interface Input<T = string> {
> 2 |   value: T;
    |          ^ (type parameter) T in Input<T = string>
  3 | }
  4 |
  5 | return = input.value;
```

