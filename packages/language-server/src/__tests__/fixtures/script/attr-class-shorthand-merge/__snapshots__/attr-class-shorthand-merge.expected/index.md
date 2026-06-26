## Diagnostics
### Ln 11, Col 16
```marko
   9 | <div.${value}.other class=value/>
  10 |
> 11 | <div.btn class=123/>
     |                ^^^ Argument of type '123' is not assignable to parameter of type 'AttrClass'.
  12 |
  13 | <test-tag.btn class="foo"/>
  14 | <test-tag.btn.other class=value/>
```

