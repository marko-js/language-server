## Hovers
### Ln 1, Col 4
```marko
> 1 | <typed-badge/>
    |    ^ Native custom element discovered from [typed-badge](file:///<fixture>/node_modules/typed-badge/custom-elements.json).

A typed native badge.
  2 | // ^?
  3 | <typed-badge/badge
  4 |   label="hello"
```

### Ln 4, Col 3
```marko
  2 | // ^?
  3 | <typed-badge/badge
> 4 |   label="hello"
    |   ^ (property) "label"?: string | undefined
---
Badge label.
  5 | //^?
  6 |   count=1
  7 | //^?
```

### Ln 6, Col 3
```marko
  4 |   label="hello"
  5 | //^?
> 6 |   count=1
    |   ^ (property) "count"?: number | undefined
  7 | //^?
  8 |   size="small"
  9 | //^?
```

### Ln 8, Col 3
```marko
   6 |   count=1
   7 | //^?
>  8 |   size="small"
     |   ^ (property) "size"?: "small" | "large" | undefined
   9 | //^?
  10 |   id="badge"
  11 |   active
```

## Diagnostics
### Ln 22, Col 14
```marko
  20 |   <span>child</span>
  21 | </typed-badge>
> 22 | <typed-badge count="invalid" size="medium"/>
     |              ^^^^^ Type 'string' is not assignable to type 'number'.
  23 | <typed-badge active="invalid" weight=2 id=1 onClick=1/>
  24 |
```

### Ln 22, Col 30
```marko
  20 |   <span>child</span>
  21 | </typed-badge>
> 22 | <typed-badge count="invalid" size="medium"/>
     |                              ^^^^ Type '"medium"' is not assignable to type '"small" | "large" | undefined'.
  23 | <typed-badge active="invalid" weight=2 id=1 onClick=1/>
  24 |
```

### Ln 23, Col 14
```marko
  21 | </typed-badge>
  22 | <typed-badge count="invalid" size="medium"/>
> 23 | <typed-badge active="invalid" weight=2 id=1 onClick=1/>
     |              ^^^^^^ Type 'string' is not assignable to type 'boolean | undefined'.
  24 |
```

### Ln 23, Col 31
```marko
  21 | </typed-badge>
  22 | <typed-badge count="invalid" size="medium"/>
> 23 | <typed-badge active="invalid" weight=2 id=1 onClick=1/>
     |                               ^^^^^^ Type '2' is not assignable to type '0 | 1 | -1 | undefined'.
  24 |
```

### Ln 23, Col 40
```marko
  21 | </typed-badge>
  22 | <typed-badge count="invalid" size="medium"/>
> 23 | <typed-badge active="invalid" weight=2 id=1 onClick=1/>
     |                                        ^^ Type 'number' is not assignable to type 'AttrString'.
  24 |
```

### Ln 23, Col 45
```marko
  21 | </typed-badge>
  22 | <typed-badge count="invalid" size="medium"/>
> 23 | <typed-badge active="invalid" weight=2 id=1 onClick=1/>
     |                                             ^^^^^^^ Type 'number' is not assignable to type 'AttrEventHandler<PointerEvent, HTMLElement>'.
  24 |
```

