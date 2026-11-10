## Hovers
### Ln 7, Col 20
```marko
   5 | // Interleaved names: the second @a is its own repetition.
   6 | <edge-menu>
>  7 |   <@a|{ n }| v=1>${n}</@a>
     |                    ^ (parameter) n: number
   8 | //                 ^?
   9 |   <@b w="x"/>
  10 |   <@a|{ n }|>${n}</@a>
```

### Ln 10, Col 16
```marko
   8 | //                 ^?
   9 |   <@b w="x"/>
> 10 |   <@a|{ n }|>${n}</@a>
     |                ^ (parameter) n: number
  11 | //             ^?
  12 | </edge-menu>
  13 |
```

### Ln 32, Col 28
```marko
  30 |   <for|i| of=list>
  31 |     <for|j| of=list>
> 32 |       <@a|{ n }| v=i + j>${n}</@a>
     |                            ^ (parameter) n: number
  33 | //                         ^?
  34 |     </for>
  35 |     <if=(i > 1)>
```

### Ln 41, Col 24
```marko
  39 |   <if=flag>
  40 |     <for|i| of=list>
> 41 |       <@a|{ n }| v=i>${n}</@a>
     |                        ^ (parameter) n: number
  42 | //                     ^?
  43 |       <@b nope=i/>
  44 |     </for>
```

## Diagnostics
### Ln 17, Col 6
```marko
  15 | <edge-menu>
  16 |   <if=flag>
> 17 |     <@a|{ n }|>${n}</@a>
     |      ^^^^^^^^^^^^^^^^^^^
> 18 |     <@a v=2/>
     | ^^^^^^^^^^^^^
> 19 |   </if>
     | ^^^^^^^^^^^^^
> 20 |   <else if=!flag>
     | ^^^^^^^^^^^^^
> 21 |     <@b w="y"/>
     | ^^^^^^^^^^^^^
> 22 |   </else>
     | ^^^^^^^^^^^^^
> 23 |   <else>
     | ^^^^^^^^^^^^^
> 24 |     <@b w=1/>
     | ^^^^^^^^ Type '{ a: { content: ({ n }: { n: number; }) => Void; [Symbol.iterator]: any; } | { v: number; [Symbol.iterator]: any; }; } | { b: { w: string; [Symbol.iterator]: any; }; } | { ...; }' is not assignable to type 'Partial<Input>'.
  Type '{ b: { w: number; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
    Types of property 'b' are incompatible.
      Type '{ w: number; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<{ w?: string | undefined; }>'.
        Type '{ w: number; [Symbol.iterator]: any; }' is not assignable to type '{ w?: string | undefined; }'.
          Types of property 'w' are incompatible.
            Type 'number' is not assignable to type 'string'.
  25 |   </else>
  26 | </edge-menu>
  27 |
```

### Ln 36, Col 23
```marko
  34 |     </for>
  35 |     <if=(i > 1)>
> 36 |       <@b w=String(i) bogus=1/>
     |                       ^^^^^ Type '{ b: { w: string; bogus: number; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
  Types of property 'b' are incompatible.
    Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ w?: string | undefined; }>'.
  37 |     </if>
  38 |   </for>
  39 |   <if=flag>
```

### Ln 43, Col 11
```marko
  41 |       <@a|{ n }| v=i>${n}</@a>
  42 | //                     ^?
> 43 |       <@b nope=i/>
     |           ^^^^ Object literal may only specify known properties, and '"nope"' does not exist in type 'AttrTag<{ w?: string | undefined; }>'.
  44 |     </for>
  45 |   </if>
  46 | </edge-menu>
```

### Ln 53, Col 13
```marko
  51 |     <for|i| of=list>
  52 |       <@row label=String(i)/>
> 53 |       <@row label=i/>
     |             ^^^^^ Type 'number' is not assignable to type 'string'.
  54 |     </for>
  55 |   </@item>
  56 |   <for|i| of=list>
```

### Ln 59, Col 31
```marko
  57 |     <@item>
  58 |       <if=flag>
> 59 |         <@row label=String(i) bogus=1/>
     |                               ^^^^^ Type '{ row: { label: string; bogus: number; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<AttrTag<{ row?: AttrTag<{ label: string; }> | undefined; content?: Body<[], void> | undefined; }>>'.
  Types of property 'row' are incompatible.
    Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<{ label: string; }>'.
  60 |       </if>
  61 |     </@item>
  62 |   </for>
```

### Ln 72, Col 13
```marko
  70 |   </if>
  71 |   <@my-item x=1/>
> 72 |   <@my-item x="2"/>
     |             ^ Type 'string' is not assignable to type 'number'.
  73 |   <@a ...extra/>
  74 |   <for|i| of=list>
  75 |     <@itme v=i/>
```

### Ln 75, Col 6
```marko
  73 |   <@a ...extra/>
  74 |   <for|i| of=list>
> 75 |     <@itme v=i/>
     |      ^^^^^ Object literal may only specify known properties, and '"itme"' does not exist in type 'Partial<Input>'.
  76 |   </for>
  77 | </edge-menu>
  78 |
```

### Ln 90, Col 8
```marko
  88 |
  89 | <req-menu>
> 90 |   <for|i| of=list><@req/></for>
     |        ^ 'i' is declared but its value is never read.
  91 | </req-menu>
  92 |
  93 | <req-menu>
```

### Ln 94, Col 8
```marko
  92 |
  93 | <req-menu>
> 94 |   <for|i| of=[1, 2] as const><@req/></for>
     |        ^ 'i' is declared but its value is never read.
  95 | </req-menu>
  96 |
  97 | <req-menu>
```

