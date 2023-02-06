## Hovers
### Ln 2, Col 15
```marko
  1 | <div onClick("handleClickMissing")/>
> 2 | $ console.log(component);
    |               ^ const component: Component
```

## Source Diagnostics
### Ln 1, Col 6
```marko
> 1 | <div onClick("handleClickMissing")/>
    |      ^^^^^^^ Type '((...args: any) => any) | ((eventName: PropertyKey, ...args: any[]) => boolean) | (() => void) | { <Key extends PropertyKey>(name: never, value: Record<PropertyKey, unknown>[Key]): void; (value: Partial<...>): void; } | (<Key extends PropertyKey>(name: never, value?: Record<...>[Key] | undefined) => void) | (() => v...' is not assignable to type '((event: MouseEvent, element: HTMLDivElement) => void) | undefined'.
  Type '(eventName: PropertyKey, ...args: any[]) => boolean' is not assignable to type '(event: MouseEvent, element: HTMLDivElement) => void'.
    Types of parameters 'eventName' and 'event' are incompatible.
      Type 'MouseEvent' is not assignable to type 'PropertyKey'.
  2 | $ console.log(component);
```

### Ln 1, Col 14
```marko
> 1 | <div onClick("handleClickMissing")/>
    |              ^^^^^^^^^^^^^^^^^^^^ Argument of type '"handleClickMissing"' is not assignable to parameter of type '"emit" | "forceUpdate" | "setState" | "setStateDirty" | ((...args: any) => any) | "handleClick"'.
  2 | $ console.log(component);
```

