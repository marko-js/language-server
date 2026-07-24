import assert from "assert";
import fs from "fs";
import { createRequire } from "module";
import os from "os";
import path from "path";
import ts from "typescript";
import url from "url";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const packageDir = path.join(__dirname, "../../..");
const markoDir = path.join(require.resolve("marko/package.json"), "..");

// Both published entrypoints have to find the type files on their own; only
// the esm one has `import.meta.url` to work with.
const load = (entry: string) => {
  const file = path.join(packageDir, entry);
  return entry.endsWith(".mjs")
    ? import(url.pathToFileURL(file).href)
    : Promise.resolve(require(file));
};

describe("getTypeLibs", () => {
  let projectDir: string;

  before(() => {
    // A pnpm project only exposes what it declares, so `marko` resolves from
    // the project root while `@marko/language-tools` (installed for the tool
    // depending on it, not the project) does not.
    projectDir = fs.mkdtempSync(path.join(os.tmpdir(), "marko-type-libs-"));
    fs.mkdirSync(path.join(projectDir, "node_modules"));
    fs.symlinkSync(
      markoDir,
      path.join(projectDir, "node_modules/marko"),
      "junction",
    );
  });

  after(() => {
    fs.rmSync(projectDir, { recursive: true, force: true });
  });

  for (const entry of ["dist/index.js", "dist/index.mjs"]) {
    it(`${entry} finds the shipped marko.internal.d.ts`, async () => {
      const { Project } = await load(entry);
      const typeLibs = Project.getTypeLibs(projectDir, ts, ts.sys);

      assert.equal(
        typeLibs.internalTypesFile,
        path.join(packageDir, "marko.internal.d.ts"),
      );
      // The runtime types still come from the project's own `marko` install.
      assert.equal(typeLibs.markoTypesFile, path.join(markoDir, "index.d.ts"));
    });
  }
});
