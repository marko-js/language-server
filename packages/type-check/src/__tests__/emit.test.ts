import assert from "node:assert/strict";

import { Project } from "@marko/language-tools";
import fs from "fs";
import snapshot from "mocha-snap";
import path from "path";

import run, { Display } from "../run";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

const FIXTURE_DIR = path.join(__dirname, "fixtures");

for (const fixture of fs.readdirSync(FIXTURE_DIR)) {
  const fixtureDir = path.join(FIXTURE_DIR, fixture);
  if (!fs.statSync(fixtureDir).isDirectory()) continue;

  describe(`emit ${fixture}`, () => {
    const outDir = path.join(fixtureDir, "dist");
    let emitted: string[];

    before(() => {
      // The previous run's output (including its `.tsbuildinfo`) would make the
      // solution builder consider the project up to date and skip emitting.
      fs.rmSync(outDir, { recursive: true, force: true });
      assert.equal(
        typeCheck(path.join(fixtureDir, "tsconfig.json")),
        "",
        "expected the fixture to type check cleanly",
      );
      emitted = findFiles(outDir, ".d.marko");
      assert.ok(emitted.length, "expected `.d.marko` files to be emitted");
    });

    it("emits declaration files", async () => {
      for (const file of emitted) {
        await snapshot(fs.readFileSync(file, "utf-8"), {
          file: path.relative(outDir, file),
          dir: fixtureDir,
        });
      }
    });

    it("emits declaration files that type check", () => {
      // A `.d.marko` is itself a Marko file, so anything internal to the
      // extracted script that leaks into it shows up here as a syntax or type
      // error.
      const checkDir = path.join(outDir, "__recheck__");
      const checkSrcDir = path.join(checkDir, "src");
      fs.mkdirSync(checkSrcDir, { recursive: true });
      fs.copyFileSync(
        path.join(fixtureDir, "tsconfig.json"),
        path.join(checkDir, "tsconfig.json"),
      );

      for (const file of emitted) {
        fs.copyFileSync(file, path.join(checkSrcDir, path.basename(file)));
      }

      assert.equal(typeCheck(path.join(checkDir, "tsconfig.json")), "");
    });
  });
}

/**
 * Runs the type check for a project, returning whatever it reported. `run`
 * writes its report to stdout and the process exit code, neither of which a
 * test should inherit.
 */
function typeCheck(project: string) {
  const { log } = console;
  const { exitCode } = process;
  let out = "";
  console.log = (msg: string) => {
    out += msg;
  };

  try {
    run({ project, display: Display.condensed });
  } finally {
    console.log = log;
    process.exitCode = exitCode;
  }

  return out.trim();
}

function findFiles(dir: string, ext: string) {
  const files: string[] = [];
  if (fs.existsSync(dir)) {
    for (const entry of fs.readdirSync(dir)) {
      const file = path.join(dir, entry);
      if (fs.statSync(file).isDirectory()) {
        files.push(...findFiles(file, ext));
      } else if (entry.endsWith(ext)) {
        files.push(file);
      }
    }
  }

  return files.sort();
}
