## Hovers
### Ln 1, Col 4
```marko
> 1 | <fancy-button label="Go"/>
    |    ^ Custom Marko tag discovered from:

[components/fancy-button.marko](<fixture>/components/fancy-button.marko)
(alias) const Input: Template
---
A button with a fancy border, see {@link https://example.com/fancy the guide}.  

*@deprecated* — Use `<plain-button>` instead.  

*@see* — https://example.com/fancy-button
  2 | // ^?   ^?
  3 | <plain-button label="Go"/>
  4 | //    ^?
```

### Ln 1, Col 9
```marko
> 1 | <fancy-button label="Go"/>
    |         ^ Custom Marko tag discovered from:

[components/fancy-button.marko](<fixture>/components/fancy-button.marko)
(alias) const Input: Template
---
A button with a fancy border, see {@link https://example.com/fancy the guide}.  

*@deprecated* — Use `<plain-button>` instead.  

*@see* — https://example.com/fancy-button
  2 | // ^?   ^?
  3 | <plain-button label="Go"/>
  4 | //    ^?
```

### Ln 3, Col 7
```marko
  1 | <fancy-button label="Go"/>
  2 | // ^?   ^?
> 3 | <plain-button label="Go"/>
    |       ^ Custom Marko tag discovered from:

[components/plain-button.marko](<fixture>/components/plain-button.marko)
(alias) const Input: Template
---
A plain button.
  4 | //    ^?
  5 | <no-input/>
  6 | //  ^?
```

### Ln 5, Col 5
```marko
  3 | <plain-button label="Go"/>
  4 | //    ^?
> 5 | <no-input/>
    |     ^ Custom Marko tag discovered from:

[components/no-input.marko](<fixture>/components/no-input.marko)
(alias) const NoInput: Template
  6 | //  ^?
  7 | <generic-list items=[1, 2]/>
  8 | //  ^?
```

### Ln 7, Col 5
```marko
   5 | <no-input/>
   6 | //  ^?
>  7 | <generic-list items=[1, 2]/>
     |     ^ Custom Marko tag discovered from:

[components/generic-list.marko](<fixture>/components/generic-list.marko)
(alias) const Input: Template
---
A list of any items.
   8 | //  ^?
   9 | <dir-button/>
  10 | //  ^?
```

### Ln 9, Col 5
```marko
   7 | <generic-list items=[1, 2]/>
   8 | //  ^?
>  9 | <dir-button/>
     |     ^ Custom Marko tag discovered from:

[components/dir-button/index.marko](<fixture>/components/dir-button/index.marko)
(alias) const Input: Template
---
A button in a directory of its own.
  10 | //  ^?
  11 | <ShinyButton/>
  12 | //  ^?
```

### Ln 11, Col 5
```marko
   9 | <dir-button/>
  10 | //  ^?
> 11 | <ShinyButton/>
     |     ^ Custom Marko tag discovered from:

[components/ShinyButton.marko](<fixture>/components/ShinyButton.marko)
(alias) const Input: Template
---
A button that shines.
  12 | //  ^?
  13 | <class-counter start=1/>
  14 | //  ^?
```

### Ln 13, Col 5
```marko
  11 | <ShinyButton/>
  12 | //  ^?
> 13 | <class-counter start=1/>
     |     ^ Custom Marko tag discovered from:

[components/class-counter.marko](<fixture>/components/class-counter.marko)
(alias) const Input: Template
---
Counts clicks, with the Class API.
  14 | //  ^?
  15 | <tags-counter start=1/>
  16 | //  ^?
```

### Ln 15, Col 5
```marko
  13 | <class-counter start=1/>
  14 | //  ^?
> 15 | <tags-counter start=1/>
     |     ^ Custom Marko tag discovered from:

[tags/tags-counter.marko](<fixture>/tags/tags-counter.marko)
(alias) const Input: Template
---
Counts clicks, with the Tags API.  

*@deprecated* — Use `<class-counter>` instead.
  16 | //  ^?
  17 | <registered-button/>
  18 | //  ^?
```

### Ln 17, Col 5
```marko
  15 | <tags-counter start=1/>
  16 | //  ^?
> 17 | <registered-button/>
     |     ^ Custom Marko tag discovered from:

[lib/button-impl.marko](<fixture>/lib/button-impl.marko)
(alias) const Input: Template
---
A button registered under another name in `marko.json`.
  18 | //  ^?
  19 | <typed-button label="Go"/>
  20 | //  ^?
```

### Ln 19, Col 5
```marko
  17 | <registered-button/>
  18 | //  ^?
> 19 | <typed-button label="Go"/>
     |     ^ Custom Marko tag discovered from:

[lib/typed-button.marko](<fixture>/lib/typed-button.marko)
(alias) const Input: Template
---
A button typed by its declaration.
  20 | //  ^?
  21 | <split-button label="Go"/>
  22 | //  ^?
```

### Ln 21, Col 5
```marko
  19 | <typed-button label="Go"/>
  20 | //  ^?
> 21 | <split-button label="Go"/>
     |     ^ Custom Marko tag discovered from:

[components/split-button/index.marko](<fixture>/components/split-button/index.marko)
(alias) const SplitButton: Template
  22 | //  ^?
  23 | <missing-types-button/>
  24 | //  ^?
```

### Ln 23, Col 5
```marko
  21 | <split-button label="Go"/>
  22 | //  ^?
> 23 | <missing-types-button/>
     |     ^ Custom Marko tag discovered from:

[lib/missing-types-button.marko](<fixture>/lib/missing-types-button.marko)
  24 | //  ^?
  25 |
```

## Diagnostics
### Ln 23, Col 2
```marko
  21 | <split-button label="Go"/>
  22 | //  ^?
> 23 | <missing-types-button/>
     |  ^^^^^^^^^^^^^^^^^^^^ Object is of type 'unknown'.
  24 | //  ^?
  25 |
```

