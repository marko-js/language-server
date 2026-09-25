import snap from "mocha-snap";
import vscode from "vscode";

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

  it("async shorthand method", async () => {
    await snap.inline(
      () => format("<button async onClick() { await save() }>go</button>"),
      `
<button async onClick() {
    await save();
}>
    go
</button>

`,
    );
  });

  it("async shorthand method whose body does not parse", async () => {
    await snap.inline(
      () =>
        format(
          "<div></div>\n<button async onClick() { await save(). }>go</button>",
        ),
      `
<div/>
<button async onClick() { await save(). }>go</button>

`,
    );
  });

  it("comments between attrs", async () => {
    await snap.inline(
      () =>
        format('<input\n  // the field name\n  name="email" type="email"/>'),
      `
<input
    // the field name
    name="email"
    type="email"
>

`,
    );
  });
});

async function format(src: string) {
  updateTestDoc(src);
  await vscode.commands.executeCommand("editor.action.formatDocument");
  return `\n${getTestDoc().getText().replace(/\r\n/g, "\n")}\n`;
}
