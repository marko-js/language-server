import assert from "node:assert/strict";

import { Project } from "@marko/language-tools";
import path from "path";
import { CancellationToken } from "vscode-languageserver";
import { URI } from "vscode-uri";

import { documents } from "../service";
import ScriptPlugin from "../service/script";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

// A standalone `.ts`/`.js` file (as opposed to a `.marko` file) is analyzed by
// the TypeScript language service directly, with source offsets mapped one to
// one. An embedder without a native TypeScript service -- eg the in-browser
// playground -- relies on the script plugin answering for these files.
let docCount = 0;
function openScript(text: string, ext = "ts") {
  const uri = URI.file(
    path.join(__dirname, "fixtures", `plain-script-${docCount++}.${ext}`),
  ).toString();
  documents.doOpen({
    textDocument: {
      uri,
      languageId: ext === "js" ? "javascript" : "typescript",
      version: 1,
      text,
    },
  });
  return { uri, doc: documents.get(uri)! };
}

function messageOf(message: string | { value: string }) {
  return typeof message === "string" ? message : message.value;
}

describe("plain script files", () => {
  it("reports type errors, pointing at the offending source", async () => {
    const { uri, doc } = openScript(`const n: number = "nope";\n`);
    try {
      const diags = await ScriptPlugin.doValidate!(doc);
      const typeError = diags?.find((d) =>
        /not assignable to type 'number'/.test(messageOf(d.message)),
      );
      assert.ok(typeError, "expected a type error");
      // Mapped one-to-one, so the range lands on the `n` declaration, not the
      // document start (which is what a stale Marko extraction produced).
      assert.equal(typeError!.range.start.line, 0);
      assert.equal(typeError!.range.start.character, 6);
    } finally {
      documents.doClose({ textDocument: { uri } });
    }
  });

  it("provides hover information", async () => {
    const text = `export const greeting: string = "hi";\n`;
    const { uri, doc } = openScript(text);
    try {
      const hover = await ScriptPlugin.doHover!(
        doc,
        {
          textDocument: { uri },
          position: doc.positionAt(text.indexOf("greeting")),
        } as never,
        CancellationToken.None,
      );
      assert.ok(hover, "expected hover");
      assert.match(String(hover.contents), /const greeting: string/);
    } finally {
      documents.doClose({ textDocument: { uri } });
    }
  });

  it("completes members", async () => {
    const text = `const greeting = "hi";\ngreeting.;\n`;
    const { uri, doc } = openScript(text);
    try {
      const result = await ScriptPlugin.doComplete!(
        doc,
        {
          textDocument: { uri },
          position: doc.positionAt(
            text.indexOf("greeting.") + "greeting.".length,
          ),
          context: { triggerKind: 2, triggerCharacter: "." },
        } as never,
        CancellationToken.None,
      );
      const items = Array.isArray(result) ? result : (result?.items ?? []);
      const labels = new Set(items.map((item) => item.label));
      assert.ok(
        labels.has("toUpperCase"),
        "expected string member completions",
      );
    } finally {
      documents.doClose({ textDocument: { uri } });
    }
  });
});
