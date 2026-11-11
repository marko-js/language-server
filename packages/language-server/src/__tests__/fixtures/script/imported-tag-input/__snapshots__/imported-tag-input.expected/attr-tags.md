## Hovers
### Ln 16, Col 21
```marko
  14 | <Menu bogus=1>
  15 |   <@item|{ foo }| size="small">${foo}</@item>
> 16 |   <@item|{ foo }|>${foo}</@item>
     |                     ^ (parameter) foo: string
  17 | //                  ^?
  18 | </Menu>
  19 | <${Menu} bogus=1>
```

### Ln 21, Col 21
```marko
  19 | <${Menu} bogus=1>
  20 |   <@item|{ foo }| size="small">${foo}</@item>
> 21 |   <@item|{ foo }|>${foo}</@item>
     |                     ^ (parameter) foo: string
  22 | //                  ^?
  23 | </>
  24 |
```

### Ln 33, Col 36
```marko
  31 | <Menu bogus=1>
  32 |   <if=flag>
> 33 |     <@item|{ foo }| size="small">${foo}</@item>
     |                                    ^ (parameter) foo: string
  34 | //                                 ^?
  35 |   </if>
  36 | </Menu>
```

### Ln 39, Col 36
```marko
  37 | <${Menu} bogus=1>
  38 |   <if=flag>
> 39 |     <@item|{ foo }| size="small">${foo}</@item>
     |                                    ^ (parameter) foo: string
  40 | //                                 ^?
  41 |   </if>
  42 | </>
```

### Ln 52, Col 31
```marko
  50 | <Menu bogus=1>
  51 |   <for|name| of=["a", "b"]>
> 52 |     <@item|{ foo }|>${name} ${foo}</@item>
     |                               ^ (parameter) foo: string
  53 | //                            ^?
  54 |   </for>
  55 | </Menu>
```

### Ln 58, Col 31
```marko
  56 | <${Menu} bogus=1>
  57 |   <for|name| of=["a", "b"]>
> 58 |     <@item|{ foo }|>${name} ${foo}</@item>
     |                               ^ (parameter) foo: string
  59 | //                            ^?
  60 |   </for>
  61 | </>
```

### Ln 94, Col 27
```marko
  92 | // A generic tag's attribute tag
  93 | <pick-tag bogus=1>
> 94 |   <@option|v| value="a">${v}</@option>
     |                           ^ (parameter) v: string
  95 | //                        ^?
  96 | </pick-tag>
  97 | <Pick bogus=1>
```

### Ln 98, Col 27
```marko
   96 | </pick-tag>
   97 | <Pick bogus=1>
>  98 |   <@option|v| value="a">${v}</@option>
      |                           ^ (parameter) v: string
   99 | //                        ^?
  100 | </Pick>
  101 | <${Pick} bogus=1>
```

### Ln 102, Col 27
```marko
  100 | </Pick>
  101 | <${Pick} bogus=1>
> 102 |   <@option|v| value="a">${v}</@option>
      |                           ^ (parameter) v: string
  103 | //                        ^?
  104 | </>
  105 |
```

## Diagnostics
### Ln 10, Col 11
```marko
   8 |
   9 | // Repeated
> 10 | <menu-tag bogus=1>
     |           ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input & Directives<Input>'.
  11 |   <@item|{ foo }| size="small">${foo}</@item>
  12 |   <@item|{ foo }|>${foo}</@item>
  13 | </menu-tag>
```

### Ln 14, Col 7
```marko
  12 |   <@item|{ foo }|>${foo}</@item>
  13 | </menu-tag>
> 14 | <Menu bogus=1>
     |       ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input & Directives<Input>'.
  15 |   <@item|{ foo }| size="small">${foo}</@item>
  16 |   <@item|{ foo }|>${foo}</@item>
  17 | //                  ^?
```

### Ln 19, Col 10
```marko
  17 | //                  ^?
  18 | </Menu>
> 19 | <${Menu} bogus=1>
     |          ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input & Directives<Input>'.
  20 |   <@item|{ foo }| size="small">${foo}</@item>
  21 |   <@item|{ foo }|>${foo}</@item>
  22 | //                  ^?
```

### Ln 26, Col 11
```marko
  24 |
  25 | // In an if
> 26 | <menu-tag bogus=1>
     |           ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input & Directives<Input>'.
  27 |   <if=flag>
  28 |     <@item|{ foo }| size="small">${foo}</@item>
  29 |   </if>
```

### Ln 31, Col 7
```marko
  29 |   </if>
  30 | </menu-tag>
> 31 | <Menu bogus=1>
     |       ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input & Directives<Input>'.
  32 |   <if=flag>
  33 |     <@item|{ foo }| size="small">${foo}</@item>
  34 | //                                 ^?
```

