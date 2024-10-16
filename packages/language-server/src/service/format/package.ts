import type * as prettier from "prettier";
import { getPackagePath } from "../../utils/importPackage";

export function importPrettier(fromPath: string): typeof prettier | undefined {
  const prettierPkg = getPackagePath("prettier", [fromPath, __dirname]);

  if (!prettierPkg) {
    return undefined;
  }

  return require(prettierPkg);
}

export function getMarkoPrettierPluginPath(
  fromPath: string,
): [string, "prettier-plugin-marko"] | [undefined, undefined] {
  const corePluginPath = getPackagePath(
    "prettier-plugin-marko",
    [fromPath, __dirname],
    false,
  );

  // Prefer the official plugin if it's installed.
  if (corePluginPath) {
    return [corePluginPath, "prettier-plugin-marko"];
  }

  return [undefined, undefined];
}
