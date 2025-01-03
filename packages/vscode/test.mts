import "./build.mts";

import { runTests } from "@vscode/test-electron";
import fs from "fs";
import path from "path";
import url from "url";

const pkgDir = path.dirname(url.fileURLToPath(import.meta.url));
const pkgFile = path.join(pkgDir, "package.json");
const pkgData = await fs.promises.readFile(pkgFile, "utf-8");

process.once("exit", () => {
  fs.writeFileSync(pkgFile, pkgData); // undo any package.json changes from tests
});

await runTests({
  version: "insiders",
  extensionDevelopmentPath: pkgDir,
  extensionTestsPath: path.join(pkgDir, "dist/__tests__/index.js"),
});
