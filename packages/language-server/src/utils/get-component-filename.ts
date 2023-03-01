import fs from "fs";
import path from "path";

export default function getComponentFilename(from: string) {
  const dir = path.dirname(from);
  const nameNoExt = path.basename(from, ".marko");
  const isEntry = nameNoExt === "index";
  const componentFull = `${nameNoExt}.component.`;
  const componentBrowserFull = `${nameNoExt}.component-browser.`;
  const componentPartial = isEntry ? "component." : undefined;
  const componentBrowserPartial = isEntry ? "component-browser." : undefined;
  for (const entry of fs.readdirSync(dir)) {
    // Prefers `component-browser` over `component`.
    if (
      (entry !== from &&
        ((isEntry && entry.startsWith(componentBrowserPartial!)) ||
          entry.startsWith(componentPartial!))) ||
      entry.startsWith(componentBrowserFull) ||
      entry.startsWith(componentFull)
    ) {
      return path.join(dir, entry);
    }
  }
}
