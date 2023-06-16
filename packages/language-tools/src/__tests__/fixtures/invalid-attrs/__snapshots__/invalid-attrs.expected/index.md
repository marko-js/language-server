## Source Diagnostics
### Ln 1, Col 15
```marko
> 1 | <fancy-button something=true>
    |               ^^^^^^^^^ Argument of type '{ something: boolean; renderBody: () => MarkoReturn<void>; }' is not assignable to parameter of type 'Directives & Input'.
  Object literal may only specify known properties, and '"something"' does not exist in type 'Directives & Input'.
  2 |   
  3 | </fancy-button>
  4 |
```

