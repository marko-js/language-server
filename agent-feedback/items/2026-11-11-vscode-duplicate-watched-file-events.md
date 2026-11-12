---
type: perf
impact: low
effort: low
site: packages/language-server/src/index.ts › onInitialized
---

# Stop VS Code from reporting every watched file change twice

The server registers its own `didChangeWatchedFiles` watcher whenever the client advertises `dynamicRegistration` (meant for clients such as Zed; the comment says VS Code "already watches these via its client-side `synchronize.fileEvents`"). vscode-languageclient advertises `dynamicRegistration: true` (`FileSystemWatcherFeature.fillClientCapabilities`), so in VS Code both watchers fire and the client's 250 ms batch carries each change twice to `onDidChangeWatchedFiles` and `doChangeWatchedFiles`. Drop `synchronize.fileEvents` from `packages/vscode/src/index.ts` and rely on the registration (one glob in one place), or skip the registration for VS Code. The client's glob also lists `*.cts` twice and lacks the server glob's `*.cjs`.

Check: with `marko.trace.server` set to `verbose`, save a `.ts` file in a Marko project: the `workspace/didChangeWatchedFiles` notification lists the file twice.
