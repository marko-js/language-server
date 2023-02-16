## Source Diagnostics
### Ln 14, Col 2
```marko
  12 | <div.${value}-test-${value}/>
  13 |
> 14 | <test-tag#test/>
     |  ^^^^^^^^^^^^^ Argument of type '{ id: string; }' is not assignable to parameter of type 'Input & { id: string; }'.
  Property 'class' is missing in type '{ id: string; }' but required in type 'Input'.
  15 | <test-tag#test-${value}/>
  16 | <test-tag#${value}-test/>
  17 | <test-tag#${value}-test-${value}/>
```

### Ln 15, Col 2
```marko
  13 |
  14 | <test-tag#test/>
> 15 | <test-tag#test-${value}/>
     |  ^^^^^^^^^^^^^^^^^^^^^^ Argument of type '{ id: string; }' is not assignable to parameter of type 'Input & { id: string; }'.
  Property 'class' is missing in type '{ id: string; }' but required in type 'Input'.
  16 | <test-tag#${value}-test/>
  17 | <test-tag#${value}-test-${value}/>
  18 |
```

### Ln 16, Col 2
```marko
  14 | <test-tag#test/>
  15 | <test-tag#test-${value}/>
> 16 | <test-tag#${value}-test/>
     |  ^^^^^^^^^^^^^^^^^^^^^^ Argument of type '{ id: string; }' is not assignable to parameter of type 'Input & { id: string; }'.
  Property 'class' is missing in type '{ id: string; }' but required in type 'Input'.
  17 | <test-tag#${value}-test-${value}/>
  18 |
  19 | <test-tag.test/>
```

### Ln 17, Col 2
```marko
  15 | <test-tag#test-${value}/>
  16 | <test-tag#${value}-test/>
> 17 | <test-tag#${value}-test-${value}/>
     |  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Argument of type '{ id: string; }' is not assignable to parameter of type 'Input & { id: string; }'.
  Property 'class' is missing in type '{ id: string; }' but required in type 'Input'.
  18 |
  19 | <test-tag.test/>
  20 | <test-tag.hello.world/>
```

### Ln 19, Col 2
```marko
  17 | <test-tag#${value}-test-${value}/>
  18 |
> 19 | <test-tag.test/>
     |  ^^^^^^^^^^^^^ Argument of type '{ class: string; }' is not assignable to parameter of type 'Input & { class: string; }'.
  Property 'id' is missing in type '{ class: string; }' but required in type 'Input'.
  20 | <test-tag.hello.world/>
  21 | <test-tag.test-${value}/>
  22 | <test-tag.${value}-test/>
```

### Ln 20, Col 2
```marko
  18 |
  19 | <test-tag.test/>
> 20 | <test-tag.hello.world/>
     |  ^^^^^^^^^^^^^^^^^^^^ Argument of type '{ class: string; }' is not assignable to parameter of type 'Input & { class: string; }'.
  Property 'id' is missing in type '{ class: string; }' but required in type 'Input'.
  21 | <test-tag.test-${value}/>
  22 | <test-tag.${value}-test/>
  23 | <test-tag.${value}-test-${value}/>
```

### Ln 21, Col 2
```marko
  19 | <test-tag.test/>
  20 | <test-tag.hello.world/>
> 21 | <test-tag.test-${value}/>
     |  ^^^^^^^^^^^^^^^^^^^^^^ Argument of type '{ class: string; }' is not assignable to parameter of type 'Input & { class: string; }'.
  Property 'id' is missing in type '{ class: string; }' but required in type 'Input'.
  22 | <test-tag.${value}-test/>
  23 | <test-tag.${value}-test-${value}/>
  24 |
```

### Ln 22, Col 2
```marko
  20 | <test-tag.hello.world/>
  21 | <test-tag.test-${value}/>
> 22 | <test-tag.${value}-test/>
     |  ^^^^^^^^^^^^^^^^^^^^^^ Argument of type '{ class: string; }' is not assignable to parameter of type 'Input & { class: string; }'.
  Property 'id' is missing in type '{ class: string; }' but required in type 'Input'.
  23 | <test-tag.${value}-test-${value}/>
  24 |
```

### Ln 23, Col 2
```marko
  21 | <test-tag.test-${value}/>
  22 | <test-tag.${value}-test/>
> 23 | <test-tag.${value}-test-${value}/>
     |  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Argument of type '{ class: string; }' is not assignable to parameter of type 'Input & { class: string; }'.
  Property 'id' is missing in type '{ class: string; }' but required in type 'Input'.
  24 |
```

