---
"@marko/language-server": patch
"marko-vscode": patch
---

Update to `vscode-languageserver` 11 and `vscode-languageclient` 11. An incremental edit that joins a `\r` and a `\n` across its boundary no longer leaves a CRLF document's positions off by a line until it is reopened. The extension now sends documents open at startup to the server in order, and restarting the server no longer races the closing connection.
