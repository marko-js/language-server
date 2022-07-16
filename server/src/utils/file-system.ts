import fs from "fs/promises";
import { type FileStat, FileType } from "vscode-css-languageservice";
import { fileURLToPath } from "url";

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
  try {
    const entries = await fs.readdir(fileURLToPath(uri));
    const base = uri.at(-1) === "/" ? uri : `${uri}/`;
    return (
      await Promise.all(
        entries.map(
          async (entry) =>
            [entry, (await stat(new URL(entry, base).toString())).type] as [
              string,
              FileType
            ]
        )
      )
    ).filter(([, type]) => type !== FileType.Unknown);
  } catch {
    return [];
  }
}
