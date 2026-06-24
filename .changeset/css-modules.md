---
"@marko/language-tools": minor
"@marko/language-server": minor
"@marko/type-check": minor
"marko-vscode": minor
---

Add CSS module support (`*.module.css`, `*.module.scss`, `*.module.less`).

Importing a CSS module from a `.marko` file now produces a virtual TypeScript module typed from the stylesheet's class and id selectors. This enables completion, hover, go-to-definition, find-references and rename for the imported class/id names, and surfaces type errors for names that do not exist. `@marko/type-check` (`mtc`) checks the same usage and emits the conventional `foo.module.css.d.ts` declaration. In editors, Marko only resolves `*.module.css` imports for `.marko` files — imports in plain `.ts`/`.tsx` files fall through to normal TypeScript resolution (which picks up that emitted declaration, or whatever CSS-modules setup you already use), so Marko never hijacks resolution for non-Marko files.

Marko's embedded CSS module blocks (`<style/styles>`, including `<style.scss/styles>` etc.) are typed the same way: the tag variable becomes an object of the block's class/id names instead of an `HTMLStyleElement`, so `styles.foo` is type-checked and its references/renames stay in sync with the selectors in the `<style>` block.
