// Matches a `.marko` file that Marko auto-discovers as a tag through a
// `components`/`tags` directory, capturing the tag name (group 1):
//
// - `components/foo.marko`       -> foo
// - `components/foo/index.marko` -> foo
// - `components/foo/foo.marko`   -> foo (file matching its directory)
//
// The optional group consumes the directory layouts; `\1` ties the self-named
// file back to its directory.
const REG_DISCOVERABLE_TAG =
  /[\\/](?:components|tags)[\\/]([^\\/]+?)(?:[\\/](?:index|\1))?(?:\.d)?\.marko$/i;
// Upper-cases the first letter/digit of each `-`/`_`/`.`-separated word.
const REG_WORD_START = /(?:^|[^\p{L}\p{N}]+)([\p{L}\p{N}])/gu;

/**
 * Returns a PascalCase identifier to name a component's default export binding,
 * but only when the file is auto-discoverable as a Marko tag (through a
 * `components`/`tags` directory) and the tag name normalizes to a valid
 * identifier. Otherwise `undefined`, so the extractor keeps a plain anonymous
 * `export default`. Naming the binding lets auto-imports read `import MyButton`
 * rather than TypeScript's file-derived `MyButtonMarko`.
 */
export function getComponentName(filePath: string): string | undefined {
  const match = REG_DISCOVERABLE_TAG.exec(filePath);
  if (!match) return;

  const name = match[1].replace(REG_WORD_START, (_, char) =>
    char.toUpperCase(),
  );

  // Skip naming when it would not be a valid identifier (eg `3d-view`).
  return /^\p{L}/u.test(name) ? name : undefined;
}
