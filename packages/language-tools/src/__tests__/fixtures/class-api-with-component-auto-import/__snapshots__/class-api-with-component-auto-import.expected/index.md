## Hovers
### Ln 2, Col 15
```marko
  1 | <div onClick("handleClickMissing")/>
> 2 | $ console.log(component);
    |               ^ const component: Component
```

## Source Diagnostics
### Ln 1, Col 14
```marko
> 1 | <div onClick("handleClickMissing")/>
    |              ^^^^^^^^^^^^^^^^^^^^ Element implicitly has an 'any' type because expression of type '"handleClickMissing"' can't be used to index type 'default'.
  Property 'handleClickMissing' does not exist on type 'default'.
  2 | $ console.log(component);
```

