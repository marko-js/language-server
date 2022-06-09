import "./build.mts";
import fs from "fs";
import { resolve } from "path";
import { build } from "esbuild";
import { runTests } from "@vscode/test-electron";

const entry = "__tests__/index.ts";
const outfile = resolve(`dist/${entry}`);
const pkgFile = resolve("package.json");
const pkgData = await fs.promises.readFile(pkgFile, "utf-8");
process.once("exit", () => fs.writeFileSync(pkgFile, pkgData)); // undo any package.json changes from tests

await build({
  outfile,
  format: "cjs",
  sourcemap: "linked",
  entryPoints: [`src/${entry}`],
});

await runTests({
  extensionTestsPath: outfile,
  extensionDevelopmentPath: process.cwd()
});
