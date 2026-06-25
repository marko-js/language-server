import assert from "node:assert/strict";

import { Project } from "@marko/language-tools";
import path from "path";
import { CancellationToken, type TextEdit } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import { documents } from "../service";
import MarkoPlugin from "../service/marko";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

// Tag completion resolves against the taglib's filesystem scan, so this reuses a
// fixture that already ships discoverable `components/TestTagA.marko` /
// `TestTagB.marko`. The consumer is an in-memory file in that directory.
const FIXTURE_DIR = path.join(
  __dirname,
  "fixtures",
  "script",
  "prefer-local-identifier-tag-name",
);

// Completes the `<...>` tag-name slot of `importLine` (with the cursor
// `cursorInName` characters into the name) and returns the `TestTagA` item plus
// the line that results from applying its edit.
let runId = 0;
async function completeImport(importLine: string, cursorInName: number) {
  const uri = URI.file(
    path.join(FIXTURE_DIR, `__import-${runId++}.marko`),
  ).toString();
  const text = `${importLine}\n`;
  documents.doOpen({
    textDocument: { uri, languageId: "marko", version: 1, text },
  });
  const doc = documents.get(uri)!;
  try {
    const offset = importLine.indexOf('"<') + 2 + cursorInName;
    const result = await MarkoPlugin.doComplete!(
      doc,
      {
        textDocument: { uri },
        position: doc.positionAt(offset),
        context: { triggerKind: 1 },
      } as never,
      CancellationToken.None,
    );
    const items = Array.isArray(result) ? result : (result?.items ?? []);
    const item = items.find((i) => i.label === "TestTagA");
    return {
      item,
      applied: item
        ? TextDocument.applyEdits(doc, [item.textEdit as TextEdit]).split(
            "\n",
          )[0]
        : undefined,
    };
  } finally {
    documents.doClose({ textDocument: { uri } });
  }
}

describe("shorthand import tag-name completion", () => {
  it("completes a bare tag name with priority, like an open tag", async () => {
    const { item, applied } = await completeImport(
      'import Foo from "<TestTagA>"',
      0,
    );
    assert.ok(item, "expected a TestTagA completion");
    assert.equal(item.label, "TestTagA");
    assert.ok(item.sortText?.startsWith("0"), "should be prioritized");
    assert.equal(applied, 'import Foo from "<TestTagA>"');
  });

  it("completes a half-typed name and keeps the existing `>`", async () => {
    const { applied } = await completeImport('import Foo from "<TestTagA>"', 4);
    assert.equal(applied, 'import Foo from "<TestTagA>"');
  });

  it("adds the closing `>` when the user has not typed it yet", async () => {
    const { applied } = await completeImport('import Foo from "<TestTagA"', 4);
    assert.equal(applied, 'import Foo from "<TestTagA>"');
  });

  it("completes into an empty shorthand", async () => {
    const { applied } = await completeImport('import Foo from "<>"', 0);
    assert.equal(applied, 'import Foo from "<TestTagA>"');
  });
});
