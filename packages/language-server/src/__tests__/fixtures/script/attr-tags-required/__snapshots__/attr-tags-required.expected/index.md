## Diagnostics
### Ln 76, Col 11
```marko
  74 |
  75 | // An unknown attribute, with the attribute tag given
> 76 | <req-menu bogus=1>
     |           ^^^^^ Object literal may only specify known properties, and '"bogus"' does not exist in type 'Input & Directives<Input>'.
  77 |   <@req/>
  78 |   <@req/>
  79 | </req-menu>
```

### Ln 262, Col 2
```marko
  260 |
  261 | // Given nowhere, by a tag with rest attribute tags => error
> 262 | <idx-menu>
      |  ^^^^^^^^ Argument of type '{ other: { [Symbol.iterator]: any; }; [attributeTags]: [{ other: { [Symbol.iterator]: any; }; }]; }' is not assignable to parameter of type 'Input & Directives<Input>'.
  Property 'req' is missing in type '{ other: { [Symbol.iterator]: any; }; [attributeTags]: [{ other: { [Symbol.iterator]: any; }; }]; }' but required in type 'Input'.
  263 |   <@other/>
  264 |   <@other/>
  265 | </idx-menu>
```

### Ln 266, Col 2
```marko
  264 |   <@other/>
  265 | </idx-menu>
> 266 | <idx-menu>
      |  ^^^^^^^^ Argument of type '{ other: never; [attributeTags]: [NoInfer<{ other: { label: string; [Symbol.iterator]: any; }; }>]; }' is not assignable to parameter of type 'Input & Directives<Input>'.
  Property 'req' is missing in type '{ other: never; [attributeTags]: [NoInfer<{ other: { label: string; [Symbol.iterator]: any; }; }>]; }' but required in type 'Input'.
  267 |   <for|t| of=cols>
  268 |     <@other label=t/>
  269 |   </for>
```

### Ln 293, Col 11
```marko
  291 | </req-menu>
  292 | // The spread's other attributes are still checked => error
> 293 | <req-menu ...{ title: 1 }>
      |           ^^^^^^^^^^^^^^^^
> 294 |   <for|label| of=tuple>
      | ^^^^^^^^^^^^^^^^^^^^^^^
> 295 |     <@req label=label/>
      | ^^^^^^^^^^ Argument of type '{ req: never; [attributeTags]: [NoInfer<{ req: { label: "x" | "y"; [Symbol.iterator]: any; }; }>]; title: number; }' is not assignable to parameter of type 'Input & Directives<Input>'.
  Type '{ req: never; [attributeTags]: [NoInfer<{ req: { label: "x" | "y"; [Symbol.iterator]: any; }; }>]; title: number; }' is not assignable to type 'Input'.
    Types of property 'title' are incompatible.
      Type 'number' is not assignable to type 'string'.
  296 |   </for>
  297 | </req-menu>
  298 | // Written once, it is the attribute already
```

### Ln 307, Col 11
```marko
  305 | // An attribute of an attribute tag's name, the attribute tag in a <for>:
  306 | // reported as overwritten, as Marko replaces it with the attribute tag
> 307 | <req-menu req=1>
      |           ^^^^^ 'req' is specified more than once, so this usage will be overwritten.
  308 |   <for|label| of=tuple>
  309 |     <@req label=label/>
  310 |   </for>
```

