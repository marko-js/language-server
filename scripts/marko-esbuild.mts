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
    name: "jsdom-fix",
    setup(build) {
      build.onLoad(
        { filter: /\/jsdom\/.*\/XMLHttpRequest-impl\.js$/ },
        async (args) => ({
          loader: "js",
          contents: (await fs.readFile(args.path, "utf8")).replace(
            'require.resolve ? require.resolve("./xhr-sync-worker.js") :',
            "",
          ),
        }),
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
