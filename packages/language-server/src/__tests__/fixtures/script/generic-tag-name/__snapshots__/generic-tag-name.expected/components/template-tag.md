## Diagnostics
### Ln 11, Col 15
```marko
   9 |
  10 | <${input.tag} value="x"/>
> 11 | <${input.tag} value=1/>
     |               ^^^^^ Type 'number' is not assignable to type 'string'.
  12 | <${input.tag} value="x" bogus=1/>
  13 | <${input.tag} value="x">
  14 |   <@item x=1/>
```

### Ln 12, Col 25
```marko
  10 | <${input.tag} value="x"/>
  11 | <${input.tag} value=1/>
> 12 | <${input.tag} value="x" bogus=1/>
     |                         ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Directives & { value: string; item?: AttrTag<{ x: number; renderBody?: Body<[{ y: number; }], void> | undefined; }> | undefined; }'.
  13 | <${input.tag} value="x">
  14 |   <@item x=1/>
  15 |   <@item x="2"/>
```

### Ln 15, Col 10
```marko
  13 | <${input.tag} value="x">
  14 |   <@item x=1/>
> 15 |   <@item x="2"/>
     |          ^ Type 'string' is not assignable to type 'number'.
  16 | </>
  17 |
  18 | // As a template of the constraint's type
```

### Ln 23, Col 19
```marko
  21 |   void
  22 | >;
> 23 | <${Tag} value="x" bogus=1/>
     |                   ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Directives & { value: string; item?: AttrTag<{ x: number; renderBody?: Body<[{ y: number; }], void> | undefined; }> | undefined; }'.
  24 | <${Tag} value="x">
  25 |   <@item x=1/>
  26 |   <@item x="2"/>
```

### Ln 26, Col 10
```marko
  24 | <${Tag} value="x">
  25 |   <@item x=1/>
> 26 |   <@item x="2"/>
     |          ^ Type 'string' is not assignable to type 'number'.
  27 | </>
  28 |
  29 | // Content params by the constraint
```

