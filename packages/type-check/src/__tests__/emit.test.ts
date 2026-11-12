import assert from "node:assert/strict";

import fs from "fs";
import snapshot from "mocha-snap";
import path from "path";

import { type Build, builds } from "./util/mtc";

const FIXTURE_DIR = path.join(__dirname, "fixtures");

for (const mtc of builds)
  for (const fixture of fs.readdirSync(FIXTURE_DIR)) {
    const fixtureDir = path.join(FIXTURE_DIR, fixture);
    if (!fs.statSync(fixtureDir).isDirectory()) continue;

    describe(`emit ${fixture} with ${mtc.name}`, () => {
      const outDir = path.join(fixtureDir, "dist");
      const tsconfig = path.join(fixtureDir, "tsconfig.json");
      const project = fs.existsSync(tsconfig)
        ? tsconfig
        : path.join(fixtureDir, "jsconfig.json");
      let build: Build;
      let emitted: string[];

      before(async function () {
        this.timeout(60000);
        // A previous run's `.tsbuildinfo` would have the build skip the project.
        fs.rmSync(outDir, { recursive: true, force: true });
        build = await mtc.build(fixtureDir, project);
        emitted = findFiles(outDir).filter(
          (file) => !file.endsWith(".tsbuildinfo"),
        );
      });

      it("emits its build", async () => {
        for (const file of emitted) {
          await snapshot(fs.readFileSync(file, "utf-8"), {
            file: path.relative(outDir, file),
            dir: fixtureDir,
          });
        }
      });

      it("reports the build", async () => {
        await snapshot(
          [
            `exit ${build.code}`,
            ...build.messages,
            emitted.map((file) => path.relative(fixtureDir, file)).join("\n"),
          ].join("\n\n"),
          { dir: fixtureDir },
        );
      });

      it("emits declaration files that type check", async function () {
        const declarations = emitted.filter((file) =>
          file.endsWith(".d.marko"),
        );
        if (!declarations.length) this.skip();
        this.timeout(60000);

        // A `.d.marko` is itself a Marko file, so anything internal to the
        // extracted script that leaks into it shows up here as a syntax or
        // type error.
        const checkDir = path.join(outDir, "__recheck__");
        const checkSrcDir = path.join(checkDir, "src");
        fs.mkdirSync(checkSrcDir, { recursive: true });
        fs.copyFileSync(project, path.join(checkDir, path.basename(project)));
        for (const file of declarations) {
          fs.copyFileSync(file, path.join(checkSrcDir, path.basename(file)));
        }

        assert.deepEqual(
          await mtc.build(
            checkDir,
            path.join(checkDir, path.basename(project)),
          ),
          { code: 0, messages: [] },
        );
      });
    });
  }

function findFiles(dir: string): string[] {
  const files: string[] = [];
  if (fs.existsSync(dir)) {
    for (const entry of fs.readdirSync(dir)) {
      const file = path.join(dir, entry);
      if (fs.statSync(file).isDirectory()) {
        if (entry !== "__recheck__") files.push(...findFiles(file));
      } else {
        files.push(file);
      }
    }
  }

  return files.sort();
}
