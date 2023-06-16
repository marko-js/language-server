## Source Diagnostics
### Ln 7, Col 28
```marko
   5 | <${input.renderBody}=["a", "b"] />
   6 |
>  7 | <${input.renderBody}=["a", "c"] />
     |                            ^^^ Type '"c"' is not assignable to type '"b"'.
   8 |
   9 | <${input.renderBody}=["a", "b", "c"] />
  10 |
```

### Ln 9, Col 21
```marko
   7 | <${input.renderBody}=["a", "c"] />
   8 |
>  9 | <${input.renderBody}=["a", "b", "c"] />
     |                     ^ Type '["a", "b", string]' is not assignable to type '["a", "b"]'.
  Source has 3 element(s) but target allows only 2.
  10 |
```

