import { fileURLToPath } from "url";

export default function resolveUrl(ref: string, baseUrl: string) {
  const resolved = new URL(ref, new URL(baseUrl, "resolve://"));
  if (resolved.protocol === "resolve:") {
    // `baseUrl` is a relative URL.
    return resolved.pathname + resolved.search + resolved.hash;
  }

  try {
    return fileURLToPath(resolved);
  } catch {
    return undefined;
  }
}
