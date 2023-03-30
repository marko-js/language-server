export function getExt(fileName: string) {
  const extIndex = fileName.lastIndexOf(".");
  if (extIndex !== -1) return fileName.slice(extIndex) as `.${string}`;
}
