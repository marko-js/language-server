import assert from "node:assert/strict";

import { Project } from "@marko/language-tools";
import path from "path";
import { CancellationToken } from "vscode-languageserver";
import { URI } from "vscode-uri";

import { documents } from "../service";
import ScriptPlugin from "../service/script";
import { tokenModifiers, tokenTypes } from "../service/semantic-tokens";

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

  it("classifies semantic tokens straight from the TypeScript classifier", async () => {
    // The plain branch skips Marko extraction entirely, so the classifier's
    // offsets are the document's own -- a token must land on the identifier it
    // describes with TypeScript's classification passed through unchanged.
    const text = [
      "const answer = 42;",
      "let mutable = answer;",
      "function twice(n: number) {",
      "  return n * 2;",
      "}",
      "class Thing {}",
      "export { mutable, twice, Thing };",
      "",
    ].join("\n");
    const { uri, doc } = openScript(text);
    try {
      const tokens = await ScriptPlugin.getSemanticTokens!(
        doc,
        { textDocument: { uri } } as never,
        CancellationToken.None,
      );
      assert.ok(tokens?.length, "expected semantic tokens");

      // Index by source offset so an assertion names a position in `text`
      // rather than an ordinal in the (delta-encoded upstream) token list.
      const byOffset = new Map<number, string>();
      for (const token of tokens!) {
        const start = doc.offsetAt(token.range.start);
        const end = doc.offsetAt(token.range.end);
        assert.equal(
          text.slice(start, end),
          text.slice(start, end).trim(),
          `token at ${start} covers whitespace`,
        );
        const modifiers = tokenModifiers.filter(
          (_, bit) => token.modifiers & (1 << bit),
        );
        byOffset.set(
          start,
          `${tokenTypes[token.type]}${
            modifiers.length ? ` [${modifiers.join(" ")}]` : ""
          } \`${text.slice(start, end)}\``,
        );
      }

      const at = (needle: string, from = 0) =>
        byOffset.get(text.indexOf(needle, from));

      assert.equal(at("answer"), "variable [declaration readonly] `answer`");
      assert.equal(at("mutable"), "variable [declaration] `mutable`");
      // The read of the `const` keeps `readonly`; the `let` read has no
      // modifiers at all.
      assert.equal(at("answer", 20), "variable [readonly] `answer`");
      assert.equal(at("twice"), "function [declaration] `twice`");
      assert.equal(at("n: number"), "parameter [declaration] `n`");
      assert.equal(at("Thing"), "class [declaration] `Thing`");
      assert.equal(at("mutable, twice"), "variable `mutable`");
    } finally {
      documents.doClose({ textDocument: { uri } });
    }
  });

  it("caches semantic tokens per version and honors cancellation", async () => {
    const { uri, doc } = openScript(`const first = 1;\n`);
    try {
      const params = { textDocument: { uri } } as never;
      const initial = await ScriptPlugin.getSemanticTokens!(
        doc,
        params,
        CancellationToken.None,
      );
      // A repeat request at the same version serves the cached array itself.
      assert.equal(
        await ScriptPlugin.getSemanticTokens!(
          doc,
          params,
          CancellationToken.None,
        ),
        initial,
      );

      documents.doChange({
        textDocument: { uri, version: 2 },
        contentChanges: [{ text: `const second = 2;\n` }],
      });
      const changed = await ScriptPlugin.getSemanticTokens!(
        doc,
        params,
        CancellationToken.None,
      );
      assert.notEqual(changed, initial);
      assert.ok(changed?.length, "expected tokens after the edit");

      // A request cancelled before the classification loop finishes must not
      // produce (or cache) a result.
      documents.doChange({
        textDocument: { uri, version: 3 },
        contentChanges: [{ text: `const third = 3;\n` }],
      });
      assert.equal(
        await ScriptPlugin.getSemanticTokens!(
          doc,
          params,
          CancellationToken.Cancelled,
        ),
        undefined,
      );
    } finally {
      documents.doClose({ textDocument: { uri } });
    }
  });
});
