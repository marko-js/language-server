## Hovers
### Ln 4, Col 22
```marko
  2 |   <for|name| of=["a", "b", "c"]>
  3 |     <@menuitem|{ foo }|>
> 4 |       <div>${name} ${foo}</div>
    |                      ^ (parameter) foo: string
  5 | //                   ^?
  6 |     </@menuitem>
  7 |   </for>
```

### Ln 12, Col 12
```marko
  10 | <my-menu>
  11 |   <@menuitem|{ foo }|>
> 12 |     <div>${foo}</div>
     |            ^ (parameter) foo: string
  13 | //         ^?
  14 |   </@menuitem>
  15 | </my-menu>
```

