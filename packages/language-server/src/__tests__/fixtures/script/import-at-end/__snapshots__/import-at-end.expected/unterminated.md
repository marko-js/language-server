## Diagnostics
### Ln 1, Col 21
```marko
> 1 | import { foo } from "./missing
    |                     ^ EOF reached while parsing string expression
```

### Ln 1, Col 31
```marko
> 1 | import { foo } from "./missing
    |                               ^ Unterminated string literal.
```

### Ln 1, Col 21
```marko
> 1 | import { foo } from "./missing
    |                     ^^^^^^^^^^ Cannot find module './missing' or its corresponding type declarations.
```

