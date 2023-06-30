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

### Ln 25, Col 3
```marko
  23 |
  24 | <effect() {
> 25 |   hoistedFromForOf;
     |   ^ const hoistedFromForOf: 1 | 2 | 3
  26 | //^?
  27 | }/>
  28 |
```

### Ln 32, Col 5
```marko
  30 |
  31 | <for|key, value| in=record>
> 32 |   ${key} ${value}
     |     ^ (parameter) key: "a" | "b"
  33 | //  ^?     ^?
  34 | </for>
  35 |
```

### Ln 32, Col 12
```marko
  30 |
  31 | <for|key, value| in=record>
> 32 |   ${key} ${value}
     |            ^ (parameter) value: 1 | 2
  33 | //  ^?     ^?
  34 | </for>
  35 |
```

### Ln 41, Col 3
```marko
  39 |
  40 | <effect() {
> 41 |   hoistedFromForIn;
     |   ^ const hoistedFromForIn: "a" | "b"
  42 | //^?
  43 | }/>
  44 |
```

### Ln 46, Col 5
```marko
  44 |
  45 | <for|index| to=10>
> 46 |   ${index}
     |     ^ (parameter) index: number
  47 | //  ^?
  48 | </for>
  49 |
```

### Ln 51, Col 5
```marko
  49 |
  50 | <for|index| from=1 to=10>
> 51 |   ${index}
     |     ^ (parameter) index: number
  52 | //  ^?
  53 | </for>
  54 |
```

### Ln 56, Col 5
```marko
  54 |
  55 | <for|index| to=10 step=2>
> 56 |   ${index}
     |     ^ (parameter) index: number
  57 | //  ^?
  58 | </for>
  59 |
```

### Ln 65, Col 3
```marko
  63 |
  64 | <effect() {
> 65 |   hoistedFromForTo;
     |   ^ const hoistedFromForTo: number
  66 | //^?
  67 | }/>
  68 |
```

## Diagnostics
### Ln 22, Col 6
```marko
  20 | </for>
  21 |
> 22 | <for|item| of=list></for>
     |      ^^^^ 'item' is declared but its value is never read.
  23 |
  24 | <effect() {
  25 |   hoistedFromForOf;
```

### Ln 24, Col 2
```marko
  22 | <for|item| of=list></for>
  23 |
> 24 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  25 |   hoistedFromForOf;
  26 | //^?
  27 | }/>
```

### Ln 40, Col 2
```marko
  38 | </for>
  39 |
> 40 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  41 |   hoistedFromForIn;
  42 | //^?
  43 | }/>
```

### Ln 64, Col 2
```marko
  62 | </for>
  63 |
> 64 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  65 |   hoistedFromForTo;
  66 | //^?
  67 | }/>
```

### Ln 69, Col 2
```marko
  67 | }/>
  68 |
> 69 | <for|index|>
     |  ^^^^^^^^^ No overload matches this call.
  The last overload gave the following error.
    Argument of type '{ renderBody: (index: any) => MarkoReturn<void>; }' is not assignable to parameter of type '({ from?: number | undefined; to: number; step?: number | undefined; } | { in: unknown; } | { of: readonly unknown[] | Iterable<unknown>; }) & { renderBody?: AnyMarkoBody | undefined; }'.
      Type '{ renderBody: (index: any) => MarkoReturn<void>; }' is not assignable to type '{ of: readonly unknown[] | Iterable<unknown>; } & { renderBody?: AnyMarkoBody | undefined; }'.
        Property 'of' is missing in type '{ renderBody: (index: any) => MarkoReturn<void>; }' but required in type '{ of: readonly unknown[] | Iterable<unknown>; }'.
  70 |   Should error
  71 | </for>
  72 |
```

### Ln 69, Col 6
```marko
  67 | }/>
  68 |
> 69 | <for|index|>
     |      ^^^^^ 'index' is declared but its value is never read.
  70 |   Should error
  71 | </for>
  72 |
```

