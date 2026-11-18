## Hovers
### Ln 5, Col 12
```marko
  3 | class {}
  4 | <for|row| of=[{ id: "a" }]>
> 5 |   <key-tag key=`row-${row.id}` no-update class="c"/>
    |            ^ (property) Marko.Directives.key?: AttrString
---
Used to uniquely identify a tag within a template in order
to get an element reference to it later.  

*@see* — Marko.Component.getEl *  

*@see* — Marko.Component.getComponent
  6 | //         ^?          ^?      ^?
  7 | </for>
  8 | <key-tag key=1/>
```

### Ln 5, Col 24
```marko
  3 | class {}
  4 | <for|row| of=[{ id: "a" }]>
> 5 |   <key-tag key=`row-${row.id}` no-update class="c"/>
    |                        ^ (parameter) row: {
    id: string;
}
  6 | //         ^?          ^?      ^?
  7 | </for>
  8 | <key-tag key=1/>
```

### Ln 5, Col 32
```marko
  3 | class {}
  4 | <for|row| of=[{ id: "a" }]>
> 5 |   <key-tag key=`row-${row.id}` no-update class="c"/>
    |                                ^ (property) Marko.Directives["no-update"]?: AttrBoolean
---
Tells Marko to avoid updating the element or its contents (excluding custom tags which may rerender independently).
  6 | //         ^?          ^?      ^?
  7 | </for>
  8 | <key-tag key=1/>
```

### Ln 10, Col 10
```marko
   8 | <key-tag key=1/>
   9 | // A directive's modifier after a `:` is dropped: `key:scoped` is `key`.
> 10 | <key-tag key:scoped=1/>
     |          ^ (property) Marko.Directives.key?: AttrString
---
Used to uniquely identify a tag within a template in order
to get an element reference to it later.  

*@see* — Marko.Component.getEl *  

*@see* — Marko.Component.getComponent
  11 | //       ^?
  12 | // Names that only start like a directive's are attributes.
  13 | <key-tag keyboard="k"/>
```

### Ln 16, Col 6
```marko
  14 | <key-tag no-update-x=1/>
  15 | // A native tag's directives are checked apart too, and a dynamic tag's.
> 16 | <div key="el" no-update-if(true) class="d"/>
     |      ^ (property) Marko.Directives.key?: AttrString
---
Used to uniquely identify a tag within a template in order
to get an element reference to it later.  

*@see* — Marko.Component.getEl *  

*@see* — Marko.Component.getComponent
  17 | //   ^?
  18 | <div key={}/>
  19 | <${"span"} key="s" no-update-body/>
```

## Diagnostics
### Ln 8, Col 10
```marko
   6 | //         ^?          ^?      ^?
   7 | </for>
>  8 | <key-tag key=1/>
     |          ^^^ Type 'number' is not assignable to type 'AttrString'.
   9 | // A directive's modifier after a `:` is dropped: `key:scoped` is `key`.
  10 | <key-tag key:scoped=1/>
  11 | //       ^?
```

### Ln 10, Col 10
```marko
   8 | <key-tag key=1/>
   9 | // A directive's modifier after a `:` is dropped: `key:scoped` is `key`.
> 10 | <key-tag key:scoped=1/>
     |          ^^^ Type 'number' is not assignable to type 'AttrString'.
  11 | //       ^?
  12 | // Names that only start like a directive's are attributes.
  13 | <key-tag keyboard="k"/>
```

### Ln 13, Col 10
```marko
  11 | //       ^?
  12 | // Names that only start like a directive's are attributes.
> 13 | <key-tag keyboard="k"/>
     |          ^^^^^^^^ Object literal may only specify known properties, and '"keyboard"' does not exist in type 'Input'.
  14 | <key-tag no-update-x=1/>
  15 | // A native tag's directives are checked apart too, and a dynamic tag's.
  16 | <div key="el" no-update-if(true) class="d"/>
```

### Ln 14, Col 10
```marko
  12 | // Names that only start like a directive's are attributes.
  13 | <key-tag keyboard="k"/>
> 14 | <key-tag no-update-x=1/>
     |          ^^^^^^^^^^^ Object literal may only specify known properties, and '"no-update-x"' does not exist in type 'Input'.
  15 | // A native tag's directives are checked apart too, and a dynamic tag's.
  16 | <div key="el" no-update-if(true) class="d"/>
  17 | //   ^?
```

### Ln 18, Col 6
```marko
  16 | <div key="el" no-update-if(true) class="d"/>
  17 | //   ^?
> 18 | <div key={}/>
     |      ^^^ Type '{}' is not assignable to type 'AttrString'.
  19 | <${"span"} key="s" no-update-body/>
  20 |
```

