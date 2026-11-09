import { analyzeMetafile, build } from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

import {
  copyMarkoBundleAssets,
  markoBundlePlugins,
} from "../../scripts/marko-esbuild.mts";

const thisDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(thisDir, "dist");
const isProd = process.env.NODE_ENV === "production";

await copyMarkoBundleAssets(distDir);

await build({
  bundle: true,
  minify: isProd,
  sourcesContent: false,
  absWorkingDir: thisDir,
  metafile: true,
  format: "cjs",
  outdir: "dist",
  platform: "node",
  target: ["node16"],
  sourcemap: "linked",
  entryPoints: [
    { in: "src/index.ts", out: "index" },
    { in: "src/server.ts", out: "server" },
    // The TypeScript Server plugin is the shared @marko/ts-plugin entry; it is
    // bundled into dist/ts-plugin.js and exposed via modules/marko-ts-plugin.
    { in: "../ts-plugin/src/index.ts", out: "ts-plugin" },
    { in: "src/__tests__/index.ts", out: "__tests__/index" },
  ],
  external: [
    "vscode",
    "mocha",
    "mocha-snap",
    "fast-glob",
    "tsx",
    "canvas",
    "browserslist",
  ],
  define: {
    "import.meta.url": "_importMetaUrl",
  },
  banner: {
    // The directive comes along so the banner does not displace the one
    // esbuild emits, which would drop the bundle out of strict mode.
    js: `"use strict";\nconst _importMetaUrl = require("url").pathToFileURL(__filename);`,
  },
  plugins: markoBundlePlugins,
}).then(async (result) => {
  if (isProd) {
    console.log(await analyzeMetafile(result.metafile));
  }
});
