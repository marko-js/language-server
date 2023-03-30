export function isDefinitionFile(fileName: string) {
  return /\.d\.[^.]+$/.test(fileName);
}
