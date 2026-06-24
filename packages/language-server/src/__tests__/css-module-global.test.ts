import { extractCSSModule } from "@marko/language-tools";
import assert from "assert";
import path from "path";

// `:global` selectors are not part of a CSS module's exports, so they must not
// appear in the virtual module's type. `:local` (the default) stays exported.
function exportedNames(code: string) {
  const out = extractCSSModule({
    code,
    fileName: path.join(__dirname, "styles.module.css"),
  }).toString();
  return new Set([...out.matchAll(/"([^"]+)":/g)].map((m) => m[1]));
}

describe("css module :global / :local", () => {
  it("excludes :global(...) and keeps :local(...) / plain names", () => {
    const names = exportedNames(":global(.g){}\n:local(.l){}\n.plain{}\n");
    assert.ok(names.has("l") && names.has("plain"));
    assert.ok(!names.has("g"));
  });

  it("keeps local names around a :global(...) segment", () => {
    const names = exportedNames(".a :global(.b) .c {}\n");
    assert.ok(names.has("a") && names.has("c"));
    assert.ok(!names.has("b"));
  });

  it("excludes the rest of a selector after a bare :global", () => {
    const names = exportedNames(".kept :global .dropped {}\n");
    assert.ok(names.has("kept"));
    assert.ok(!names.has("dropped"));
  });

  it("scopes each selector in a list independently", () => {
    const names = exportedNames(":global .a, .b {}\n");
    assert.ok(names.has("b"));
    assert.ok(!names.has("a"));
  });

  it("excludes everything inside a :global { } block", () => {
    const names = exportedNames(":global {\n  .x {}\n  #y {}\n}\n.local {}\n");
    assert.ok(names.has("local"));
    assert.ok(!names.has("x") && !names.has("y"));
  });

  it("still collects classes inside :not()", () => {
    const names = exportedNames(".a:not(.b) {}\n");
    assert.ok(names.has("a") && names.has("b"));
  });
});
