export default function resolveUrl(to: string, base: string) {
  try {
    const baseUrl = new URL(base, "file://");
    const resolved = new URL(to, baseUrl);
    const { origin, protocol } = baseUrl;
    if (resolved.origin === origin && resolved.protocol === protocol) {
      // result is relative to the base URL.
      return resolved.pathname + resolved.search + resolved.hash;
    }
    return resolved.toString();
  } catch {
    return undefined;
  }
}
