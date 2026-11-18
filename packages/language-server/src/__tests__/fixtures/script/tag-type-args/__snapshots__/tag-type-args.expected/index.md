## Hovers
### Ln 4, Col 4
```marko
  2 |
  3 | // A native tag takes none.
> 4 | <div<string>/>
    |    ^ Built in [&lt;div&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) HTML tag.
  5 | // ^?
  6 |
```

## Diagnostics
### Ln 1, Col 19
```marko
> 1 | <test-tag<string> a=1/>
    |                   ^ Type 'number' is not assignable to type 'string'.
  2 |
  3 | // A native tag takes none.
  4 | <div<string>/>
```

### Ln 4, Col 6
```marko
  2 |
  3 | // A native tag takes none.
> 4 | <div<string>/>
    |      ^^^^^^ Expected 0 type arguments, but got 1.
  5 | // ^?
  6 |
```

