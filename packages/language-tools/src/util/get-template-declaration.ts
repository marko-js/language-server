import type ts from "typescript/lib/tsserverlibrary";

const templateReg = /(?<!\.d)\.marko$/;

/**
 * The declaration beside a template that types it in place of its source: a
 * legacy `x.d.marko`, or the `x.d.marko.ts` of a template that is not `own`.
 */
export function getTemplateDeclaration(
  fileName: string,
  host: Pick<ts.ModuleResolutionHost, "fileExists">,
  isOwn: (fileName: string) => boolean,
) {
  if (!templateReg.test(fileName)) return;

  // `x.marko` to `x.d.marko`, and that to `x.d.marko.ts`. A project's own
  // template is read from its source, as a `.ts` file with a `.d.ts` beside it.
  const legacy = `${fileName.slice(0, -5)}d.marko`;
  const declaration = `${legacy}.ts`;
  return !isOwn(fileName) && host.fileExists(declaration)
    ? declaration
    : host.fileExists(legacy)
      ? legacy
      : undefined;
}
