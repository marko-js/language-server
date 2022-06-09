import vscode from "vscode";
import snap from "mocha-snap";
import { getTestDoc, updateTestDoc } from "./setup.test";

describe("completion", () => {
  it("missing tag end", async () => {
    await snap.inline(() => diagnostic("<span>"), `Missing ending "span" tag`);
  });

  it("unknown tag", async () => {
    await snap.inline(
      () => diagnostic("<span class=>"),
      `Missing value for attribute`
    );
  });
});

async function diagnostic(src: string) {
  await Promise.all([updateTestDoc(src), waitForNewDiagnostics()]);
  const [result] = vscode.languages.getDiagnostics(getTestDoc().uri);
  return result!.message;
}

function waitForNewDiagnostics() {
  return new Promise<void>((resolve) => {
    const listener = vscode.languages.onDidChangeDiagnostics((change) => {
      const [result] = vscode.languages.getDiagnostics(change.uris[0]);
      if (result) {
        listener.dispose();
        resolve();
      }
    });
  });
}
