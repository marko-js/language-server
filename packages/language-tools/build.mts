import { build, BuildOptions } from "esbuild";

const opts: BuildOptions = {
  bundle: true,
  outdir: "dist",
  platform: "node",
  target: ["node16"],
  entryPoints: ["src/index.ts"],
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
