import snap from "mocha-snap";
import vscode from "vscode";

import { getTestDoc, updateTestDoc } from "./setup.test";

describe("document color", () => {
  it("css color", async () => {
    await snap.inline(
      () =>
        documentColor(
          `style {
  body {
    color: blue;
  }
}`,
        ),
      `rgb(0, 0, 255)
#0000ff
hsl(240, 100%, 50%)
hwb(240 0% 0%)
lab(32.3% 79.2 -107.86)
lch(32.3% 133.82 306.29)
oklab(45.202999999999996% -0.03235 -0.31162)
oklch(45.203% 0.3133 264.073)`,
    );
  });
});

async function documentColor(src: string) {
  const doc = getTestDoc();
  await updateTestDoc(src);
  const [info] = await vscode.commands.executeCommand<
    vscode.ColorInformation[]
  >("vscode.executeDocumentColorProvider", doc.uri);

  const presentations = await vscode.commands.executeCommand<
    vscode.ColorPresentation[]
  >("vscode.executeColorPresentationProvider", info.color, {
    uri: doc.uri,
    range: info.range,
  });

  return presentations.map((it) => it.label).join("\n");
}
