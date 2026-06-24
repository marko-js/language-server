import type { Range } from "../parser";

/**
 * Collect class (`.name`) and id (`#name`) selectors, mapping each unique name
 * to every source {@link Range} it was defined at. A name only counts when it
 * appears in a prelude that ends with `{`; names in declaration values or
 * at-rules (ending with `;`/`}`) are discarded, which keeps hex colors and
 * numbers out. Names in `:global` scope -- `:global(.x)`, a bare `:global .x`,
 * or a `:global { ... }` block (and their `:local` inverses) -- are excluded,
 * matching what a CSS module actually exports. Comments, strings and
 * interpolations are skipped. `offset` is added to every range so callers can
 * scan a slice of a larger document (eg an embedded `<style>` block) in the
 * original document's coordinate space.
 */
export function findStyleSelectors(
  code: string,
  offset = 0,
): Map<string, Range[]> {
  const result = new Map<string, Range[]>();
  const pending: Range[] = [];
  // Whether the current scope is `:global` (excluded from exports). Tracked per
  // `{}` block and `()` group, plus a bare flag for the rest of a selector.
  const braceStack: boolean[] = [];
  const parenStack: boolean[] = [];
  let bareGlobal = false;
  // Scope carried by a `:global`/`:local` to its following `(` or `{`.
  let pendingScope: boolean | null = null;
  const len = code.length;
  let i = 0;

  const blockGlobal = () =>
    braceStack.length ? braceStack[braceStack.length - 1] : false;

  while (i < len) {
    const ch = code[i];
    const next = code[i + 1];

    if (ch === "/" && next === "*") {
      i += 2;
      while (i < len && !(code[i] === "*" && code[i + 1] === "/")) i++;
      i += 2;
    } else if (ch === "/" && next === "/") {
      i += 2;
      while (i < len && code[i] !== "\n") i++;
    } else if (ch === '"' || ch === "'") {
      i = skipString(code, i);
    } else if (isInterpolationStart(ch) && next === "{") {
      i = skipBalanced(code, i + 1);
    } else if (ch === ":") {
      // `:global`/`:local` flip whether the names they cover are exported.
      let end = i + 1;
      while (end < len && isNameChar(code[end])) end++;
      const pseudo = code.slice(i + 1, end).toLowerCase();
      if (pseudo === "global" || pseudo === "local") {
        const isGlobal = pseudo === "global";
        if (code[end] === "(") {
          pendingScope = isGlobal; // `:global(...)` -- scope its `()` group.
        } else {
          let j = end;
          while (j < len && isWhitespace(code[j])) j++;
          if (code[j] === "{") {
            pendingScope = isGlobal; // `:global { ... }` -- scope its block.
          } else {
            bareGlobal = isGlobal; // bare `:global` -- rest of the selector.
          }
        }
      }
      i = end;
    } else if (ch === "(") {
      parenStack.push(
        pendingScope ??
          (parenStack.length ? parenStack[parenStack.length - 1] : bareGlobal),
      );
      pendingScope = null;
      i++;
    } else if (ch === ")") {
      parenStack.pop();
      i++;
    } else if (ch === "." || ch === "#") {
      const start = i + 1;
      if (isNameStart(code[start])) {
        let end = start + 1;
        while (end < len && isNameChar(code[end])) end++;
        // Ignore dynamically interpolated names like `.icon-#{$name}`.
        if (!(isInterpolationStart(code[end]) && code[end + 1] === "{")) {
          const global = parenStack.length
            ? parenStack[parenStack.length - 1]
            : bareGlobal;
          if (!global) pending.push({ start, end });
        }
        i = end;
      } else {
        i++;
      }
    } else if (ch === "{") {
      // A prelude ended: everything pending was a selector.
      for (const range of pending) {
        const name = code.slice(range.start, range.end);
        const offsetRange = {
          start: range.start + offset,
          end: range.end + offset,
        };
        const ranges = result.get(name);
        if (ranges) {
          ranges.push(offsetRange);
        } else {
          result.set(name, [offsetRange]);
        }
      }
      pending.length = 0;
      braceStack.push(pendingScope ?? blockGlobal());
      pendingScope = null;
      parenStack.length = 0;
      bareGlobal = blockGlobal();
      i++;
    } else if (ch === "}") {
      // A declaration/block ended: anything pending was not a selector.
      pending.length = 0;
      braceStack.pop();
      parenStack.length = 0;
      bareGlobal = blockGlobal();
      i++;
    } else if (ch === ";") {
      pending.length = 0;
      parenStack.length = 0;
      bareGlobal = blockGlobal();
      i++;
    } else if (ch === ",") {
      // Each selector in a list is scoped independently.
      bareGlobal = blockGlobal();
      i++;
    } else {
      i++;
    }
  }

  return result;
}

function skipString(code: string, start: number) {
  const quote = code[start];
  const len = code.length;
  let i = start + 1;
  while (i < len) {
    const ch = code[i];
    if (ch === "\\") {
      i += 2;
    } else if (ch === quote) {
      return i + 1;
    } else {
      i++;
    }
  }
  return i;
}

function skipBalanced(code: string, openBrace: number) {
  const len = code.length;
  let depth = 0;
  let i = openBrace;
  while (i < len) {
    const ch = code[i];
    if (ch === "{") {
      depth++;
    } else if (ch === "}") {
      if (--depth === 0) return i + 1;
    }
    i++;
  }
  return i;
}

function isNameStart(ch: string | undefined) {
  if (ch === undefined) return false;
  const code = ch.charCodeAt(0);
  return (
    (code >= 97 && code <= 122) || // a-z
    (code >= 65 && code <= 90) || // A-Z
    ch === "_" ||
    ch === "-" ||
    code >= 0x80 // non-ascii
  );
}

function isNameChar(ch: string) {
  const code = ch.charCodeAt(0);
  return (code >= 48 && code <= 57) || isNameStart(ch); // 0-9 or name-start
}

function isInterpolationStart(ch: string | undefined) {
  // scss `#{...}`, less `@{...}` or template-like `${...}`.
  return ch === "#" || ch === "@" || ch === "$";
}

function isWhitespace(ch: string | undefined) {
  return ch === " " || ch === "\t" || ch === "\n" || ch === "\r" || ch === "\f";
}
