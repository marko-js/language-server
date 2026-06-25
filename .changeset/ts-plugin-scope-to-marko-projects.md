---
"@marko/language-server": patch
"@marko/ts-plugin": patch
---

Stop the TypeScript Server plugin from interfering with other plugins (such as Vue's) in projects that don't use Marko. Because the plugin is injected into the editor's shared TypeScript Server for every workspace, it previously patched the shared language service host even where no Marko files exist, which broke diagnostics, go-to-definition, and rename in `.vue` files. It now stays inert unless the project actually uses Marko.
