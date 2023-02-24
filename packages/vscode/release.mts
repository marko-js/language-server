import path from "path";
import fs from "fs/promises";
import cp from "child_process";
import { promisify } from "util";
import { fileURLToPath } from "url";

const exec = promisify(cp.exec);
const dir = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(dir, "dist/marko.vsix");
const workspacePkg = path.join(dir, "../../package.json");
const workspacePkgTmp = `${workspacePkg}.tmp`;

// We must rename the workspace package.json since vsce does not work with npm workspaces.
await fs.rename(workspacePkg, workspacePkgTmp);

try {
  await exec(
    "vsce package -o $dist && vsce publish --packagePath $dist && ovsx publish $dist",
    { env: { ...process.env, dist } }
  );
} finally {
  await fs.rename(workspacePkgTmp, workspacePkg);
}
