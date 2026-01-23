## Hovers
### Ln 2, Col 6
```marko
  1 | const/$hoistedEl=$el
> 2 | div/$el
    |      ^ const $el: () => HTMLDivElement
  3 |   // ^?
  4 | script --
  5 |   $el;  
```

### Ln 5, Col 5
```marko
  3 |   // ^?
  4 | script --
> 5 |   $el;  
    |     ^ const $el: () => HTMLDivElement
  6 |   //^?
  7 |   $hoistedEl;
  8 |   //^?
```

### Ln 7, Col 5
```marko
  5 |   $el;  
  6 |   //^?
> 7 |   $hoistedEl;
    |     ^ const $hoistedEl: (() => HTMLDivElement) & Iterable<() => HTMLDivElement>
  8 |   //^?
  9 |
```

