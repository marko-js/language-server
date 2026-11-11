---
"@marko/language-tools": minor
"@marko/language-server": minor
"marko-vscode": minor
---

Show a template's doc comment wherever the template is used. A template that declares its `Input` names its template `Input` as well, so the comment above `Input` documents both: hovering the template imported by name (`import FancyButton from "./fancy-button.marko"`, `<FancyButton>`, `<${FancyButton}>`), or the name of a tag it defines (however the tag is found), shows the comment.
