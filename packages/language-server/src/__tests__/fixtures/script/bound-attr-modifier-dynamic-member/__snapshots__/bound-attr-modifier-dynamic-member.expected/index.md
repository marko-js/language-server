## Hovers
### Ln 3, Col 9
```marko
  1 | <let/a = { b: 1, bChange(_value: number) {} }/>
  2 |
> 3 | <child value:parseInt:=a["b"]/>
    |         ^ (property) Input.value: string | number
  4 | //      ^?    ^?
  5 |
  6 | <child value:Boolean:=a["b"]/>
```

### Ln 3, Col 15
```marko
  1 | <let/a = { b: 1, bChange(_value: number) {} }/>
  2 |
> 3 | <child value:parseInt:=a["b"]/>
    |               ^ function parseInt(string: string, radix?: number): number
---
Converts a string to an integer.  

*@param* `string` — A string to convert into a number.  

*@param* `radix`  
A value between 2 and 36 that specifies the base of the number in `string`.
If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
All other strings are considered decimal.
  4 | //      ^?    ^?
  5 |
  6 | <child value:Boolean:=a["b"]/>
```

### Ln 6, Col 9
```marko
  4 | //      ^?    ^?
  5 |
> 6 | <child value:Boolean:=a["b"]/>
    |         ^ (property) Input.value: string | number
  7 | //      ^?    ^?
  8 |
```

### Ln 6, Col 15
```marko
  4 | //      ^?    ^?
  5 |
> 6 | <child value:Boolean:=a["b"]/>
    |               ^ var Boolean: BooleanConstructor
<string>(value?: string | undefined) => boolean
  7 | //      ^?    ^?
  8 |
```

## Diagnostics
### Ln 6, Col 14
```marko
  4 | //      ^?    ^?
  5 |
> 6 | <child value:Boolean:=a["b"]/>
    |              ^^^^^^^ Argument of type 'boolean' is not assignable to parameter of type 'number'.
  7 | //      ^?    ^?
  8 |
```

