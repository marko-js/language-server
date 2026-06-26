import assert from "node:assert/strict";

import { Project } from "@marko/language-tools";
import path from "path";
import { URI } from "vscode-uri";

import MarkoLanguageService, { documents } from "../service";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

const FIXTURE_DIR = path.join(__dirname, "fixtures");

// Opens a `█`-marked source as an in-memory document and asks the server
// whether typing `|` at the marker would start a tag's params (the only place
// the `|` pair should auto-close).
function canOpenTagParams(name: string, marked: string) {
  const offset = marked.indexOf("█");
  assert.notEqual(offset, -1, "expected a `█` cursor marker in the source");
  const text = marked.replace("█", "");
  const uri = URI.file(path.join(FIXTURE_DIR, name)).toString();
  documents.doOpen({
    textDocument: { uri, languageId: "marko", version: 1, text },
  });
  const position = documents.get(uri)!.positionAt(offset);
  return MarkoLanguageService.commands["$/canOpenTagParams"]({
    textDocument: { uri },
    position,
  }) as boolean;
}

describe("canOpenTagParams command", () => {
  it("is true right after a tag name", () => {
    assert.equal(
      canOpenTagParams("pipe-after-name.marko", "<my-tag█/>\n"),
      true,
    );
  });

  it("is true after a tag name's type args", () => {
    assert.equal(
      canOpenTagParams("pipe-after-type-args.marko", "<my-tag<A>█/>\n"),
      true,
    );
  });

  it("is true after a tag var", () => {
    assert.equal(
      canOpenTagParams("pipe-after-var.marko", "<my-tag/foo█/>\n"),
      true,
    );
  });

  it("is true in the gap before an attribute", () => {
    assert.equal(
      canOpenTagParams("pipe-before-attr.marko", "<my-tag █class/>\n"),
      true,
    );
  });

  it("is false inside an existing params list", () => {
    assert.equal(
      canOpenTagParams("pipe-in-params.marko", "<my-tag|value: A █|/>\n"),
      false,
    );
  });

  it("is false inside tag type args", () => {
    assert.equal(
      canOpenTagParams("pipe-in-type-args.marko", "<my-tag<A █| B>|x|/>\n"),
      false,
    );
  });

  it("is false inside an attribute value", () => {
    assert.equal(
      canOpenTagParams("pipe-in-attr.marko", '<my-tag class="x█"/>\n'),
      false,
    );
  });

  it("is false in tag body text", () => {
    assert.equal(
      canOpenTagParams("pipe-body.marko", "<div>hel█lo</div>\n"),
      false,
    );
  });
});
