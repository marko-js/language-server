## Hovers
### Ln 5, Col 24
```marko
  3 |     <for|name| of=["a", "b", "c"]>
  4 |       <@item|{ label }|>
> 5 |         <div>${name} ${label}</div>
    |                        ^ (parameter) label: string
  6 | //                     ^?
  7 |       </@item>
  8 |     </for>
```

### Ln 15, Col 14
```marko
  13 |   <@section>
  14 |     <@item|{ label }|>
> 15 |       <div>${label}</div>
     |              ^ (parameter) label: string
  16 | //           ^?
  17 |     </@item>
  18 |   </@section>
```

