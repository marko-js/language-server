## Hovers
### Ln 1, Col 9
```marko
> 1 | <loader|data| value() {
    |         ^ (parameter) data: number
  2 |   return 1;
  3 | }>
  4 |   
```

### Ln 1, Col 15
```marko
> 1 | <loader|data| value() {
    |               ^ (property) Input<number>.value?: (() => number) | undefined
  2 |   return 1;
  3 | }>
  4 |   
```

### Ln 7, Col 9
```marko
   5 | </loader>
   6 |
>  7 | <loader|data| value() {
     |         ^ (parameter) data: "hi"
   8 |   return "hi" as const;
   9 | }>
  10 |
```

### Ln 7, Col 15
```marko
   5 | </loader>
   6 |
>  7 | <loader|data| value() {
     |               ^ (property) Input<"hi">.value?: (() => "hi") | undefined
   8 |   return "hi" as const;
   9 | }>
  10 |
```

### Ln 13, Col 9
```marko
  11 | </loader>
  12 |
> 13 | <loader|data|>
     |         ^ (parameter) data: string
  14 |   
  15 | </loader>
  16 |
```

## Source Diagnostics
### Ln 1, Col 9
```marko
> 1 | <loader|data| value() {
    |         ^^^^ 'data' is declared but its value is never read.
  2 |   return 1;
  3 | }>
  4 |   
```

### Ln 7, Col 9
```marko
   5 | </loader>
   6 |
>  7 | <loader|data| value() {
     |         ^^^^ 'data' is declared but its value is never read.
   8 |   return "hi" as const;
   9 | }>
  10 |
```

### Ln 13, Col 9
```marko
  11 | </loader>
  12 |
> 13 | <loader|data|>
     |         ^^^^ 'data' is declared but its value is never read.
  14 |   
  15 | </loader>
  16 |
```

