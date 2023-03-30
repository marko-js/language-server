import { build } from "esbuild";

await build({
  bundle: true,
  format: "cjs",
  outdir: "dist",
  platform: "node",
  target: ["node16"],
  entryPoints: ["src/cli.ts"],
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
});
