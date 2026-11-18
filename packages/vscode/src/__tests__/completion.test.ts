import snap from "mocha-snap";
import { setTimeout } from "timers/promises";
import vscode from "vscode";

import { getTestDoc, updateTestDoc, writeTestFiles } from "./setup.test";

describe("completion", () => {
  it("tag name", async () => {
    await snap.inline(
      () => suggest("<spa█/>"),
      `
<span/>
`,
    );
  });

  it("open tag close", async () => {
    await snap.inline(
      () => suggest("<div>█"),
      `
<div>
    
</div>
`,
    );
  });

  it("attr name", async () => {
    await snap.inline(
      () => suggest("<div aria-liv█>"),
      `
<div aria-live>
`,
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
`,
    );
  });

  it("template global", async () => {
    // One the template does not name yet: what a template may read is
    // declared in every one, so that it is offered. Without the words of the
    // open documents, so that the name is TypeScript's.
    const editor = vscode.workspace.getConfiguration("editor");
    await editor.update("wordBasedSuggestions", "off", true);
    try {
      await snap.inline(
        () => suggest("<div>${$sig█}</div>"),
        `
<div>\${$signal}</div>
`,
      );
    } finally {
      await editor.update("wordBasedSuggestions", undefined, true);
    }
  });

  it("custom tag attr name", async () => {
    // As in the definition test: the tag is written before the page opens (and
    // becomes the edited document), so the page's directory finds it.
    await writeTestFiles({
      "attr-name/components/greeting.marko":
        "export interface Input { message: string }\n<div>${input.message}</div>\n",
    });
    await writeTestFiles({ "attr-name/index.marko": "" });
    // Without the words of the open documents (eg the tag's own `message`),
    // so that the name is TypeScript's.
    const editor = vscode.workspace.getConfiguration("editor");
    await editor.update("wordBasedSuggestions", "off", true);
    try {
      await snap.inline(
        // Within the name, so that only a completion replacing the whole name
        // (TypeScript's, at the name it maps) makes it whole.
        () => suggest("<greeting me█ss/>"),
        `
<greeting message/>
`,
      );
    } finally {
      await editor.update("wordBasedSuggestions", undefined, true);
    }
  });
});

async function suggest(src: string) {
  await updateTestDoc(src);
  const doc = getTestDoc();
  const text = doc.getText();

  // Retry triggering suggestion if it takes longer to process, then give up
  // (returning the text as it is) before the test's timeout does.
  for (let tries = 0; tries < 15 && doc.getText() === text; tries++) {
    await vscode.commands.executeCommand("editor.action.triggerSuggest");
    await setTimeout(1000);
    await vscode.commands.executeCommand("acceptSelectedSuggestion");
  }

  return `\n${doc.getText().replace(/\r\n/g, "\n")}\n`;
}
