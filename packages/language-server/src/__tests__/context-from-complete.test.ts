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

// Reuses a fixture that ships discoverable `components/TestTagA.marko` /
// `TestTagB.marko`; the consumer is an in-memory file in that directory.
const FIXTURE_DIR = path.join(
  __dirname,
  "fixtures",
  "script",
  "prefer-local-identifier-tag-name",
);

// Completes at `cursor` characters past the opening quote of the `from=`
// attribute and returns the item with `label` plus the applied line.
let runId = 0;
async function completeFrom(line: string, cursor: number, label: string) {
  const uri = URI.file(
    path.join(FIXTURE_DIR, `__context-from-${runId++}.marko`),
  ).toString();
  const text = `${line}\n`;
  documents.doOpen({
    textDocument: { uri, languageId: "marko", version: 1, text },
  });
  const doc = documents.get(uri)!;
  try {
    const offset = line.indexOf('from="') + 6 + cursor;
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
    const item = items.find((i) => i.label === label);
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

describe("<context> from= completion", () => {
  it("completes a tag name inside the shorthand", async () => {
    const { item, applied } = await completeFrom(
      '<context/theme from="<TestTagA>"/>',
      1,
      "TestTagA",
    );
    assert.ok(item, "expected a TestTagA completion");
    assert.ok(item.sortText?.startsWith("0"), "should be prioritized");
    assert.equal(applied, '<context/theme from="<TestTagA>"/>');
  });

  it("adds the closing `>` when not typed yet", async () => {
    const { applied } = await completeFrom(
      '<context/theme from="<Te"/>',
      3,
      "TestTagA",
    );
    assert.equal(applied, '<context/theme from="<TestTagA>"/>');
  });

  it("offers the full shorthand for an empty value", async () => {
    const { applied } = await completeFrom(
      '<context/theme from=""/>',
      0,
      "TestTagA",
    );
    assert.equal(applied, '<context/theme from="<TestTagA>"/>');
  });

  it("completes relative paths after a slash", async () => {
    const { item, applied } = await completeFrom(
      '<context/theme from="./"/>',
      2,
      "index.marko",
    );
    assert.ok(item, "expected a file completion");
    assert.equal(applied, '<context/theme from="./index.marko"/>');
  });
});
