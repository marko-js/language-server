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
    |              ^^^^^^^^^^^^^^^^^^^^ Argument of type '"handleClickMissing"' is not assignable to parameter of type '((...args: any) => any) | "emit" | "forceUpdate" | "setState" | "setStateDirty" | "handleClick"'.
  2 | $ console.log(component);
```

