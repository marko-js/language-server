## Hovers
### Ln 27, Col 29
```marko
  25 | // In an attribute tag with params, beside an <if>
  26 | <menu>
> 27 |   <@item|{ foo }| bogus=1>${foo}</@item>
     |                             ^ (parameter) foo: string
  28 | //                          ^?
  29 |   <if=flag>
  30 |     <@item|{ foo }| size="large">${foo}</@item>
```

### Ln 30, Col 36
```marko
  28 | //                          ^?
  29 |   <if=flag>
> 30 |     <@item|{ foo }| size="large">${foo}</@item>
     |                                    ^ (parameter) foo: string
  31 | //                                 ^?
  32 |   </if>
  33 | </menu>
```

## Diagnostics
### Ln 6, Col 7
```marko
  4 |
  5 | // In the attributes and an attribute tag
> 6 | <menu size="huge">
    |       ^^^^ Type '"huge"' is not assignable to type '"small" | "large" | undefined'.
  7 |   <@item size="small"/>
  8 |   <@item bogus=1/>
  9 | </menu>
```

### Ln 8, Col 10
```marko
   6 | <menu size="huge">
   7 |   <@item size="small"/>
>  8 |   <@item bogus=1/>
     |          ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; content?: Body<[{ foo: string; }], void> | undefined; }>'.
   9 | </menu>
  10 |
  11 | // In two attribute tags
```

### Ln 13, Col 19
```marko
  11 | // In two attribute tags
  12 | <menu>
> 13 |   <@item|{ foo }| size="huge">${foo}</@item>
     |                   ^^^^ Type '"huge"' is not assignable to type '"small" | "large" | undefined'.
  14 |   <@item bogus=1/>
  15 | </menu>
  16 |
```

### Ln 14, Col 10
```marko
  12 | <menu>
  13 |   <@item|{ foo }| size="huge">${foo}</@item>
> 14 |   <@item bogus=1/>
     |          ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; content?: Body<[{ foo: string; }], void> | undefined; }>'.
  15 | </menu>
  16 |
  17 | // In an attribute tag and one in an <if>
```

### Ln 19, Col 10
```marko
  17 | // In an attribute tag and one in an <if>
  18 | <menu>
> 19 |   <@item bogus=1/>
     |          ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; content?: Body<[{ foo: string; }], void> | undefined; }>'.
  20 |   <if=flag>
  21 |     <@item size="tiny"/>
  22 |   </if>
```

### Ln 21, Col 6
```marko
  19 |   <@item bogus=1/>
  20 |   <if=flag>
> 21 |     <@item size="tiny"/>
     |      ^^^^^ Type '{ item: { size: "tiny"; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
  Types of property 'item' are incompatible.
    Type '{ size: "tiny"; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<{ size?: "small" | "large" | undefined; content?: Body<[{ foo: string; }], void> | undefined; }>'.
      Type '{ size: "tiny"; [Symbol.iterator]: any; }' is not assignable to type '{ size?: "small" | "large" | undefined; content?: Body<[{ foo: string; }], void> | undefined; }'.
        Types of property 'size' are incompatible.
          Type '"tiny"' is not assignable to type '"small" | "large" | undefined'.
  22 |   </if>
  23 | </menu>
  24 |
```

### Ln 27, Col 19
```marko
  25 | // In an attribute tag with params, beside an <if>
  26 | <menu>
> 27 |   <@item|{ foo }| bogus=1>${foo}</@item>
     |                   ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; content?: Body<[{ foo: string; }], void> | undefined; }>'.
  28 | //                          ^?
  29 |   <if=flag>
  30 |     <@item|{ foo }| size="large">${foo}</@item>
```

### Ln 38, Col 4
```marko
  36 | <div>
  37 |   <@item/>
> 38 |   <@item/>
     |    ^^^^^ Object literal may only specify known properties, and '"item"' does not exist in type 'Partial<Div>'.
  39 | </div>
  40 |
  41 | // An error in the input and one in a <for>
```

### Ln 42, Col 20
```marko
  40 |
  41 | // An error in the input and one in a <for>
> 42 | <gtable rows=users caption=1>
     |                    ^^^^^^^ Type 'number' is not assignable to type 'string'.
  43 |   <for|c| of=cols>
  44 |     <@column title=2/>
  45 |   </for>
```

### Ln 43, Col 8
```marko
  41 | // An error in the input and one in a <for>
  42 | <gtable rows=users caption=1>
> 43 |   <for|c| of=cols>
     |        ^ 'c' is declared but its value is never read.
  44 |     <@column title=2/>
  45 |   </for>
  46 | </gtable>
```

### Ln 44, Col 14
```marko
  42 | <gtable rows=users caption=1>
  43 |   <for|c| of=cols>
> 44 |     <@column title=2/>
     |              ^^^^^ Type 'number' is not assignable to type 'string'.
  45 |   </for>
  46 | </gtable>
  47 |
```

### Ln 51, Col 22
```marko
  49 | <gtable rows=users>
  50 |   <for|c| of=cols>
> 51 |     <@column title=c bogus=1/>
     |                      ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ title: string; width?: number | undefined; content?: Body<[any], void> | undefined; }>'.
  52 |   </for>
  53 | </gtable>
  54 |
```

### Ln 57, Col 8
```marko
  55 | // Wrong value in a <for> on a generic tag
  56 | <gtable rows=users>
> 57 |   <for|c| of=cols>
     |        ^ 'c' is declared but its value is never read.
  58 |     <@column title=1/>
  59 |   </for>
  60 | </gtable>
```

