## Diagnostics
### Ln 9, Col 8
```marko
   7 |       <h1>Welcome</h1>
   8 |       <h4>Skipped a level</h4>
>  9 |       <div role="tab">Orphan tab</div>
     |        ^^^ Fix any of the following:
  Required ARIA parent role not present: tablist
  10 |       <input type="text">
  11 |     </main>
  12 |   </body>
```

### Ln 8, Col 8
```marko
   6 |     <main>
   7 |       <h1>Welcome</h1>
>  8 |       <h4>Skipped a level</h4>
     |        ^^ Fix any of the following:
  Heading order invalid
   9 |       <div role="tab">Orphan tab</div>
  10 |       <input type="text">
  11 |     </main>
```

### Ln 10, Col 8
```marko
   8 |       <h4>Skipped a level</h4>
   9 |       <div role="tab">Orphan tab</div>
> 10 |       <input type="text">
     |        ^^^^^ Fix any of the following:
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element has no placeholder attribute
  Element's default semantics were not overridden with role="none" or role="presentation"
  11 |     </main>
  12 |   </body>
  13 | </html>
```

