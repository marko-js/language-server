## Hovers
### Ln 32, Col 6
```marko
  30 | <${Flat}/dynamic title="x"/>
  31 | <script>
> 32 |   discovered;
     |      ^ const discovered: string
  33 |   // ^?
  34 |   imported;
  35 |   // ^?
```

### Ln 34, Col 6
```marko
  32 |   discovered;
  33 |   // ^?
> 34 |   imported;
     |      ^ const imported: string
  35 |   // ^?
  36 |   dynamic;
  37 |   // ^?
```

### Ln 36, Col 6
```marko
  34 |   imported;
  35 |   // ^?
> 36 |   dynamic;
     |      ^ const dynamic: string
  37 |   // ^?
  38 | </script>
  39 |
```

### Ln 42, Col 5
```marko
  40 | // A generic tag infers its params
  41 | <gen-tag|{ item }| items=[{ id: "a" }]>
> 42 |   ${item.id}
     |     ^ (parameter) item: {
    id: string;
}
  43 | //  ^?
  44 | </gen-tag>
  45 | <Gen|{ item }| items=[{ id: "b" }]>
```

### Ln 46, Col 5
```marko
  44 | </gen-tag>
  45 | <Gen|{ item }| items=[{ id: "b" }]>
> 46 |   ${item.id}
     |     ^ (parameter) item: {
    id: string;
}
  47 | //  ^?
  48 | </Gen>
  49 | <${Gen}|{ item }| items=[{ id: "c" }]>
```

### Ln 50, Col 5
```marko
  48 | </Gen>
  49 | <${Gen}|{ item }| items=[{ id: "c" }]>
> 50 |   ${item.id}
     |     ^ (parameter) item: {
    id: string;
}
  51 | //  ^?
  52 | </>
  53 |
```

### Ln 65, Col 6
```marko
  63 | </>
  64 | <script>
> 65 |   discoveredHoisted;
     |      ^ const discoveredHoisted: (() => {
    id: string;
}) & Iterable<{
    id: string;
}>
  66 |   // ^?
  67 |   importedHoisted;
  68 |   // ^?
```

### Ln 67, Col 6
```marko
  65 |   discoveredHoisted;
  66 |   // ^?
> 67 |   importedHoisted;
     |      ^ const importedHoisted: (() => {
    id: string;
}) & Iterable<{
    id: string;
}>
  68 |   // ^?
  69 |   dynamicHoisted;
  70 |   // ^?
```

### Ln 69, Col 6
```marko
  67 |   importedHoisted;
  68 |   // ^?
> 69 |   dynamicHoisted;
     |      ^ const dynamicHoisted: (() => {
    id: string;
}) & Iterable<{
    id: string;
}>
  70 |   // ^?
  71 | </script>
  72 |
```

### Ln 95, Col 5
```marko
  93 | // Type args
  94 | <gen-tag<{ id: string }>|{ item }| items=[{ id: 1 }]>
> 95 |   ${item.id}
     |     ^ (parameter) item: {
    id: string;
}
  96 | //  ^?
  97 | </gen-tag>
  98 | <Gen<{ id: string }>|{ item }| items=[{ id: 1 }]>
```

### Ln 99, Col 5
```marko
   97 | </gen-tag>
   98 | <Gen<{ id: string }>|{ item }| items=[{ id: 1 }]>
>  99 |   ${item.id}
      |     ^ (parameter) item: {
    id: string;
}
  100 | //  ^?
  101 | </Gen>
  102 |
```

## Diagnostics
### Ln 12, Col 21
```marko
  10 |
  11 | // An attribute the tag does not have
> 12 | <flat-tag title="x" bogus=1/>
     |                     ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Directives & Input'.
  13 | <Flat title="x" bogus=1/>
  14 | <ShortFlat title="x" bogus=1/>
  15 | <${Flat} title="x" bogus=1/>
```

### Ln 13, Col 17
```marko
  11 | // An attribute the tag does not have
  12 | <flat-tag title="x" bogus=1/>
> 13 | <Flat title="x" bogus=1/>
     |                 ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Directives & Input'.
  14 | <ShortFlat title="x" bogus=1/>
  15 | <${Flat} title="x" bogus=1/>
  16 |
```

### Ln 14, Col 22
```marko
  12 | <flat-tag title="x" bogus=1/>
  13 | <Flat title="x" bogus=1/>
> 14 | <ShortFlat title="x" bogus=1/>
     |                      ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Directives & Input'.
  15 | <${Flat} title="x" bogus=1/>
  16 |
  17 | // An attribute tag the tag does not have
```

### Ln 15, Col 20
```marko
  13 | <Flat title="x" bogus=1/>
  14 | <ShortFlat title="x" bogus=1/>
> 15 | <${Flat} title="x" bogus=1/>
     |                    ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Directives & Input'.
  16 |
  17 | // An attribute tag the tag does not have
  18 | <flat-tag title="x"><@nope title="a"/></flat-tag>
```

### Ln 18, Col 22
```marko
  16 |
  17 | // An attribute tag the tag does not have
> 18 | <flat-tag title="x"><@nope title="a"/></flat-tag>
     |                      ^^^^^ Object literal may only specify known properties, and '"nope"' does not exist in type 'Directives & Input'.
  19 | <Flat title="x"><@nope title="a"/></Flat>
  20 | <${Flat} title="x"><@nope title="a"/></>
  21 |
```

