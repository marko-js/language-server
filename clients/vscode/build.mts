import { build, type BuildOptions } from "esbuild";

await build({
  bundle: true,
  minifySyntax: true,
  minifyWhitespace: true,
  format: "cjs",
  outdir: "dist",
  outbase: "src",
  platform: "node",
  target: ["node14"],
  sourcemap: "linked",
  mainFields: ["module", "main"],
  entryPoints: ["src/index.ts", "src/server.ts"],
  external: ["vscode", "@babel/plugin-transform-modules-commonjs", "tsx"],
})
