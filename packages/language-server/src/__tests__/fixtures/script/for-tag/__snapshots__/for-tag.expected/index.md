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

### Ln 33, Col 3
```marko
  31 |
  32 | <effect() {
> 33 |   hoistedFromForOf;
     |   ^ const hoistedFromForOf: (() => 1 | 2 | 3) & Iterable<1 | 2 | 3>
  34 | //^?
  35 | }/>
  36 |
```

### Ln 40, Col 5
```marko
  38 |
  39 | <for|key, value| in=record>
> 40 |   ${key} ${value}
     |     ^ (parameter) key: "a" | "b"
  41 | //  ^?     ^?
  42 | </for>
  43 |
```

### Ln 40, Col 12
```marko
  38 |
  39 | <for|key, value| in=record>
> 40 |   ${key} ${value}
     |            ^ (parameter) value: 1 | 2
  41 | //  ^?     ^?
  42 | </for>
  43 |
```

### Ln 44, Col 20
```marko
  42 | </for>
  43 |
> 44 | <for in=record by=(key, value) => `${key}-${value}`>
     |                    ^ (parameter) key: "a" | "b"
  45 | //                 ^?   ^?
  46 | </for>
  47 |
```

### Ln 44, Col 25
```marko
  42 | </for>
  43 |
> 44 | <for in=record by=(key, value) => `${key}-${value}`>
     |                         ^ (parameter) value: 1 | 2
  45 | //                 ^?   ^?
  46 | </for>
  47 |
```

### Ln 53, Col 3
```marko
  51 |
  52 | <effect() {
> 53 |   hoistedFromForIn;
     |   ^ const hoistedFromForIn: (() => "a" | "b") & Iterable<"a" | "b">
  54 | //^?
  55 | }/>
  56 |
```

### Ln 58, Col 5
```marko
  56 |
  57 | <for|index| to=10>
> 58 |   ${index}
     |     ^ (parameter) index: number
  59 | //  ^?
  60 | </for>
  61 |
```

### Ln 62, Col 16
```marko
  60 | </for>
  61 |
> 62 | <for to=10 by=(index) => `${index}`>
     |                ^ (parameter) index: number
  63 | //             ^?
  64 | </for>
  65 |
```

### Ln 67, Col 5
```marko
  65 |
  66 | <for|index| from=1 to=10>
> 67 |   ${index}
     |     ^ (parameter) index: number
  68 | //  ^?
  69 | </for>
  70 |
```

### Ln 72, Col 5
```marko
  70 |
  71 | <for|index| to=10 step=2>
> 72 |   ${index}
     |     ^ (parameter) index: number
  73 | //  ^?
  74 | </for>
  75 |
```

### Ln 81, Col 3
```marko
  79 |
  80 | <effect() {
> 81 |   hoistedFromForUntil;
     |   ^ const hoistedFromForUntil: (() => number) & Iterable<number>
  82 | //^?
  83 | }/>
  84 |
```

### Ln 86, Col 5
```marko
  84 |
  85 | <for|index| until=10>
> 86 |   ${index}
     |     ^ (parameter) index: number
  87 | //  ^?
  88 | </for>
  89 |
```

### Ln 90, Col 16
```marko
  88 | </for>
  89 |
> 90 | <for until=10 by=(index) => `${index}`>
     |                ^ (property) by?: ((index: number) => string | number) | undefined
  91 | //             ^?
  92 | </for>
  93 |
```

### Ln 95, Col 5
```marko
  93 |
  94 | <for|index| from=1 until=10>
> 95 |   ${index}
     |     ^ (parameter) index: number
  96 | //  ^?
  97 | </for>
  98 |
```

### Ln 100, Col 5
```marko
   98 |
   99 | <for|index| until=10 step=2>
> 100 |   ${index}
      |     ^ (parameter) index: number
  101 | //  ^?
  102 | </for>
  103 |
```

### Ln 109, Col 3
```marko
  107 |
  108 | <effect() {
> 109 |   hoistedFromForUntil;
      |   ^ const hoistedFromForUntil: (() => number) & Iterable<number>
  110 | //^?
  111 | }/>
  112 |
```

