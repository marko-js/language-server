## Hovers
### Ln 1, Col 6
```marko
> 1 | <let/b = 1/>
    |      ^ const b: number
  2 | //   ^?  ^?
  3 |
  4 | <child value:parseInt:=b/>
```

### Ln 4, Col 9
```marko
  2 | //   ^?  ^?
  3 |
> 4 | <child value:parseInt:=b/>
    |         ^ (property) Input.value: string | number
  5 | //      ^?    ^?       ^?
  6 |
  7 | <child value:Boolean:=b/>
```

### Ln 4, Col 15
```marko
  2 | //   ^?  ^?
  3 |
> 4 | <child value:parseInt:=b/>
    |               ^ function parseInt(string: string, radix?: number): number
---
Converts a string to an integer.  

*@param* `string` — A string to convert into a number.  

*@param* `radix`  
A value between 2 and 36 that specifies the base of the number in `string`.
If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
All other strings are considered decimal.
  5 | //      ^?    ^?       ^?
  6 |
  7 | <child value:Boolean:=b/>
```

### Ln 4, Col 24
```marko
  2 | //   ^?  ^?
  3 |
> 4 | <child value:parseInt:=b/>
    |                        ^ const b: number
  5 | //      ^?    ^?       ^?
  6 |
  7 | <child value:Boolean:=b/>
```

### Ln 7, Col 9
```marko
  5 | //      ^?    ^?       ^?
  6 |
> 7 | <child value:Boolean:=b/>
    |         ^ (property) Input.value: string | number
  8 | //      ^?    ^?      ^?
  9 |
```

### Ln 7, Col 15
```marko
  5 | //      ^?    ^?       ^?
  6 |
> 7 | <child value:Boolean:=b/>
    |               ^ var Boolean: BooleanConstructor
<string>(value?: string | undefined) => boolean
  8 | //      ^?    ^?      ^?
  9 |
```

### Ln 7, Col 23
```marko
  5 | //      ^?    ^?       ^?
  6 |
> 7 | <child value:Boolean:=b/>
    |                       ^ const b: number
  8 | //      ^?    ^?      ^?
  9 |
```

## Diagnostics
### Ln 7, Col 23
```marko
  5 | //      ^?    ^?       ^?
  6 |
> 7 | <child value:Boolean:=b/>
    |                       ^ Type 'boolean' is not assignable to type 'number'.
  8 | //      ^?    ^?      ^?
  9 |
```

