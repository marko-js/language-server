import path from "path";
import type { LanguageServiceHost } from "typescript";

export default function getComponentFilename(
  from: string,
  host: LanguageServiceHost
) {
  const dir = path.dirname(from);
  const nameNoExt = path.basename(from, ".marko");
  const matchFull = path.join(dir, `${nameNoExt}.component.`);
  const matchPartial = nameNoExt === "index" && path.join(dir, "component.");
  for (const entry of host.readDirectory!(dir)) {
    if (
      entry !== from &&
      (entry.startsWith(matchFull) ||
        (matchPartial && entry.startsWith(matchPartial)))
    ) {
      return entry;
    }
  }
}
