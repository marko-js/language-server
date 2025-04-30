## Hovers
### Ln 9, Col 8
```marko
   7 | }
   8 |
>  9 | <for|{ href, title }| of=input.tab>
     |        ^ (parameter) href: string
  10 |     // ^?
  11 |   <a href=href>
  12 |     ${title}
```

### Ln 12, Col 8
```marko
  10 |     // ^?
  11 |   <a href=href>
> 12 |     ${title}
     |        ^ (parameter) title: string
  13 |     // ^?
  14 |   </a>
  15 | </for>
```

### Ln 18, Col 10
```marko
  16 |
  17 | <select>
> 18 |   <for|{ value, content }| of=input.option>
     |          ^ (parameter) value: any
  19 |       // ^?
  20 |     <option value=value>
  21 |       ${content}
```

### Ln 21, Col 10
```marko
  19 |       // ^?
  20 |     <option value=value>
> 21 |       ${content}
     |          ^ (parameter) content: any
  22 |       // ^?
  23 |     </option>
  24 |   </for>
```

### Ln 28, Col 10
```marko
  26 |
  27 | <my-select>
> 28 |   <for|{ href, title }| of=input.tab>
     |          ^ (parameter) href: string
  29 |       // ^?
  30 |     <@option value=href>
  31 |       // ^?
```

### Ln 30, Col 10
```marko
  28 |   <for|{ href, title }| of=input.tab>
  29 |       // ^?
> 30 |     <@option value=href>
     |          ^ (property) "@option": Marko.AttrTag<{
    value: string;
    renderBody: Marko.Body;
}> | undefined
  31 |       // ^?
  32 |       ${title}
  33 |     </@option>
```

### Ln 35, Col 10
```marko
  33 |     </@option>
  34 |   </for>
> 35 |   <for|{ value, content }| of=input.option>
     |          ^ (parameter) value: any
  36 |       // ^?
  37 |     <@option value=value>
  38 |       // ^?
```

### Ln 37, Col 10
```marko
  35 |   <for|{ value, content }| of=input.option>
  36 |       // ^?
> 37 |     <@option value=value>
     |          ^ (property) "@option": Marko.AttrTag<{
    value: string;
    renderBody: Marko.Body;
}> | undefined
  38 |       // ^?
  39 |       ${content}
  40 |     </@option>
```

