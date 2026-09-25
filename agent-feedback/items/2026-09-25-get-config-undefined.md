---
type: bug
impact: low
effort: low
site: packages/language-server/src/utils/workspace.ts › getConfig
---

# Return an empty section from `getConfig` when the client cannot answer

`getConfig` swallows a failed `workspace/configuration` request and returns `undefined`, though its callers read the result as an object: `getPreferences` in the script service dereferences `suggestConfig.enabled` and throws, so completion fails outright for a client that does not answer configuration requests (or before a connection is set up). Falling back to `{}`, as it already does for a `null` answer, keeps the defaults.

Check: `cd packages/language-server && npx mocha src/__tests__/plain-script.test.ts` on its own; "completes members" fails with `TypeError: Cannot read properties of undefined (reading 'enabled')` from `getPreferences`, and passes only when the full suite has run something that set up the configuration first.
