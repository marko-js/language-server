# @marko/ts-plugin

A [TypeScript Server plugin](https://www.typescriptlang.org/tsconfig/#plugins)
that teaches TypeScript to resolve Marko (`.marko`) imports with real types
from inside `.ts`/`.tsx` files. It is the same plugin the
[Marko VS Code extension](https://github.com/marko-js/language-server) bundles,
published standalone so other editors can register it with their TypeScript
server.

## Usage

Add it to a project's `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "plugins": [{ "name": "@marko/ts-plugin" }],
  },
}
```

This enables types for `import Component from "./component.marko"` when the
editor uses the workspace TypeScript version.

Editors that run their own TypeScript server (vtsls, typescript-language-server)
can load it as a global plugin instead of per-project. The Marko VS Code
extension registers it automatically; the Zed extension
([marko-js/zed](https://github.com/marko-js/zed)) does the same via its
TypeScript language-server configuration.
