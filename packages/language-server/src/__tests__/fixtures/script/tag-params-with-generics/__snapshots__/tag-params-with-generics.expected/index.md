## Hovers
### Ln 1, Col 9
```marko
> 1 | <loader|data| value() {
    |         ^ (parameter) data: number
  2 | //      ^?    ^?
  3 |   return 1;
  4 | }>
```

### Ln 1, Col 15
```marko
> 1 | <loader|data| value() {
    |               ^ (property) Input<number>.value?: (() => number) | undefined
  2 | //      ^?    ^?
  3 |   return 1;
  4 | }>
```

### Ln 8, Col 9
```marko
   6 | </loader>
   7 |
>  8 | <loader|data| value() {
     |         ^ (parameter) data: "hi"
   9 | //      ^?    ^?
  10 |   return "hi" as const;
  11 | }>
```

### Ln 8, Col 15
```marko
   6 | </loader>
   7 |
>  8 | <loader|data| value() {
     |               ^ (property) Input<"hi">.value?: (() => "hi") | undefined
   9 | //      ^?    ^?
  10 |   return "hi" as const;
  11 | }>
```

### Ln 15, Col 9
```marko
  13 | </loader>
  14 |
> 15 | <loader|data|>
     |         ^ (parameter) data: string
  16 | //      ^?
  17 |   
  18 | </loader>
```

## Diagnostics
### Ln 1, Col 9
```marko
> 1 | <loader|data| value() {
    |         ^^^^ 'data' is declared but its value is never read.
  2 | //      ^?    ^?
  3 |   return 1;
  4 | }>
```

### Ln 8, Col 9
```marko
   6 | </loader>
   7 |
>  8 | <loader|data| value() {
     |         ^^^^ 'data' is declared but its value is never read.
   9 | //      ^?    ^?
  10 |   return "hi" as const;
  11 | }>
```

### Ln 15, Col 9
```marko
  13 | </loader>
  14 |
> 15 | <loader|data|>
     |         ^^^^ 'data' is declared but its value is never read.
  16 | //      ^?
  17 |   
  18 | </loader>
```

