import path from "path";
import fs from "fs/promises";
import { build } from "esbuild";
import { createRequire } from "module";
import { fileURLToPath } from "url";
const thisDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(thisDir, "dist");
const require = createRequire(thisDir);

await Promise.all([
  (async () => {
    // We must copy over the lib.d.ts files from node_modules to our dist folder
    // since we're bundling typescript and it will look for them relative to the `__dirname` of the script.
    const tsLibDir = path.join(
      require.resolve("typescript/package.json"),
      "../lib"
    );
    const [dir] = await Promise.all([
      fs.opendir(tsLibDir),
      fs.mkdir(distDir, { recursive: true }),
    ]);
    for await (const entry of dir) {
      if (entry.isFile() && /^lib\..*\.d\.ts$/.test(entry.name)) {
        await fs.copyFile(
          path.join(tsLibDir, entry.name),
          path.join(distDir, entry.name)
        );
      }
    }
  })(),
  build({
    bundle: true,
    minify: true,
    sourcesContent: false,
    absWorkingDir: thisDir,
    format: "cjs",
    outdir: "dist",
    outbase: "src",
    platform: "node",
    target: ["node14"],
    sourcemap: "linked",
    entryPoints: [
      "src/index.ts",
      "src/server.ts",
      "src/ts-plugin.ts",
      "src/__tests__/index.ts",
    ],
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
      {
        name: "marko-language-tools-fix",
        async setup(build) {
          build.onResolve({ filter: /^@marko\/language-tools$/ }, () => ({
            path: path.join(thisDir, "../language-tools/src/index.ts"),
          }));
        },
      },
    ],
  }),
]);