### Ln 37, Col 10
```marko
  35 |   </if>
  36 | </Menu>
> 37 | <${Menu} bogus=1>
     |          ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input & Directives<Input>'.
  38 |   <if=flag>
  39 |     <@item|{ foo }| size="small">${foo}</@item>
  40 | //                                 ^?
```

### Ln 45, Col 11
```marko
  43 |
  44 | // In a for
> 45 | <menu-tag bogus=1>
     |           ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input & Directives<Input>'.
  46 |   <for|name| of=["a", "b"]>
  47 |     <@item|{ foo }|>${name} ${foo}</@item>
  48 |   </for>
```

### Ln 50, Col 7
```marko
  48 |   </for>
  49 | </menu-tag>
> 50 | <Menu bogus=1>
     |       ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input & Directives<Input>'.
  51 |   <for|name| of=["a", "b"]>
  52 |     <@item|{ foo }|>${name} ${foo}</@item>
  53 | //                            ^?
```

### Ln 56, Col 10
```marko
  54 |   </for>
  55 | </Menu>
> 56 | <${Menu} bogus=1>
     |          ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input & Directives<Input>'.
  57 |   <for|name| of=["a", "b"]>
  58 |     <@item|{ foo }|>${name} ${foo}</@item>
  59 | //                            ^?
```

### Ln 65, Col 19
```marko
  63 | // An attribute the attribute tags do not have
  64 | <menu-tag>
> 65 |   <@item|{ foo }| bogus=1>${foo}</@item>
     |                   ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; content: Body<[{ foo: string; }], void>; }>'.
  66 |   <if=flag>
  67 |     <@item|{ foo }| bogus=2>${foo}</@item>
  68 |   </if>
```

### Ln 67, Col 21
```marko
  65 |   <@item|{ foo }| bogus=1>${foo}</@item>
  66 |   <if=flag>
> 67 |     <@item|{ foo }| bogus=2>${foo}</@item>
     |                     ^^^^^ Type '{ item: { bogus: number; content: ({ foo }: { foo: string; }) => Void; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
  Types of property 'item' are incompatible.
    Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; content: Body<[{ foo: string; }], void>; }>'.
  68 |   </if>
  69 |   <for|name| of=["a", "b"]>
  70 |     <@item|{ foo }| size="tiny">${name} ${foo}</@item>
```

### Ln 70, Col 21
```marko
  68 |   </if>
  69 |   <for|name| of=["a", "b"]>
> 70 |     <@item|{ foo }| size="tiny">${name} ${foo}</@item>
     |                     ^^^^ Type '"tiny"' is not assignable to type '"small" | "large" | undefined'.
  71 |   </for>
  72 | </menu-tag>
  73 | <Menu>
```

### Ln 74, Col 19
```marko
  72 | </menu-tag>
  73 | <Menu>
> 74 |   <@item|{ foo }| bogus=1>${foo}</@item>
     |                   ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; content: Body<[{ foo: string; }], void>; }>'.
  75 |   <if=flag>
  76 |     <@item|{ foo }| bogus=2>${foo}</@item>
  77 |   </if>
```

### Ln 76, Col 21
```marko
  74 |   <@item|{ foo }| bogus=1>${foo}</@item>
  75 |   <if=flag>
> 76 |     <@item|{ foo }| bogus=2>${foo}</@item>
     |                     ^^^^^ Type '{ item: { bogus: number; content: ({ foo }: { foo: string; }) => Void; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
  Types of property 'item' are incompatible.
    Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; content: Body<[{ foo: string; }], void>; }>'.
  77 |   </if>
  78 |   <for|name| of=["a", "b"]>
  79 |     <@item|{ foo }| size="tiny">${name} ${foo}</@item>
```

### Ln 79, Col 21
```marko
  77 |   </if>
  78 |   <for|name| of=["a", "b"]>
> 79 |     <@item|{ foo }| size="tiny">${name} ${foo}</@item>
     |                     ^^^^ Type '"tiny"' is not assignable to type '"small" | "large" | undefined'.
  80 |   </for>
  81 | </Menu>
  82 | <${Menu}>
```

### Ln 83, Col 19
```marko
  81 | </Menu>
  82 | <${Menu}>
> 83 |   <@item|{ foo }| bogus=1>${foo}</@item>
     |                   ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; content: Body<[{ foo: string; }], void>; }>'.
  84 |   <if=flag>
  85 |     <@item|{ foo }| bogus=2>${foo}</@item>
  86 |   </if>
```

### Ln 85, Col 21
```marko
  83 |   <@item|{ foo }| bogus=1>${foo}</@item>
  84 |   <if=flag>
> 85 |     <@item|{ foo }| bogus=2>${foo}</@item>
     |                     ^^^^^ Type '{ item: { bogus: number; content: ({ foo }: { foo: string; }) => Void; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
  Types of property 'item' are incompatible.
    Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; content: Body<[{ foo: string; }], void>; }>'.
  86 |   </if>
  87 |   <for|name| of=["a", "b"]>
  88 |     <@item|{ foo }| size="tiny">${name} ${foo}</@item>
```

