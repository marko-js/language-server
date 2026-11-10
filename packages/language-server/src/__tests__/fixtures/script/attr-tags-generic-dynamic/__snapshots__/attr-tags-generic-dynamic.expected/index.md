## Hovers
### Ln 9, Col 27
```marko
   7 | // From an attribute, repeated
   8 | <pick value="a">
>  9 |   <@option|v| value="b">${v}</@option>
     |                           ^ (parameter) v: string
  10 | //                        ^?
  11 |   <@option value="c"/>
  12 | </pick>
```

### Ln 17, Col 27
```marko
  15 | <pick value=1>
  16 |   <if=flag>
> 17 |     <@option|v| value=2>${v}</@option>
     |                           ^ (parameter) v: number
  18 | //                        ^?
  19 |   </if>
  20 | </pick>
```

### Ln 24, Col 27
```marko
  22 | // From an attribute and the attribute tags, as const
  23 | <pick value="a" as const>
> 24 |   <@option|v| value="a">${v}</@option>
     |                           ^ (parameter) v: string
  25 | //                        ^?
  26 |   <@option value="a"/>
  27 | </pick>
```

### Ln 30, Col 27
```marko
  28 |
  29 | <pick value="a" as const>
> 30 |   <@option|v| value="a">${v}</@option>
     |                           ^ (parameter) v: string
  31 | //                        ^?
  32 | </pick>
  33 |
```

### Ln 35, Col 36
```marko
  33 |
  34 | <pick value="a" as const>
> 35 |   <@option|v| value="a" as const>${v}</@option>
     |                                    ^ (parameter) v: "a"
  36 | //                                 ^?
  37 |   <@option value="a" as const/>
  38 | </pick>
```

### Ln 44, Col 5
```marko
  42 |   <@option value=1/>
  43 |   <@option value=2/>
> 44 |   ${v}
     |     ^ (parameter) v: number
  45 | //  ^?
  46 | </pick>
  47 |
```

### Ln 57, Col 27
```marko
  55 | <pick value="a">
  56 |   <for|x| of=["b", "c"]>
> 57 |     <@option|v| value=x>${v}</@option>
     |                           ^ (parameter) v: any
  58 | //                        ^?
  59 |   </for>
  60 | </pick>
```

### Ln 64, Col 25
```marko
  62 | // Given type arguments
  63 | <pick<number>>
> 64 |   <@option|v| value=1>${v}</@option>
     |                         ^ (parameter) v: number
  65 | //                      ^?
  66 |   <@option value="a"/>
  67 | </pick>
```

### Ln 71, Col 35
```marko
  69 | // From an attribute, into repeated attribute tags' params
  70 | <a-grid rows=[{ id: "a" }]>
> 71 |   <@column|{ row }| header="Id">${row.id}</@column>
     |                                   ^ (parameter) row: {
    id: string;
}
  72 | //                                ^?
  73 |   <@column|{ row }| header="Id again">${row.id}</@column>
  74 | </a-grid>
```

### Ln 77, Col 35
```marko
  75 |
  76 | <a-grid<{ id: string }> rows=[]>
> 77 |   <@column|{ row }| header="Id">${row.id}</@column>
     |                                   ^ (parameter) row: {
    id: string;
}
  78 | //                                ^?
  79 |   <@column|{ row }| header="Id again">${row.id}</@column>
  80 | </a-grid>
```

### Ln 84, Col 31
```marko
  82 | // A required attribute tag, from an attribute: repeated, in an if, in a for
  83 | <req-grid rows=[{ id: "a" }] sort(a, b) { return a.id.localeCompare(b.id); }>
> 84 |   <@column|row| header="Id">${row.id}</@column>
     |                               ^ (parameter) row: {
    id: string;
}
  85 | //                            ^?
  86 |   <@column|row| header="Id again">${row.id}</@column>
  87 | </req-grid>
```

### Ln 98, Col 51
```marko
   96 | </req-grid>
   97 |
>  98 | <req-grid rows=[{ id: "a" }] sort(a, b) { return a.id.localeCompare(b.id); }>
      |                                                   ^ (parameter) a: {
    id: string;
}
   99 | //                                                ^?
  100 |   <for|header| of=["Id", "Id again"] as const>
  101 |     <@column header=header/>
```

