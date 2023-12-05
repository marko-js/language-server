import vscode from "vscode";

import snap from "mocha-snap";

import { getTestDoc, updateTestDoc } from "./setup.test";

describe("format", () => {
  it("empty tag", async () => {
    await snap.inline(
      () => format("<div></div>"),
      `
<div/>

`,
    );
  });

  it("multi line attrs", async () => {
    await snap.inline(
      () =>
        format(
          "<div really=long attributes=should spread=across multiple=lines and=this is=one of=those/>",
        ),
      `
<div
    really=long
    attributes=should
    spread=across
    multiple=lines
    and=this
    is=one
    of=those
/>

`,
    );
  });
});

async function format(src: string) {
  updateTestDoc(src);
  await vscode.commands.executeCommand("editor.action.formatDocument");
  return `\n${getTestDoc().getText().replace(/\r\n/g, "\n")}\n`;
}
