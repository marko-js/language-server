import path from "path";
import { fileURLToPath } from "url";
import { build, BuildOptions } from "esbuild";

const opts: BuildOptions = {
  bundle: true,
  outdir: "dist",
  outbase: "src",
  platform: "node",
  target: ["node14"],
  sourcemap: "linked",
  entryPoints: ["src/index.ts"],
  absWorkingDir: path.dirname(fileURLToPath(import.meta.url)),
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
