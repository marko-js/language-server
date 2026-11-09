---
"@marko/language-tools": patch
---

Keep `mtc` from failing with a location-less `Cannot find name 'FancyButton'` for a tag named like an identifier (eg `<FancyButton>` from `components/FancyButton.marko`) when no variable of that name is declared.
