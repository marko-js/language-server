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

