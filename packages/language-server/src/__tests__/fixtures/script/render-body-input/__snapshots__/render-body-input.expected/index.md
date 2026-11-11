## Hovers
### Ln 9, Col 19
```marko
   7 | // A body whose only param is its input is given attributes, checked as a
   8 | // tag's are.
>  9 | <${input.content} title="a" count=1/>
     |                   ^ (property) title: string
  10 | //                ^?
  11 | <${input.content} title=1/>
  12 | <${input.content} title="a" bogus=1/>
```

### Ln 29, Col 7
```marko
  27 |   ${heading} ${size}
  28 | </define>
> 29 | <Card heading="a" size=1/>
     |       ^ (property) "heading": string
  30 | //    ^?
  31 | <Card heading=1/>
  32 | <Card heading="a" bogus=1/>
```

## Diagnostics
### Ln 11, Col 19
```marko
   9 | <${input.content} title="a" count=1/>
  10 | //                ^?
> 11 | <${input.content} title=1/>
     |                   ^^^^^ Type 'number' is not assignable to type 'string'.
  12 | <${input.content} title="a" bogus=1/>
  13 | <${input.content}/>
  14 |
```

### Ln 12, Col 29
```marko
  10 | //                ^?
  11 | <${input.content} title=1/>
> 12 | <${input.content} title="a" bogus=1/>
     |                             ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type '{ title: string; count?: number | undefined; }'.
  13 | <${input.content}/>
  14 |
  15 | // A body with other params is given arguments.
```

### Ln 13, Col 2
```marko
  11 | <${input.content} title=1/>
  12 | <${input.content} title="a" bogus=1/>
> 13 | <${input.content}/>
     |  ^^^^^^^^^^^^^^^^ Argument of type '{}' is not assignable to parameter of type '{ title: string; count?: number | undefined; }'.
  Property 'title' is missing in type '{}' but required in type '{ title: string; count?: number | undefined; }'.
  14 |
  15 | // A body with other params is given arguments.
  16 | <${input.pair}("a", 1)/>
```

### Ln 17, Col 21
```marko
  15 | // A body with other params is given arguments.
  16 | <${input.pair}("a", 1)/>
> 17 | <${input.pair}("a", "b")/>
     |                     ^^^ Argument of type 'string' is not assignable to parameter of type 'number'.
  18 | <${input.pair}("a")/>
  19 |
  20 | // A body with no params takes nothing.
```

### Ln 18, Col 2
```marko
  16 | <${input.pair}("a", 1)/>
  17 | <${input.pair}("a", "b")/>
> 18 | <${input.pair}("a")/>
     |  ^^^^^^^^^^^^^ Expected 2 arguments, but got 1.
  19 |
  20 | // A body with no params takes nothing.
  21 | <${input.plain}/>
```

### Ln 22, Col 17
```marko
  20 | // A body with no params takes nothing.
  21 | <${input.plain}/>
> 22 | <${input.plain} bogus=1/>
     |                 ^^^^^ Type 'number' is not assignable to type 'never'.
  23 |
  24 | // A <define> with attributes is such a body too. (Its attributes are not
  25 | // checked yet: a tag variable used as a tag name is read through its hoist.)
```

