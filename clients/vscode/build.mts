import path from "path";
import { build } from "esbuild";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

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
  entryPoints: ["src/index.ts", "src/server.ts", "src/__tests__/index.ts"],
  external: [
    "vscode",
    "@babel/plugin-transform-modules-commonjs",
    "mocha",
    "mocha-snap",
    "fast-glob",
    "tsx",
  ],
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
});
