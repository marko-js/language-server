import path from "path";
import type TS from "typescript/lib/tsserverlibrary";
import type { MarkoProject } from "./project";

export default function getProjectTypeLibs(
  rootDir: string,
  project: MarkoProject,
  ts: typeof TS,
  host: TS.ModuleResolutionHost
) {
  let cached = project.cache.get(getProjectTypeLibs) as
    | {
        internalTypesFile: string;
        markoRunTypesFile: string | undefined;
        markoRunGeneratedTypesFile: string | undefined;
        markoTypesFile: string;
        markoTypesCode: string;
      }
    | undefined;

  if (cached === undefined) {
    const resolveTypeCompilerOptions: TS.CompilerOptions = {
      moduleResolution: ts.ModuleResolutionKind.Bundler,
    };
    const markoRunGeneratedTypesFile = path.join(
      rootDir,
      ".marko-run/routes.d.ts"
    );
    const resolveFromFile = path.join(rootDir, "_.d.ts");
    const { resolvedTypeReferenceDirective: resolvedInternalTypes } =
      ts.resolveTypeReferenceDirective(
        "@marko/language-tools/marko.internal.d.ts",
        resolveFromFile,
        resolveTypeCompilerOptions,
        host
      );

    const { resolvedTypeReferenceDirective: resolvedMarkoTypes } =
      ts.resolveTypeReferenceDirective(
        (project.translator.runtimeTypes as string | undefined) || "marko",
        resolveFromFile,
        resolveTypeCompilerOptions,
        host
      );

    const { resolvedTypeReferenceDirective: resolvedMarkoRunTypes } =
      ts.resolveTypeReferenceDirective(
        "@marko/run",
        resolveFromFile,
        resolveTypeCompilerOptions,
        host
      );

    const internalTypesFile = resolvedInternalTypes?.resolvedFileName;
    const markoTypesFile = resolvedMarkoTypes?.resolvedFileName;
    const markoRunTypesFile = resolvedMarkoRunTypes?.resolvedFileName;

    if (!internalTypesFile || !markoTypesFile) {
      throw new Error("Could not resolve marko type files.");
    }

    cached = {
      internalTypesFile,
      markoTypesFile,
      markoTypesCode: host.readFile(markoTypesFile) || "",
      markoRunTypesFile,
      markoRunGeneratedTypesFile: host.fileExists(markoRunGeneratedTypesFile)
        ? markoRunGeneratedTypesFile
        : undefined,
    };

    project.cache.set(getProjectTypeLibs, cached);
  }

  return cached;
}
