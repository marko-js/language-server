## Hovers
### Ln 5, Col 5
```marko
  3 | <missing-template/>
  4 | <broken-json/>
> 5 | <ok-tag label="a"/>
    |     ^ Custom Marko tag discovered from:

[components/ok-tag.marko](<fixture>/components/ok-tag.marko)
(alias) const Input: Template
  6 | //  ^?
  7 | <let/count=1/>
  8 | <div>${count}</div>
```

### Ln 8, Col 9
```marko
   6 | //  ^?
   7 | <let/count=1/>
>  8 | <div>${count}</div>
     |         ^ const count: number
   9 | //      ^?
  10 |
```

## Diagnostics
### Ln 3, Col 2
```marko
  1 | // A tag whose taglib entry fails to load is reported on the tag, and the
  2 | // rest of the template is still read.
> 3 | <missing-template/>
    |  ^^^^^^^^^^^^^^^^ Template at path "<fixture>/missing.marko" does not exist.
  4 | <broken-json/>
  5 | <ok-tag label="a"/>
  6 | //  ^?
```

### Ln 4, Col 2
```marko
  2 | // rest of the template is still read.
  3 | <missing-template/>
> 4 | <broken-json/>
    |  ^^^^^^^^^^^ Unable to parse JSON file at path "<fixture>/broken/marko-tag.json": Unexpected end of JSON input
  5 | <ok-tag label="a"/>
  6 | //  ^?
  7 | <let/count=1/>
```

