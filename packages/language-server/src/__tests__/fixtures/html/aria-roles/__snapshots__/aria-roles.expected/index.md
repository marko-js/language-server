## Diagnostics
### Ln 1, Col 6
```marko
> 1 | <div role="fake-role"></div>
    |      ^^^^ Type '"fake-role"' is not assignable to type 'AttrMissing | "none" | "search" | "list" | "link" | "dialog" | "grid" | "listbox" | "menu" | "tree" | "alert" | "alertdialog" | "application" | "article" | "banner" | ... 55 more ... | "treeitem"'.
  2 |
```

### Ln 1, Col 2
```marko
> 1 | <div role="fake-role"></div>
    |  ^^^ Fix all of the following:
  Role must be one of the valid ARIA roles: fake-role
  2 |
```

