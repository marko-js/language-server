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

type CompiledOutput = { language: string; content: string } | undefined;

function open(name: string, text: string) {
  // Point the virtual document at a real directory so the compiler can resolve
  // taglibs, but keep it open in-memory so the source comes from `text`.
  const uri = URI.file(path.join(FIXTURE_DIR, name)).toString();
  documents.doOpen({
    textDocument: { uri, languageId: "marko", version: 1, text },
  });
  return uri;
}

const compile = (uri: string, output: "dom" | "html") =>
  MarkoLanguageService.commands["$/showCompiledOutput"]({
    uri,
    output,
  }) as Promise<CompiledOutput>;

const SOURCE = "<let/count=0 />\n<button>${count}</button>\n";

describe("showCompiledOutput command", () => {
  it("compiles to esm dom output", async () => {
    const uri = open("compiled-output-dom.marko", SOURCE);
    const result = await compile(uri, "dom");

    assert.ok(result, "expected a result");
    assert.equal(result.language, "javascript");
    // esm output uses `import`/`export`, never the cjs equivalents.
    assert.match(result.content, /\bexport\b/);
    assert.doesNotMatch(result.content, /\brequire\(/);
    assert.doesNotMatch(result.content, /\bmodule\.exports\b/);
    // The dom target pulls from the runtime's dom entry.
    assert.match(result.content, /from\s*["'][^"']*\/dom["']/);
  });

  it("compiles to esm html output", async () => {
    const uri = open("compiled-output-html.marko", SOURCE);
    const result = await compile(uri, "html");

    assert.ok(result, "expected a result");
    assert.equal(result.language, "javascript");
    assert.match(result.content, /\bexport\b/);
    assert.doesNotMatch(result.content, /\brequire\(/);
    assert.doesNotMatch(result.content, /\bmodule\.exports\b/);
    // The html target pulls from the runtime's html entry.
    assert.match(result.content, /from\s*["'][^"']*\/html["']/);
  });

  it("produces different output for the dom and html targets", async () => {
    const uri = open("compiled-output-both.marko", SOURCE);
    const [dom, html] = await Promise.all([
      compile(uri, "dom"),
      compile(uri, "html"),
    ]);

    assert.ok(dom && html);
    assert.notEqual(dom.content, html.content);
  });

  it("strips typescript types from the compiled output", async () => {
    const uri = open(
      "compiled-output-ts.marko",
      "<let/count: number = 0 />\n<button>${count}</button>\n",
    );
    const result = await compile(uri, "dom");

    assert.ok(result, "expected a result");
    assert.doesNotMatch(result.content, /:\s*number/);
  });

  it("reports compile errors as plaintext instead of throwing", async () => {
    const uri = open("compiled-output-error.marko", "<div class=>\n");
    const result = await compile(uri, "dom");

    assert.ok(result, "expected a result");
    assert.equal(result.language, "plaintext");
    assert.ok(result.content.length > 0);
  });
});
