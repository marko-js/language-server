## Hovers
### Ln 8, Col 35
```marko
   6 |
   7 | <menu>
>  8 |   <@item|{ foo }| size="small">${foo}</@item>
     |                                   ^ (parameter) foo: string
   9 | //                                ^?
  10 |   <@item|{ foo }|>${foo}</@item>
  11 | </menu>
```

### Ln 16, Col 36
```marko
  14 |   <@item|{ foo }|>${foo}</@item>
  15 |   <if=flag>
> 16 |     <@item|{ foo }| size="large">${foo}</@item>
     |                                    ^ (parameter) foo: string
  17 | //                                 ^?
  18 |   </if>
  19 | </menu>
```

### Ln 24, Col 31
```marko
  22 |   <@item|{ foo }|>${foo}</@item>
  23 |   <for|name| of=["a"]>
> 24 |     <@item|{ foo }|>${name} ${foo}</@item>
     |                               ^ (parameter) foo: string
  25 | //                            ^?
  26 |   </for>
  27 | </menu>
```

### Ln 32, Col 33
```marko
  30 |   <if=flag>
  31 |     <for|name| of=["a"]>
> 32 |       <@item|{ foo }|>${name} ${foo}</@item>
     |                                 ^ (parameter) foo: string
  33 | //                              ^?
  34 |     </for>
  35 |   </if>
```

## Diagnostics
### Ln 47, Col 10
```marko
  45 |
  46 | <menu>
> 47 |   <@item size="huge"/>
     |          ^^^^ Type '"huge"' is not assignable to type '"small" | "large" | undefined'.
  48 |   <@item|{ foo }|>${foo}</@item>
  49 | </menu>
  50 |
```

### Ln 52, Col 19
```marko
  50 |
  51 | <menu>
> 52 |   <@item|{ foo }| bogus=1>${foo}</@item>
     |                   ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  53 |   <@item|{ foo }|>${foo}</@item>
  54 | </menu>
  55 |
```

### Ln 59, Col 21
```marko
  57 |   <@item|{ foo }|>${foo}</@item>
  58 |   <if=flag>
> 59 |     <@item|{ foo }| bogus=1>${foo}</@item>
     |                     ^^^^^ Type '{ item: { bogus: number; content: ({ foo }: { foo: string; }) => Void; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
  Types of property 'item' are incompatible.
    Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  60 |   </if>
  61 | </menu>
  62 |
```

### Ln 66, Col 21
```marko
  64 |   <@item|{ foo }|>${foo}</@item>
  65 |   <for|name| of=["a"]>
> 66 |     <@item|{ foo }| bogus=name>${foo}</@item>
     |                     ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  67 |   </for>
  68 | </menu>
  69 |
```

### Ln 72, Col 21
```marko
  70 | <menu>
  71 |   <@item|{ foo }|>
> 72 |     <@row label="a" bogus=1/>
     |                     ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ label: string; }>'.
  73 |     <@row label="b"/>
  74 |     ${foo}
  75 |   </@item>
```

### Ln 100, Col 21
```marko
   98 | <let/text = "a"/>
   99 | <groups>
> 100 |   <@group selected:=text/>
      |                     ^^^^ Type 'string | number' is not assignable to type 'string'.
  Type 'number' is not assignable to type 'string'.
  101 |   <@group selected:=text/>
  102 | </groups>
  103 |
```

### Ln 101, Col 21
```marko
   99 | <groups>
  100 |   <@group selected:=text/>
> 101 |   <@group selected:=text/>
      |                     ^^^^ Type 'string | number' is not assignable to type 'string'.
  Type 'number' is not assignable to type 'string'.
  102 | </groups>
  103 |
```

