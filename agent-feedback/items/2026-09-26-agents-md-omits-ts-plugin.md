---
type: unclear
impact: low
effort: low
site: AGENTS.md › Repo overview
---

# Add `@marko/ts-plugin` to the package list in AGENTS.md

The root `AGENTS.md` says there are "Four pnpm workspaces under `packages/`", and its table and build-order diagram leave out `packages/ts-plugin` (`@marko/ts-plugin`). That package bundles `language-server/src/ts-plugin` and, through it, language-tools from source, so a fix in either ships in it and its changeset must bump it. An agent reading only the table misses that package. Add a ts-plugin row and the `language-tools -> language-server -> ts-plugin` edge. Also update the "four packages" line in the Repo notes of `agent-feedback/README.md`.

Check: `ls packages` lists five directories, and the root `tsconfig.json` references `./packages/ts-plugin`.
