---
type: bug
impact: med
effort: med
site: packages/language-server/src/__tests__/fixtures/script
---

# Reconcile the language-server snapshots with the marko version the manifests actually resolve

The `@marko/language-server` snapshot tests are not reproducible from the manifests alone. A fresh dependency resolution (delete the lockfile, reinstall) picks up marko 5.39.25 / `@marko/runtime-tags` 6.3.16, and two fixtures fail against the committed snapshots: `attr-tags-params-js` and `for-tag`. The previous `package-lock.json` masked this by pinning marko 5.39.11 / runtime-tags 6.1.17 even though the manifests require `marko@^5.39.24`, so the lock was stale relative to its own ranges. marko 5.39.24 is worse: with it roughly 40 fixtures fail on attr-tag hoisting and bound-attr diagnostics, most of which 5.39.25 fixed upstream. The two remaining mismatches should be investigated against current marko and either fixed upstream or re-snapshotted.

Check: remove `pnpm-lock.yaml`, `pnpm install`, then `pnpm run test:server` and read the diffs for `attr-tags-params-js` and `for-tag`.
