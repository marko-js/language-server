import path from "path";
import type { LanguageServiceHost } from "typescript/lib/tsserverlibrary";
import type TS from "typescript/lib/tsserverlibrary";
import type { MarkoProject } from "./project";

const internalTypesFile = path.join(__dirname, "marko.internal.d.ts");
const defaultMarkoTypesFile = path.join(__dirname, "marko.runtime.d.ts");

export default function getProjectTypeLibs(
  rootDir: string,
  project: MarkoProject,
  ts: typeof TS,
  host: LanguageServiceHost
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
    const markoRunGeneratedTypesFile = path.join(
      rootDir,
      ".marko-run/routes.d.ts"
    );
    const resolveFromFile = path.join(host.getCurrentDirectory(), "_.d.ts");
    const compilerOptions = host.getCompilationSettings();
    const { resolvedTypeReferenceDirective: resolvedMarkoTypes } =
      ts.resolveTypeReferenceDirective(
        (project.translator.runtimeTypes as string | undefined) || "marko",
        resolveFromFile,
        compilerOptions,
        host
      );

    const { resolvedTypeReferenceDirective: resolvedMarkoRunTypes } =
      ts.resolveTypeReferenceDirective(
        "@marko/run",
        resolveFromFile,
        compilerOptions,
        host
      );

    const markoTypesFile =
      resolvedMarkoTypes?.resolvedFileName || defaultMarkoTypesFile;
    const markoRunTypesFile = resolvedMarkoRunTypes?.resolvedFileName;

    cached = {
      internalTypesFile,
      markoTypesFile,
      markoTypesCode: host.readFile(markoTypesFile, "utf-8") || "",
      markoRunTypesFile,
      markoRunGeneratedTypesFile: host.fileExists(markoRunGeneratedTypesFile)
        ? markoRunGeneratedTypesFile
        : undefined,
    };

    project.cache.set(getProjectTypeLibs, cached);
  }

  return cached;
}
