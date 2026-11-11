## Hovers
### Ln 1, Col 4
```marko
> 1 | <js-button label="Go"/>
    |    ^ Custom Marko tag discovered from:

[components/js-button.marko](<fixture>/components/js-button.marko)
(alias) const Input: Template
---
A button, typed with JSDoc.
  2 | // ^?
  3 | <js-link href="/"/>
  4 | // ^?
```

### Ln 3, Col 4
```marko
  1 | <js-button label="Go"/>
  2 | // ^?
> 3 | <js-link href="/"/>
    |    ^ Custom Marko tag discovered from:

[components/js-link.marko](<fixture>/components/js-link.marko)
(alias) const Input: Template
---
A link, typed with JSDoc.
  4 | // ^?
  5 | <js-no-input/>
  6 | // ^?
```

### Ln 5, Col 4
```marko
  3 | <js-link href="/"/>
  4 | // ^?
> 5 | <js-no-input/>
    |    ^ Custom Marko tag discovered from:

[components/js-no-input.marko](<fixture>/components/js-no-input.marko)
(alias) const JsNoInput: Template
  6 | // ^?
  7 |
```

