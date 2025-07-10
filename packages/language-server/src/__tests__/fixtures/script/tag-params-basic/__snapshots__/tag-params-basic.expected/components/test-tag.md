## Diagnostics
### Ln 7, Col 27
```marko
   5 | <${input.renderBody}("a", "b") />
   6 |
>  7 | <${input.renderBody}("a", "c") />
     |                           ^^^ Argument of type '"c"' is not assignable to parameter of type '"b"'.
   8 |
   9 | <${input.renderBody}("a", "b", "c") />
  10 |
```

### Ln 9, Col 32
```marko
   7 | <${input.renderBody}("a", "c") />
   8 |
>  9 | <${input.renderBody}("a", "b", "c") />
     |                                ^^^ Expected 2 arguments, but got 3.
  10 |
```

