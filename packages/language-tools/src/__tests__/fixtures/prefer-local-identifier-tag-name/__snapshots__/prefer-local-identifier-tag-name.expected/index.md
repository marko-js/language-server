## Source Diagnostics
### Ln 10, Col 13
```marko
   8 | <div>
   9 |   <const/TestTagA = CustomTagB/>
> 10 |   <TestTagA a="hello"/>
     |             ^ Argument of type '{ a: string; }' is not assignable to parameter of type 'Directives & Input'.
  Object literal may only specify known properties, and '"a"' does not exist in type 'Directives & Input'.
  11 | </div>
  12 |
  13 | <TestTagA a="hello"/>
```

