## Hovers
### Ln 9, Col 12
```marko
   7 | }
   8 |
>  9 | <define/Section|{ children = []}: Help|>
     |            ^ const Section: {
    content: ({ children }: Help) => MarkoReturn<void>;
}
  10 |         // ^?
  11 |   <for|{ children }| of=children>
  12 |     <Section children=children/>
```

### Ln 12, Col 8
```marko
  10 |         // ^?
  11 |   <for|{ children }| of=children>
> 12 |     <Section children=children/>
     |        ^ const Section: {
    content: ({ children }: Help) => MarkoReturn<void>;
}
  13 |     // ^?
  14 |   </for>
  15 | </define>
```

### Ln 18, Col 6
```marko
  16 |
  17 | <for|help| of=input.value>
> 18 |   <Section ...help/>
     |      ^ const Section: {
    content: ({ children }: Help) => MarkoReturn<void>;
}
  19 |   // ^?
  20 | </for>
  21 |
```

