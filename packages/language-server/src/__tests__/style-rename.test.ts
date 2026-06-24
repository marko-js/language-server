import { Project } from "@marko/language-tools";
import assert from "assert";
import path from "path";
import { CancellationToken } from "vscode-languageserver";
import { URI } from "vscode-uri";

import MarkoLanguageService, { documents } from "../service";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

// Advertising `prepareProvider` means the editor asks for a rename range before
// renaming. A plain embedded `<style>` is handled by the CSS service, so the
// style plugin must answer prepareRename or those renames are rejected with
// "The element can't be renamed".
describe("style rename (embedded css)", () => {
  function open(text: string) {
    const uri = URI.file(
      path.join(__dirname, "fixtures", "inline-style-rename.marko"),
    ).toString();
    documents.doOpen({
      textDocument: { uri, languageId: "marko", version: 1, text },
    });
    return documents.get(uri)!;
  }

  const SRC = `style {
  :root {
    --test: blue;
  }

  body {
    color: var(--test);
  }
}
`;

  it("prepares rename on a css custom property", async () => {
    const doc = open(SRC);
    const position = doc.positionAt(doc.getText().indexOf("--test") + 3);

    const range = await MarkoLanguageService.prepareRename(
      doc,
      { textDocument: doc, position },
      CancellationToken.None,
    );

    assert.ok(range && "start" in range, "expected a prepareRename range");
    assert.ok(
      doc.getText(range).includes("test"),
      `expected the range to cover the custom property, got: ${doc.getText(range)}`,
    );
  });

  it("renames a css custom property and its usage", async () => {
    const doc = open(SRC);
    const position = doc.positionAt(doc.getText().indexOf("--test") + 3);

    const edit = await MarkoLanguageService.doRename(
      doc,
      { textDocument: doc, position, newName: "--test2" },
      CancellationToken.None,
    );

    const edits = edit?.changes?.[doc.uri];
    assert.ok(edits && edits.length >= 2, "expected the declaration and usage");
  });
});
