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
          }),
        );
      },
    },
  ],
};

await Promise.all([
  build({
    ...opts,
    format: "cjs",
    // The bundle locates its own shipped type files through `import.meta.url`,
    // which has no cjs equivalent.
    define: { "import.meta.url": "_importMetaUrl" },
    banner: {
      // The directive comes along so the banner does not displace the one
      // esbuild emits, which would drop the bundle out of strict mode.
      js: `"use strict";\nconst _importMetaUrl = require("url").pathToFileURL(__filename).href;`,
    },
  }),
  build({
    ...opts,
    format: "esm",
    outExtension: { ".js": ".mjs" },
  }),
]);
