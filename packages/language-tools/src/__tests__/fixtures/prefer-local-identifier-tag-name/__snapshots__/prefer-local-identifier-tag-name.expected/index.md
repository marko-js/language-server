## Source Diagnostics
### Ln 10, Col 13
```marko
   8 | <div>
   9 |   <const/TestTagA = CustomTagB/>
> 10 |   <TestTagA a="hello"/>
     |             ^ Type 'string' is not assignable to type 'never'.
  11 | </div>
  12 |
  13 | <TestTagA a="hello"/>
```

