---
"@marko/language-server": patch
"marko-vscode": patch
---

Keep formatting Marko files when the project's prettier config lists `plugins`, which replaced the Marko plugin so "Format Document" failed with `Couldn't resolve parser "marko"` and code-action fixes were left unformatted. The config's plugins are now resolved from the config file and loaded beside the Marko plugin, and one that cannot be loaded is skipped rather than failing the format.
