import { type Node, NodeType, UNFINISHED } from "@marko/language-tools";

import { type MarkoFile, processDoc } from "../../utils/file";
import { TokenModifier, TokenType } from "../semantic-tokens";
import type { Plugin, SemanticToken } from "../types";
import { isCoreTag } from "./util/is-core-tag";

export const getSemanticTokens: Plugin["getSemanticTokens"] = (doc) =>
  processDoc(doc, extractSemanticTokens);

const localTagNameReg = /^[A-Z][a-zA-Z0-9_$]+$/;
const nodeModulesReg = /[\\/]node_modules[\\/]/;
// Mirrors the `#tag-name` rule in packages/vscode/syntaxes/marko.tmLanguage.json
// (`keyword.control.flow.marko`); keep the two lists in sync.
const controlFlowTagNames = new Set([
  "if",
  "else",
  "else-if",
  "for",
  "while",
  "try",
  "await",
  "return",
]);
// The grammar scopes `html-comment` as `support.type.builtin.marko` alongside
// script/style (which the taglib flags `html`); leave its color to the grammar.
const grammarBuiltinTagNames = new Set(["html-comment"]);

type TagClassification = Pick<SemanticToken, "type" | "modifiers"> | undefined;

function extractSemanticTokens({
  parsed,
  lookup,
  code,
}: MarkoFile): SemanticToken[] {
  const tokens: SemanticToken[] = [];
  const classifications = new Map<string, TagClassification>();

  const classify = (nameText: string): TagClassification => {
    if (classifications.has(nameText)) return classifications.get(nameText);

    let classification: TagClassification;
    const def = lookup.getTag(nameText);
    if (def) {
      if (!def.html && !grammarBuiltinTagNames.has(nameText)) {
        const modifiers = def.deprecated ? TokenModifier.deprecated : 0;
        if (isCoreTag(def)) {
          classification = {
            type: controlFlowTagNames.has(nameText)
              ? TokenType.keyword
              : TokenType.macro,
            modifiers,
          };
        } else {
          const file = def.template || def.renderer || def.types;
          if (file) {
            classification = {
              type: TokenType.class,
              modifiers: nodeModulesReg.test(file)
                ? modifiers | TokenModifier.defaultLibrary
                : modifiers,
            };
          }
        }
      }
    } else if (localTagNameReg.test(nameText)) {
      classification = { type: TokenType.class, modifiers: 0 };
    }

    classifications.set(nameText, classification);
    return classification;
  };

  const stack: Node.ChildNode[] = [...parsed.program.body];
  while (stack.length) {
    const node = stack.pop()!;
    if (node.type !== NodeType.Tag && node.type !== NodeType.AttrTag) continue;

    const { nameText } = node;
    if (
      node.type === NodeType.Tag &&
      nameText &&
      node.name.end !== UNFINISHED
    ) {
      const classification = classify(nameText);
      if (classification) {
        tokens.push({
          range: parsed.locationAt(node.name),
          ...classification,
        });

        if (node.close && node.close.end !== UNFINISHED) {
          const nameStart = code
            .slice(node.close.start, node.close.end)
            .indexOf(nameText);
          if (nameStart !== -1) {
            const start = node.close.start + nameStart;
            tokens.push({
              range: parsed.locationAt({
                start,
                end: start + nameText.length,
              }),
              ...classification,
            });
          }
        }
      }
    }

    if (node.body) {
      for (const child of node.body) {
        stack.push(child);
      }
    }
  }

  return tokens;
}
