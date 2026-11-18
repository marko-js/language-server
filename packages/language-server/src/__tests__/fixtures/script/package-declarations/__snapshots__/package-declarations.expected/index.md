## Hovers
### Ln 7, Col 11
```marko
   5 | // A template is typed by the declaration beside it: `x.d.marko.ts`, or a
   6 | // legacy `x.d.marko`.
>  7 | <Greeting/greeted name="Ann"/>
     |           ^ const greeted: string
   8 | //        ^?      ^?
   9 | <Greeting name=1/>
  10 | <Legacy count=1/>
```

### Ln 7, Col 19
```marko
   5 | // A template is typed by the declaration beside it: `x.d.marko.ts`, or a
   6 | // legacy `x.d.marko`.
>  7 | <Greeting/greeted name="Ann"/>
     |                   ^ (property) Input.name: string
   8 | //        ^?      ^?
   9 | <Greeting name=1/>
  10 | <Legacy count=1/>
```

### Ln 10, Col 9
```marko
   8 | //        ^?      ^?
   9 | <Greeting name=1/>
> 10 | <Legacy count=1/>
     |         ^ (property) Input.count: number
  11 | //      ^?
  12 | <div>${greeted.toUpperCase()}</div>
  13 |
```

### Ln 16, Col 22
```marko
  14 | // A declaration beside a template stands in for it wherever it is, a
  15 | // project's own too.
> 16 | <OwnTyped name="Ann" title="Hi"/>
     |                      ^ (property) Input.title?: string | undefined
  17 | //                   ^?
  18 |
```

## Diagnostics
### Ln 9, Col 11
```marko
   7 | <Greeting/greeted name="Ann"/>
   8 | //        ^?      ^?
>  9 | <Greeting name=1/>
     |           ^^^^ Type 'number' is not assignable to type 'string'.
  10 | <Legacy count=1/>
  11 | //      ^?
  12 | <div>${greeted.toUpperCase()}</div>
```

