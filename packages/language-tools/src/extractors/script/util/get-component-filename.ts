import fs from "fs";
import path from "path";

export function getComponentFilename(from: string) {
  const dir = path.dirname(from);
  let nameNoExt = path.basename(from, ".marko");
  if (nameNoExt.endsWith(".d")) {
    nameNoExt = nameNoExt.slice(0, -2);
  }
  const isEntry = nameNoExt === "index";
  const componentFull = `${nameNoExt}.component.`;
  const componentBrowserFull = `${nameNoExt}.component-browser.`;
  const componentPartial = isEntry ? "component." : undefined;
  const componentBrowserPartial = isEntry ? "component-browser." : undefined;
  for (const entry of tryReaddirSync(dir)) {
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

function tryReaddirSync(dir: string) {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}
