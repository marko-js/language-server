import assert from "node:assert/strict";

import fs from "fs";
import os from "os";
import path from "path";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import { formatDocument } from "../service/marko/format";

const longTag = "<div really=long attributes=should spread=across/>";
const brokenTag =
  "<div\n  really=long\n  attributes=should\n  spread=across\n/>\n";

describe("format with a project prettier config", () => {
  it("keeps the Marko plugin beside the config's plugins", async () => {
    const dir = createProject({
      ".prettierrc.json": JSON.stringify({
        plugins: ["project-only-prettier-plugin"],
        printWidth: 20,
      }),
      "node_modules/project-only-prettier-plugin/package.json":
        '{ "name": "project-only-prettier-plugin", "main": "index.js" }',
      "node_modules/project-only-prettier-plugin/index.js":
        "globalThis.projectOnlyPluginLoaded = true;\nmodule.exports = {};\n",
    });

    assert.equal(await format(dir, longTag), brokenTag);
    // Only resolvable from the project, not from the server's working directory.
    assert.equal((globalThis as any).projectOnlyPluginLoaded, true);
  });

  it("formats when a config plugin cannot be found", async () => {
    const dir = createProject({
      ".prettierrc.json": JSON.stringify({
        plugins: ["missing-prettier-plugin"],
        printWidth: 20,
      }),
    });

    assert.equal(await format(dir, longTag), brokenTag);
  });
});

// Each case gets a project of its own, since prettier caches resolved configs.
function createProject(files: Record<string, string>) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "marko-format-config-"));
  after(() => fs.rmSync(dir, { recursive: true, force: true }));
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(dir, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  return dir;
}

async function format(dir: string, text: string) {
  const uri = URI.file(path.join(dir, "index.marko")).toString();
  const doc = TextDocument.create(uri, "marko", 1, text);
  const edits = await formatDocument(doc, { tabSize: 2, insertSpaces: true });
  return edits?.[0].newText;
}
