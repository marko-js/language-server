## Hovers
### Ln 24, Col 9
```marko
  22 |   <for|item, index, all| of=list>
  23 |     <@a>
> 24 |       ${item} ${index} ${all}
     |         ^ (parameter) item: {
    readonly value: 1;
} | {
    readonly value: 2;
} | {
    readonly value: 3;
}
  25 |     </@a>
  26 |   </for>
  27 | </>
```

### Ln 24, Col 17
```marko
  22 |   <for|item, index, all| of=list>
  23 |     <@a>
> 24 |       ${item} ${index} ${all}
     |                 ^ (parameter) index: number
  25 |     </@a>
  26 |   </for>
  27 | </>
```

### Ln 24, Col 26
```marko
  22 |   <for|item, index, all| of=list>
  23 |     <@a>
> 24 |       ${item} ${index} ${all}
     |                          ^ (parameter) all: readonly [{
    readonly value: 1;
}, {
    readonly value: 2;
}, {
    readonly value: 3;
}]
  25 |     </@a>
  26 |   </for>
  27 | </>
```

### Ln 32, Col 9
```marko
  30 |   <for|item, index| of=list>
  31 |     <@a>
> 32 |       ${item}
     |         ^ (parameter) item: {
    readonly value: 1;
} | {
    readonly value: 2;
} | {
    readonly value: 3;
}
  33 |     </@a>
  34 |     <@b>
  35 |       ${index}
```

### Ln 35, Col 9
```marko
  33 |     </@a>
  34 |     <@b>
> 35 |       ${index}
     |         ^ (parameter) index: number
  36 |     </@b>
  37 |   </for>
  38 | </>
```

### Ln 49, Col 3
```marko
  47 |
  48 | <effect() {
> 49 |   hoistedFromForOf;
     |   ^ const hoistedFromForOf: 1 | 2 | 3
  50 | }/>
  51 |
  52 | <let/record={ a: 1, b: 2 } as const/>
```

### Ln 57, Col 9
```marko
  55 |   <for|key, value| in=record>
  56 |     <@a>
> 57 |       ${key} ${value}
     |         ^ (parameter) key: "a" | "b"
  58 |     </@a>
  59 |   </for>
  60 | </>
```

### Ln 57, Col 16
```marko
  55 |   <for|key, value| in=record>
  56 |     <@a>
> 57 |       ${key} ${value}
     |                ^ (parameter) value: 1 | 2
  58 |     </@a>
  59 |   </for>
  60 | </>
```

### Ln 71, Col 3
```marko
  69 |
  70 | <effect() {
> 71 |   hoistedFromForIn;
     |   ^ const hoistedFromForIn: "a" | "b"
  72 | }/>
  73 |
  74 | <${custom}>
```

### Ln 77, Col 9
```marko
  75 |   <for|index| to=10>
  76 |     <@a>
> 77 |       ${index}
     |         ^ (parameter) index: number
  78 |     </@a>
  79 |   </for>
  80 | </>
```

### Ln 86, Col 9
```marko
  84 |   <for|index| from=1 to=10>
  85 |     <@a>
> 86 |       ${index}
     |         ^ (parameter) index: number
  87 |     </@a>
  88 |   </for>
  89 | </>
```

### Ln 94, Col 9
```marko
  92 |   <for|index| to=10 step=2>
  93 |     <@a>
> 94 |       ${index}
     |         ^ (parameter) index: number
  95 |     </@a>
  96 |   </for>
  97 | </>
```

### Ln 108, Col 3
```marko
  106 |
  107 | <effect() {
> 108 |   hoistedFromForTo;
      |   ^ const hoistedFromForTo: number
  109 | }/>
  110 |
```

## Source Diagnostics
### Ln 1, Col 4
```marko
> 1 | <${custom}>
    |    ^^^^^^ Cannot find name 'custom'.
  2 |   <for>
  3 |     <@a/>
  4 |   </for>
```