## Diagnostics
### Ln 32, Col 1
```marko
  30 | <for|item| of=list></for>
  31 |
> 32 | <effect() {
     | ^^^^^^^^^^^
> 33 |   hoistedFromForOf;
     | ^^^^^^^^^^^^^^^^^^^
> 34 | //^?
     | ^^^^^^^^^^^^^^^^^^^
> 35 | }/>
     | ^^^^ The 'effect' tag has been replaced by the 'script' tag.
  36 |
  37 | <let/record={ a: 1, b: 2 } as const/>
  38 |
```

### Ln 52, Col 1
```marko
  50 | </for>
  51 |
> 52 | <effect() {
     | ^^^^^^^^^^^
> 53 |   hoistedFromForIn;
     | ^^^^^^^^^^^^^^^^^^^
> 54 | //^?
     | ^^^^^^^^^^^^^^^^^^^
> 55 | }/>
     | ^^^^ The 'effect' tag has been replaced by the 'script' tag.
  56 |
  57 | <for|index| to=10>
  58 |   ${index}
```

### Ln 80, Col 1
```marko
  78 | </for>
  79 |
> 80 | <effect() {
     | ^^^^^^^^^^^
> 81 |   hoistedFromForUntil;
     | ^^^^^^^^^^^^^^^^^^^^^^
> 82 | //^?
     | ^^^^^^^^^^^^^^^^^^^^^^
> 83 | }/>
     | ^^^^ The 'effect' tag has been replaced by the 'script' tag.
  84 |
  85 | <for|index| until=10>
  86 |   ${index}
```

### Ln 108, Col 1
```marko
  106 | </for>
  107 |
> 108 | <effect() {
      | ^^^^^^^^^^^
> 109 |   hoistedFromForUntil;
      | ^^^^^^^^^^^^^^^^^^^^^^
> 110 | //^?
      | ^^^^^^^^^^^^^^^^^^^^^^
> 111 | }/>
      | ^^^^ The 'effect' tag has been replaced by the 'script' tag.
  112 |
  113 |
  114 | <for|index|>
```

### Ln 30, Col 6
```marko
  28 | </for>
  29 |
> 30 | <for|item| of=list></for>
     |      ^^^^ 'item' is declared but its value is never read.
  31 |
  32 | <effect() {
  33 |   hoistedFromForOf;
```

### Ln 114, Col 2
```marko
  112 |
  113 |
> 114 | <for|index|>
      |  ^^^ Argument of type '{}' is not assignable to parameter of type '({ to: number; from?: number | undefined; step?: number | undefined; } | { until: number; from?: number | undefined; step?: number | undefined; } | { in: any; } | { of: any; }) & { by?: string | ((...args: unknown[]) => string | number) | undefined; }'.
  115 |   Should error
  116 | </for>
  117 |
```

### Ln 114, Col 6
```marko
  112 |
  113 |
> 114 | <for|index|>
      |      ^^^^^ 'index' is declared but its value is never read.
  115 |   Should error
  116 | </for>
  117 |
```

## Code Actions
### The 'effect' tag has been replaced by the 'script' tag.
```marko
<let/list=[
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
] as const>
<for of=list>Repeated!</for>
<for|item, index, all| of=list>
  ${item} ${index} ${all}
  //  ^?      ^?       ^?
</for>
<for of=list by=(item, index) => `${item}-${index}`>
  //               ^?    ^?
</for>
<for|item| of=list by=(item) => item.value>${item.value}</for>
<for|item| of=list>
  <const/hoistedFromForOf=() => item.value>
</for>
<for|item| of=list/>
<script>
  hoistedFromForOf;
  //^?
</script>
<let/record={
  a: 1,
  b: 2,
} as const>
<for|key, value| in=record>
  ${key} ${value}
  //  ^?     ^?
</for>
<for in=record by=(key, value) => `${key}-${value}`>
  //                 ^?   ^?
</for>
<for|key| in=record>
  <const/hoistedFromForIn=() => key>
</for>
<effect() {
  hoistedFromForIn;
  //^?
}/>
<for|index| to=10>
  ${index}
  //  ^?
</for>
<for to=10 by=(index) => `${index}`>
  //             ^?
</for>
<for|index| from=1 to=10>
  ${index}
  //  ^?
</for>
<for|index| to=10 step=2>
  ${index}
  //  ^?
</for>
<for|index| to=10>
  <const/hoistedFromForTo=() => index>
</for>
<effect() {
  hoistedFromForUntil;
  //^?
}/>
<for|index| until=10>
  ${index}
  //  ^?
</for>
<for until=10 by=(index) => `${index}`>
  //             ^?
</for>
<for|index| from=1 until=10>
  ${index}
  //  ^?
</for>
<for|index| until=10 step=2>
  ${index}
  //  ^?
</for>
<for|index| until=10>
  <const/hoistedFromForUntil=() => index>
</for>
<effect() {
  hoistedFromForUntil;
  //^?
}/>
<for|index|>Should error</for>

```

