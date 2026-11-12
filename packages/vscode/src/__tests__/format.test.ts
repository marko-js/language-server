import snap from "mocha-snap";
import path from "path";
import timers from "timers/promises";
import vscode from "vscode";

import { getTestDoc, updateTestDoc, writeTestFiles } from "./setup.test";

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

  it("extensionless .prettierrc", async () => {
    // Read through prettier's yaml plugin, which the bundle must keep. The page
    // opens last so it becomes the edited document.
    await writeTestFiles({ "prettierrc/.prettierrc": "useTabs: true\n" });
    await writeTestFiles({ "prettierrc/index.marko": "" });
    await snap.inline(
      () => format("<div><section><p>one</p><p>two</p></section></div>"),
      `
<div>
\t<section>
\t\t<p>one</p>
\t\t<p>two</p>
\t</section>
</div>

`,
    );
  });

  it("prettier config edited since the last format", async () => {
    await writeTestFiles({ "edited-config/.prettierrc.json": "{}" });
    await writeTestFiles({ "edited-config/index.marko": "" });
    const src = "<div><section><p>one</p></section></div>";
    await snap.inline(
      async () => {
        const before = await format(src);
        await vscode.workspace.fs.writeFile(
          vscode.Uri.file(
            path.join(path.dirname(getTestDoc().fileName), ".prettierrc.json"),
          ),
          Buffer.from('{ "useTabs": true }'),
        );
        // Let the file event reach the server.
        await timers.setTimeout(500);
        return before + (await format(src));
      },
      `
<div>
    <section>
        <p>one</p>
    </section>
</div>


<div>
\t<section>
\t\t<p>one</p>
\t</section>
</div>

`,
    );
  });
});

async function format(src: string) {
  updateTestDoc(src);
  await vscode.commands.executeCommand("editor.action.formatDocument");
  return `\n${getTestDoc().getText().replace(/\r\n/g, "\n")}\n`;
}
