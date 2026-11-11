## Hovers
### Ln 2, Col 10
```marko
  1 | <let/count=0/>
> 2 | <key-tag aria-label="Hi" class="a" for="b" default=1 value:=count data-count=2>
    |          ^ (property) Input["aria-label"]?: string | undefined
  3 | //       ^?              ^?        ^?      ^?        ^?           ^?
  4 |   <@my-item label="x"/>
  5 | //  ^?
```

### Ln 2, Col 26
```marko
  1 | <let/count=0/>
> 2 | <key-tag aria-label="Hi" class="a" for="b" default=1 value:=count data-count=2>
    |                          ^ (property) Input.class?: string | undefined
  3 | //       ^?              ^?        ^?      ^?        ^?           ^?
  4 |   <@my-item label="x"/>
  5 | //  ^?
```

### Ln 2, Col 36
```marko
  1 | <let/count=0/>
> 2 | <key-tag aria-label="Hi" class="a" for="b" default=1 value:=count data-count=2>
    |                                    ^ (property) Input.for?: string | undefined
  3 | //       ^?              ^?        ^?      ^?        ^?           ^?
  4 |   <@my-item label="x"/>
  5 | //  ^?
```

### Ln 2, Col 44
```marko
  1 | <let/count=0/>
> 2 | <key-tag aria-label="Hi" class="a" for="b" default=1 value:=count data-count=2>
    |                                            ^ (property) Input.default?: number | undefined
  3 | //       ^?              ^?        ^?      ^?        ^?           ^?
  4 |   <@my-item label="x"/>
  5 | //  ^?
```

### Ln 2, Col 54
```marko
  1 | <let/count=0/>
> 2 | <key-tag aria-label="Hi" class="a" for="b" default=1 value:=count data-count=2>
    |                                                      ^ (property) Input.value?: number | undefined
  3 | //       ^?              ^?        ^?      ^?        ^?           ^?
  4 |   <@my-item label="x"/>
  5 | //  ^?
```

### Ln 2, Col 67
```marko
  1 | <let/count=0/>
> 2 | <key-tag aria-label="Hi" class="a" for="b" default=1 value:=count data-count=2>
    |                                                                   ^ (property) Input["data-count"]?: number | undefined
  3 | //       ^?              ^?        ^?      ^?        ^?           ^?
  4 |   <@my-item label="x"/>
  5 | //  ^?
```

### Ln 4, Col 5
```marko
  2 | <key-tag aria-label="Hi" class="a" for="b" default=1 value:=count data-count=2>
  3 | //       ^?              ^?        ^?      ^?        ^?           ^?
> 4 |   <@my-item label="x"/>
    |     ^ (property) "@my-item": Marko.AttrTag<{
    label: string;
}> | undefined
  5 | //  ^?
  6 |   <@item label="y"/>
  7 | //  ^?
```

### Ln 6, Col 5
```marko
  4 |   <@my-item label="x"/>
  5 | //  ^?
> 6 |   <@item label="y"/>
    |     ^ (property) "@item": Marko.AttrTag<{
    label: string;
}> | undefined
  7 | //  ^?
  8 | </key-tag>
  9 | <key-tag bogus-key=1/>
```

## Diagnostics
### Ln 9, Col 10
```marko
   7 | //  ^?
   8 | </key-tag>
>  9 | <key-tag bogus-key=1/>
     |          ^^^^^^^^^ Object literal may only specify known properties, and '"bogus-key"' does not exist in type 'Directives & Input'.
  10 | <key-tag bogus=1/>
  11 | <key-tag default="x"/>
  12 | <key-tag>
```

### Ln 10, Col 10
```marko
   8 | </key-tag>
   9 | <key-tag bogus-key=1/>
> 10 | <key-tag bogus=1/>
     |          ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Directives & Input'.
  11 | <key-tag default="x"/>
  12 | <key-tag>
  13 |   <@itme label="z"/>
```

### Ln 11, Col 10
```marko
   9 | <key-tag bogus-key=1/>
  10 | <key-tag bogus=1/>
> 11 | <key-tag default="x"/>
     |          ^^^^^^^ Type 'string' is not assignable to type 'number'.
  12 | <key-tag>
  13 |   <@itme label="z"/>
  14 | </key-tag>
```

### Ln 13, Col 4
```marko
  11 | <key-tag default="x"/>
  12 | <key-tag>
> 13 |   <@itme label="z"/>
     |    ^^^^^ Object literal may only specify known properties, and '"itme"' does not exist in type 'Directives & Input'.
  14 | </key-tag>
  15 | <key-tag>
  16 |   <@my-itme label="z"/>
```

### Ln 16, Col 4
```marko
  14 | </key-tag>
  15 | <key-tag>
> 16 |   <@my-itme label="z"/>
     |    ^^^^^^^^ Object literal may only specify known properties, and '"my-itme"' does not exist in type 'Directives & Input'.
  17 | </key-tag>
  18 |
```