### The 'effect' tag has been replaced by the 'script' tag.
```marko
<let/list=[
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
] as const>
<for of=list>Repeated!</for>
<for|item, index, all| of=list>
  ${item} ${index} ${all}
  //  ^?      ^?       ^?
</for>
<for of=list by=(item, index) => `${item}-${index}`>
  //               ^?    ^?
</for>
<for|item| of=list by=(item) => item.value>${item.value}</for>
<for|item| of=list>
  <const/hoistedFromForOf=() => item.value>
</for>
<for|item| of=list/>
<effect() {
  hoistedFromForOf;
  //^?
}/>
<let/record={
  a: 1,
  b: 2,
} as const>
<for|key, value| in=record>
  ${key} ${value}
  //  ^?     ^?
</for>
<for in=record by=(key, value) => `${key}-${value}`>
  //                 ^?   ^?
</for>
<for|key| in=record>
  <const/hoistedFromForIn=() => key>
</for>
<script>
  hoistedFromForIn;
  //^?
</script>
<for|index| to=10>
  ${index}
  //  ^?
</for>
<for to=10 by=(index) => `${index}`>
  //             ^?
</for>
<for|index| from=1 to=10>
  ${index}
  //  ^?
</for>
<for|index| to=10 step=2>
  ${index}
  //  ^?
</for>
<for|index| to=10>
  <const/hoistedFromForTo=() => index>
</for>
<effect() {
  hoistedFromForUntil;
  //^?
}/>
<for|index| until=10>
  ${index}
  //  ^?
</for>
<for until=10 by=(index) => `${index}`>
  //             ^?
</for>
<for|index| from=1 until=10>
  ${index}
  //  ^?
</for>
<for|index| until=10 step=2>
  ${index}
  //  ^?
</for>
<for|index| until=10>
  <const/hoistedFromForUntil=() => index>
</for>
<effect() {
  hoistedFromForUntil;
  //^?
}/>
<for|index|>Should error</for>

```

### The 'effect' tag has been replaced by the 'script' tag.
```marko
<let/list=[
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
] as const>
<for of=list>Repeated!</for>
<for|item, index, all| of=list>
  ${item} ${index} ${all}
  //  ^?      ^?       ^?
</for>
<for of=list by=(item, index) => `${item}-${index}`>
  //               ^?    ^?
</for>
<for|item| of=list by=(item) => item.value>${item.value}</for>
<for|item| of=list>
  <const/hoistedFromForOf=() => item.value>
</for>
<for|item| of=list/>
<effect() {
  hoistedFromForOf;
  //^?
}/>
<let/record={
  a: 1,
  b: 2,
} as const>
<for|key, value| in=record>
  ${key} ${value}
  //  ^?     ^?
</for>
<for in=record by=(key, value) => `${key}-${value}`>
  //                 ^?   ^?
</for>
<for|key| in=record>
  <const/hoistedFromForIn=() => key>
</for>
<effect() {
  hoistedFromForIn;
  //^?
}/>
<for|index| to=10>
  ${index}
  //  ^?
</for>
<for to=10 by=(index) => `${index}`>
  //             ^?
</for>
<for|index| from=1 to=10>
  ${index}
  //  ^?
</for>
<for|index| to=10 step=2>
  ${index}
  //  ^?
</for>
<for|index| to=10>
  <const/hoistedFromForTo=() => index>
</for>
<script>
  hoistedFromForUntil;
  //^?
</script>
<for|index| until=10>
  ${index}
  //  ^?
</for>
<for until=10 by=(index) => `${index}`>
  //             ^?
</for>
<for|index| from=1 until=10>
  ${index}
  //  ^?
</for>
<for|index| until=10 step=2>
  ${index}
  //  ^?
</for>
<for|index| until=10>
  <const/hoistedFromForUntil=() => index>
</for>
<effect() {
  hoistedFromForUntil;
  //^?
}/>
<for|index|>Should error</for>

```

