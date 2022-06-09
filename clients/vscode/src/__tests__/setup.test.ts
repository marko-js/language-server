import { setTimeout } from "timers/promises";
import vscode from "vscode";

before(async () => {
  const fileName = "test.marko";
  await vscode.extensions.getExtension("Marko-JS.marko-vscode")!.activate();
  await vscode.commands.executeCommand(
    "vscode.openWith",
    vscode.Uri.file(fileName).with({ scheme: "untitled", path: fileName }),
    "marko"
  );
  await setTimeout(500);
});

after(() =>
  vscode.commands.executeCommand("workbench.action.closeAllEditors")
);