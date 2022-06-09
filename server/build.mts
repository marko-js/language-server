import { build, BuildOptions } from "esbuild";

const opts: BuildOptions = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  outdir: "dist",
  outbase: "src",
  platform: "node",
  target: ["node14"],
  sourcemap: "linked",
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
