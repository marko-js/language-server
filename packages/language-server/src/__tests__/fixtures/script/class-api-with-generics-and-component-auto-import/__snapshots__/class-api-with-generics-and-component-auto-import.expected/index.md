## Hovers
### Ln 7, Col 25
```marko
  5 | <div onClick("handleClickMissing")/>
  6 | <div onClick("strange-handler")/>
> 7 | $ console.log(component.input);
    |                         ^ (property) Marko.Component<Input<T>, unknown>.input: Input<T>
---
The attributes passed to this instance.
  8 | //                      ^?
```

## Diagnostics
### Ln 5, Col 15
```marko
  3 | }
  4 |
> 5 | <div onClick("handleClickMissing")/>
    |               ^^^^^^^^^^^^^^^^^^ Property 'handleClickMissing' does not exist on type 'default<T>'.
  6 | <div onClick("strange-handler")/>
  7 | $ console.log(component.input);
  8 | //                      ^?
```

