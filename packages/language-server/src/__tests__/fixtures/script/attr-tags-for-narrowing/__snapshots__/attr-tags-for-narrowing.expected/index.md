## Hovers
### Ln 3, Col 14
```marko
  1 | <list>
  2 |   <for of=[1, 2, 3]>
> 3 |     <@item size="small"/>
    |              ^ (property) "size": "small"
  4 |           // ^?
  5 |   </for>
  6 |   <for of=[1, 2, 3]>
```

### Ln 7, Col 14
```marko
   5 |   </for>
   6 |   <for of=[1, 2, 3]>
>  7 |     <@item size="small"/>
     |              ^ (property) size?: "small" | "large" | undefined
   8 |           // ^?
   9 |     <@item size="huge"/>
  10 |           // ^?
```

### Ln 9, Col 14
```marko
   7 |     <@item size="small"/>
   8 |           // ^?
>  9 |     <@item size="huge"/>
     |              ^ (property) size?: "small" | "large" | undefined
  10 |           // ^?
  11 |   </for>
  12 | </list>
```

## Diagnostics
### Ln 2, Col 4
```marko
   1 | <list>
>  2 |   <for of=[1, 2, 3]>
     |    ^^^^^^^^^^^^^^^^^
>  3 |     <@item size="small"/>
     | ^^^^^^^^^^^^^^^^^^^^^^^^^
>  4 |           // ^?
     | ^^^^^^^^^^^^^^^^^^^^^^^^^
>  5 |   </for>
     | ^^^^^^^^^^^^^^^^^^^^^^^^^
>  6 |   <for of=[1, 2, 3]>
     | ^^^^^^^^^^^^^^^^^^^^^^^^^
>  7 |     <@item size="small"/>
     | ^^^^^^^^^^^^^^^^^^^^^^^^^
>  8 |           // ^?
     | ^^^^^^^^^^^^^^^^^^^^^^^^^
>  9 |     <@item size="huge"/>
     | ^^^^^^^^^^^ Argument of type '{ item: Marko.AttrTag<{ readonly size: "small"; readonly [Symbol.iterator]: any; }> | Marko.AttrTag<{ readonly size: "small"; readonly [Symbol.iterator]: any; } | { readonly size: "huge"; readonly [Symbol.iterator]: any; }> | undefined; }' is not assignable to parameter of type 'Directives & Input'.
  Type '{ item: Marko.AttrTag<{ readonly size: "small"; readonly [Symbol.iterator]: any; }> | Marko.AttrTag<{ readonly size: "small"; readonly [Symbol.iterator]: any; } | { readonly size: "huge"; readonly [Symbol.iterator]: any; }> | undefined; }' is not assignable to type 'Input'.
    Types of property 'item' are incompatible.
      Type 'AttrTag<{ readonly size: "small"; readonly [Symbol.iterator]: any; }> | AttrTag<{ readonly size: "small"; readonly [Symbol.iterator]: any; } | { readonly size: "huge"; readonly [Symbol.iterator]: any; }> | undefined' is not assignable to type 'AttrTag<{ size?: "small" | "large" | undefined; }> | undefined'.
        Type '{ readonly size: "huge"; readonly [Symbol.iterator]: any; } & { [Symbol.iterator](): Iterator<{ readonly size: "small"; readonly [Symbol.iterator]: any; } | { readonly size: "huge"; readonly [Symbol.iterator]: any; }, any, any>; }' is not assignable to type 'AttrTag<{ size?: "small" | "large" | undefined; }> | undefined'.
          Type '{ readonly size: "huge"; readonly [Symbol.iterator]: any; } & { [Symbol.iterator](): Iterator<{ readonly size: "small"; readonly [Symbol.iterator]: any; } | { readonly size: "huge"; readonly [Symbol.iterator]: any; }, any, any>; }' is not assignable to type 'AttrTag<{ size?: "small" | "large" | undefined; }>'.
            Type '{ readonly size: "huge"; readonly [Symbol.iterator]: any; } & { [Symbol.iterator](): Iterator<{ readonly size: "small"; readonly [Symbol.iterator]: any; } | { readonly size: "huge"; readonly [Symbol.iterator]: any; }, any, any>; }' is not assignable to type '{ size?: "small" | "large" | undefined; }'.
              Types of property 'size' are incompatible.
                Type '"huge"' is not assignable to type '"small" | "large" | undefined'.
  10 |           // ^?
  11 |   </for>
  12 | </list>
```

### Ln 9, Col 12
```marko
   7 |     <@item size="small"/>
   8 |           // ^?
>  9 |     <@item size="huge"/>
     |            ^^^^ Type '"huge"' is not assignable to type '"small" | "large" | undefined'.
  10 |           // ^?
  11 |   </for>
  12 | </list>
```

