import type { Repeatable } from "../../../parser";

const MaybeInputTypedefReg = /@typedef\b[\s\S]*\bInput\b/;
const tagReg = /@(typedef|template)\b/g;
const identifierReg = /[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*/y;
const spaceReg = /\s*/y;

interface TypeParameter {
  name: string;
  constraint: undefined | string;
  default: undefined | string;
}

/**
 * Reads a JSDoc comment declaring the `Input` type of a JS template:
 * `@typedef {...} Input` plus any `@template` tags giving it type parameters.
 * Returns undefined when the comment declares no `Input` typedef.
 */
export default function getJSDocInputType(comment: string) {
  if (!MaybeInputTypedefReg.test(comment)) return;

  const text = stripCommentDecorations(comment);
  let hasInputTypedef = false;
  let typeParameters: Repeatable<TypeParameter>;
  let match: RegExpExecArray | null;
  tagReg.lastIndex = 0;

  while ((match = tagReg.exec(text))) {
    // Both tags may start with a type in braces: the typedef's own type, or
    // the constraint of a template's first type parameter.
    let pos = skipSpace(text, tagReg.lastIndex);
    let braced: string | undefined;
    if (text[pos] === "{") {
      const end = closingBracket(text, pos, "{", "}");
      if (end !== -1) {
        braced = text.slice(pos + 1, end);
        pos = skipSpace(text, end + 1);
      }
    }

    if (match[1] === "typedef") {
      const name = identifierAt(text, pos);
      if (name === "Input") hasInputTypedef = true;
      if (name) pos += name.length;
    } else {
      let constraint = braced?.trim() || undefined;

      for (;;) {
        let name: string | undefined;
        let defaultType: string | undefined;

        if (text[pos] === "[") {
          // An optional one: `[Name]` or `[Name=Default]`.
          const end = closingBracket(text, pos, "[", "]");
          if (end === -1) break;
          const optional = text.slice(pos + 1, end);
          const eq = optional.indexOf("=");
          name = (eq === -1 ? optional : optional.slice(0, eq)).trim();
          defaultType =
            eq === -1 ? undefined : optional.slice(eq + 1).trim() || undefined;
          pos = end + 1;
        } else if ((name = identifierAt(text, pos))) {
          pos += name.length;
        }

        if (!name) break;

        const param: TypeParameter = {
          name,
          constraint,
          default: defaultType,
        };
        // Like TypeScript, a constraint only applies to the first parameter.
        constraint = undefined;

        if (typeParameters) {
          typeParameters.push(param);
        } else {
          typeParameters = [param];
        }

        pos = skipSpace(text, pos);
        if (text[pos] !== ",") break;
        pos = skipSpace(text, pos + 1);
      }
    }

    tagReg.lastIndex = pos;
  }

  if (hasInputTypedef) return { typeParameters };
}

/** Drop the `/**`, `*\/` and leading `*` of each line from a JSDoc comment. */
function stripCommentDecorations(comment: string) {
  return comment
    .replace(/^\/\*\*?/, "")
    .replace(/\*\/$/, "")
    .replace(/^[ \t]*\*(?!\/)/gm, "");
}

function skipSpace(text: string, pos: number) {
  spaceReg.lastIndex = pos;
  spaceReg.test(text);
  return spaceReg.lastIndex;
}

function identifierAt(text: string, pos: number) {
  identifierReg.lastIndex = pos;
  return identifierReg.exec(text)?.[0];
}

/** The index of the bracket closing the one at `pos`, or -1. */
function closingBracket(
  text: string,
  pos: number,
  open: string,
  close: string,
) {
  let depth = 0;

  for (let i = pos; i < text.length; i++) {
    const char = text[i];
    if (char === '"' || char === "'" || char === "`") {
      // A bracket in a string literal type is not one.
      while (++i < text.length && text[i] !== char) {
        if (text[i] === "\\") i++;
      }
    } else if (char === open) {
      depth++;
    } else if (char === close && !--depth) {
      return i;
    }
  }

  return -1;
}
