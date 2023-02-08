import type { LanguageServiceHost } from "typescript";
import type TS from "typescript";
import type { MarkoProject } from "./project";

export default function getRuntimeTypes(
  project: MarkoProject,
  ts: typeof TS,
  host: LanguageServiceHost
) {
  let cached = project.cache.get(getRuntimeTypes) as
    | false
    | { filename: string; code: string };

  if (cached === undefined) {
    const { resolvedModule } = ts.resolveModuleName(
      (project.translator.runtimeTypes as string | undefined) || "marko",
      project.rootDir,
      host.getCompilationSettings(),
      host
    );

    cached = resolvedModule
      ? {
          filename: resolvedModule.resolvedFileName,
          code: host.readFile(resolvedModule.resolvedFileName, "utf-8") || "",
        }
      : false;

    project.cache.set(getRuntimeTypes, cached);
  }

  return cached || undefined;
}
