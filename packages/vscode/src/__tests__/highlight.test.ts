import vscode from "vscode";

import snap from "mocha-snap";

import { getTestDoc, getTestEditor, updateTestDoc } from "./setup.test";

describe("document highlight", () => {
  it("css class selector", async () => {
    await snap.inline(
      () =>
        documentHighlight(
          `style {
  .test█ {
    color: blue;
  }

  .test {
    display: none;
  }
}`
        ),
      `[
  {
    kind: 2,
    offset: 10,
    value: '.test'
  },
  {
    kind: 2,
    offset: 42,
    value: '.test'
  },
  [length]: 2
]`
    );
  });
});

async function documentHighlight(src: string) {
  const doc = getTestDoc();
  const editor = getTestEditor();
  await updateTestDoc(src);
  const highlights = await vscode.commands.executeCommand<
    vscode.DocumentHighlight[]
  >("vscode.executeDocumentHighlights", doc.uri, editor.selection.start);

  return highlights.map((it) => ({
    offset: doc.offsetAt(it.range.start),
    value: doc.getText(it.range),
    kind: it.kind,
  }));
}