### Ln 19, Col 18
```marko
  17 | // An attribute tag the tag does not have
  18 | <flat-tag title="x"><@nope title="a"/></flat-tag>
> 19 | <Flat title="x"><@nope title="a"/></Flat>
     |                  ^^^^^ Object literal may only specify known properties, and '"nope"' does not exist in type 'Directives & Input'.
  20 | <${Flat} title="x"><@nope title="a"/></>
  21 |
  22 | // A missing attribute
```

### Ln 20, Col 21
```marko
  18 | <flat-tag title="x"><@nope title="a"/></flat-tag>
  19 | <Flat title="x"><@nope title="a"/></Flat>
> 20 | <${Flat} title="x"><@nope title="a"/></>
     |                     ^^^^^ Object literal may only specify known properties, and '"nope"' does not exist in type 'Directives & Input'.
  21 |
  22 | // A missing attribute
  23 | <flat-tag count=1/>
```

### Ln 23, Col 11
```marko
  21 |
  22 | // A missing attribute
> 23 | <flat-tag count=1/>
     |           ^^^^^^^ Argument of type '{ count: number; }' is not assignable to parameter of type 'Directives & Input'.
  Property 'title' is missing in type '{ count: number; }' but required in type 'Input'.
  24 | <Flat count=1/>
  25 | <${Flat} count=1/>
  26 |
```

### Ln 24, Col 7
```marko
  22 | // A missing attribute
  23 | <flat-tag count=1/>
> 24 | <Flat count=1/>
     |       ^^^^^^^ Argument of type '{ count: number; }' is not assignable to parameter of type 'Directives & Input'.
  Property 'title' is missing in type '{ count: number; }' but required in type 'Input'.
  25 | <${Flat} count=1/>
  26 |
  27 | // The tag var
```

### Ln 25, Col 10
```marko
  23 | <flat-tag count=1/>
  24 | <Flat count=1/>
> 25 | <${Flat} count=1/>
     |          ^^^^^^^ Argument of type '{ count: number; }' is not assignable to parameter of type 'Directives & Input'.
  Property 'title' is missing in type '{ count: number; }' but required in type 'Input'.
  26 |
  27 | // The tag var
  28 | <flat-tag/discovered title="x"/>
```

### Ln 76, Col 23
```marko
  74 | <rec-tag title="a">
  75 |   <@group title="b">
> 76 |     <@group title="c" bogus=1/>
     |                       ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<GroupAttrs>'.
  77 |   </@group>
  78 | </rec-tag>
  79 | <Rec title="a">
```

### Ln 81, Col 23
```marko
  79 | <Rec title="a">
  80 |   <@group title="b">
> 81 |     <@group title="c" bogus=1/>
     |                       ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<GroupAttrs>'.
  82 |   </@group>
  83 | </Rec>
  84 | <${Rec} title="a">
```

### Ln 86, Col 23
```marko
  84 | <${Rec} title="a">
  85 |   <@group title="b">
> 86 |     <@group title="c" bogus=1/>
     |                       ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'AttrTag<GroupAttrs>'.
  87 |   </@group>
  88 | </>
  89 | <rec-tag/>
```

### Ln 89, Col 2
```marko
  87 |   </@group>
  88 | </>
> 89 | <rec-tag/>
     |  ^^^^^^^ Argument of type '{}' is not assignable to parameter of type 'Directives & Input'.
  Property 'title' is missing in type '{}' but required in type 'Input'.
  90 | <Rec/>
  91 | <${Rec}/>
  92 |
```

### Ln 90, Col 2
```marko
  88 | </>
  89 | <rec-tag/>
> 90 | <Rec/>
     |  ^^^ Argument of type '{}' is not assignable to parameter of type 'Directives & Input'.
  Property 'title' is missing in type '{}' but required in type 'Input'.
  91 | <${Rec}/>
  92 |
  93 | // Type args
```

### Ln 91, Col 2
```marko
  89 | <rec-tag/>
  90 | <Rec/>
> 91 | <${Rec}/>
     |  ^^^^^^ Argument of type '{}' is not assignable to parameter of type 'Directives & Input'.
  Property 'title' is missing in type '{}' but required in type 'Input'.
  92 |
  93 | // Type args
  94 | <gen-tag<{ id: string }>|{ item }| items=[{ id: 1 }]>
```

### Ln 94, Col 45
```marko
  92 |
  93 | // Type args
> 94 | <gen-tag<{ id: string }>|{ item }| items=[{ id: 1 }]>
     |                                             ^^ Type 'number' is not assignable to type 'string'.
  95 |   ${item.id}
  96 | //  ^?
  97 | </gen-tag>
```

### Ln 98, Col 41
```marko
   96 | //  ^?
   97 | </gen-tag>
>  98 | <Gen<{ id: string }>|{ item }| items=[{ id: 1 }]>
      |                                         ^^ Type 'number' is not assignable to type 'string'.
   99 |   ${item.id}
  100 | //  ^?
  101 | </Gen>
```

