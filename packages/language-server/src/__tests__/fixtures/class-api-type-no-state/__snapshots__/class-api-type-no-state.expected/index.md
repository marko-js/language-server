## Hovers
### Ln 6, Col 6
```marko
  4 | }
  5 |
> 6 | -- ${state.name}
    |      ^ const state: never
  7 |
```

## Source Diagnostics
### Ln 6, Col 12
```marko
  4 | }
  5 |
> 6 | -- ${state.name}
    |            ^^^^ Property 'name' does not exist on type 'never'.
  7 |
```

