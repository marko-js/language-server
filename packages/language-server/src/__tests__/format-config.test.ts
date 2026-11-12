import assert from "node:assert/strict";

import fs from "fs";
import os from "os";
import path from "path";
import { type Connection, FileChangeType } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import {
  clearConfigCacheOnChange,
  formatDocument,
} from "../service/marko/format";
import setupMessages from "../utils/messages";

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

  it("warns when the config cannot be loaded", async () => {
    const warnings: string[] = [];
    setupMessages({
      sendNotification: (type: string, msg: string) => {
        if (type === "showWarning") warnings.push(msg);
      },
    } as Connection);
    after(() => setupMessages(undefined!));
    const dir = createProject({ ".prettierrc.json": "{ printWidth: " });

    // Formatted with the defaults rather than not at all.
    assert.equal(await format(dir, "<div></div>"), "<div/>\n");
    await new Promise(setImmediate);
    assert.equal(warnings.length, 1);
    assert.match(
      warnings[0],
      /^Formatting without the project's prettier config, which could not be loaded: JSON Error in .*\.prettierrc\.json/,
    );
  });
});

describe("format after a prettier config changes on disk", () => {
  const printWidth20 = {
    ".prettierrc": "printWidth: 20\n",
    ".prettierrc.json5": "{ printWidth: 20 }",
    "prettier.config.cjs": "module.exports = { printWidth: 20 };",
    ".editorconfig": "root = true\n[*]\nmax_line_length = 20\n",
    "package.json": JSON.stringify({ prettier: { printWidth: 20 } }),
    "package.yaml": "prettier:\n  printWidth: 20\n",
  };

  for (const [name, content] of Object.entries(printWidth20)) {
    it(`reads a ${name} created since the last format`, async () => {
      const dir = createProject({});
      assert.equal(await format(dir, longTag), `${longTag}\n`);

      fs.writeFileSync(path.join(dir, name), content);
      clearConfigCacheOnChange([
        {
          uri: URI.file(path.join(dir, name)).toString(),
          type: FileChangeType.Created,
        },
      ]);
      assert.equal(await format(dir, longTag), brokenTag);
    });
  }

  it("reads an edited config, but only once told it changed", async () => {
    const dir = createProject({ ".prettierrc.json": "{}" });
    assert.equal(await format(dir, longTag), `${longTag}\n`);

    const configFile = path.join(dir, ".prettierrc.json");
    fs.writeFileSync(configFile, JSON.stringify({ printWidth: 20 }));
    clearConfigCacheOnChange([
      {
        uri: URI.file(path.join(dir, "index.marko")).toString(),
        type: FileChangeType.Changed,
      },
    ]);
    assert.equal(await format(dir, longTag), `${longTag}\n`);

    clearConfigCacheOnChange([
      { uri: URI.file(configFile).toString(), type: FileChangeType.Changed },
    ]);
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
