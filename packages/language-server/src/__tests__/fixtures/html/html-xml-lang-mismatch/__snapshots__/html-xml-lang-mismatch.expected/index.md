## Diagnostics
### Ln 1, Col 17
```marko
> 1 | <html lang="en" xml:lang="es">
    |                 ^^^ Object literal may only specify known properties, and '"xml"' does not exist in type 'Directives & Marko·Inputᐸʺhtmlʺᐳ'.
  2 |   <head>
  3 |     <title>Conflicting Languages</title>
  4 |   </head>
```

### Ln 1, Col 2
```marko
> 1 | <html lang="en" xml:lang="es">
    |  ^^^^ Fix all of the following:
  Lang and xml:lang attributes do not have the same base language
  2 |   <head>
  3 |     <title>Conflicting Languages</title>
  4 |   </head>
```

