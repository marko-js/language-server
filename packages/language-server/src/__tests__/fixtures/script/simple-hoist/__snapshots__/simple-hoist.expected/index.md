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

## Diagnostics
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
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  Element's default semantics were not overridden with role="none" or role="presentation"
  5 |     x = 2;
  6 |     x++;
  7 |     ++x;
```

