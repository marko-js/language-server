export default function resolveUrl(to: string, base: string) {
  try {
    const url = new URL(to, base);
    if (url.protocol === "file:") return url.toString();
  } catch {
    return undefined;
  }
}
