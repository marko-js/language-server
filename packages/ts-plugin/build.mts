import { build } from "esbuild";
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
  format: "cjs",
  outdir: "dist",
  outbase: "src",
  platform: "node",
  target: ["node16"],
  sourcemap: "linked",
  entryPoints: ["src/index.ts"],
  external: ["canvas", "browserslist"],
  define: {
    "import.meta.url": "_importMetaUrl",
  },
  banner: {
    js: "const _importMetaUrl = require('url').pathToFileURL(__filename);",
  },
  plugins: markoBundlePlugins,
});
