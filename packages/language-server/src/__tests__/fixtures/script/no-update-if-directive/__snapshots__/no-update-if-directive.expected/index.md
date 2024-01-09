## Diagnostics
### Ln 3, Col 6
```marko
  1 | <div no-update-if(Math.random() > 0.5)/>
  2 |
> 3 | <div no-update-if("test")/>
    |      ^^^^^^^^^^^^ Type 'string' is not assignable to type 'AttrBoolean'.
  4 |
```

