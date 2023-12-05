import vscode from "vscode";

import snap from "mocha-snap";

import { getTestDoc, getTestEditor, updateTestDoc } from "./setup.test";

describe("references", () => {
  it("css custom property", async () => {
    await snap.inline(
      () =>
        references(
          `style {
  :root {
      --color█: green;
  }

  body {
      color: var(--color);
  }
}`,
        ),
      `[
  {
    offset: 24,
    value: '--color'
  },
  {
    offset: 71,
    value: '--color'
  },
  [length]: 2
]`,
    );
  });
});

async function references(src: string) {
  const doc = getTestDoc();
  const editor = getTestEditor();
  await updateTestDoc(src);
  const locations = await vscode.commands.executeCommand<vscode.Location[]>(
    "vscode.executeReferenceProvider",
    doc.uri,
    editor.selection.start,
  );

  return locations.map((it) => ({
    offset: doc.offsetAt(it.range.start),
    value: doc.getText(it.range),
  }));
}
