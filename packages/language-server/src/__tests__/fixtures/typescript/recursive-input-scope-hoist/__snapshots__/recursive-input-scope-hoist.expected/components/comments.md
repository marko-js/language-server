## Diagnostics
### Ln 4, Col 19
```marko
  2 |   id: string;
  3 |   renderBody: Marko.Body;
> 4 |   comment?: Marko.RepeatableAttrTag<Comment>;
    |                   ^^^^^^^^^^^^^^^^^ Namespace 'global.Marko' has no exported member 'RepeatableAttrTag'.
  5 | }
  6 | export interface Input {
  7 |   comment: Marko.RepeatableAttrTag<Comment>;
```

### Ln 7, Col 18
```marko
   5 | }
   6 | export interface Input {
>  7 |   comment: Marko.RepeatableAttrTag<Comment>;
     |                  ^^^^^^^^^^^^^^^^^ Namespace 'global.Marko' has no exported member 'RepeatableAttrTag'.
   8 | }
   9 |
  10 | // Empty
```

