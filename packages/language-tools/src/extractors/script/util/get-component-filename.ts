import fs from "fs";
import path from "path";

import * as Project from "../../../util/project";

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

type Listings = Map<string, { mtimeMs: number; entries: string[] }>;

// Each directory's entries, by when it was last modified: templates in one
// directory share a listing, and a file added or removed beside them changes
// the directory's time, so a stat stands in for reading it again. Kept in
// the project's cache, so they go with it (`Project.clearCaches`).
function tryReaddirSync(dir: string) {
  try {
    const listings = getListings(dir);
    if (!listings) return fs.readdirSync(dir);
    const { mtimeMs } = fs.statSync(dir);
    let listing = listings.get(dir);
    if (listing?.mtimeMs !== mtimeMs) {
      listing = { mtimeMs, entries: fs.readdirSync(dir) };
      listings.set(dir, listing);
    }
    return listing.entries;
  } catch {
    getListings(dir)?.delete(dir);
    return [];
  }
}

// The listings of the project `dir` is in, if a compiler is found for it.
function getListings(dir: string): Listings | undefined {
  let cache: Map<unknown, unknown>;
  try {
    cache = Project.getCache(dir);
  } catch {
    return;
  }
  let listings = cache.get(getListings) as Listings | undefined;
  if (!listings) cache.set(getListings, (listings = new Map()));
  return listings;
}
