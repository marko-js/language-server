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

// Opens a `█`-marked source as an in-memory document and asks the server
// whether typing `|` at the marker would start a tag's params (the only place
// the `|` pair should auto-close).
let docId = 0;
function canOpenTagParams(marked: string) {
  const offset = marked.indexOf("█");
  const text = marked.replace("█", "");
  const uri = URI.file(
    path.join(__dirname, "fixtures", `pipe-${docId++}.marko`),
  ).toString();
  documents.doOpen({
    textDocument: { uri, languageId: "marko", version: 1, text },
  });
  const position = documents.get(uri)!.positionAt(offset);
  return MarkoLanguageService.commands["$/canOpenTagParams"]({
    textDocument: { uri },
    position,
  }) as boolean;
}

const cases: [expected: boolean, where: string, source: string][] = [
  [true, "right after a tag name", "<my-tag█/>"],
  [true, "after type args", "<my-tag<A>█/>"],
  [true, "after a tag var", "<my-tag/foo█/>"],
  [true, "in the gap before an attribute", "<my-tag █class/>"],
  [false, "inside an existing params list", "<my-tag|value: A █|/>"],
  [false, "inside tag type args", "<my-tag<A █| B>|x|/>"],
  [false, "inside an attribute value", '<my-tag class="x█"/>'],
  [false, "in tag body text", "<div>hel█lo</div>"],
  [true, "after a concise tag name", "div█"],
  [true, "after a concise shorthand class", "div.foo█"],
  [false, "inside concise tag params", "div|item█|"],
  [false, "in concise tag body text", "div -- hel█lo"],
  [
    false,
    "inside an export interface",
    "export interface Input {\n  a: A █| B;\n}",
  ],
];

describe("canOpenTagParams command", () => {
  for (const [expected, where, source] of cases) {
    it(`is ${expected} ${where}`, () => {
      assert.equal(canOpenTagParams(source), expected);
    });
  }
});
