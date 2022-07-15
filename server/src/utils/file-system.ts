import path from "path";
import fs from "fs/promises";
import { type FileStat, FileType } from "vscode-css-languageservice";

export { FileStat, FileType };
export default {
  stat,
  readDirectory,
};
async function stat(fileName: string): Promise<FileStat> {
  const stat = await fs.stat(fileName).catch(() => null);
  let type = FileType.Unknown;
  let ctime = 0;
  let mtime = 0;
  let size = 0;

  if (stat) {
    if (stat.isDirectory()) type = FileType.Directory;
    else if (stat.isFile()) type = FileType.File;
    ctime = stat.ctimeMs;
    mtime = stat.mtimeMs;
    size = stat.size;
  }

  return {
    type,
    ctime,
    mtime,
    size,
  };
}

async function readDirectory(dir: string): Promise<[string, FileType][]> {
  return (
    await Promise.all(
      (
        await fs.readdir(dir).catch(() => [])
      ).map(
        async (entry) =>
          [entry, (await stat(path.join(dir, entry))).type] as [
            string,
            FileType
          ]
      )
    )
  ).filter(([, type]) => type !== FileType.Unknown);
}
