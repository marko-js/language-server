## Hovers
### Ln 6, Col 12
```marko
  4 | }
  5 |
> 6 | -- ${input.options}
    |            ^ (property) Input<T>.options: T[]
  7 | //         ^?
  8 | -- ${input.onChange}
  9 | //         ^?
```

### Ln 8, Col 12
```marko
  6 | -- ${input.options}
  7 | //         ^?
> 8 | -- ${input.onChange}
    |            ^ (property) Input<T>.onChange: (option: T) => unknown
  9 | //         ^?
```

