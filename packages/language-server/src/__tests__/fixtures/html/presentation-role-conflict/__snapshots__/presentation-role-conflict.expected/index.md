## Diagnostics
### Ln 3, Col 2
```marko
  1 | <li role="none" id="global-attr" aria-hidden="true"></li>
  2 |
> 3 | <button id="natively-focusable" role="none"></button>
    |  ^^^^^^ Fix any of the following:
  ARIA role none is not allowed for given element
  4 |
  5 | <li role="presentation" id="tabindex" tabindex="0"></li>
```

### Ln 3, Col 2
```marko
  1 | <li role="none" id="global-attr" aria-hidden="true"></li>
  2 |
> 3 | <button id="natively-focusable" role="none"></button>
    |  ^^^^^^ Fix any of the following:
  Element does not have inner text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  Element's role is not presentational because it is focusable
  4 |
  5 | <li role="presentation" id="tabindex" tabindex="0"></li>
```

### Ln 3, Col 2
```marko
  1 | <li role="none" id="global-attr" aria-hidden="true"></li>
  2 |
> 3 | <button id="natively-focusable" role="none"></button>
    |  ^^^^^^ Fix all of the following:
  Element is not focusable.
  4 |
  5 | <li role="presentation" id="tabindex" tabindex="0"></li>
```

### Ln 5, Col 2
```marko
  3 | <button id="natively-focusable" role="none"></button>
  4 |
> 5 | <li role="presentation" id="tabindex" tabindex="0"></li>
    |  ^^ Fix all of the following:
  Element is not focusable.
```

