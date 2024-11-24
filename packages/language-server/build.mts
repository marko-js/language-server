import { build, BuildOptions } from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

const opts: BuildOptions = {
  bundle: true,
  outdir: "dist",
  outbase: "src",
  platform: "node",
  target: ["node20"],
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
