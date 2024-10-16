import { dirname } from "path";

/**
 * Whether or not the current workspace can be trusted.
 * TODO rework this to a class which depends on the LsConfigManager
 * and inject that class into all places where it's needed (Document etc.)
 */
let isTrusted = true;

export function setIsTrusted(_isTrusted: boolean) {
  isTrusted = _isTrusted;
}

export interface PackageInfo {
  path: string;
  version: {
    full: string;
    major: number;
    minor: number;
    patch: number;
  };
}

/**
 * This function encapsulates the require call in one place
 * so we can replace its content inside rollup builds
 * so it's not transformed.
 */
export function dynamicRequire(dynamicFileToRequire: string): any {
  // prettier-ignore
  return require(dynamicFileToRequire);
}

export function getPackageInfo(packageName: string, fromPaths: string[]) {
  const paths = [__dirname, ...fromPaths];

  const packageJSONPath = require.resolve(`${packageName}/package.json`, {
    paths,
  });
  const { version } = dynamicRequire(packageJSONPath);
  const [major, minor, patch] = version.split(".");

  return {
    path: dirname(packageJSONPath),
    version: {
      full: version,
      major: Number(major),
      minor: Number(minor),
      patch: Number(patch),
    },
  };
}

/**
 * Get the path of a package's directory from the paths in `fromPath`, if `root` is set to false, it will return the path of the package's entry point
 */
export function getPackagePath(
  packageName: string,
  fromPath: string[],
  root = true,
): string | undefined {
  const paths = [];
  if (isTrusted) {
    paths.unshift(...fromPath);
  }

  try {
    return root
      ? dirname(require.resolve(packageName + "/package.json", { paths }))
      : require.resolve(packageName, { paths });
  } catch (e) {
    return undefined;
  }
}
