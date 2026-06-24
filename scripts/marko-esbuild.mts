// Shared esbuild pieces for bundles that embed the Marko TypeScript tooling
// (the language server and the @marko/ts-plugin). Both bundle typescript and
// @marko/language-tools, so they need the same dependency fixups and the same
// runtime asset copying.
import type { Plugin } from "esbuild";
import fs from "fs/promises";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const here = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.join(here, "../packages");
const require = createRequire(import.meta.url);

// typescript is bundled (via @marko/language-tools), so the lib.*.d.ts and the
// Marko type-def files must sit next to the bundle; the runtime resolves them
// relative to its own __dirname.
export async function copyMarkoBundleAssets(distDir: string): Promise<void> {
  await fs.mkdir(distDir, { recursive: true });
  const tsLibDir = path.join(
    require.resolve("typescript/package.json"),
    "../lib",
  );
  await Promise.all([
    (async () => {
      const dir = await fs.opendir(tsLibDir);
      for await (const entry of dir) {
        if (entry.isFile() && /^lib\..*\.d\.ts$/.test(entry.name)) {
          await fs.copyFile(
            path.join(tsLibDir, entry.name),
            path.join(distDir, entry.name),
          );
        }
      }
    })(),
    fs.copyFile(
      path.join(packagesDir, "language-tools/marko.internal.d.ts"),
      path.join(distDir, "marko.internal.d.ts"),
    ),
    fs.copyFile(
      path.join(require.resolve("marko/package.json"), "../index.d.ts"),
      path.join(distDir, "marko.runtime.d.ts"),
    ),
  ]);
}

// esbuild plugins shared by the Marko bundles: resolve @marko/language-tools to
// its source and work around a few dependencies that don't bundle cleanly.
export const markoBundlePlugins: Plugin[] = [
  {
    name: "vscode-css-languageservice-fix",
    setup(build) {
      // alias vscode-css-languageservice to its esm version; the default is a
      // UMD definition that's incompatible with esbuild.
      const pkg = "vscode-css-languageservice/package.json";
      build.onResolve({ filter: /^vscode-css-languageservice$/ }, () => ({
        path: path.join(
          require.resolve(pkg),
          "..",
          require(pkg).module as string,
        ),
      }));
    },
  },
  {
    name: "marko-language-tools-fix",
    setup(build) {
      build.onResolve({ filter: /^@marko\/language-tools$/ }, () => ({
        path: path.join(packagesDir, "language-tools/src/index.ts"),
      }));
    },
  },
  {
    name: "jsdom-default-stylesheet-inline",
    setup(build) {
      // jsdom reads its default UA stylesheet from a sibling .css asset via
      // `fs.readFileSync(path.resolve(__dirname, ...))` when computed-style.js
      // loads. esbuild bundles only JS, so that asset is missing next to the
      // output bundle and the read throws, crashing the server on startup. The
      // stylesheet is load-bearing (axe relies on computed styles), so inline
      // its contents at build time rather than dropping it.
      //
      // jsdom's other bundling hazards (the sync-XHR worker and css-tree's
      // createRequire JSON loads) are removed/rewritten in patches/ instead.
      build.onLoad(
        { filter: /\/jsdom\/.*\/css\/helpers\/computed-style\.js$/ },
        async (args) => {
          const source = await fs.readFile(args.path, "utf8");
          const css = await fs.readFile(
            path.resolve(
              path.dirname(args.path),
              "../../../browser/default-stylesheet.css",
            ),
            "utf8",
          );
          const readCall =
            /fs\.readFileSync\(\s*path\.resolve\(__dirname,[^)]*\),\s*\{[^}]*\}\s*\)/;
          if (!readCall.test(source)) {
            // Fail loudly rather than silently shipping a bundle that crashes at
            // runtime, e.g. if a jsdom upgrade changes how the stylesheet loads.
            throw new Error(
              `jsdom-default-stylesheet-inline: stylesheet read not found in ${args.path}; the jsdom internals changed and this workaround is stale.`,
            );
          }
          return {
            loader: "js",
            // a function replacement avoids `$`-token interpretation in the
            // injected JSON string (e.g. if the stylesheet contains `$&`).
            contents: source.replace(readCall, () => JSON.stringify(css)),
          };
        },
      );
    },
  },
  {
    name: "prettier-optimize",
    setup(build) {
      build.onLoad({ filter: /\/prettier\/plugins\/.*$/ }, async (args) => {
        if (!/\/(babel|estree|postcss|typescript)\.m?js$/.test(args.path)) {
          return { contents: "", loader: "js" };
        }
      });
    },
  },
];
