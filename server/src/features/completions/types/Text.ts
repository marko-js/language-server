import { Position } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import {
  getCSSLanguageService,
  getSCSSLanguageService,
  getLESSLanguageService,
  type LanguageService,
} from "vscode-css-languageservice";
import { shiftCompletionRanges, shiftPosition } from "../../../utils/utils";
import { Node, NodeType, UNFINISHED } from "../../../utils/parser";
import type { CompletionMeta } from "..";

const styleBlockReg = /[ \t]*{/y;
const services: Record<string, () => LanguageService> = {
  // TODO: js/ts
  css: getCSSLanguageService,
  scss: getSCSSLanguageService,
  less: getLESSLanguageService,
};

/**
 * TODO: process this from the tag level.
 */
export function Text(event: CompletionMeta<Node.Text>) {
  const { node, parsed, document, params, code } = event;
  const tag = node.parent;

  // TODO: style block needs to be parsed
  if (tag.type !== NodeType.Tag || tag.nameText !== "style") return;

  tag.open.end === UNFINISHED; // check for tag

  const prefixEnd = tag.shorthandClassNames
    ? tag.shorthandClassNames.at(-1)!.end
    : tag.name.end;

  const ext = tag.shorthandClassNames
    ? parsed
        .read({
          start: tag.shorthandClassNames[0].start,
          end: prefixEnd,
        })
        .replace(/^.*\./, "")
    : "css";

  const service = services[ext]?.();
  if (!service) return;

  let codeStartOffset = tag.concise
    ? getMatchEnd(styleBlockReg, prefixEnd, code)
    : -1;
  let codeEndOffset = tag.end;

  if (codeStartOffset === -1) {
    codeStartOffset = tag.name.end;
  } else if (tag.close) {
    codeEndOffset = tag.close.start;
  }

  const codeStartPos = parsed.positionAt(codeStartOffset);
  const relativePos = shiftPosition(
    params.position,
    Position.create(codeStartPos.line * -1, codeStartPos.character * -1)
  );
  const cssCode = parsed.read({
    start: codeStartOffset,
    end: codeEndOffset,
  });
  const contentDocument = TextDocument.create(
    document.uri,
    ext,
    document.version,
    cssCode
  );

  const completions = service.doComplete(
    contentDocument,
    relativePos,
    service.parseStylesheet(contentDocument)
  );

  return shiftCompletionRanges(completions, codeStartPos);
}

function getMatchEnd(reg: RegExp, lastIndex: number, src: string) {
  reg.lastIndex = lastIndex;
  const match = reg.exec(src);
  if (match) {
    return lastIndex + match[0].length;
  }

  return -1;
}
