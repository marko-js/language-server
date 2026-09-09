import { Project } from "@marko/language-tools";
import assert from "assert";
import fs from "fs";
import path from "path";
import { CancellationToken } from "vscode-languageserver";
import { URI } from "vscode-uri";

import MarkoLanguageService, { documents } from "../service";
import { getTSProject } from "../service/script";

const dir = path.join(__dirname, "cases", "custom-elements");
const filename = path.join(dir, "index.marko");
const manifest = path.join(dir, "custom-elements.json");
const declaration = `${manifest}.typed-badge.d.marko`;
const source = "export interface Input { label?: string; count?: number; }\n";

describe("custom element declarations", () => {
  const compiler = Project.getCompiler(dir) as ReturnType<
    typeof Project.getCompiler
  > & {
    getVirtualFile?: (filename: string) => string | undefined;
    getVirtualFileOrigin?: (filename: string) => string | undefined;
  };
  const previous = compiler.getVirtualFile;
  const previousOrigin = compiler.getVirtualFileOrigin;

  before(() => {
    compiler.getVirtualFile = (file) =>
      file === declaration ? source : previous?.(file);
    compiler.getVirtualFileOrigin = (file) =>
      file === declaration ? manifest : previousOrigin?.(file);
    compiler.taglib.register(manifest, {
      "<typed-badge>": {
        html: true,
        types: declaration,
        attributes: {
          label: "expression",
          count: "expression",
          "*": "expression",
        },
      },
    });
    documents.doOpen({
      textDocument: {
        uri: URI.file(filename).toString(),
        languageId: "marko",
        version: 1,
        text: fs.readFileSync(filename, "utf-8"),
      },
    });
  });

  after(() => {
    compiler.getVirtualFile = previous;
    compiler.getVirtualFileOrigin = previousOrigin;
    documents.doClose({ textDocument: { uri: URI.file(filename).toString() } });
  });

  it("reads declaration-only files through the shared compiler host", () => {
    const project = getTSProject(filename);
    assert.equal(project.host.fileExists(declaration), true);
    assert.equal(project.host.readFile(declaration), source);
    assert.ok(project.host.getScriptSnapshot(declaration));
    assert.equal(fs.existsSync(declaration), false);
  });

  it("checks manifest attribute types without unresolved virtual imports", async () => {
    const doc = documents.get(URI.file(filename).toString())!;
    const diagnostics = await MarkoLanguageService.doValidate(doc);
    assert.ok(
      diagnostics?.some((d) => /number/.test(d.message)),
      JSON.stringify(diagnostics),
    );
    assert.equal(diagnostics?.length, 1, JSON.stringify(diagnostics));
    assert.ok(
      !diagnostics?.some((d) => /Cannot find module/.test(d.message)),
      JSON.stringify(diagnostics),
    );
  });

  it("provides attribute hover and completion types", async () => {
    const doc = documents.get(URI.file(filename).toString())!;
    const hover = await MarkoLanguageService.doHover(
      doc,
      {
        textDocument: doc,
        position: doc.positionAt(doc.getText().indexOf("count") + 2),
      },
      CancellationToken.None,
    );
    assert.ok(JSON.stringify(hover).includes("number"), JSON.stringify(hover));
    const uri = URI.file(path.join(dir, "complete.marko")).toString();
    documents.doOpen({
      textDocument: {
        uri,
        languageId: "marko",
        version: 1,
        text: "<typed-badge c/>",
      },
    });
    const completionDoc = documents.get(uri)!;
    const completions = await MarkoLanguageService.doComplete(
      completionDoc,
      {
        textDocument: completionDoc,
        position: { line: 0, character: 14 },
      },
      CancellationToken.None,
    );
    documents.doClose({ textDocument: { uri } });
    assert.ok(
      JSON.stringify(completions).includes("count"),
      JSON.stringify(completions),
    );
  });

  it("navigates the tag to its real manifest", async () => {
    const doc = documents.get(URI.file(filename).toString())!;
    const definitions = await MarkoLanguageService.findDefinition(
      doc,
      {
        textDocument: doc,
        position: { line: 0, character: 4 },
      },
      CancellationToken.None,
    );
    assert.ok(
      JSON.stringify(definitions).includes(URI.file(manifest).toString()),
      JSON.stringify(definitions),
    );
    assert.ok(!JSON.stringify(definitions).includes(".d.marko"));
  });
});
