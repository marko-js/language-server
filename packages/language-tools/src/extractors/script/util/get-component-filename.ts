import fs from "fs";
import path from "path";

export function getComponentFilename(from: string) {
  const dir = path.dirname(from);
  let nameNoExt = path.basename(from, ".marko");
  if (nameNoExt.endsWith(".d")) {
    nameNoExt = nameNoExt.slice(0, -2);
  }
  const isEntry = nameNoExt === "index";
  const fileMatch = `(${nameNoExt.replace(/[.*+?^$[\]()|\\:!{}]/g, "\\$&")}\\.${
    isEntry ? "|" : ""
  })`;
  const componentMatch = new RegExp(
    `^${fileMatch}component(-browser)?\\.\\w+$`,
  );
  for (const entry of tryReaddirSync(dir)) {
    if (componentMatch.test(entry)) {
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
