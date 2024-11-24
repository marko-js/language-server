import snap from "mocha-snap";
import timers from "timers/promises";
import vscode from "vscode";

import { updateTestDoc } from "./setup.test";

describe("diagnostics", () => {
  // Ensure we wait for any pending diagnostics to be sent.
  before(() => timers.setTimeout(1800));
  it("missing tag end", async () => {
    await snap.inline(() => diagnostic("<span>"), `Missing ending "span" tag`);
  });

  it("unknown tag", async () => {
    await snap.inline(
      () => diagnostic("<span class= >"),
      `Missing value for attribute`,
    );
  });

  it("stylesheet missing property", async () => {
    await snap.inline(
      () =>
        diagnostic(
          `style {
 body { color: }
}`,
        ),
      `property value expected`,
    );
  });
});

async function diagnostic(src: string) {
  const pendingDiagnostic = waitForNewDiagnostic();
  void updateTestDoc(src);
  return (await pendingDiagnostic).message;
}

function waitForNewDiagnostic(): Promise<vscode.Diagnostic> {
  return new Promise((resolve) => {
    const listener = vscode.languages.onDidChangeDiagnostics((change) => {
      const [result] = vscode.languages.getDiagnostics(change.uris[0]);
      if (result) {
        listener.dispose();
        resolve(result);
      }
    });
  });
}
