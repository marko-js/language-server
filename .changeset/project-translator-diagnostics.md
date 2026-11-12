---
"@marko/language-server": patch
---

Check a template's Marko diagnostics and apply its fixes with its own project's translator. Projects on different Marko runtimes sharing one `@marko/compiler` (eg a pnpm workspace with Marko 5 and Marko 6 packages) got the translator of whichever project was loaded last, so a Marko 5 template could lose its fixes, or a Marko 6 template be checked as Marko 5.
