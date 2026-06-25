## Diagnostics
### Ln 12, Col 22
```marko
  10 | <${input.renderBody}({ foo: "bar" }) />
  11 |
> 12 | <${input.renderBody} foo=123 />
     |                      ^^^ Type 'number' is not assignable to type 'string'.
  13 | <${input.renderBody}({ foo: 123 }) />
  14 |
```

### Ln 13, Col 24
```marko
  11 |
  12 | <${input.renderBody} foo=123 />
> 13 | <${input.renderBody}({ foo: 123 }) />
     |                        ^^^ Type 'number' is not assignable to type 'string'.
  14 |
```

