## Hovers
### Ln 14, Col 5
```marko
  12 |
  13 | <for|item, index, all| of=list>
> 14 |   ${item} ${index} ${all}
     |     ^ (parameter) item: {
    readonly value: 1;
} | {
    readonly value: 2;
} | {
    readonly value: 3;
}
  15 | //  ^?      ^?       ^?
  16 | </for>
  17 |
```

### Ln 14, Col 13
```marko
  12 |
  13 | <for|item, index, all| of=list>
> 14 |   ${item} ${index} ${all}
     |             ^ (parameter) index: number
  15 | //  ^?      ^?       ^?
  16 | </for>
  17 |
```

### Ln 14, Col 22
```marko
  12 |
  13 | <for|item, index, all| of=list>
> 14 |   ${item} ${index} ${all}
     |                      ^ (parameter) all: readonly [{
    readonly value: 1;
}, {
    readonly value: 2;
}, {
    readonly value: 3;
}]
  15 | //  ^?      ^?       ^?
  16 | </for>
  17 |
```

### Ln 18, Col 18
```marko
  16 | </for>
  17 |
> 18 | <for of=list by=(item, index) => `${item}-${index}`>
     |                  ^ (parameter) item: {
    readonly value: 1;
} | {
    readonly value: 2;
} | {
    readonly value: 3;
}
  19 | //               ^?    ^?
  20 | </for>
  21 |
```

### Ln 18, Col 24
```marko
  16 | </for>
  17 |
> 18 | <for of=list by=(item, index) => `${item}-${index}`>
     |                        ^ (parameter) index: number
  19 | //               ^?    ^?
  20 | </for>
  21 |
```

### Ln 29, Col 3
```marko
  27 |
  28 | <effect() {
> 29 |   hoistedFromForOf;
     |   ^ const hoistedFromForOf: 1 | 2 | 3
  30 | //^?
  31 | }/>
  32 |
```

### Ln 36, Col 5
```marko
  34 |
  35 | <for|key, value| in=record>
> 36 |   ${key} ${value}
     |     ^ (parameter) key: "a" | "b"
  37 | //  ^?     ^?
  38 | </for>
  39 |
```

### Ln 36, Col 12
```marko
  34 |
  35 | <for|key, value| in=record>
> 36 |   ${key} ${value}
     |            ^ (parameter) value: 1 | 2
  37 | //  ^?     ^?
  38 | </for>
  39 |
```

### Ln 40, Col 20
```marko
  38 | </for>
  39 |
> 40 | <for in=record by=(value, key) => `${value}-${key}`>
     |                    ^ (parameter) value: 1 | 2
  41 | //                 ^?     ^?
  42 | </for>
  43 |
```

### Ln 40, Col 27
```marko
  38 | </for>
  39 |
> 40 | <for in=record by=(value, key) => `${value}-${key}`>
     |                           ^ (parameter) key: "a" | "b"
  41 | //                 ^?     ^?
  42 | </for>
  43 |
```

### Ln 49, Col 3
```marko
  47 |
  48 | <effect() {
> 49 |   hoistedFromForIn;
     |   ^ const hoistedFromForIn: "a" | "b"
  50 | //^?
  51 | }/>
  52 |
```

### Ln 54, Col 5
```marko
  52 |
  53 | <for|index| to=10>
> 54 |   ${index}
     |     ^ (parameter) index: number
  55 | //  ^?
  56 | </for>
  57 |
```

### Ln 58, Col 16
```marko
  56 | </for>
  57 |
> 58 | <for to=10 by=(index) => `${index}`>
     |                ^ (parameter) index: number
  59 | //             ^?
  60 | </for>
  61 |
```

### Ln 63, Col 5
```marko
  61 |
  62 | <for|index| from=1 to=10>
> 63 |   ${index}
     |     ^ (parameter) index: number
  64 | //  ^?
  65 | </for>
  66 |
```

### Ln 68, Col 5
```marko
  66 |
  67 | <for|index| to=10 step=2>
> 68 |   ${index}
     |     ^ (parameter) index: number
  69 | //  ^?
  70 | </for>
  71 |
```

### Ln 77, Col 3
```marko
  75 |
  76 | <effect() {
> 77 |   hoistedFromForUntil;
     |   ^ const hoistedFromForUntil: number
  78 | //^?
  79 | }/>
  80 |
```

### Ln 82, Col 5
```marko
  80 |
  81 | <for|index| until=10>
> 82 |   ${index}
     |     ^ (parameter) index: number
  83 | //  ^?
  84 | </for>
  85 |
```

### Ln 86, Col 16
```marko
  84 | </for>
  85 |
> 86 | <for until=10 by=(index) => `${index}`>
     |                ^ (property) by?: ((index: number) => string) | undefined
  87 | //             ^?
  88 | </for>
  89 |
```

### Ln 91, Col 5
```marko
  89 |
  90 | <for|index| from=1 until=10>
> 91 |   ${index}
     |     ^ (parameter) index: number
  92 | //  ^?
  93 | </for>
  94 |
```

### Ln 96, Col 5
```marko
  94 |
  95 | <for|index| until=10 step=2>
> 96 |   ${index}
     |     ^ (parameter) index: number
  97 | //  ^?
  98 | </for>
  99 |
```

### Ln 105, Col 3
```marko
  103 |
  104 | <effect() {
> 105 |   hoistedFromForUntil;
      |   ^ const hoistedFromForUntil: number
  106 | //^?
  107 | }/>
  108 |
```

## Diagnostics
### Ln 26, Col 6
```marko
  24 | </for>
  25 |
> 26 | <for|item| of=list></for>
     |      ^^^^ 'item' is declared but its value is never read.
  27 |
  28 | <effect() {
  29 |   hoistedFromForOf;
```

### Ln 110, Col 2
```marko
  108 |
  109 |
> 110 | <for|index|>
      |  ^^^ Argument of type '{}' is not assignable to parameter of type '({ from?: number | undefined; to: number; step?: number | undefined; } | { from?: number | undefined; until: number; step?: number | undefined; } | { in: false | void | object | null; } | { ...; }) & { ...; }'.
  111 |   Should error
  112 | </for>
  113 |
```

### Ln 110, Col 6
```marko
  108 |
  109 |
> 110 | <for|index|>
      |      ^^^^^ 'index' is declared but its value is never read.
  111 |   Should error
  112 | </for>
  113 |
```

