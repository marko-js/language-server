import { build, BuildOptions } from "esbuild";
import fs from "fs/promises";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const thisDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(thisDir, "dist");
const require = createRequire(import.meta.url);

const opts: BuildOptions = {
  bundle: true,
  outdir: "dist",
  outbase: "src",
  platform: "node",
  target: ["node20"],
  sourcemap: "linked",
  entryPoints: ["src/index.ts"],
  absWorkingDir: thisDir,
  plugins: [
    {
      name: "external-modules",
      setup(build) {
        build.onResolve(
          { filter: /^[^./]|^\.[^./]|^\.\.[^/]/ },
          ({ path }) => ({
            path,
            external: true,
          })
        );
      },
    },
  ],
};

await Promise.all([
  fs.copyFile(
    path.join(thisDir, "../language-tools/marko.internal.d.ts"),
    path.join(distDir, "marko.internal.d.ts"),
  ),
  fs.copyFile(
    path.join(require.resolve("marko/package.json"), "../index.d.ts"),
    path.join(distDir, "marko.runtime.d.ts"),
  ),
  build({
    ...opts,
    format: "cjs",
  }),
  build({
    ...opts,
    format: "esm",
    outExtension: { ".js": ".mjs" },
  }),
]);
