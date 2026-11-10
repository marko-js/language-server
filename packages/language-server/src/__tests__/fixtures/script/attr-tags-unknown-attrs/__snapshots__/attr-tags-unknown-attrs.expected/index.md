## Hovers
### Ln 52, Col 10
```marko
  50 |     <@item|{ foo }| size="large">
  51 |       <@row label=name/>
> 52 |       ${foo}
     |          ^ (parameter) foo: string
  53 | //       ^?
  54 |     </@item>
  55 |   </for>
```

### Ln 101, Col 3
```marko
   99 | </menu>
  100 | <script>
> 101 |   fromItem;
      |   ^ const fromItem: (() => "s") & Iterable<"s">
  102 | //^?
  103 | </script>
  104 |
```

## Diagnostics
### Ln 4, Col 32
```marko
  2 |
  3 | <menu>
> 4 |   <@item|{ foo }| size="small" bogus=1>${foo}</@item>
    |                                ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  5 | </menu>
  6 |
  7 | <menu>
```

### Ln 9, Col 34
```marko
   7 | <menu>
   8 |   <for|name| of=["a", "b"]>
>  9 |     <@item|{ foo }| size="small" bogus=1>${name} ${foo}</@item>
     |                                  ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  10 |   </for>
  11 | </menu>
  12 |
```

### Ln 15, Col 21
```marko
  13 | <menu>
  14 |   <for|key| in={ a: 1 }>
> 15 |     <@item|{ foo }| bogus=1>${key} ${foo}</@item>
     |                     ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  16 |   </for>
  17 | </menu>
  18 |
```

### Ln 21, Col 21
```marko
  19 | <menu>
  20 |   <for|i| to=2>
> 21 |     <@item|{ foo }| bogus=1>${i} ${foo}</@item>
     |                     ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  22 |   </for>
  23 | </menu>
  24 |
```

### Ln 27, Col 21
```marko
  25 | <menu>
  26 |   <for|i| until=2>
> 27 |     <@item|{ foo }| bogus=1>${i} ${foo}</@item>
     |                     ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  28 |   </for>
  29 | </menu>
  30 |
```

### Ln 34, Col 23
```marko
  32 |   <for|name| of=["a"]>
  33 |     <if=flag>
> 34 |       <@item|{ foo }| bogus=1>${name} ${foo}</@item>
     |                       ^^^^^ Type '{ item: { bogus: number; content: ({ foo }: { foo: string; }) => Void; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
  Types of property 'item' are incompatible.
    Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  35 |     </if>
  36 |   </for>
  37 | </menu>
```

### Ln 42, Col 24
```marko
  40 |   <for|name| of=["a"]>
  41 |     <@item|{ foo }|>
> 42 |       <@row label=name bogus=1/>
     |                        ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ label: string; }>'.
  43 |       ${foo}
  44 |     </@item>
  45 |   </for>
```

### Ln 59, Col 19
```marko
  57 |
  58 | <menu>
> 59 |   <@item|{ foo }| bogus=1>${foo}</@item>
     |                   ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  60 |   <@item|{ foo }| bogus=2>${foo}</@item>
  61 |   <if=flag>
  62 |     <@item|{ foo }| bogus=3>${foo}</@item>
```

### Ln 60, Col 19
```marko
  58 | <menu>
  59 |   <@item|{ foo }| bogus=1>${foo}</@item>
> 60 |   <@item|{ foo }| bogus=2>${foo}</@item>
     |                   ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  61 |   <if=flag>
  62 |     <@item|{ foo }| bogus=3>${foo}</@item>
  63 |   </if>
```

### Ln 62, Col 21
```marko
  60 |   <@item|{ foo }| bogus=2>${foo}</@item>
  61 |   <if=flag>
> 62 |     <@item|{ foo }| bogus=3>${foo}</@item>
     |                     ^^^^^ Type '{ item: { bogus: number; content: ({ foo }: { foo: string; }) => Void; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
  Types of property 'item' are incompatible.
    Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  63 |   </if>
  64 | </menu>
  65 |
```

