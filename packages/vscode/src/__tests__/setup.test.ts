import fs from "fs";
import os from "os";
import path from "path";
import timers from "timers/promises";
import vscode from "vscode";

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "marko-vscode-test"));
const activeFile = path.join(tempDir, "test.marko");
const tempFiles: Set<string> = new Set();
const noop = () => {};

export function getTestDoc() {
  return getTestEditor().document;
}

export function getTestEditor() {
  return vscode.window.activeTextEditor!;
}

export async function updateTestDoc(src: string) {
  const editor = getTestEditor();
  const doc = getTestDoc();
  // Replace live editor text with requested src.
  await editor.edit((builder) => {
    builder.replace(
      new vscode.Range(
        new vscode.Position(0, 0),
        doc.positionAt(doc.getText().length),
      ),
      src,
    );
  });

  const cursorIndex = doc.getText().indexOf("█");
  if (cursorIndex !== -1) {
    const cursorPos = doc.positionAt(cursorIndex);
    editor.selection = new vscode.Selection(cursorPos, cursorPos);

    // Strip out the cursor character.
    await editor.edit((builder) => {
      builder.replace(
        new vscode.Range(
          cursorPos,
          new vscode.Position(cursorPos.line, cursorPos.character + 1),
        ),
        "",
      );
    });
  }
}

export async function writeTestFiles(files: Record<string, string>) {
  await Promise.all(
    Object.keys(files).map(async (entry) => {
      const fileName = path.join(tempDir, entry);
      tempFiles.add(fileName);
      await fs.promises.mkdir(path.dirname(fileName)).catch(noop);
      await fs.promises.writeFile(fileName, files[entry]);
      await vscode.commands.executeCommand(
        "vscode.openWith",
        vscode.Uri.file(fileName),
        "marko",
      );
    }),
  );
}

export function relativeToTempDir(fileName: string) {
  return path.relative(tempDir, fileName);
}

before(async () => {
  await vscode.extensions.getExtension("Marko-JS.marko-vscode")!.activate();
  await fs.promises.writeFile(activeFile, "");
  await vscode.commands.executeCommand(
    "vscode.openWith",
    vscode.Uri.file(activeFile),
    "marko",
  );

  await timers.setTimeout(500);
});

afterEach(async () => {
  await Promise.all(
    Array.from(tempFiles).map((file) => fs.promises.unlink(file).catch(noop)),
  );
  tempFiles.clear();
});

after(async () => {
  await Promise.all([
    vscode.commands.executeCommand("workbench.action.closeAllEditors"),
    fs.promises.rm(tempDir, { recursive: true }).catch(noop),
  ]);
});
