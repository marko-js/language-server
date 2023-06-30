## Diagnostics
### Ln 14, Col 24
```marko
  12 | </form>
  13 |
> 14 | <form id="page-search" role=" search">
     |                        ^^^^ Type '" search"' is not assignable to type '"form" | AttrMissing | "none" | "search" | "list" | "link" | "dialog" | "grid" | "listbox" | "menu" | "tree" | "alert" | "alertdialog" | "application" | "article" | ... 55 more ... | "treeitem"'. Did you mean '"search"'?
  15 |   <p id="search-label">
  16 |     Search this page
  17 |   </p>
```

### Ln 2, Col 4
```marko
  1 | <form id="site-search" role="search">
> 2 |   <p id="search-label">
    |    ^ Fix any of the following:
  Document has multiple elements referenced with ARIA with the same id attribute: search-label
  3 |     Search this site
  4 |   </p>
  5 |   <input
```

