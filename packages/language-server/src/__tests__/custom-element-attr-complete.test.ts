import assert from "node:assert/strict";

import { Project } from "@marko/language-tools";
import path from "path";
import { CancellationToken } from "vscode-languageserver";
import { URI } from "vscode-uri";

import { documents } from "../service";
import MarkoPlugin from "../service/marko";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

// Completes attribute names for `text` at `offset` inside the custom
// elements fixture project and returns the completion labels.
let docCount = 0;
async function attrLabels(text: string, offset: number) {
  const uri = URI.file(
    path.join(
      __dirname,
      "fixtures/custom-elements/native-declarations",
      `attr-complete-${docCount++}.marko`,
    ),
  ).toString();
  documents.doOpen({
    textDocument: { uri, languageId: "marko", version: 1, text },
  });
  const doc = documents.get(uri)!;
  try {
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
    return items.map((item) => item.label);
  } finally {
    documents.doClose({ textDocument: { uri } });
  }
}

describe("custom element attribute completion", () => {
  it("offers manifest attributes on a discovered custom element", async () => {
    const labels = await attrLabels(
      "<typed-badge la/>\n",
      "<typed-badge la".length,
    );
    assert.ok(labels.some((label) => /^label/.test(label)));
    assert.ok(labels.some((label) => /^size/.test(label)));
    assert.ok(labels.some((label) => /^model/.test(label)));
  });
});
