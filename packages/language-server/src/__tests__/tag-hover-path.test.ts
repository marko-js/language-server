import assert from "node:assert/strict";

import { Project } from "@marko/language-tools";
import path from "path";
import { CancellationToken } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import { documents } from "../service";
import MarkoPlugin from "../service/marko";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

// Reuses a fixture that ships a discoverable `components/TestTagA.marko`; the
// consumer is an in-memory file in the fixture root.
const FIXTURE_DIR = path.join(
  __dirname,
  "fixtures",
  "script",
  "prefer-local-identifier-tag-name",
);

// Hovers the tag name in `<TestTagA/>` and returns the markdown documentation.
let runId = 0;
async function hoverTagDoc() {
  const uri = URI.file(
    path.join(FIXTURE_DIR, `__hover-${runId++}.marko`),
  ).toString();
  const text = "<TestTagA/>\n";
  documents.doOpen({
    textDocument: { uri, languageId: "marko", version: 1, text },
  });
  const doc = documents.get(uri) as TextDocument;
  try {
    const hover = await MarkoPlugin.doHover!(
      doc,
      {
        textDocument: { uri },
        position: doc.positionAt(text.indexOf("TestTagA") + 1),
      },
      CancellationToken.None,
    );
    const contents = hover?.contents;
    return contents &&
      typeof contents === "object" &&
      "value" in contents &&
      typeof contents.value === "string"
      ? contents.value
      : "";
  } finally {
    documents.doClose({ textDocument: { uri } });
  }
}

describe("custom tag hover 'discovered from' path", () => {
  it("is relative to the importing file's directory, not the file itself", async () => {
    const doc = await hoverTagDoc();
    assert.match(doc, /discovered from/, "expected the discovered-from hover");
    assert.match(
      doc,
      /components\/TestTagA\.marko/,
      "should link the discovered tag file",
    );
    // The importer's full path (not its directory) was previously used as the
    // base of `path.relative`, prefixing a spurious `../`.
    assert.doesNotMatch(
      doc,
      /\.\.\/components\/TestTagA\.marko/,
      "should not prefix a spurious `../`",
    );
  });
});
