## Source Diagnostics
### Ln 6, Col 56
```marko
  4 | }
  5 |
> 6 | return=input.value valueChange=(input.valueChange || ((newValue: T) => {}));
    |                                                        ^^^^^^^^ 'newValue' is declared but its value is never read.
  7 |
```