### Ln 58, Col 14
```marko
  56 | <gtable rows=users>
  57 |   <for|c| of=cols>
> 58 |     <@column title=1/>
     |              ^^^^^ Type 'number' is not assignable to type 'string'.
  59 |   </for>
  60 | </gtable>
  61 |
```

### Ln 64, Col 8
```marko
  62 | // Missing attribute in a <for> on a generic tag
  63 | <gtable rows=users>
> 64 |   <for|c| of=cols>
     |        ^ 'c' is declared but its value is never read.
  65 |     <@column width=1/>
  66 |   </for>
  67 | </gtable>
```

### Ln 65, Col 6
```marko
  63 | <gtable rows=users>
  64 |   <for|c| of=cols>
> 65 |     <@column width=1/>
     |      ^^^^^^^ Type '{ width: number; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<{ title: string; width?: number | undefined; content?: Body<[any], void> | undefined; }>'.
  Property 'title' is missing in type '{ width: number; [Symbol.iterator]: any; }' but required in type '{ title: string; width?: number | undefined; content?: Body<[any], void> | undefined; }'.
  66 |   </for>
  67 | </gtable>
  68 |
```

### Ln 72, Col 6
```marko
  70 | <gtable rows=users>
  71 |   <for|c| of=cols>
> 72 |     <@colum title=c/>
     |      ^^^^^^ Object literal may only specify known properties, and '"colum"' does not exist in type 'Partial<Input<any>>'.
  73 |   </for>
  74 | </gtable>
  75 |
```

### Ln 80, Col 6
```marko
  78 |   <@option value="a"/>
  79 |   <for|n| of=[1, 2]>
> 80 |     <@option value=n/>
     |      ^^^^^^^ Type '{ option: { value: number; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input<string>>'.
  Types of property 'option' are incompatible.
    Type '{ value: number; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<{ value: string; content?: Body<[string], void> | undefined; }>'.
      Type '{ value: number; [Symbol.iterator]: any; }' is not assignable to type '{ value: string; content?: Body<[string], void> | undefined; }'.
        Types of property 'value' are incompatible.
          Type 'number' is not assignable to type 'string'.
  81 |   </for>
  82 | </sel>
  83 |
```

### Ln 87, Col 4
```marko
  85 | // once and in an <if>, as main reports one written once
  86 | <plain>
> 87 |   <@footer label="a"/>
     |    ^^^^^^^ Object literal may only specify known properties, and '[Symbol.iterator]' does not exist in type '{ label?: string | undefined; }'.
  88 | </plain>
  89 | <plain>
  90 |   <if=flag>
```

### Ln 91, Col 6
```marko
  89 | <plain>
  90 |   <if=flag>
> 91 |     <@footer label="a"/>
     |      ^^^^^^^ Type '{ footer: { label: string; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
  Types of property 'footer' are incompatible.
    Object literal may only specify known properties, and '[Symbol.iterator]' does not exist in type '{ label?: string | undefined; }'.
  92 |   </if>
  93 | </plain>
  94 |
```

### Ln 96, Col 7
```marko
  94 |
  95 | // Type arguments on a tag that takes none, with repeated attribute tags
> 96 | <menu<string>>
     |       ^^^^^^ Expected 0 type arguments, but got 1.
  97 |   <@item size="small"/>
  98 |   <@item size="large"/>
  99 | </menu>
```

### Ln 108, Col 6
```marko
  106 |   </if>
  107 |   <else>
> 108 |     <@item size="huge"/>
      |      ^^^^^ Type '{ item: { size: "huge"; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
  Types of property 'item' are incompatible.
    Type '{ size: "huge"; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<{ size?: "small" | "large" | undefined; content?: Body<[{ foo: string; }], void> | undefined; }>'.
      Type '{ size: "huge"; [Symbol.iterator]: any; }' is not assignable to type '{ size?: "small" | "large" | undefined; content?: Body<[{ foo: string; }], void> | undefined; }'.
        Types of property 'size' are incompatible.
          Type '"huge"' is not assignable to type '"small" | "large" | undefined'.
  109 |   </else>
  110 | </menu>
  111 |
```

### Ln 116, Col 6
```marko
  114 | <menu>
  115 |   <while(n++ < 2)>
> 116 |     <@item size="huge"/>
      |      ^^^^^ Type '{ item: { size: "huge"; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
  Types of property 'item' are incompatible.
    Type '{ size: "huge"; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<{ size?: "small" | "large" | undefined; content?: Body<[{ foo: string; }], void> | undefined; }>'.
      Type '{ size: "huge"; [Symbol.iterator]: any; }' is not assignable to type '{ size?: "small" | "large" | undefined; content?: Body<[{ foo: string; }], void> | undefined; }'.
        Types of property 'size' are incompatible.
          Type '"huge"' is not assignable to type '"small" | "large" | undefined'.
  117 |   </while>
  118 | </menu>
  119 |
```

### Ln 129, Col 6
```marko
  127 | <${body}>
  128 |   <for of=cols>
> 129 |     <@x/>
      |      ^^ Type '{ x: { [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Record<string, never>>'.
  Property 'x' is incompatible with index signature.
    Type '{ [Symbol.iterator]: any; }' is not assignable to type 'undefined'.
  130 |   </for>
  131 | </>
  132 |
```

