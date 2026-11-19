## Hovers
### Ln 10, Col 11
```marko
   8 | // A template is typed by the declaration beside it: `x.d.marko.ts`, or a
   9 | // legacy `x.d.marko`.
> 10 | <Greeting/greeted name="Ann"/>
     |           ^ const greeted: string
  11 | //        ^?      ^?
  12 | <Greeting name=1/>
  13 | <List/first items=[1, 2]/>
```

### Ln 10, Col 19
```marko
   8 | // A template is typed by the declaration beside it: `x.d.marko.ts`, or a
   9 | // legacy `x.d.marko`.
> 10 | <Greeting/greeted name="Ann"/>
     |                   ^ (property) Input.name: string
  11 | //        ^?      ^?
  12 | <Greeting name=1/>
  13 | <List/first items=[1, 2]/>
```

### Ln 13, Col 7
```marko
  11 | //        ^?      ^?
  12 | <Greeting name=1/>
> 13 | <List/first items=[1, 2]/>
     |       ^ const first: number
  14 | //    ^?
  15 | <Legacy count=1/>
  16 | //      ^?
```

### Ln 15, Col 9
```marko
  13 | <List/first items=[1, 2]/>
  14 | //    ^?
> 15 | <Legacy count=1/>
     |         ^ (property) Input.count: number
  16 | //      ^?
  17 | <div>${greeted.toUpperCase()} ${first.toFixed()}</div>
  18 |
```

### Ln 25, Col 22
```marko
  23 | // A legacy `x.d.marko` stands in for a template wherever it is, a project's
  24 | // own too.
> 25 | <OwnTyped name="Ann" title="Hi"/>
     |                      ^ (property) Input.title?: string | undefined
  26 | //                   ^?
  27 |
  28 | // A project's own template is read from its source, whatever `x.d.marko.ts`
```

## Diagnostics
### Ln 12, Col 11
```marko
  10 | <Greeting/greeted name="Ann"/>
  11 | //        ^?      ^?
> 12 | <Greeting name=1/>
     |           ^^^^ Type 'number' is not assignable to type 'string'.
  13 | <List/first items=[1, 2]/>
  14 | //    ^?
  15 | <Legacy count=1/>
```

