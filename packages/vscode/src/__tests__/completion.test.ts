import { setTimeout } from "timers/promises";
import vscode from "vscode";

import snap from "mocha-snap";

import { getTestDoc, updateTestDoc } from "./setup.test";

describe("completion", () => {
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
  await updateTestDoc(src);
  const doc = getTestDoc();
  const text = doc.getText();

  do {
    // Retry triggering suggestion multiple times if it takes longer to process.
    await vscode.commands.executeCommand("editor.action.triggerSuggest");
    await setTimeout(1000);
    await vscode.commands.executeCommand("acceptSelectedSuggestion");
  } while (doc.getText() === text);

  return `\n${doc.getText().replace(/\r\n/g, "\n")}\n`;
}