### The 'effect' tag has been replaced by the 'script' tag.
```marko
<let/list=[
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
] as const>
<for of=list>Repeated!</for>
<for|item, index, all| of=list>
  ${item} ${index} ${all}
  //  ^?      ^?       ^?
</for>
<for of=list by=(item, index) => `${item}-${index}`>
  //               ^?    ^?
</for>
<for|item| of=list by=(item) => item.value>${item.value}</for>
<for|item| of=list>
  <const/hoistedFromForOf=() => item.value>
</for>
<for|item| of=list/>
<effect() {
  hoistedFromForOf;
  //^?
}/>
<let/record={
  a: 1,
  b: 2,
} as const>
<for|key, value| in=record>
  ${key} ${value}
  //  ^?     ^?
</for>
<for in=record by=(key, value) => `${key}-${value}`>
  //                 ^?   ^?
</for>
<for|key| in=record>
  <const/hoistedFromForIn=() => key>
</for>
<effect() {
  hoistedFromForIn;
  //^?
}/>
<for|index| to=10>
  ${index}
  //  ^?
</for>
<for to=10 by=(index) => `${index}`>
  //             ^?
</for>
<for|index| from=1 to=10>
  ${index}
  //  ^?
</for>
<for|index| to=10 step=2>
  ${index}
  //  ^?
</for>
<for|index| to=10>
  <const/hoistedFromForTo=() => index>
</for>
<effect() {
  hoistedFromForUntil;
  //^?
}/>
<for|index| until=10>
  ${index}
  //  ^?
</for>
<for until=10 by=(index) => `${index}`>
  //             ^?
</for>
<for|index| from=1 until=10>
  ${index}
  //  ^?
</for>
<for|index| until=10 step=2>
  ${index}
  //  ^?
</for>
<for|index| until=10>
  <const/hoistedFromForUntil=() => index>
</for>
<script>
  hoistedFromForUntil;
  //^?
</script>
<for|index|>Should error</for>

```

### Fix all auto-fixable Marko issues
```marko
<let/list=[
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
] as const>
<for of=list>Repeated!</for>
<for|item, index, all| of=list>
  ${item} ${index} ${all}
  //  ^?      ^?       ^?
</for>
<for of=list by=(item, index) => `${item}-${index}`>
  //               ^?    ^?
</for>
<for|item| of=list by=(item) => item.value>${item.value}</for>
<for|item| of=list>
  <const/hoistedFromForOf=() => item.value>
</for>
<for|item| of=list/>
<script>
  hoistedFromForOf;
  //^?
</script>
<let/record={
  a: 1,
  b: 2,
} as const>
<for|key, value| in=record>
  ${key} ${value}
  //  ^?     ^?
</for>
<for in=record by=(key, value) => `${key}-${value}`>
  //                 ^?   ^?
</for>
<for|key| in=record>
  <const/hoistedFromForIn=() => key>
</for>
<script>
  hoistedFromForIn;
  //^?
</script>
<for|index| to=10>
  ${index}
  //  ^?
</for>
<for to=10 by=(index) => `${index}`>
  //             ^?
</for>
<for|index| from=1 to=10>
  ${index}
  //  ^?
</for>
<for|index| to=10 step=2>
  ${index}
  //  ^?
</for>
<for|index| to=10>
  <const/hoistedFromForTo=() => index>
</for>
<script>
  hoistedFromForUntil;
  //^?
</script>
<for|index| until=10>
  ${index}
  //  ^?
</for>
<for until=10 by=(index) => `${index}`>
  //             ^?
</for>
<for|index| from=1 until=10>
  ${index}
  //  ^?
</for>
<for|index| until=10 step=2>
  ${index}
  //  ^?
</for>
<for|index| until=10>
  <const/hoistedFromForUntil=() => index>
</for>
<script>
  hoistedFromForUntil;
  //^?
</script>
<for|index|>Should error</for>

```

