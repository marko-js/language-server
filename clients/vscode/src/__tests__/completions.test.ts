import { setTimeout } from "timers/promises";
import vscode from "vscode";
import snap from "mocha-snap";

describe("completions", () => {
  it("tag name", async () => {
    await snap.inline(
      () => suggest("<spa█/>"),
      `
<span/>
`
    );
  });

  it("open tag close", async () => {
    await snap.inline(
      () => suggest("<div>█"),
      `
<div>
    
</div>
`
    );
  });

  it("attr name", async () => {
    await snap.inline(
      () => suggest("<div aria-liv█>"),
      `
<div aria-live="off">
`
    );
  });

  it("attr modifier", async () => {
    await snap.inline(
      () => suggest("<div id:s█>"),
      `
<div id:scoped>
`
    );
  });

  it("css prop", async () => {
    await snap.inline(
      () =>
        suggest(`style {
  div {
    colo█
  }
}`),
      `
style {
  div {
    color: ;
  }
}
`
    );
  });
});

async function suggest(src: string) {
  const editor = vscode.window.activeTextEditor!;
  const doc = editor.document;

  // Replace live editor text with requested src.
  await editor.edit((builder) => {
    builder.replace(
      new vscode.Range(
        new vscode.Position(0, 0),
        doc.positionAt(doc.getText().length)
      ),
      src
    );
  });

  // We use █ to denote where the cursor should be.
  const pos = doc.positionAt(doc.getText().indexOf("█"));
  editor.selection = new vscode.Selection(pos, pos);

  // Strip out the cursor character.
  await editor.edit((builder) => {
    builder.replace(
      new vscode.Range(pos, new vscode.Position(pos.line, pos.character + 1)),
      ""
    );
  });

  const text = doc.getText();

  do {
    // Retry triggering suggestion multiple times if it takes longer to process.
    await vscode.commands.executeCommand("editor.action.triggerSuggest");
    await setTimeout(100);
    await vscode.commands.executeCommand("acceptSelectedSuggestion");
  } while (doc.getText() === text);

  return `\n${doc.getText().replace(/\r\n/g, "\n")}\n`;
}
