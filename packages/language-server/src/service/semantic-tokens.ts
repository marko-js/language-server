import type { SemanticTokensLegend } from "vscode-languageserver";

// Type indices 0-11 and modifier bits 0-5 mirror TypeScript's classifier2020
// encoding (with `member` renamed to LSP's `method`), so decoded script
// classifications pass through unchanged. Append new entries; never reorder.
export const tokenTypes = [
  "class",
  "enum",
  "interface",
  "namespace",
  "typeParameter",
  "type",
  "parameter",
  "variable",
  "enumMember",
  "property",
  "function",
  "method",
  "keyword",
  "macro",
] as const;

export const tokenModifiers = [
  "declaration",
  "static",
  "async",
  "readonly",
  "defaultLibrary",
  "local",
  "deprecated",
] as const;

export const semanticTokensLegend: SemanticTokensLegend = {
  tokenTypes: [...tokenTypes],
  tokenModifiers: [...tokenModifiers],
};

export const TokenType = Object.fromEntries(
  tokenTypes.map((name, index) => [name, index]),
) as { [Name in (typeof tokenTypes)[number]]: number };

export const TokenModifier = Object.fromEntries(
  tokenModifiers.map((name, index) => [name, 1 << index]),
) as { [Name in (typeof tokenModifiers)[number]]: number };

const tsTokenTypeCount = 12;
const tsTokenModifierCount = 6;
const tsTokenModifierMask = (1 << tsTokenModifierCount) - 1;

// TypeScript "2020" format: classification = ((type + 1) << 8) + modifierSet.
export function decodeTsClassification(
  classification: number,
): { type: number; modifiers: number } | undefined {
  const type = (classification >> 8) - 1;
  if (type < 0 || type >= tsTokenTypeCount) return;
  return { type, modifiers: classification & tsTokenModifierMask };
}
