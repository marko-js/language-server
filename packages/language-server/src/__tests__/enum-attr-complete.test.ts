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

// Completes attribute names for `text` at `offset` and returns a map of
// completion label -> inserted snippet text.
let docCount = 0;
async function attrNameSnippets(text: string, offset: number) {
  // A unique file name per call avoids serving a stale cached parse.
  const uri = URI.file(
    path.join(__dirname, "fixtures", `enum-attr-complete-${docCount++}.marko`),
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
    const byLabel = new Map<string, string | undefined>();
    for (const item of items) {
      byLabel.set(
        item.label,
        item.textEdit && "newText" in item.textEdit
          ? item.textEdit.newText
          : item.insertText,
      );
    }
    return byLabel;
  } finally {
    documents.doClose({ textDocument: { uri } });
  }
}

describe("enum attribute completion", () => {
  it("offers the allowed values as a snippet choice", async () => {
    const snippets = await attrNameSnippets("<div dir/>\n", "<div di".length);
    assert.equal(snippets.get("dir?"), 'dir="${1|ltr,rtl,auto|}"$0');
  });

  it("drops empty-string values so the choice has nothing blank to pick", async () => {
    const snippets = await attrNameSnippets(
      "<div contenteditable/>\n",
      "<div cont".length,
    );
    // `contenteditable`'s enum is ["", "true", "false"]; the "" must be removed.
    assert.equal(
      snippets.get("contenteditable?"),
      'contenteditable="${1|true,false|}"$0',
    );
  });

  it("still uses a plain tabstop for non-enum string attributes", async () => {
    const snippets = await attrNameSnippets("<div title/>\n", "<div ti".length);
    assert.equal(snippets.get("title?"), 'title="$1"$0');
  });
});
