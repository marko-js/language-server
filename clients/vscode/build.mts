import path from "path";
import fs from "fs/promises";
import { build } from "esbuild";
import { createRequire } from "module";
import { fileURLToPath } from "url";
const thisDir = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(thisDir);

// We must copy over the lib.d.ts files from node_modules to our dist folder
// since we're bundling typescript and it will look for them relative to the `__dirname` of the script.
const tsLibFolder = path.join(
  require.resolve("typescript/package.json"),
  "../lib"
);
await Promise.all([
  ...(
    await fs.readdir(tsLibFolder)
  ).map((entry) => {
    if (/^lib\..*\.d\.ts$/.test(entry)) {
      return fs.copyFile(
        path.join(tsLibFolder, entry),
        path.join("dist", entry)
      );
    }
  }),
  build({
    bundle: true,
    minifySyntax: true,
    minifyWhitespace: true,
    absWorkingDir: thisDir,
    format: "cjs",
    outdir: "dist",
    outbase: "src",
    platform: "node",
    target: ["node14"],
    sourcemap: "linked",
    entryPoints: ["src/index.ts", "src/server.ts", "src/__tests__/index.ts"],
    external: ["vscode", "mocha", "mocha-snap", "fast-glob", "tsx"],
    plugins: [
      {
        name: "vscode-css-languageservice-fix",
        async setup(build) {
          // alias vscode-css-languageservice to it's esm version
          // the default is a UMD definition that's incompatible with esbuild.
          const pkg = "vscode-css-languageservice/package.json";

          build.onResolve({ filter: /^vscode-css-languageservice$/ }, () => ({
            path: path.join(
              require.resolve(pkg),
              "..",
              require(pkg).module as string
            ),
          }));
        },
      },
    ],
  }),
]);
