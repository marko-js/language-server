import type ts from "typescript/lib/tsserverlibrary";

const templateReg = /(?<!\.d)\.marko$/;

/**
 * The declaration a template is typed by in place of its source, if it has
 * one beside it: `x.d.marko.ts` (as `mtc` writes it), or a legacy Marko
 * syntax `x.d.marko`. Like a `.d.ts` beside a `.js` file, it stands in for
 * the template wherever it is.
 */
export function getTemplateDeclaration(
  fileName: string,
  host: Pick<ts.ModuleResolutionHost, "fileExists">,
) {
  if (!templateReg.test(fileName)) return;

  // `x.marko` to `x.d.marko`, and that to `x.d.marko.ts`.
  const legacy = `${fileName.slice(0, -5)}d.marko`;
  const declaration = `${legacy}.ts`;
  return host.fileExists(declaration)
    ? declaration
    : host.fileExists(legacy)
      ? legacy
      : undefined;
}
