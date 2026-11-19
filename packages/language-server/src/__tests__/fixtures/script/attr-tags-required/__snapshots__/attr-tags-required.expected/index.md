## Diagnostics
### Ln 41, Col 4
```marko
  39 | // Only in a while: given
  40 | <req-menu>
> 41 |   <while=flag>
     |    ^^^^^ This kind of expression is always falsy.
  42 |     <@req/>
  43 |   </while>
  44 | </req-menu>
```

### Ln 77, Col 11
```marko
  75 |
  76 | // An unknown attribute, with the attribute tag given
> 77 | <req-menu bogus=1>
     |           ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input & AttributeTags<Input>'.
  78 |   <@req/>
  79 |   <@req/>
  80 | </req-menu>
```

### Ln 263, Col 2
```marko
  261 |
  262 | // Given nowhere, by a tag with rest attribute tags => error
> 263 | <idx-menu>
      |  ^^^^^^^^ Argument of type '{ other: { [Symbol.iterator]: any; }; [attributeTags]: [{ other: { [Symbol.iterator]: any; }; }]; }' is not assignable to parameter of type 'Input & AttributeTags<Input>'.
  Property 'req' is missing in type '{ other: { [Symbol.iterator]: any; }; [attributeTags]: [{ other: { [Symbol.iterator]: any; }; }]; }' but required in type 'Input'.
  264 |   <@other/>
  265 |   <@other/>
  266 | </idx-menu>
```

### Ln 267, Col 2
```marko
  265 |   <@other/>
  266 | </idx-menu>
> 267 | <idx-menu>
      |  ^^^^^^^^ Argument of type '{ other: never; [attributeTags]: [NoInfer<{ other: { label: string; [Symbol.iterator]: any; }; }>]; }' is not assignable to parameter of type 'Input & AttributeTags<Input>'.
  Property 'req' is missing in type '{ other: never; [attributeTags]: [NoInfer<{ other: { label: string; [Symbol.iterator]: any; }; }>]; }' but required in type 'Input'.
  268 |   <for|t| of=cols>
  269 |     <@other label=t/>
  270 |   </for>
```

### Ln 294, Col 11
```marko
  292 | </req-menu>
  293 | // The spread's other attributes are still checked => error
> 294 | <req-menu ...{ title: 1 }>
      |           ^^^^^^^^^^^^^^^^
> 295 |   <for|label| of=tuple>
      | ^^^^^^^^^^^^^^^^^^^^^^^
> 296 |     <@req label=label/>
      | ^^^^^^^^^^ Argument of type '{ req: never; [attributeTags]: [NoInfer<{ req: { label: "x" | "y"; [Symbol.iterator]: any; }; }>]; title: number; }' is not assignable to parameter of type 'Input & AttributeTags<Input>'.
  Type '{ req: never; [attributeTags]: [NoInfer<{ req: { label: "x" | "y"; [Symbol.iterator]: any; }; }>]; title: number; }' is not assignable to type 'Input'.
    Types of property 'title' are incompatible.
      Type 'number' is not assignable to type 'string'.
  297 |   </for>
  298 | </req-menu>
  299 | // Written once, it is the attribute already
```

### Ln 308, Col 11
```marko
  306 | // An attribute of an attribute tag's name, the attribute tag in a <for>:
  307 | // reported as overwritten, as Marko replaces it with the attribute tag
> 308 | <req-menu req=1>
      |           ^^^^^ 'req' is specified more than once, so this usage will be overwritten.
  309 |   <for|label| of=tuple>
  310 |     <@req label=label/>
  311 |   </for>
```

### Ln 341, Col 2
```marko
  339 | // A Tags API template is given its body as `content`, whatever its input
  340 | // declares => error
> 341 | <class-keyed-body>Seller</class-keyed-body>
      |  ^^^^^^^^^^^^^^^^ Object literal may only specify known properties, and '["content"]' does not exist in type 'Input'.
  342 |
  343 | // A Class API template's body is its `renderBody`, whatever else its input
  344 | // declares
```

### Ln 352, Col 2
```marko
  350 |
  351 | // And a Tags API template's is its `content`, wherever it is => error
> 352 | <tags-keyed-body>Seller</tags-keyed-body>
      |  ^^^^^^^^^^^^^^^ Object literal may only specify known properties, and '[Marko._.contentFor(__marko_internal_module_10)]' does not exist in type 'Input'.
  353 |
  354 | // A body given to a template that takes none is named by its key => error
  355 | <class-no-body>Seller</class-no-body>
```

### Ln 355, Col 2
```marko
  353 |
  354 | // A body given to a template that takes none is named by its key => error
> 355 | <class-no-body>Seller</class-no-body>
      |  ^^^^^^^^^^^^^ Object literal may only specify known properties, and '[Marko._.contentFor(__marko_internal_module_11)]' does not exist in type 'Input'.
  356 |
```

