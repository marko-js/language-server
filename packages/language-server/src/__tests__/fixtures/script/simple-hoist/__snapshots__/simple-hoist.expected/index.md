## Hovers
### Ln 14, Col 15
```marko
  12 |
  13 | <effect() {
> 14 |   console.log(el())
     |               ^ const el: () => HTMLButtonElement
  15 | //            ^?
  16 | }/>
  17 |
```

### Ln 18, Col 6
```marko
  16 | }/>
  17 |
> 18 | -- ${x}
     |      ^ const x: number
  19 | //   ^?
```

## Diagnostics
### Ln 13, Col 2
```marko
  11 | </div>
  12 |
> 13 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  14 |   console.log(el())
  15 | //            ^?
  16 | }/>
```

### Ln 18, Col 6
```marko
  16 | }/>
  17 |
> 18 | -- ${x}
     |      ^ Block-scoped variable 'x' used before its declaration.
  19 | //   ^?
```

### Ln 18, Col 6
```marko
  16 | }/>
  17 |
> 18 | -- ${x}
     |      ^ Variable 'x' is used before being assigned.
  19 | //   ^?
```

### Ln 4, Col 4
```marko
  2 |   <let/x=1/>
  3 |   ${x}
> 4 |   <button/el onClick() {
    |    ^^^^^^ Fix any of the following:
  Element does not have inner text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element's default semantics were not overridden with role="none" or role="presentation"
  5 |     x = 2;
  6 |     x++;
  7 |     ++x;
```

