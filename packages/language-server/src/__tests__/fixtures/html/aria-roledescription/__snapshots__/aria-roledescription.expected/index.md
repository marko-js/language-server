## Diagnostics
### Ln 1, Col 2
```marko
> 1 | <p aria-roledescription="my paragraph" id="fail1">paragraph</p>
    |  ^ Fix any of the following:
  Give the element a role that supports aria-roledescription
  2 | <div aria-roledescription="my div" id="fail2">div</div>
```

### Ln 2, Col 2
```marko
  1 | <p aria-roledescription="my paragraph" id="fail1">paragraph</p>
> 2 | <div aria-roledescription="my div" id="fail2">div</div>
    |  ^^^ Fix any of the following:
  Give the element a role that supports aria-roledescription
```

