import { tokenModifiers, tokenTypes } from "../../service/semantic-tokens";

/**
 * Decode the LSP delta-encoded token data into one line per token, with the
 * source text sliced at each token so snapshots read as plain english. Throws
 * on malformed data (negative deltas, unknown legend indices) so an encoding
 * bug fails the test instead of producing a plausible snapshot.
 */
export function formatSemanticTokens(
  code: string,
  tokens: { data: number[] } | undefined,
): string {
  if (!tokens?.data.length) return "(no semantic tokens)\n";

  const lineStarts = [0];
  for (let i = 0; i < code.length; i++) {
    if (code.charCodeAt(i) === 10) lineStarts.push(i + 1);
  }

  const { data } = tokens;
  let result = "";
  let line = 0;
  let char = 0;

  for (let i = 0; i < data.length; i += 5) {
    const deltaLine = data[i];
    const deltaChar = data[i + 1];
    const length = data[i + 2];
    const type = tokenTypes[data[i + 3]];

    if (deltaLine < 0 || (deltaLine === 0 && deltaChar < 0) || length <= 0) {
      throw new Error(
        `malformed semantic token data at index ${i}: [${deltaLine}, ${deltaChar}, ${length}]`,
      );
    }
    if (!type) {
      throw new Error(`unknown token type index ${data[i + 3]} at index ${i}`);
    }

    line += deltaLine;
    char = deltaLine ? deltaChar : char + deltaChar;

    let modifiers = "";
    for (let bit = 0; 1 << bit <= data[i + 4]; bit++) {
      if (data[i + 4] & (1 << bit)) {
        const modifier = tokenModifiers[bit];
        if (!modifier) {
          throw new Error(`unknown token modifier bit ${bit} at index ${i}`);
        }
        modifiers += modifiers ? ` ${modifier}` : modifier;
      }
    }

    const start = lineStarts[line] + char;
    const text = code.slice(start, start + length);
    if (text.length !== length || /\s/.test(text)) {
      throw new Error(
        `token at index ${i} does not cover a token-like slice: \`${text}\``,
      );
    }

    result += `Ln ${line + 1}, Col ${char + 1} (len ${length}) ${type}${
      modifiers ? ` [${modifiers}]` : ""
    } \`${text}\`\n`;
  }

  return result;
}
