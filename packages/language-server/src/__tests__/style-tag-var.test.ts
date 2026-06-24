import { Project } from "@marko/language-tools";
import assert from "assert";
import fs from "fs";
import path from "path";
import { CancellationToken, type Range } from "vscode-languageserver";
import { URI } from "vscode-uri";

import MarkoLanguageService, { documents } from "../service";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

const FILE = path.join(
  __dirname,
  "fixtures",
  "script",
  "style-tag-var",
  "index.marko",
);

function open() {
  const uri = URI.file(FILE).toString();
  const text = fs.readFileSync(FILE, "utf-8");
  documents.doOpen({
    textDocument: { uri, languageId: "marko", version: 1, text },
  });
  return documents.get(uri)!;
}

function overlaps(a: Range, b: Range) {
  const before = (x: Range["start"], y: Range["start"]) =>
    x.line < y.line || (x.line === y.line && x.character < y.character);
  return before(a.start, b.end) && before(b.start, a.end);
}

function assertNoOverlap(ranges: Range[]) {
  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      assert.ok(
        !overlaps(ranges[i], ranges[j]),
        `ranges should not overlap: ${JSON.stringify(ranges[i])} vs ${JSON.stringify(ranges[j])}`,
      );
    }
  }
}

describe("style tag var (embedded css module)", () => {
  // Both the `.button` selector inside the `<style>` block and the
  // `styles.button` usage should resolve to the same set of references/edits.
  const cases = {
    "embedded selector": ".button",
    "template usage": "class=styles.button",
  };

  for (const [label, marker] of Object.entries(cases)) {
    it(`tracks references from the ${label}`, async () => {
      const doc = open();
      const code = doc.getText();
      const position = doc.positionAt(
        code.indexOf(marker) + marker.indexOf("button"),
      );

      const references = await MarkoLanguageService.findReferences(
        doc,
        { textDocument: doc, position, context: { includeDeclaration: true } },
        CancellationToken.None,
      );

      assert.ok(references && references.length >= 3, "expected references");
      // Declarations (`.button`, `.button:hover`) plus the template usage,
      // with no overlapping ranges from the script/style plugins.
      assertNoOverlap(references.map((r) => r.range));
    });

    it(`renames cleanly from the ${label}`, async () => {
      const doc = open();
      const code = doc.getText();
      const position = doc.positionAt(
        code.indexOf(marker) + marker.indexOf("button"),
      );

      const edit = await MarkoLanguageService.doRename(
        doc,
        { textDocument: doc, position, newName: "cta" },
        CancellationToken.None,
      );

      const edits = edit?.changes?.[doc.uri];
      assert.ok(edits && edits.length >= 3, "expected rename edits");
      for (const e of edits) assert.equal(e.newText, "cta");
      // Overlapping edits would corrupt the document when applied.
      assertNoOverlap(edits.map((e) => e.range));
    });

    it(`prepares rename on the bare name from the ${label}`, async () => {
      const doc = open();
      const code = doc.getText();
      const position = doc.positionAt(
        code.indexOf(marker) + marker.indexOf("button"),
      );

      const range = await MarkoLanguageService.prepareRename(
        doc,
        { textDocument: doc, position },
        CancellationToken.None,
      );

      assert.ok(range && "start" in range, "expected a prepareRename range");
      // The editor selects just `button`, so a new name never gains a stray dot.
      assert.equal(doc.getText(range), "button");
    });

    it(`navigates to the other occurrence from the ${label}`, async () => {
      const doc = open();
      const code = doc.getText();
      const sourceLine = doc.positionAt(code.indexOf(marker)).line;
      const position = doc.positionAt(
        code.indexOf(marker) + marker.indexOf("button"),
      );

      const definition = await MarkoLanguageService.findDefinition(
        doc,
        { textDocument: doc, position },
        CancellationToken.None,
      );

      const links = Array.isArray(definition)
        ? definition
        : definition
          ? [definition]
          : [];
      assert.ok(links.length, "expected a definition target");
      // cmd+click jumps between the `<style>` selector and the template usage,
      // landing exactly on the `button` token, not some other occurrence.
      for (const link of links) {
        const range =
          "targetSelectionRange" in link
            ? link.targetSelectionRange
            : link.range;
        assert.notEqual(range.start.line, sourceLine);
        assert.equal(doc.getText(range), "button");
      }
    });
  }

  it("navigates an id selector to its usage, not itself", async () => {
    const doc = open();
    const code = doc.getText();
    const selectorLine = doc.positionAt(code.indexOf("#main")).line;
    const position = doc.positionAt(code.indexOf("#main") + 1);

    const definition = await MarkoLanguageService.findDefinition(
      doc,
      { textDocument: doc, position },
      CancellationToken.None,
    );

    const links = Array.isArray(definition)
      ? definition
      : definition
        ? [definition]
        : [];
    assert.ok(links.length, "expected a definition target");
    // The CSS service's self-pointing `#id` definition is filtered out, landing
    // on the `main` usage rather than the selector itself.
    for (const link of links) {
      const range =
        "targetSelectionRange" in link ? link.targetSelectionRange : link.range;
      assert.notEqual(range.start.line, selectorLine);
      assert.equal(doc.getText(range), "main");
    }
  });

  it("navigates the tag var through normal lookup, not a usage search", async () => {
    const doc = open();
    const code = doc.getText();
    // Cursor on the `styles` tag var in `<style/styles>`.
    const position = doc.positionAt(code.indexOf("styles") + 1);

    const definition = await MarkoLanguageService.findDefinition(
      doc,
      { textDocument: doc, position },
      CancellationToken.None,
    );

    const links = Array.isArray(definition)
      ? definition
      : definition
        ? [definition]
        : [];
    assert.ok(links.length, "expected a definition target");
    // The tag var is not selector content, so it resolves via normal TS lookup
    // (DefinitionLinks) rather than the selector usage-search (plain Locations).
    for (const link of links) {
      assert.ok(
        "targetSelectionRange" in link,
        "expected a normal TS definition, not a usage-search location",
      );
    }
  });
});
