import { platform } from "os";
import { URI } from "vscode-uri";

export function getFileFsPath(documentUri: string): string {
  return URI.parse(documentUri).fsPath;
}

export function getFilePath(documentUri: string): string {
  const IS_WINDOWS = platform() === "win32";
  if (IS_WINDOWS) {
    // Windows have a leading slash like /C:/Users/pine
    return URI.parse(documentUri).path.slice(1);
  } else {
    return URI.parse(documentUri).path;
  }
}

export function normalizeFileNameToFsPath(fileName: string) {
  return URI.file(fileName).fsPath;
}
