import snap from "mocha-snap";
import vscode from "vscode";

import {
  getTestDoc,
  getTestEditor,
  relativeToTempDir,
  updateTestDoc,
  writeTestFiles,
} from "./setup.test";

describe("definition", () => {
  it("tag name", async () => {
    // The tag is written before the page opens (and becomes the edited
    // document), so the page's directory finds it without a file watcher,
    // which the test window, having no folder open, does not have.
    await writeTestFiles({
      "tag-name/components/example.marko": "<div/>",
    });
    await writeTestFiles({
      "tag-name/index.marko": "",
    });
    await snap.inline(
      () => definition("<example█/>"),
      `tag-name/components/example.marko`,
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
    getTestEditor().selection.start,
  );
  return relativeToTempDir(location.targetUri.fsPath);
}
