import assert from "node:assert/strict";

import fs from "fs";
import os from "os";
import path from "path";

import { builds } from "./util/mtc";

const NODE_MODULES = path.resolve(__dirname, "../../../../node_modules");

for (const mtc of builds)
  describe(`compile cache with ${mtc.name}`, () => {
    let dir: string;
    let project: string;
    const write = (file: string, content: string) => {
      fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true });
      fs.writeFileSync(path.join(dir, file), content);
    };

    beforeEach(() => {
      dir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "mtc-")));
      project = path.join(dir, "tsconfig.json");
      fs.symlinkSync(NODE_MODULES, path.join(dir, "node_modules"));
      write(
        "tsconfig.json",
        JSON.stringify({ compilerOptions: { noEmit: true }, include: ["src"] }),
      );
      write("src/index.marko", "<let/open=false/>\n<my-child/>\n");
      write("src/tags/my-child.marko", "<let/count=0/>\n${count}\n");
    });

    afterEach(() => fs.rmSync(dir, { recursive: true, force: true }));

    it("recompiles a cached template when a tag it uses is removed", async function () {
      this.timeout(60000);
      assert.equal((await mtc.build(dir, project)).code, 0);

      const child = fs.readFileSync(path.join(dir, "src/tags/my-child.marko"));
      fs.rmSync(path.join(dir, "src/tags/my-child.marko"));
      const broken = await mtc.build(dir, project);
      assert.equal(broken.code, 1);
      assert.match(
        broken.messages.join("\n"),
        /src\/index\.marko:2:2\n[^]*Unable to find entry point for .*`<my-child>`/,
      );

      write("src/tags/my-child.marko", child.toString());
      assert.equal((await mtc.build(dir, project)).code, 0);
    });
  });