### Ln 88, Col 21
```marko
  86 |   </if>
  87 |   <for|name| of=["a", "b"]>
> 88 |     <@item|{ foo }| size="tiny">${name} ${foo}</@item>
     |                     ^^^^ Type '"tiny"' is not assignable to type '"small" | "large" | undefined'.
  89 |   </for>
  90 | </>
  91 |
```

### Ln 93, Col 11
```marko
  91 |
  92 | // A generic tag's attribute tag
> 93 | <pick-tag bogus=1>
     |           ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Directives & Input<string>'.
  94 |   <@option|v| value="a">${v}</@option>
  95 | //                        ^?
  96 | </pick-tag>
```

### Ln 97, Col 7
```marko
   95 | //                        ^?
   96 | </pick-tag>
>  97 | <Pick bogus=1>
      |       ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Directives & Input<string>'.
   98 |   <@option|v| value="a">${v}</@option>
   99 | //                        ^?
  100 | </Pick>
```

### Ln 101, Col 10
```marko
   99 | //                        ^?
  100 | </Pick>
> 101 | <${Pick} bogus=1>
      |          ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Directives & Input<string>'.
  102 |   <@option|v| value="a">${v}</@option>
  103 | //                        ^?
  104 | </>
```

### Ln 107, Col 11
```marko
  105 |
  106 | // A generic tag's repeated attribute tags, and ones in an if and a for
> 107 | <pick-tag bogus=1>
      |           ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input<string> & Directives<Input<string>>'.
  108 |   <@option value="a"/>
  109 |   <@option value="b"/>
  110 |   <if=flag>
```

### Ln 117, Col 7
```marko
  115 |   </for>
  116 | </pick-tag>
> 117 | <Pick bogus=1>
      |       ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input<string> & Directives<Input<string>>'.
  118 |   <@option value="a"/>
  119 |   <@option value="b"/>
  120 |   <if=flag>
```

### Ln 127, Col 10
```marko
  125 |   </for>
  126 | </Pick>
> 127 | <${Pick} bogus=1>
      |          ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input<string> & Directives<Input<string>>'.
  128 |   <@option value="a"/>
  129 |   <@option value="b"/>
  130 |   <if=flag>
```

### Ln 138, Col 22
```marko
  136 | </>
  137 | <pick-tag>
> 138 |   <@option value="a" bogus=1/>
      |                      ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ value: string; content?: Body<[string], void> | undefined; }>'.
  139 |   <if=flag>
  140 |     <@option value="b" bogus=2/>
  141 |   </if>
```

### Ln 140, Col 24
```marko
  138 |   <@option value="a" bogus=1/>
  139 |   <if=flag>
> 140 |     <@option value="b" bogus=2/>
      |                        ^^^^^ Type '{ option: { value: string; bogus: number; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input<string>>'.
  Types of property 'option' are incompatible.
    Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ value: string; content?: Body<[string], void> | undefined; }>'.
  141 |   </if>
  142 | </pick-tag>
  143 | <Pick>
```

### Ln 144, Col 22
```marko
  142 | </pick-tag>
  143 | <Pick>
> 144 |   <@option value="a" bogus=1/>
      |                      ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ value: string; content?: Body<[string], void> | undefined; }>'.
  145 |   <if=flag>
  146 |     <@option value="b" bogus=2/>
  147 |   </if>
```

### Ln 146, Col 24
```marko
  144 |   <@option value="a" bogus=1/>
  145 |   <if=flag>
> 146 |     <@option value="b" bogus=2/>
      |                        ^^^^^ Type '{ option: { value: string; bogus: number; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input<string>>'.
  Types of property 'option' are incompatible.
    Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ value: string; content?: Body<[string], void> | undefined; }>'.
  147 |   </if>
  148 | </Pick>
  149 | <${Pick}>
```

### Ln 150, Col 22
```marko
  148 | </Pick>
  149 | <${Pick}>
> 150 |   <@option value="a" bogus=1/>
      |                      ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ value: string; content?: Body<[string], void> | undefined; }>'.
  151 |   <if=flag>
  152 |     <@option value="b" bogus=2/>
  153 |   </if>
```

### Ln 152, Col 24
```marko
  150 |   <@option value="a" bogus=1/>
  151 |   <if=flag>
> 152 |     <@option value="b" bogus=2/>
      |                        ^^^^^ Type '{ option: { value: string; bogus: number; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input<string>>'.
  Types of property 'option' are incompatible.
    Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ value: string; content?: Body<[string], void> | undefined; }>'.
  153 |   </if>
  154 | </>
  155 |
```

