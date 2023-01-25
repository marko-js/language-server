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
  15 | </for>
  16 |
  17 | <for|item| of=list>
```

### Ln 14, Col 13
```marko
  12 |
  13 | <for|item, index, all| of=list>
> 14 |   ${item} ${index} ${all}
     |             ^ (parameter) index: number
  15 | </for>
  16 |
  17 | <for|item| of=list>
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
  15 | </for>
  16 |
  17 | <for|item| of=list>
```

### Ln 24, Col 3
```marko
  22 |
  23 | <effect() {
> 24 |   hoistedFromForOf;
     |   ^ const hoistedFromForOf: 1 | 2 | 3
  25 | }/>
  26 |
  27 | <let/record={ a: 1, b: 2 } as const/>
```

### Ln 30, Col 5
```marko
  28 |
  29 | <for|key, value| in=record>
> 30 |   ${key} ${value}
     |     ^ (parameter) key: "a" | "b"
  31 | </for>
  32 |
  33 | <for|key| in=record>
```

### Ln 30, Col 12
```marko
  28 |
  29 | <for|key, value| in=record>
> 30 |   ${key} ${value}
     |            ^ (parameter) value: 1 | 2
  31 | </for>
  32 |
  33 | <for|key| in=record>
```

### Ln 38, Col 3
```marko
  36 |
  37 | <effect() {
> 38 |   hoistedFromForIn;
     |   ^ const hoistedFromForIn: "a" | "b"
  39 | }/>
  40 |
  41 | <for|index| to=10>
```

### Ln 42, Col 5
```marko
  40 |
  41 | <for|index| to=10>
> 42 |   ${index}
     |     ^ (parameter) index: number
  43 | </for>
  44 |
  45 | <for|index| from=1 to=10>
```

### Ln 46, Col 5
```marko
  44 |
  45 | <for|index| from=1 to=10>
> 46 |   ${index}
     |     ^ (parameter) index: number
  47 | </for>
  48 |
  49 | <for|index| to=10 step=2>
```

### Ln 50, Col 5
```marko
  48 |
  49 | <for|index| to=10 step=2>
> 50 |   ${index}
     |     ^ (parameter) index: number
  51 | </for>
  52 |
  53 | <for|index| to=10>
```

### Ln 58, Col 3
```marko
  56 |
  57 | <effect() {
> 58 |   hoistedFromForTo;
     |   ^ const hoistedFromForTo: number
  59 | }/>
  60 |
  61 | <for|index|>
```

## Source Diagnostics
### Ln 23, Col 2
```marko
  21 | <for|item| of=list></for>
  22 |
> 23 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  24 |   hoistedFromForOf;
  25 | }/>
  26 |
```

### Ln 37, Col 2
```marko
  35 | </for>
  36 |
> 37 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  38 |   hoistedFromForIn;
  39 | }/>
  40 |
```

### Ln 57, Col 2
```marko
  55 | </for>
  56 |
> 57 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  58 |   hoistedFromForTo;
  59 | }/>
  60 |
```

### Ln 61, Col 6
```marko
  59 | }/>
  60 |
> 61 | <for|index|>
     |      ^^^^^ 'index' is declared but its value is never read.
  62 |   Should error
  63 | </for>
  64 |
```

### Ln 61, Col 2
```marko
  59 | }/>
  60 |
> 61 | <for|index|>
     |  ^^^^^^^^^ No overload matches this call.
  The last overload gave the following error.
    Argument of type '{ renderBody: Marko.Body<[index: any], void, never>; }' is not assignable to parameter of type '({ from?: number | undefined; to: number; step?: number | undefined; } | { in: unknown; } | { of: readonly unknown[] | Iterable<unknown>; }) & { renderBody?: Body<any, any, unknown> | undefined; }'.
      Type '{ renderBody: Marko.Body<[index: any], void, never>; }' is not assignable to type '{ of: readonly unknown[] | Iterable<unknown>; } & { renderBody?: Body<any, any, unknown> | undefined; }'.
        Property 'of' is missing in type '{ renderBody: Marko.Body<[index: any], void, never>; }' but required in type '{ of: readonly unknown[] | Iterable<unknown>; }'.
  62 |   Should error
  63 | </for>
  64 |
```

