## Diagnostics
### Ln 1, Col 3
```marko
> 1 | p role="text"
    |   ^^^^ Type '"text"' is not assignable to type 'AttrMissing | "alert" | "alertdialog" | "application" | "article" | "banner" | "button" | "cell" | "checkbox" | "columnheader" | "combobox" | "complementary" | ... 58 more ... | "treeitem"'.
  2 |   -- body text
  3 |   button
```

### Ln 1, Col 1
```marko
> 1 | p role="text"
    | ^ Fix any of the following:
  Element has focusable descendants
  2 |   -- body text
  3 |   button
```

### Ln 3, Col 3
```marko
  1 | p role="text"
  2 |   -- body text
> 3 |   button
    |   ^^^^^^ Fix any of the following:
  Element does not have inner text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  Element's default semantics were not overridden with role="none" or role="presentation"
```

