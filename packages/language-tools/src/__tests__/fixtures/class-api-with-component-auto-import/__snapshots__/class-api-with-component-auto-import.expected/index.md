## Hovers
### Ln 2, Col 15
```marko
  1 | <div onClick("handleClickMissing")/>
> 2 | $ console.log(component);
    |               ^ const component: ட
```

## Source Diagnostics
### Ln 1, Col 6
```marko
> 1 | <div onClick("handleClickMissing")/>
    |      ^^^^^^^ Type '((...args: any) => any) | ((eventName: string | symbol, ...args: any[]) => boolean) | (() => void) | ((name: string, value: unknown) => void) | ((name: string, value?: unknown) => void) | (() => void)' is not assignable to type '((event: MouseEvent, element: HTMLDivElement) => void) | undefined'.
  Type '(eventName: string | symbol, ...args: any[]) => boolean' is not assignable to type '(event: MouseEvent, element: HTMLDivElement) => void'.
    Types of parameters 'eventName' and 'event' are incompatible.
      Type 'MouseEvent' is not assignable to type 'string | symbol'.
  2 | $ console.log(component);
```

### Ln 1, Col 14
```marko
> 1 | <div onClick("handleClickMissing")/>
    |              ^^^^^^^^^^^^^^^^^^^^ Argument of type '"handleClickMissing"' is not assignable to parameter of type '"emit" | "forceUpdate" | "setState" | "setStateDirty" | ((...args: any) => any) | "handleClick"'.
  2 | $ console.log(component);
```