### Ln 130, Col 29
```marko
  128 | <gtable rows=users>
  129 |   <for|c| of=cols>
> 130 |     <@column|row| title=c>${row.name}</@column>
      |                             ^ (parameter) row: any
  131 | //                          ^?
  132 |   </for>
  133 | </gtable>
```

### Ln 139, Col 31
```marko
  137 |   <if=flag>
  138 |     <for|c| of=cols>
> 139 |       <@column|row| title=c>${row.name}</@column>
      |                               ^ (parameter) row: any
  140 | //                            ^?
  141 |     </for>
  142 |   </if>
```

### Ln 149, Col 31
```marko
  147 |   <for|c| of=cols>
  148 |     <if=flag>
> 149 |       <@column|row| title=c>${row.name}</@column>
      |                               ^ (parameter) row: any
  150 | //                            ^?
  151 |     </if>
  152 |   </for>
```

### Ln 159, Col 31
```marko
  157 |   <for|g| of=groups>
  158 |     <for|c| of=g.items>
> 159 |       <@column|row| title=c>${row.name}</@column>
      |                               ^ (parameter) row: any
  160 | //                            ^?
  161 |     </for>
  162 |   </for>
```

### Ln 168, Col 37
```marko
  166 | <gtable rows=users>
  167 |   <for|i| to=2>
> 168 |     <@column|row| title=String(i)>${row.name}</@column>
      |                                     ^ (parameter) row: any
  169 | //                                  ^?
  170 |   </for>
  171 | </gtable>
```

### Ln 176, Col 31
```marko
  174 | <gtable rows=users>
  175 |   <for|key| in=record>
> 176 |     <@column|row| title=key>${row.name}</@column>
      |                               ^ (parameter) row: any
  177 | //                            ^?
  178 |   </for>
  179 | </gtable>
```

### Ln 185, Col 33
```marko
  183 |   <if=flag>
  184 |     $ const label = "x";
> 185 |     <@column|row| title=label>${row.name}</@column>
      |                                 ^ (parameter) row: any
  186 | //                              ^?
  187 |   </if>
  188 | </gtable>
```

### Ln 196, Col 23
```marko
  194 |   <@section title="s">
  195 |     <for|i| of=[1, 2]>
> 196 |       <@row|r| id=i>${r.name}</@row>
      |                       ^ (parameter) r: any
  197 | //                    ^?
  198 |     </for>
  199 |   </@section>
```

### Ln 210, Col 29
```marko
  208 |         <@section title=c>
  209 |           <for|i| of=[1, 2]>
> 210 |             <@row|r| id=i>${r.name}</@row>
      |                             ^ (parameter) r: any
  211 | //                          ^?
  212 |           </for>
  213 |         </@section>
```

### Ln 222, Col 47
```marko
  220 | <gtable rows=users>
  221 |   <for|c| of=cols>
> 222 |     <@column|row: { name: string }| title=c>${row.name}</@column>
      |                                               ^ (parameter) row: {
    name: string;
}
  223 | //                                            ^?
  224 |   </for>
  225 | </gtable>
```

### Ln 232, Col 21
```marko
  230 |   <@section title="s">
  231 |     <@row|r: { name: string }| id=1>${r.name}</@row>
> 232 |     <@row|r| id=2>${r.name}</@row>
      |                     ^ (parameter) r: any
  233 | //                  ^?
  234 |   </@section>
  235 | </gpanel>
```

### Ln 240, Col 23
```marko
  238 |     <@section title=c>
  239 |       <@row|r: { name: string }| id=1>${r.name}</@row>
> 240 |       <@row|r| id=2>${r.name}</@row>
      |                       ^ (parameter) r: any
  241 | //                    ^?
  242 |     </@section>
  243 |   </for>
```

## Diagnostics
### Ln 51, Col 12
```marko
  49 | <pick value="a">
  50 |   <@option value="b"/>
> 51 |   <@option value=1/>
     |            ^^^^^ Type 'number' is not assignable to type 'string'.
  52 | </pick>
  53 |
  54 | // From an attribute, in a for (its body is typed apart from the tag)
```

### Ln 66, Col 12
```marko
  64 |   <@option|v| value=1>${v}</@option>
  65 | //                      ^?
> 66 |   <@option value="a"/>
     |            ^^^^^ Type 'string' is not assignable to type 'number'.
  67 | </pick>
  68 |
  69 | // From an attribute, into repeated attribute tags' params
```

