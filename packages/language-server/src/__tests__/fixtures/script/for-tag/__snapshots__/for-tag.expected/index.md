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
> 77 |   hoistedFromForTo;
     |   ^ const hoistedFromForTo: number
  78 | //^?
  79 | }/>
  80 |
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

### Ln 28, Col 2
```marko
  26 | <for|item| of=list></for>
  27 |
> 28 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  29 |   hoistedFromForOf;
  30 | //^?
  31 | }/>
```

### Ln 48, Col 2
```marko
  46 | </for>
  47 |
> 48 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  49 |   hoistedFromForIn;
  50 | //^?
  51 | }/>
```

### Ln 76, Col 2
```marko
  74 | </for>
  75 |
> 76 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  77 |   hoistedFromForTo;
  78 | //^?
  79 | }/>
```

### Ln 81, Col 2
```marko
  79 | }/>
  80 |
> 81 | <for|index|>
     |  ^^^^^^^^^ No overload matches this call.
  The last overload gave the following error.
    Argument of type '{ renderBody: (index: any) => MarkoReturn<void>; }' is not assignable to parameter of type '({ from?: number | undefined; to: number; step?: number | undefined; } | { in: unknown; } | { of: readonly unknown[] | Iterable<unknown>; }) & { renderBody?: AnyMarkoBody | undefined; by?: ((...args: unknown[]) => string) | undefined; }'.
      Type '{ renderBody: (index: any) => MarkoReturn<void>; }' is not assignable to type '{ of: readonly unknown[] | Iterable<unknown>; } & { renderBody?: AnyMarkoBody | undefined; by?: ((...args: unknown[]) => string) | undefined; }'.
        Property 'of' is missing in type '{ renderBody: (index: any) => MarkoReturn<void>; }' but required in type '{ of: readonly unknown[] | Iterable<unknown>; }'.
  82 |   Should error
  83 | </for>
  84 |
```

### Ln 81, Col 6
```marko
  79 | }/>
  80 |
> 81 | <for|index|>
     |      ^^^^^ 'index' is declared but its value is never read.
  82 |   Should error
  83 | </for>
  84 |
```

