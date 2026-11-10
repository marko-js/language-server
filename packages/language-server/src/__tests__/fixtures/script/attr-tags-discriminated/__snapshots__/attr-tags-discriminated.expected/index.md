## Diagnostics
### Ln 6, Col 24
```marko
  4 |   <@part kind="circle" radius=1/>
  5 |   <@part kind="square" side=2/>
> 6 |   <@part kind="square" radius=3/>
    |                        ^^^^^^ Object literal may only specify known properties, and '"radius"' does not exist in type '{ kind: "square"; side: number; } & { [Symbol.iterator](): Iterator<{ kind: "circle"; radius: number; } | { kind: "square"; side: number; }, any, any>; }'.
  7 | </shape>
  8 |
  9 | <shape>
```

### Ln 15, Col 26
```marko
  13 |   </for>
  14 |   <if=flag>
> 15 |     <@part kind="circle" side=1/>
     |                          ^^^^ Type '{ part: { kind: "circle"; side: number; [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<Input>'.
  Types of property 'part' are incompatible.
    Object literal may only specify known properties, and '"side"' does not exist in type '{ kind: "circle"; radius: number; } & { [Symbol.iterator](): Iterator<{ kind: "circle"; radius: number; } | { kind: "square"; side: number; }, any, any>; }'.
  16 |   </if>
  17 | </shape>
  18 |
```

### Ln 29, Col 9
```marko
  27 | <uni>
  28 |   <for|i| of=[1, 2]>
> 29 |     <@a x=String(i)/>
     |         ^ Type 'string' is not assignable to type 'number'.
  30 |   </for>
  31 | </uni>
  32 |
```

