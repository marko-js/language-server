import vscode from "vscode";

import snap from "mocha-snap";

import {
  getTestDoc,
  getTestEditor,
  relativeToTempDir,
  updateTestDoc,
  writeTestFiles,
} from "./setup.test";

describe("definition", () => {
  it("tag name", async () => {
    await writeTestFiles({
      "components/example.marko": "<div/>",
    });
    await snap.inline(
      () => definition("<example█/>"),
      `components/example.marko`
    );
  });
});

async function definition(src: string) {
  await updateTestDoc(src);
  const [location] = await vscode.commands.executeCommand<
    vscode.LocationLink[]
  >(
    "vscode.executeDefinitionProvider",
    getTestDoc().uri,
    getTestEditor().selection.start
  );
  return relativeToTempDir(location.targetUri.fsPath);
}