### Ln 68, Col 4
```marko
  66 | <empty>
  67 |   <@a/>
> 68 |   <@a/>
     |    ^^ Object literal may only specify known properties, and '"a"' does not exist in type 'Directives & Input'.
  69 | </empty>
  70 |
  71 | <empty>
```

### Ln 73, Col 6
```marko
  71 | <empty>
  72 |   <for|i| of=[1, 2]>
> 73 |     <@a x=i/>
     |      ^^ Object literal may only specify known properties, and '"a"' does not exist in type 'Directives & Input'.
  74 |   </for>
  75 | </empty>
  76 |
```

### Ln 78, Col 4
```marko
  76 |
  77 | <menu>
> 78 |   <@nope>
     |    ^^^^^ Object literal may only specify known properties, and '"nope"' does not exist in type 'Directives & Input'.
  79 |     <@row/>
  80 |     <@row/>
  81 |   </@nope>
```

### Ln 87, Col 21
```marko
  85 |   <if=flag>
  86 |     $ const bar = 1;
> 87 |     <@item|{ foo }| bogus=bar>${foo}</@item>
     |                     ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>'.
  88 |   </if>
  89 | </menu>
  90 |
```

### Ln 94, Col 10
```marko
  92 | // reported, and the variable it hoists still typed
  93 | <menu>
> 94 |   <@item size="huge">
     |          ^^^^ Type '"huge"' is not assignable to type '"small" | "large" | undefined'.
  95 |     <const/fromItem=() => "s"/>
  96 |     <@row label="a"/>
  97 |     <@row label=1/>
```

### Ln 97, Col 11
```marko
   95 |     <const/fromItem=() => "s"/>
   96 |     <@row label="a"/>
>  97 |     <@row label=1/>
      |           ^^^^^ Type 'number' is not assignable to type 'string'.
   98 |   </@item>
   99 | </menu>
  100 | <script>
```

### Ln 108, Col 6
```marko
  106 | <menu>
  107 |   <for|name| of=["a", "b"]>
> 108 |     <@itme label=name/>
      |      ^^^^^ Object literal may only specify known properties, and '"itme"' does not exist in type 'Partial<Input>'.
  109 |   </for>
  110 | </menu>
  111 |
```

### Ln 118, Col 24
```marko
  116 |     <@item size="small">
  117 |       ${name}
> 118 |       <@row label=name bogus=1/>
      |                        ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ label: string; }>'.
  119 |       <if=flag>
  120 |         <@row label=1/>
  121 |       </if>
```

### Ln 120, Col 10
```marko
  118 |       <@row label=name bogus=1/>
  119 |       <if=flag>
> 120 |         <@row label=1/>
      |          ^^^^ Type '{ row: { label: number; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<AttrTag<{ size?: "small" | "large" | undefined; row?: AttrTag<{ label: string; }> | undefined; content: Body<[{ foo: string; }], void>; }>>'.
  Types of property 'row' are incompatible.
    Type '{ label: number; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<{ label: string; }>'.
      Type '{ label: number; [Symbol.iterator]: any; }' is not assignable to type '{ label: string; }'.
        Types of property 'label' are incompatible.
          Type 'number' is not assignable to type 'string'.
  121 |       </if>
  122 |     </@item>
  123 |   </for>
```

### Ln 130, Col 6
```marko
  128 | <unk>
  129 |   <if=flag>
> 130 |     <@b/>
      |      ^^ Object literal may only specify known properties, and '"b"' does not exist in type 'Directives'.
  131 |   </if>
  132 |   <for of=[1, 2]>
  133 |     <@c/>
```

### Ln 133, Col 6
```marko
  131 |   </if>
  132 |   <for of=[1, 2]>
> 133 |     <@c/>
      |      ^^ Object literal may only specify known properties, and '"c"' does not exist in type 'Partial<Directives>'.
  134 |   </for>
  135 | </unk>
  136 |
```

