import fs from "fs/promises";
import { fileURLToPath } from "url";

import { type FileStat, FileType } from "vscode-css-languageservice";

export { FileStat, FileType };
export default {
  stat,
  readDirectory,
};
async function stat(uri: string): Promise<FileStat> {
  let type = FileType.Unknown;
  let ctime = -1;
  let mtime = -1;
  let size = -1;

  try {
    const stat = await fs.stat(fileURLToPath(uri));
    if (stat.isDirectory()) type = FileType.Directory;
    else if (stat.isFile()) type = FileType.File;
    ctime = stat.ctimeMs;
    mtime = stat.mtimeMs;
    size = stat.size;
  } catch {
    // ignore
  }

  return {
    type,
    ctime,
    mtime,
    size,
  };
}

async function readDirectory(uri: string): Promise<[string, FileType][]> {
  const result: [string, FileType][] = [];

  try {
    for await (const entry of await fs.opendir(fileURLToPath(uri))) {
      if (entry.isFile()) {
        result.push([entry.name, FileType.File]);
      } else if (entry.isDirectory()) {
        result.push([entry.name, FileType.Directory]);
      }
    }
  } catch {
    // ignore
  }
  return result;
}
