## Hovers
### Ln 2, Col 3
```marko
  1 | <typed-badge/badge
> 2 |   label="hello"
    |   ^ (property) Input.label?: string | undefined
  3 | //^?
  4 |   count=1
  5 | //^?
```

### Ln 4, Col 3
```marko
  2 |   label="hello"
  3 | //^?
> 4 |   count=1
    |   ^ (property) Input.count?: number | undefined
  5 | //^?
  6 |   size="small"
  7 | //^?
```

### Ln 6, Col 3
```marko
  4 |   count=1
  5 | //^?
> 6 |   size="small"
    |   ^ (property) Input.size?: "small" | "large" | undefined
  7 | //^?
  8 |   id="badge"
  9 |   onClick() { badge().setAttribute("active", ""); }
```

## Diagnostics
### Ln 13, Col 14
```marko
  11 |   <span>child</span>
  12 | </typed-badge>
> 13 | <typed-badge count="invalid" size="medium"/>
     |              ^^^^^ Type 'string' is not assignable to type 'number'.
  14 | import type { Input as BadgeInput } from "<typed-badge>";
  15 | export interface Input { badge?: BadgeInput; }
  16 |
```

### Ln 13, Col 30
```marko
  11 |   <span>child</span>
  12 | </typed-badge>
> 13 | <typed-badge count="invalid" size="medium"/>
     |                              ^^^^ Type '"medium"' is not assignable to type '"small" | "large" | undefined'.
  14 | import type { Input as BadgeInput } from "<typed-badge>";
  15 | export interface Input { badge?: BadgeInput; }
  16 |
```

