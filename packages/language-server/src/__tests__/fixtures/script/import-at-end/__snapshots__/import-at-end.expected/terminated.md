## Diagnostics
### Ln 1, Col 1
```marko
> 1 | import { foo } from "./missing"
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 'foo' is declared but its value is never read.
```

### Ln 1, Col 21
```marko
> 1 | import { foo } from "./missing"
    |                     ^^^^^^^^^^^ Cannot find module './missing' or its corresponding type declarations.
```

