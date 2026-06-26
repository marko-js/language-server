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
// whether the marker sits inside tag params (where `|` is a TS union operator).
function inTagParams(name: string, marked: string) {
  const offset = marked.indexOf("█");
  assert.notEqual(offset, -1, "expected a `█` cursor marker in the source");
  const text = marked.replace("█", "");
  const uri = URI.file(path.join(FIXTURE_DIR, name)).toString();
  documents.doOpen({
    textDocument: { uri, languageId: "marko", version: 1, text },
  });
  const position = documents.get(uri)!.positionAt(offset);
  return MarkoLanguageService.commands["$/inTagParams"]({
    textDocument: { uri },
    position,
  }) as boolean;
}

describe("inTagParams command", () => {
  it("is true inside a tag params type annotation", () => {
    assert.equal(
      inTagParams("pipe-params.marko", "<my-tag|value: string █|/>\n"),
      true,
    );
  });

  it("is true inside tag type args", () => {
    assert.equal(
      inTagParams("pipe-type-args.marko", "<my-tag<A █>|x|/>\n"),
      true,
    );
  });

  it("is false where the params would open (so `|` still auto-closes)", () => {
    assert.equal(inTagParams("pipe-open.marko", "<my-tag█/>\n"), false);
  });

  it("is false in tag body text", () => {
    assert.equal(inTagParams("pipe-body.marko", "<div>hel█lo</div>\n"), false);
  });
});
