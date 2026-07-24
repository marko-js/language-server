import assert from "node:assert/strict";

import { Project } from "@marko/language-tools";
import path from "path";
import { URI } from "vscode-uri";

import { documents } from "../service";
import HTMLPlugin from "../service/html";
import { clearMarkoCacheForFile } from "../utils/file";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

describe("a11y validation cache", () => {
  const uri = URI.file(
    path.join(__dirname, "a11y-cache-virtual.marko"),
  ).toString();

  it("re-maps diagnostics after edits that leave extraction unchanged", async () => {
    documents.doOpen({
      textDocument: {
        uri,
        languageId: "marko",
        version: 1,
        text: '<script>\n  const a = 1;\n</script>\n<img src="x.png">\n',
      },
    });
    const doc = documents.get(uri)!;

    const first = (await HTMLPlugin.doValidate!(doc))!;
    assert.equal(first.length, 1);
    assert.match(first[0].message, /alt attribute/);
    assert.equal(first[0].range.start.line, 3);

    documents.doChange({
      textDocument: { uri, version: 2 },
      contentChanges: [
        {
          range: {
            start: { line: 1, character: 0 },
            end: { line: 1, character: 0 },
          },
          text: "  const b = 2;\n",
        },
      ],
    });
    // The server binary wires this into documents.onFileChange.
    clearMarkoCacheForFile(doc);

    const second = (await HTMLPlugin.doValidate!(doc))!;
    assert.equal(second.length, 1);
    assert.equal(second[0].message, first[0].message);
    assert.equal(second[0].range.start.line, 4);

    documents.doClose({ textDocument: { uri } });
  });
});
