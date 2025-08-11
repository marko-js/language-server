import type * as prettier from "prettier";
import type * as prettierPluginMarko from "prettier-plugin-marko";

export function importPrettier(fromPath: string): typeof prettier | undefined {
  try {
    const packagePath = require.resolve("prettier", {
      paths: [fromPath, __dirname],
    });
    console.log("Found Prettier", packagePath);
    return require(packagePath);
  } catch (error) {
    console.error(error);
  }

  return undefined;
}

export function importMarkoPrettierPlugin(
  fromPath: string,
): typeof prettierPluginMarko | undefined {
  try {
    const packagePath = require.resolve("prettier-plugin-marko", {
      paths: [fromPath, __dirname],
    });
    console.log("prettier-plugin-marko", packagePath);
    return require(packagePath);
  } catch (error) {
    console.error(error);
  }

  return undefined;
}
