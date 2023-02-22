import path from "path";
import type { LanguageServiceHost } from "typescript/lib/tsserverlibrary";

export default function getComponentFilename(
  from: string,
  host: LanguageServiceHost
) {
  const dir = path.dirname(from);
  const nameNoExt = path.basename(from, ".marko");
  const isEntry = nameNoExt === "index";
  const componentFull = path.join(dir, `${nameNoExt}.component.`);
  const componentBrowserFull = path.join(
    dir,
    `${nameNoExt}.component-browser.`
  );
  const componentPartial = isEntry ? path.join(dir, "component.") : undefined;
  const componentBrowserPartial = isEntry
    ? path.join(dir, "component-browser.")
    : undefined;
  for (const entry of host.readDirectory!(dir)) {
    // Prefers `component-browser` over `component`.
    if (
      (entry !== from &&
        ((isEntry && entry.startsWith(componentBrowserPartial!)) ||
          entry.startsWith(componentPartial!))) ||
      entry.startsWith(componentBrowserFull) ||
      entry.startsWith(componentFull)
    ) {
      return entry;
    }
  }
}
