/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See "Notice" file in this package for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * adopted from https://github.com/microsoft/vscode/blob/b9202b64081bb1267792a8d2d023e4c746ed0f73/extensions/typescript-language-features/src/languageFeatures/util/textRendering.ts
 */

import type ts from "typescript/lib/tsserverlibrary";

const REG_BACK_TICK = /`/g;
const REG_LINE = /\r\n|\n/;
const REG_CODE_BLOCK = /^\s*[~`]{3}/m;
const REG_CAPTION = /^<caption>(.*?)<\/caption>\s*(\r\n|\n)/;

export default function printJSDocTag(
  tag: ts.JSDocTagInfo,
): string | undefined {
  switch (tag.name) {
    case "augments":
    case "extends":
    case "param":
    case "template": {
      const body = getTagBodyParts(tag);
      if (body?.length === 3) {
        const [, param, text] = body;
        return `${printTagName(tag.name)} \`${param}\`${printTagBody(
          replaceLinks(text),
        )}`;
      }
      break;
    }

    case "return":
    case "returns": {
      if (!tag.text?.length) return undefined;
      break;
    }
  }

  return printTagName(tag.name) + printTagBody(getTagBodyText(tag));
}

function getTagBodyParts(tag: ts.JSDocTagInfo): Array<string> | undefined {
  if (tag.name === "template") {
    const parts = tag.text;
    if (parts) {
      const params = parts
        .filter((p) => p.kind === "typeParameterName")
        .map((p) => p.text)
        .join(", ");
      const docs = parts
        .filter((p) => p.kind === "text")
        .map((p) => convertLinkTags(p.text.replace(/^\s*-?\s*/, "")))
        .join(" ");
      return params ? ["", params, docs] : undefined;
    }
  }
  return convertLinkTags(tag.text).split(/^(\S+)\s*-?\s*/);
}

function getTagBodyText(tag: ts.JSDocTagInfo): string {
  if (!tag.text) return "";

  const text = convertLinkTags(tag.text);
  switch (tag.name) {
    case "example": {
      const captionTagMatches = REG_CAPTION.exec(text);
      if (captionTagMatches) {
        const [captionMatch, captionText] = captionTagMatches;
        return `${captionText}\n${ensureCodeblock(
          captionText.slice(captionMatch.length),
        )}`;
      } else {
        return ensureCodeblock(text);
      }
    }
    case "author": {
      const emailMatch = text.match(/(.+)\s<([-.\w]+@[-.\w]+)>/);

      if (emailMatch) {
        return `${emailMatch[1]} ${emailMatch[2]}`;
      }

      return text;
    }
    case "default":
      return ensureCodeblock(text);
  }

  return replaceLinks(text);
}

function convertLinkTags(
  parts: readonly ts.SymbolDisplayPart[] | string | undefined,
): string {
  if (!parts) return "";
  if (typeof parts === "string") return parts;

  let result = "";
  let currentLink:
    | { name?: string; target?: any; text?: string; readonly linkcode: boolean }
    | undefined;

  for (const part of parts) {
    switch (part.kind) {
      case "link":
        if (currentLink) {
          if (currentLink.target) {
            const linkText = currentLink.text
              ? currentLink.text
              : escapeBackTicks(currentLink.name ?? "");
            result += `[${
              currentLink.linkcode ? "`" + linkText + "`" : linkText
            }](${currentLink.target.file})`;
          } else {
            const text = currentLink.text ?? currentLink.name;
            if (text) {
              if (/^https?:/.test(text)) {
                const parts = text.split(" ");
                if (parts.length === 1) {
                  result += parts[0];
                } else if (parts.length > 1) {
                  const linkText = escapeBackTicks(parts.slice(1).join(" "));
                  result += `[${
                    currentLink.linkcode ? "`" + linkText + "`" : linkText
                  }](${parts[0]})`;
                }
              } else {
                result += escapeBackTicks(text);
              }
            }
          }
          currentLink = undefined;
        } else {
          currentLink = {
            linkcode: part.text === "{@linkcode ",
          };
        }
        break;

      case "linkName":
        if (currentLink) {
          currentLink.name = part.text;
          currentLink.target = (part as ts.JSDocLinkDisplayPart).target;
        }
        break;

      case "linkText":
        if (currentLink) {
          currentLink.text = part.text;
        }
        break;

      default:
        result += part.text;
        break;
    }
  }
  return replaceLinks(result);
}

function replaceLinks(text: string): string {
  return text.replace(
    /\{@(link|linkplain|linkcode) (https?:\/\/[^ |}]+?)(?:[| ]([^{}\n]+?))?\}/gi,
    (_, tag: string, link: string, text?: string) => {
      const alt = text ? text.trim() : link;
      return `[${tag === "linkcode" ? `\`${alt}\`` : alt}](${link})`;
    },
  );
}

function printTagBody(text: string | undefined) {
  if (text) {
    return (REG_LINE.test(text) ? "  \n" : " — ") + text;
  }

  return "";
}

function printTagName(name: string) {
  return `*@${name}*`;
}

function ensureCodeblock(text: string): string {
  return REG_CODE_BLOCK.test(text) ? text : "```\n" + text + "\n```";
}

function escapeBackTicks(text: string): string {
  return text.replace(REG_BACK_TICK, "\\$&");
}
