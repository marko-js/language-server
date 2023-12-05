import type TS from "typescript/lib/tsserverlibrary";
import type { Repeatable } from "../../../parser";

const MaybeInputTypedefReg = /@typedef\b[\s\S]*\bInput\b/;

export default function getJSDocInputType(comment: string, ts: typeof TS) {
  if (!MaybeInputTypedefReg.test(comment)) return;

  const sourceFile = ts.createSourceFile(
    "_.js",
    comment,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.JS,
  );
  const tags = (sourceFile.endOfFileToken as any).jsDoc?.[0]?.tags as
    | TS.JSDocTag[]
    | undefined;

  if (!(tags && hasInputTypeDef(ts, sourceFile, tags))) return;

  let typeParameters: Repeatable<{
    name: string;
    constraint: undefined | string;
    default: undefined | string;
  }>;

  for (const tag of tags) {
    if (isTemplateTag(ts, tag)) {
      let constraint = tag.constraint?.type.getText(sourceFile);

      for (const param of tag.typeParameters) {
        const value = {
          name: "" + param.name.escapedText,
          constraint,
          default: param.default?.getText(sourceFile),
        };
        constraint = undefined;

        if (typeParameters) {
          typeParameters.push(value);
        } else {
          typeParameters = [value];
        }
      }
    }
  }

  return { typeParameters };
}

function hasInputTypeDef(
  ts: typeof TS,
  sourceFile: TS.SourceFile,
  tags: TS.JSDocTag[],
) {
  for (const tag of tags) {
    if (
      isTypeDefTag(ts, tag) &&
      tag.fullName?.getText(sourceFile) === "Input"
    ) {
      return true;
    }
  }

  return false;
}

function isTypeDefTag(
  ts: typeof TS,
  tag: TS.JSDocTag,
): tag is TS.JSDocTypedefTag {
  return tag.kind === ts.SyntaxKind.JSDocTypedefTag;
}

function isTemplateTag(
  ts: typeof TS,
  tag: TS.JSDocTag,
): tag is TS.JSDocTemplateTag {
  return tag.kind === ts.SyntaxKind.JSDocTemplateTag;
}
