## Hovers
### Ln 8, Col 39
```marko
   6 | <child ...input>
   7 |   <for|item| of=input.item>
>  8 |     <@item|{ foo }| ...item extra=1>${foo}</@item>
     |                                       ^ (parameter) foo: string
   9 | //                                    ^?
  10 |   </for>
  11 | </child>
```

