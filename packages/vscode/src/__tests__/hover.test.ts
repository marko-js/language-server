import snap from "mocha-snap";
import vscode from "vscode";

import { getTestDoc, getTestEditor, updateTestDoc } from "./setup.test";

describe("hover", () => {
  it("css property", async () => {
    await snap.inline(
      () =>
        hover(
          `style {
  body {
    color█: blue;
  }
}`,
        ),
      `Sets the color of an element's text

(Edge 12, Firefox 1, Safari 1, Chrome 1, IE 3, Opera 3)

Syntax: &lt;color&gt;

[MDN Reference](https://developer.mozilla.org/docs/Web/CSS/color)`,
    );
  });
});

async function hover(src: string) {
  await updateTestDoc(src);
  const [hover] = await vscode.commands.executeCommand<vscode.Hover[]>(
    "vscode.executeHoverProvider",
    getTestDoc().uri,
    getTestEditor().selection.start,
  );
  return hover.contents
    .map((it) => (typeof it === "string" ? it : it.value))
    .join("\n");
}
