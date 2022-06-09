import { build, type BuildOptions } from "esbuild";

const opts: BuildOptions = {
  bundle: true,
  minify: true,
  format: "cjs",
  outdir: "dist",
  outbase: "src",
  platform: "node",
  target: ["node14"],
  sourcemap: "linked",
  mainFields: ["module", "main"],
};

await Promise.all([
  build({
    ...opts,
    entryPoints: ["src/index.ts"],
    external: ["vscode"],
  }),

  build({
    ...opts,
    entryPoints: ["src/server.ts"],
    external: ["@babel/plugin-transform-modules-commonjs"],
  }),
]);
