## Hovers
### Ln 8, Col 11
```marko
   6 | // A template is typed by the declaration beside it: `x.d.marko.ts`, or a
   7 | // legacy `x.d.marko`.
>  8 | <Greeting/greeted name="Ann"/>
     |           ^ const greeted: string
   9 | //        ^?      ^?
  10 | <Greeting name=1/>
  11 | <Legacy count=1/>
```

### Ln 8, Col 19
```marko
   6 | // A template is typed by the declaration beside it: `x.d.marko.ts`, or a
   7 | // legacy `x.d.marko`.
>  8 | <Greeting/greeted name="Ann"/>
     |                   ^ (property) Input.name: string
   9 | //        ^?      ^?
  10 | <Greeting name=1/>
  11 | <Legacy count=1/>
```

### Ln 11, Col 9
```marko
   9 | //        ^?      ^?
  10 | <Greeting name=1/>
> 11 | <Legacy count=1/>
     |         ^ (property) Input.count: number
  12 | //      ^?
  13 | <div>${greeted.toUpperCase()}</div>
  14 |
```

### Ln 17, Col 22
```marko
  15 | // A legacy `x.d.marko` stands in for a template wherever it is, a project's
  16 | // own too.
> 17 | <OwnTyped name="Ann" title="Hi"/>
     |                      ^ (property) Input.title?: string | undefined
  18 | //                   ^?
  19 |
  20 | // A project's own template is read from its source, whatever `x.d.marko.ts`
```

## Diagnostics
### Ln 10, Col 11
```marko
   8 | <Greeting/greeted name="Ann"/>
   9 | //        ^?      ^?
> 10 | <Greeting name=1/>
     |           ^^^^ Type 'number' is not assignable to type 'string'.
  11 | <Legacy count=1/>
  12 | //      ^?
  13 | <div>${greeted.toUpperCase()}</div>
```

