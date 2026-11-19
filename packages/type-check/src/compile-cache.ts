import fs from "fs";
import path from "path";

interface CleanCompile {
  version: string;
  mtimes: Record<string, number | undefined>;
}

export function loadCompileCache(cacheFile: string | undefined) {
  let cleanCompiles: Record<string, CleanCompile>;
  try {
    cleanCompiles = cacheFile
      ? JSON.parse(fs.readFileSync(cacheFile, "utf-8"))
      : {};
  } catch {
    cleanCompiles = {};
  }

  const unchangedByFile = new Map<string, boolean>();
  const isUnchanged = (fileName: string): boolean => {
    let unchanged = unchangedByFile.get(fileName);
    if (unchanged === undefined) {
      unchangedByFile.set(fileName, true);
      const mtimes = cleanCompiles[fileName]?.mtimes;
      unchanged =
        !!mtimes &&
        Object.entries(mtimes).every(
          ([dep, mtime]) =>
            getMtime(dep) === mtime &&
            (!cleanCompiles[dep] || isUnchanged(dep)),
        );
      unchangedByFile.set(fileName, unchanged);
    }

    return unchanged;
  };

  return {
    isClean(fileName: string, version: string) {
      return (
        cleanCompiles[fileName]?.version === version && isUnchanged(fileName)
      );
    },
    setClean(fileName: string, version: string, deps: string[]) {
      cleanCompiles[fileName] = {
        version,
        mtimes: Object.fromEntries(
          [fileName, ...deps].map((dep) => [dep, getMtime(dep)]),
        ),
      };
    },
    save() {
      if (cacheFile) {
        fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
        fs.writeFileSync(cacheFile, JSON.stringify(cleanCompiles));
      }
    },
  };
}

function getMtime(fileName: string) {
  return fs.statSync(fileName, { throwIfNoEntry: false })?.mtimeMs;
}
