## Hovers
### Ln 3, Col 15
```marko
  1 | <div onClick("handleClickMissing")/>
  2 | <div onClick("strange-handler")/>
> 3 | $ console.log(component);
    |               ^ const component: Component
  4 |
```

## Source Diagnostics
### Ln 1, Col 15
```marko
> 1 | <div onClick("handleClickMissing")/>
    |               ^^^^^^^^^^^^^^^^^^ Property 'handleClickMissing' does not exist on type 'default'.
  2 | <div onClick("strange-handler")/>
  3 | $ console.log(component);
  4 |
```

