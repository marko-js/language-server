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

      it("names in its declarations only what its reader has", function () {
        const declarations = emitted.filter(isDeclaration);
        if (!declarations.length) this.skip();

        // A template's declaration is read by the reader's own tools and
        // runtime: it names neither this package's internals nor the methods
        // of the runtime it was built with.
        for (const file of declarations) {
          const code = fs.readFileSync(file, "utf-8");
          for (const reg of [
            /\bMarko\._\b/,
            /__marko_internal/,
            /\b(?:render|renderSync|renderToString|stream|mount|createOut)\??\s*[:(<]/,
          ]) {
            assert.doesNotMatch(code, reg, path.relative(outDir, file));
          }
        }
      });

      it("emits a package another project can type check against", async function () {
        if (!emitted.some(isDeclaration)) this.skip();
        this.timeout(60000);

        // The emitted files stand in for a published package, its templates
        // typed by the declarations beside them (and a hand written
        // `x.d.marko` by itself).
        const consumerDir = path.join(outDir, "__consumer__");
        let use = "";
        for (const file of emitted) {
          const name = path.relative(outDir, file).replaceAll(path.sep, "/");
          const pkgFile = path.join(consumerDir, "pkg", name);
          fs.mkdirSync(path.dirname(pkgFile), { recursive: true });
          fs.copyFileSync(file, pkgFile);
          const template = /^(.*)\.d\.marko(?:\.ts)?$/.exec(name)?.[1];
          if (template) {
            const id = `Template_${template.replace(/\W/g, "_")}`;
            use += `import ${id} from "./pkg/${template}.marko";\nexport const ${id}Input: Marko.Input<typeof ${id}> = null!;\n`;
          }
        }

        fs.writeFileSync(path.join(consumerDir, "use.ts"), use);
        // And the fixture's own uses of the package, if it has them.
        const files = ["use.ts"];
        const usesDir = path.join(fixtureDir, "consumer");
        if (fs.existsSync(usesDir)) {
          for (const name of fs.readdirSync(usesDir)) {
            fs.copyFileSync(
              path.join(usesDir, name),
              path.join(consumerDir, name),
            );
            files.push(name);
          }
        }

        const consumer = path.join(consumerDir, "tsconfig.json");
        fs.writeFileSync(
          consumer,
          JSON.stringify({
            compilerOptions: {
              strict: true,
              noEmit: true,
              target: "ESNext",
              module: "preserve",
              moduleResolution: "bundler",
            },
            files,
          }),
        );

        assert.deepEqual(await mtc.build(consumerDir, consumer), {
          code: 0,
          messages: [],
        });
      });
    });
  }

/** A template's declaration, as mtc writes it. */
function isDeclaration(file: string) {
  return file.endsWith(".d.marko.ts");
}

function findFiles(dir: string): string[] {
  const files: string[] = [];
  if (fs.existsSync(dir)) {
    for (const entry of fs.readdirSync(dir)) {
      const file = path.join(dir, entry);
      if (fs.statSync(file).isDirectory()) {
        files.push(...findFiles(file));
      } else {
        files.push(file);
      }
    }
  }

  return files.sort();
}
