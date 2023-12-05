import vscode from "vscode";

import snap from "mocha-snap";

import { getTestDoc, getTestEditor, updateTestDoc } from "./setup.test";

describe("rename", () => {
  it("css custom property", async () => {
    await snap.inline(
      () =>
        rename(
          "--test2",
          `style {
  :root {
    --test█: blue;
  }

  body {
    color: var(--test);
  }
}`,
        ),
      `
style {
  :root {
    --test2: blue;
  }

  body {
    color: var(--test2);
  }
}
`,
    );
  });
});

async function rename(newName: string, src: string) {
  const doc = getTestDoc();
  await updateTestDoc(src);
  const edit = await vscode.commands.executeCommand<vscode.WorkspaceEdit>(
    "vscode.executeDocumentRenameProvider",
    doc.uri,
    getTestEditor().selection.start,
    newName,
  );

  await vscode.workspace.applyEdit(edit);
  return `\n${doc.getText().replace(/\r\n/g, "\n")}\n`;
}
