---
type: bug
impact: med
effort: low
site: packages/language-server/src/service/marko/complete/AttrName.ts › AttrName
---

# Keep the script plugin's object-literal properties out of the attribute-modifier position

`AttrName` already gets the modifier position right on its own: with the caret after the colon it returns exactly `scoped` and `no-update`. But `createService.doComplete` unions every plugin's result, and at that same offset the script plugin maps into the generated attributes object literal and adds the tag's whole property list, so `<div class:|>` returns 360 items and `<input value:|/>` returns 398. The two legal items are also buried: they carry no `sortText`, while the TypeScript items carry `"11"`, which sorts ahead of `no-update` and `scoped` in any client that honours `sortText`. This is the position where the server is most needed, because the modifier vocabulary is small, Marko-specific and not guessable, and it is the one position where an exhaustive property list is certainly wrong. Give the plugin facade a way for a handler to answer exclusively, or have the script plugin return nothing when the source offset falls after a colon inside an `AttrName`.

Check: request completion at the caret in `<div class:|>` and `<input value:|/>` against a project on marko 6.3.44; today the results are 360 and 398 items and should be the two modifiers, ordered ahead of anything else the facade merges in.