### Ln 2, Col 4
```marko
  1 | <${custom}>
> 2 |   <for>
    |    ^^^ No overload matches this call.
  Overload 1 of 4, '(input: { of: readonly any[] | Iterable<any>; }, renderBody: (value: any, index: number, all: readonly any[] | Iterable<any>) => { a: {}; }): { a: MaybeRepeatable<{}>; }', gave the following error.
    Argument of type '{}' is not assignable to parameter of type '{ of: readonly any[] | Iterable<any>; }'.
      Property 'of' is missing in type '{}' but required in type '{ of: readonly any[] | Iterable<any>; }'.
  Overload 2 of 4, '(input: { in: object; }, renderBody: (key: never, value: never) => { a: {}; }): { a: undefined; }', gave the following error.
    Argument of type '{}' is not assignable to parameter of type '{ in: object; }'.
      Property 'in' is missing in type '{}' but required in type '{ in: object; }'.
  Overload 3 of 4, '(input: { from?: number | void | undefined; to: number; step?: number | void | undefined; }, renderBody: (index: number) => { a: {}; }): { a: MaybeRepeatable<{}>; }', gave the following error.
    Argument of type '{}' is not assignable to parameter of type '{ from?: number | void | undefined; to: number; step?: number | void | undefined; }'.
      Property 'to' is missing in type '{}' but required in type '{ from?: number | void | undefined; to: number; step?: number | void | undefined; }'.
  3 |     <@a/>
  4 |   </for>
  5 | </>
```

### Ln 15, Col 4
```marko
  13 | }] as const/>
  14 |
> 15 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  16 |   <for of=list>
  17 |     <@a/>
  18 |   </for>
```

### Ln 21, Col 4
```marko
  19 | </>
  20 |
> 21 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  22 |   <for|item, index, all| of=list>
  23 |     <@a>
  24 |       ${item} ${index} ${all}
```

### Ln 29, Col 4
```marko
  27 | </>
  28 |
> 29 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  30 |   <for|item, index| of=list>
  31 |     <@a>
  32 |       ${item}
```

### Ln 40, Col 4
```marko
  38 | </>
  39 |
> 40 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  41 |   <for|item| of=list>
  42 |     <@a>
  43 |       <const/{ value: hoistedFromForOf } = item/>
```

### Ln 48, Col 2
```marko
  46 | </>
  47 |
> 48 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  49 |   hoistedFromForOf;
  50 | }/>
  51 |
```

### Ln 54, Col 4
```marko
  52 | <let/record={ a: 1, b: 2 } as const/>
  53 |
> 54 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  55 |   <for|key, value| in=record>
  56 |     <@a>
  57 |       ${key} ${value}
```

### Ln 62, Col 4
```marko
  60 | </>
  61 |
> 62 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  63 |   <for|key| in=record>
  64 |     <@a>
  65 |       <const/hoistedFromForIn = key/>
```

### Ln 70, Col 2
```marko
  68 | </>
  69 |
> 70 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  71 |   hoistedFromForIn;
  72 | }/>
  73 |
```

### Ln 74, Col 4
```marko
  72 | }/>
  73 |
> 74 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  75 |   <for|index| to=10>
  76 |     <@a>
  77 |       ${index}
```

### Ln 83, Col 4
```marko
  81 |
  82 |
> 83 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  84 |   <for|index| from=1 to=10>
  85 |     <@a>
  86 |       ${index}
```

### Ln 91, Col 4
```marko
  89 | </>
  90 |
> 91 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  92 |   <for|index| to=10 step=2>
  93 |     <@a>
  94 |       ${index}
```

### Ln 99, Col 4
```marko
   97 | </>
   98 |
>  99 | <${custom}>
      |    ^^^^^^ Cannot find name 'custom'.
  100 |   <for|index| to=10>
  101 |     <@a>
  102 |       <const/hoistedFromForTo = index/>
```

### Ln 107, Col 2
```marko
  105 | </>
  106 |
> 107 | <effect() {
      |  ^^^^^^ Cannot find name 'effect'.
  108 |   hoistedFromForTo;
  109 | }/>
  110 |
```

