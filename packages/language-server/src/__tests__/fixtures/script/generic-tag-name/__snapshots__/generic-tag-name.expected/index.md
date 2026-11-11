## Diagnostics
### Ln 14, Col 4
```marko
  12 | // A native tag has no attribute tags: once, repeated, in an <if> and a <for>.
  13 | <${input.as}>
> 14 |   <@item/>
     |    ^^^^^ Type '{ [Symbol.iterator]: any; }' is not assignable to type 'never'.
  15 | </>
  16 | <${input.as}>
  17 |   <@item/>
```

### Ln 17, Col 4
```marko
  15 | </>
  16 | <${input.as}>
> 17 |   <@item/>
     |    ^^^^^ Type '{ [Symbol.iterator]: any; }' is not assignable to type 'never'.
  18 |   <@item/>
  19 | </>
  20 | <${input.as}>
```

### Ln 18, Col 4
```marko
  16 | <${input.as}>
  17 |   <@item/>
> 18 |   <@item/>
     |    ^^^^^ Type '{ item: { [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<NoAttrTags> & { item: { [Symbol.iterator]: any; }; }'.
  Type '{ item: { [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<NoAttrTags>'.
    Property '"item"' is incompatible with index signature.
      Type '{ [Symbol.iterator]: any; }' is not assignable to type 'undefined'.
  19 | </>
  20 | <${input.as}>
  21 |   <if=input.as>
```

### Ln 22, Col 6
```marko
  20 | <${input.as}>
  21 |   <if=input.as>
> 22 |     <@item/>
     |      ^^^^^ Type '{ item: { [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<NoAttrTags> & { item: { [Symbol.iterator]: any; }; }'.
  Type '{ item: { [Symbol.iterator]: any; }; }' is not assignable to type 'Partial<NoAttrTags>'.
    Property '"item"' is incompatible with index signature.
      Type '{ [Symbol.iterator]: any; }' is not assignable to type 'undefined'.
  23 |   </if>
  24 | </>
  25 | <${input.as}>
```

### Ln 27, Col 6
```marko
  25 | <${input.as}>
  26 |   <for|x| of=[1]>
> 27 |     <@item title=`${x}`/>
     |      ^^^^^ Type '{ item: { title: string; [Symbol.iterator]: any; }; }' is not assignable to type 'AttrTagGroup<AnyInputFor<S>>'.
  28 |   </for>
  29 | </>
  30 | <${input.as} class=["a", "b"] title="x">
```

### Ln 38, Col 6
```marko
  36 |
  37 | // As a concrete name
> 38 | <div class=1/>
     |      ^^^^^ Type '1' is not assignable to type 'AttrClass'.
  39 | <button href="/"/>
  40 |
  41 | // As a name of the constraint's type
```

### Ln 39, Col 9
```marko
  37 | // As a concrete name
  38 | <div class=1/>
> 39 | <button href="/"/>
     |         ^^^^ Object literal may only specify known properties, and '"href"' does not exist in type 'Directives & Button'.
  40 |
  41 | // As a name of the constraint's type
  42 | static declare const anyTag: keyof Marko.NativeTags;
```

### Ln 39, Col 2
```marko
  37 | // As a concrete name
  38 | <div class=1/>
> 39 | <button href="/"/>
     |  ^^^^^^ Fix any of the following:
  Element does not have inner text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  Element's default semantics were not overridden with role="none" or role="presentation"
  40 |
  41 | // As a name of the constraint's type
  42 | static declare const anyTag: keyof Marko.NativeTags;
```

