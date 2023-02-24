import path from "path";
import type { LanguageServiceHost } from "typescript/lib/tsserverlibrary";
import type TS from "typescript/lib/tsserverlibrary";
import type { MarkoProject } from "./project";

const internalTypesFile = path.join(__dirname, "marko.internal.d.ts");
const defaultMarkoTypesFile = path.join(__dirname, "marko.runtime.d.ts");

export default function getProjectTypeLibs(
  project: MarkoProject,
  ts: typeof TS,
  host: LanguageServiceHost
) {
  let cached = project.cache.get(getProjectTypeLibs) as
    | {
        internalTypesFile: string;
        markoTypesFile: string;
        markoTypesCode: string;
      }
    | undefined;

  if (cached === undefined) {
    const { resolvedTypeReferenceDirective } = ts.resolveTypeReferenceDirective(
      (project.translator.runtimeTypes as string | undefined) || "marko",
      path.join(project.rootDir, "_.d.ts"),
      host.getCompilationSettings(),
      host
    );

    const markoTypesFile =
      resolvedTypeReferenceDirective?.resolvedFileName || defaultMarkoTypesFile;

    cached = {
      internalTypesFile,
      markoTypesFile,
      markoTypesCode: host.readFile(markoTypesFile, "utf-8") || "",
    };

    project.cache.set(getProjectTypeLibs, cached);
  }

  return cached;
}
