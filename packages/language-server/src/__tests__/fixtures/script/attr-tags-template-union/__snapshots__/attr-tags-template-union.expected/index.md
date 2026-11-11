## Hovers
### Ln 9, Col 34
```marko
   7 | // One attribute tag
   8 | <${FlatOrMenu}>
>  9 |   <@item|{ foo }| size="small">${foo}</@item>
     |                                  ^ (parameter) foo: string
  10 | //                               ^?
  11 | </>
  12 |
```

### Ln 15, Col 34
```marko
  13 | // Repeated
  14 | <${FlatOrMenu}>
> 15 |   <@item|{ foo }| size="small">${foo}</@item>
     |                                  ^ (parameter) foo: string
  16 | //                               ^?
  17 |   <@item/>
  18 | </>
```

### Ln 23, Col 36
```marko
  21 | <${FlatOrMenu}>
  22 |   <if=flag>
> 23 |     <@item|{ foo }| size="small">${foo}</@item>
     |                                    ^ (parameter) foo: string
  24 | //                                 ^?
  25 |   </if>
  26 | </>
```

### Ln 31, Col 41
```marko
  29 | <${FlatOrMenu}>
  30 |   <for|i| of=[1, 2]>
> 31 |     <@item|{ foo }| size="small">${i} ${foo}</@item>
     |                                         ^ (parameter) foo: string
  32 | //                                      ^?
  33 |   </for>
  34 | </>
```

### Ln 39, Col 22
```marko
  37 | <${FlatOrMenu}>
  38 |   <@item>
> 39 |     <@row|{ bar }|>${bar}</@row>
     |                      ^ (parameter) bar: number
  40 | //                   ^?
  41 |     <@row/>
  42 |   </@item>
```

### Ln 62, Col 6
```marko
  60 |
  61 | <script>
> 62 |   fromUnion;
     |      ^ const fromUnion: (() => "union") & Iterable<"union">
  63 |   // ^?
  64 | </script>
  65 |
```

### Ln 77, Col 12
```marko
  75 | <${flag ? ClassMenu : "div"}>
  76 |   <if=flag>
> 77 |     <@item|n| label="a">${n}</@item>
     |            ^ (parameter) n: number
  78 | //         ^?
  79 |   </if>
  80 | </>
```

## Diagnostics
### Ln 47, Col 10
```marko
  45 | // Wrong values
  46 | <${FlatOrMenu}>
> 47 |   <@item size="huge"/>
     |          ^^^^ Type '"huge"' is not assignable to type '"small" | "large" | undefined'.
  48 |   <@item bogus=1/>
  49 | </>
  50 |
```

### Ln 48, Col 10
```marko
  46 | <${FlatOrMenu}>
  47 |   <@item size="huge"/>
> 48 |   <@item bogus=1/>
     |          ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ content?: Body<[{ bar: number; }], void> | undefined; }> | undefined; content?: Body<[{ foo: string; }], void> | undefined; }>'.
  49 | </>
  50 |
  51 | // Hoisted from a rest attribute tag
```

### Ln 70, Col 4
```marko
  68 | <${native}>
  69 |   <@item/>
> 70 |   <@item/>
     |    ^^^^^ Type of computed property's value is '[{ item: { [Symbol.iterator]: any; }; }]', which is not assignable to type 'readonly Partial<A | Div>[] & [{ item: { [Symbol.iterator]: any; }; }]'.
  Type '[{ item: { [Symbol.iterator]: any; }; }]' is not assignable to type 'readonly Partial<A | Div>[]'.
    Object literal may only specify known properties, and '"item"' does not exist in type 'Partial<A | Div>'.
  71 | </>
  72 |
  73 | // A template or a native tag: typed by the template (where both name their
```

