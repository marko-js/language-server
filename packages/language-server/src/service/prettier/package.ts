import * as prettier from "prettier";
import { getPackagePath } from "../../utils/importPackage";

export function importPrettier(fromPath: string): typeof prettier {
  const prettierPkg = getPackagePath("prettier", [fromPath, __dirname]);

  if (prettierPkg) {
    return require(prettierPkg);
  }

  // Return the built-in prettier instance if the user doesn't have it installed.
  return prettier;
}

export function getMarkoPrettierPluginPath(
  fromPath: string,
): string | undefined {
  return getPackagePath("prettier-plugin-marko", [fromPath, __dirname], false);
}
