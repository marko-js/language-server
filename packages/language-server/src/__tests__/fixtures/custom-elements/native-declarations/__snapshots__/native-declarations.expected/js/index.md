## Diagnostics
### Ln 3, Col 14
```marko
  1 | // @ts-check
  2 | <typed-badge count=1 size="small" active model={} weight=-1/>
> 3 | <typed-badge count="invalid" size="medium"/>
    |              ^^^^^ Type 'string' is not assignable to type 'number'.
  4 |
```

### Ln 3, Col 30
```marko
  1 | // @ts-check
  2 | <typed-badge count=1 size="small" active model={} weight=-1/>
> 3 | <typed-badge count="invalid" size="medium"/>
    |                              ^^^^ Type '"medium"' is not assignable to type '"small" | "large" | undefined'.
  4 |
```

