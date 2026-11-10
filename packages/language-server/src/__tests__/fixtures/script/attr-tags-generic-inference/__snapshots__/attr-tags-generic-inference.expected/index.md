## Hovers
### Ln 4, Col 27
```marko
  2 | // Single
  3 | <pick>
> 4 |   <@option|v| value="a">${v}</@option>
    |                           ^ (parameter) v: string
  5 | //                        ^?
  6 | </pick>
  7 |
```

### Ln 10, Col 27
```marko
   8 | // Repeated
   9 | <pick>
> 10 |   <@option|v| value="a">${v}</@option>
     |                           ^ (parameter) v: string
  11 | //                        ^?
  12 |   <@option value="b"/>
  13 | </pick>
```

### Ln 18, Col 27
```marko
  16 | <pick>
  17 |   <for|x| of=["a", "b"] as const>
> 18 |     <@option|v| value=x>${v}</@option>
     |                           ^ (parameter) v: any
  19 | //                        ^?
  20 |   </for>
  21 | </pick>
```

### Ln 28, Col 29
```marko
  26 |   <@option value="a"/>
  27 |   <if=flag>
> 28 |     <@option|v| value="b">${v}</@option>
     |                             ^ (parameter) v: string
  29 | //                          ^?
  30 |   </if>
  31 | </pick>
```

### Ln 34, Col 21
```marko
  32 |
  33 | // Tag params: first occurrence static
> 34 | <sel|v| onPick(p) { p; }>
     |                     ^ (parameter) p: string
  35 | //                  ^?
  36 |   <@option value="a"/>
  37 |   ${v}
```

### Ln 37, Col 5
```marko
  35 | //                  ^?
  36 |   <@option value="a"/>
> 37 |   ${v}
     |     ^ (parameter) v: string
  38 | //  ^?
  39 | </sel>
  40 |
```

### Ln 42, Col 21
```marko
  40 |
  41 | // Tag params: only in a for
> 42 | <sel|v| onPick(p) { p; }>
     |                     ^ (parameter) p: string
  43 | //                  ^?
  44 |   <for|id| of=ids>
  45 |     <@option|o| value=id>${o}</@option>
```

### Ln 45, Col 28
```marko
  43 | //                  ^?
  44 |   <for|id| of=ids>
> 45 |     <@option|o| value=id>${o}</@option>
     |                            ^ (parameter) o: any
  46 | //                         ^?
  47 |   </for>
  48 |   ${v}
```

### Ln 48, Col 5
```marko
  46 | //                         ^?
  47 |   </for>
> 48 |   ${v}
     |     ^ (parameter) v: string
  49 | //  ^?
  50 | </sel>
  51 |
```

### Ln 53, Col 21
```marko
  51 |
  52 | // Tag params: only in a for with an error in another attribute tag (known: unknown)
> 53 | <sel|v| onPick(p) { p; }>
     |                     ^ (parameter) p: unknown
  54 | //                  ^?
  55 |   <for|id| of=ids>
  56 |     <@option value=id/>
```

### Ln 59, Col 5
```marko
  57 |     <@note size="tiny"/>
  58 |   </for>
> 59 |   ${v}
     |     ^ (parameter) v: unknown
  60 | //  ^?
  61 | </sel>
  62 |
```

### Ln 64, Col 21
```marko
  62 |
  63 | // Tag params: only in an if
> 64 | <sel|v| onPick(p) { p; }>
     |                     ^ (parameter) p: number
  65 | //                  ^?
  66 |   <if=flag>
  67 |     <@option value=1/>
```

### Ln 69, Col 5
```marko
  67 |     <@option value=1/>
  68 |   </if>
> 69 |   ${v}
     |     ^ (parameter) v: number
  70 | //  ^?
  71 | </sel>
  72 |
```

### Ln 74, Col 21
```marko
  72 |
  73 | // Tag params: static first, another type in a for
> 74 | <sel|v| onPick(p) { p; }>
     |                     ^ (parameter) p: string
  75 | //                  ^?
  76 |   <@option value="a"/>
  77 |   <for|n| of=[1, 2]>
```

### Ln 80, Col 5
```marko
  78 |     <@option value=n/>
  79 |   </for>
> 80 |   ${v}
     |     ^ (parameter) v: string
  81 | //  ^?
  82 | </sel>
  83 |
```

### Ln 87, Col 36
```marko
  85 | <sel>
  86 |   <for|id| of=ids>
> 87 |     <@option|o: string| value=id>${o}</@option>
     |                                    ^ (parameter) o: string
  88 | //                                 ^?
  89 |   </for>
  90 | </sel>
```

### Ln 97, Col 5
```marko
   95 |     <@option value=x/>
   96 |   </for>
>  97 |   ${v}
      |     ^ (parameter) v: string
   98 | //  ^?
   99 | </opt-pick>
  100 | <opt-pick|v|>
```

### Ln 105, Col 5
```marko
  103 |   </for>
  104 |   <@option value=3/>
> 105 |   ${v}
      |     ^ (parameter) v: number
  106 | //  ^?
  107 | </opt-pick>
  108 |
```

## Diagnostics
### Ln 57, Col 12
```marko
  55 |   <for|id| of=ids>
  56 |     <@option value=id/>
> 57 |     <@note size="tiny"/>
     |            ^^^^ Type '"tiny"' is not assignable to type '"small" | "large" | undefined'.
  58 |   </for>
  59 |   ${v}
  60 | //  ^?
```

### Ln 78, Col 6
```marko
  76 |   <@option value="a"/>
  77 |   <for|n| of=[1, 2]>
> 78 |     <@option value=n/>
     |      ^^^^^^^ Type '{ option: { value: number; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input<string>>'.
  Types of property 'option' are incompatible.
    Type '{ value: number; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<{ value: string; content?: Body<[string], void> | undefined; }>'.
      Type '{ value: number; [Symbol.iterator]: any; }' is not assignable to type '{ value: string; content?: Body<[string], void> | undefined; }'.
        Types of property 'value' are incompatible.
          Type 'number' is not assignable to type 'string'.
  79 |   </for>
  80 |   ${v}
  81 | //  ^?
```

### Ln 122, Col 8
```marko
  120 |   <for|n| of=[1, 2]>
  121 |     <if=n>
> 122 |       <@option value=n/>
      |        ^^^^^^^ Type '{ option: { value: number; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input<string>>'.
  Types of property 'option' are incompatible.
    Type '{ value: number; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<{ value: string; content?: Body<[string], void> | undefined; }>'.
      Type '{ value: number; [Symbol.iterator]: any; }' is not assignable to type '{ value: string; content?: Body<[string], void> | undefined; }'.
        Types of property 'value' are incompatible.
          Type 'number' is not assignable to type 'string'.
  123 |     </if>
  124 |   </for>
  125 | </sel>
```

