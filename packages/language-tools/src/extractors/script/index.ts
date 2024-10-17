import type TS from "typescript/lib/tsserverlibrary";
import type * as t from "@babel/types";
import { relativeImportPath } from "relative-import-path";

import type { TagDefinition, TaglibLookup } from "@marko/babel-utils";
import {
  type Node,
  NodeType,
  type Parsed,
  type Range,
  type Repeatable,
  type Repeated,
} from "../../parser";
import { Extractor } from "../../util/extractor";
import { ScriptParser } from "./util/script-parser";
import {
  crawlProgramScope,
  getBoundAttrMemberExpressionStartOffset,
  getHoistSources,
  getHoists,
  getMutatedVars,
  hasHoists,
  isMutatedVar,
} from "./util/attach-scopes";
import { getComponentFilename } from "./util/get-component-filename";
import { getRuntimeOverrides } from "./util/runtime-overrides";
import getJSDocInputType from "./util/jsdoc-input-type";

const SEP_EMPTY = "";
const SEP_SPACE = " ";
const SEP_COMMA_SPACE = ", ";
const SEP_COMMA_NEW_LINE = ",\n";
const VAR_LOCAL_PREFIX = "__marko_internal_";
const VAR_SHARED_PREFIX = `Marko._.`;
const ATTR_UNAMED = "value";
const REG_EXT = /(?<=[/\\][^/\\]+)\.[^.]+$/;
const REG_BLOCK = /\s*{/y;
const REG_NEW_LINE = /^|(\r?\n)/g;
const REG_ATTR_ARG_LITERAL =
  /(?<=\s*)(["'])((?:[^"'\\]+|\\.|(?!\1))*)\1\s*([,)])/my;
const REG_TAG_IMPORT = /(?<=(['"]))<([^'">]+)>(?=\1)/;
const REG_INPUT_TYPE = /\s*(interface|type)\s+Input\b/y;
const REG_OBJECT_PROPERTY = /^[_$a-z][_$a-z0-9]*$/i;
// Match https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-path- and https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check
const REG_COMMENT_PRAGMA = /\/\/(?:\s*@ts-|\/\s*<)/y;
const REG_TAG_NAME_IDENTIFIER = /^[A-Z][a-zA-Z_$]+$/;
const IF_TAG_ALTERNATES = new WeakMap<IfTag, IfTagAlternates>();
const WROTE_COMMENT = new WeakSet<Node.Comment>();
const START_OF_FILE: Range = { start: 0, end: 0 };

type ProcessedBody = {
  renderBody: Repeatable<Node.ChildNode>;
  staticAttrTags: undefined | Record<string, Repeated<Node.AttrTag>>;
  dynamicAttrTagParents: Repeatable<Node.ControlFlowTag>;
};
type IfTag = Node.ControlFlowTag & { nameText: "if" };
type IfTagAlternate = {
  condition: Range | undefined;
  node: Node.ControlFlowTag & {
    nameText: "else" | "else-if";
  };
};
type IfTagAlternates = Repeatable<IfTagAlternate>;

// TODO: Dedupe taglib completions with TS completions. (typescript project ignore taglib completions)
// TODO: special types for macro and tag tags.

// Later todos:
// TODO: completions within attr whitespace should not include quotes.
// TODO: handle top level attribute tags.
// TODO: css modules
// TODO: should support member expression tag vars.
// TODO: support #style directive with custom extension, eg `#style.less=""`.

// SUPER LATER TODOS:
// Have it self close tags by default if we detect it's input does not have a renderBody.

/**
 * Iterate over the Marko CST and extract all the script content.
 */

export enum ScriptLang {
  js = "js",
  ts = "ts",
}

export interface ExtractScriptOptions {
  ts?: typeof TS;
  parsed: Parsed;
  lookup: TaglibLookup;
  scriptLang: ScriptLang;
  runtimeTypesCode?: string;
}
export function extractScript(opts: ExtractScriptOptions) {
  return new ScriptExtractor(opts).end();
}

class ScriptExtractor {
  #code: string;
  #filename: string;
  #parsed: Parsed;
  #extractor: Extractor;
  #scriptParser: ScriptParser;
  #read: Parsed["read"];
  #lookup: TaglibLookup;
  #renderIds = new Map<Node.ParentTag, number>();
  #scriptLang: ScriptLang;
  #ts: ExtractScriptOptions["ts"];
  #runtimeTypes: ExtractScriptOptions["runtimeTypesCode"];
  #mutationOffsets: Repeatable<number>;
  #renderId = 1;
  constructor(opts: ExtractScriptOptions) {
    const { parsed, lookup, scriptLang } = opts;
    this.#filename = parsed.filename;
    this.#code = parsed.code;
    this.#scriptLang = scriptLang;
    this.#parsed = parsed;
    this.#lookup = lookup;
    this.#ts = opts.ts;
    this.#runtimeTypes = opts.runtimeTypesCode;
    this.#extractor = new Extractor(parsed);
    this.#scriptParser = new ScriptParser(parsed.filename, parsed.code);
    this.#read = parsed.read.bind(parsed);
    this.#mutationOffsets = crawlProgramScope(this.#parsed, this.#scriptParser);
    this.#writeProgram(parsed.program);
  }

  end() {
    return this.#extractor.end();
  }

  #writeProgram(program: Node.Program) {
    this.#writeCommentPragmas(program);

    const componentFileName = getComponentFilename(this.#filename);
    const inputType = this.#getInputType(program);
    let componentClassBody: Range | undefined;

    for (const node of program.static) {
      switch (node.type) {
        case NodeType.Class:
          this.#writeComments(node);
          componentClassBody = {
            start: node.start + "class".length,
            end: node.end,
          };
          break;
        case NodeType.Export: {
          this.#writeComments(node);
          this.#extractor.copy(node).write("\n");
          break;
        }
        case NodeType.Import: {
          const tagImportMatch = REG_TAG_IMPORT.exec(this.#read(node));
          this.#writeComments(node);

          if (tagImportMatch) {
            // Here we're looking for Marko's shorthand imports for tags and pre-resolving them so typescript knows what we're loading.
            const [, , tagName] = tagImportMatch;
            const templatePath = resolveTagImport(
              this.#filename,
              this.#lookup.getTag(tagName),
            );
            if (templatePath) {
              const [{ length }] = tagImportMatch;
              const fromStart = node.start + tagImportMatch.index;
              this.#extractor
                .copy({
                  start: node.start,
                  end: fromStart,
                })
                .write(templatePath)
                .copy({
                  start: fromStart + length,
                  end: node.end,
                })
                .write("\n");
              break;
            }
          }

          this.#extractor.copy(node).write("\n");
          break;
        }
        case NodeType.Static: {
          let start = node.start + "static ".length;
          let end = node.end;
          this.#writeComments(node);

          if (this.#testAtIndex(REG_BLOCK, start)) {
            start = REG_BLOCK.lastIndex;
            end--;
          }

          this.#extractor.copy({ start, end }).write("\n");
          break;
        }
      }
    }

    let typeParamsStr = "";
    let typeArgsStr = "";
    let jsDocTemplateTagsStr = "";
    const isExternalComponentFile =
      !componentClassBody && componentFileName !== undefined;

    if (inputType) {
      if (inputType.typeParameters) {
        let sep = SEP_EMPTY;
        typeParamsStr = typeArgsStr = "<";

        for (const param of inputType.typeParameters) {
          typeParamsStr +=
            sep +
            param.name +
            (param.constraint ? ` extends ${param.constraint}` : "") +
            (param.default ? ` = ${param.default}` : "");
          typeArgsStr += sep + param.name;
          sep = SEP_COMMA_SPACE;
        }

        typeParamsStr += ">";
        typeArgsStr += ">";

        if (this.#scriptLang === ScriptLang.js) {
          for (const param of inputType.typeParameters) {
            jsDocTemplateTagsStr += `\n* @template ${
              param.constraint ? `{${removeNewLines(param.constraint)}} ` : ""
            }${
              param.default
                ? `[${param.name} = ${removeNewLines(param.default)}]`
                : param.name
            }`;
          }
        }
      }
    } else {
      if (this.#scriptLang === ScriptLang.ts) {
        this.#extractor.write(
          isExternalComponentFile
            ? "export type Input = Component['input'];\n"
            : `export interface Input {}\n`,
        );
      } else {
        this.#extractor.write(
          `/** @typedef {${
            isExternalComponentFile
              ? "Component['input']"
              : "Record<string, unknown>"
          }} Input */\n`,
        );
      }
    }

    if (isExternalComponentFile) {
      if (this.#scriptLang === ScriptLang.ts) {
        this.#extractor.write(
          `import type Component from "${stripExt(
            relativeImportPath(this.#filename, componentFileName),
          )}";\n`,
        );
      } else {
        this.#extractor.write(
          `/** @typedef {import("${stripExt(
            relativeImportPath(this.#filename, componentFileName),
          )}") extends infer Component ? Component extends { default: infer Component } ? Component : Component : never} Component */\n`,
        );
      }
    } else {
      const body = componentClassBody || " {}";

      if (this.#scriptLang === ScriptLang.ts) {
        this.#extractor
          .write(
            `abstract class Component${typeParamsStr} extends Marko.Component<Input${typeArgsStr}>`,
          )
          .copy(body)
          .write("\nexport { type Component }\n");
      } else {
        this.#extractor.write(`/**${jsDocTemplateTagsStr}
  * @extends {Marko.Component<Input${typeArgsStr}>}
  * @abstract
  */\n`);
        this.#extractor
          .write(`export class Component extends Marko.Component`)
          .copy(body)
          .write("\n");
      }
    }

    const didReturn = !!getReturnTag(program);
    const templateName = didReturn ? varLocal("template") : "";

    if (!didReturn) {
      this.#extractor.write("(");
    }

    if (this.#scriptLang === ScriptLang.ts) {
      this.#extractor.write(
        `function ${templateName}${typeParamsStr}(this: void) {\n`,
      );
    } else {
      this.#extractor.write(`/**${jsDocTemplateTagsStr}
* @this {void}
*/
function ${templateName}() {\n`);
    }

    this.#extractor.write(`\
  const input = ${this.#getCastedType(`Input${typeArgsStr}`)};
  const component = ${this.#getCastedType(`Component${typeArgsStr}`)};
  const state = ${varShared("state")}(component);
  const $signal = ${this.#getCastedType("AbortSignal")};
  const $global = ${varShared("getGlobal")}(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (${varShared("error")}, ${this.#getCastedType("MarkoRun.Context")})
  );
  const out = ${varShared("out")};
  ${varShared("noop")}({ input, component, state, out, $global, $signal });\n`);

    const body = this.#processBody(program); // TODO: handle top level attribute tags.

    if (body?.renderBody) {
      this.#writeChildren(program, body.renderBody);
    }
    const hoists = getHoists(program);

    if (hoists) {
      this.#extractor.write("const ");
      this.#writeObjectKeys(hoists);
      this.#extractor.write(
        ` = ${varShared("readScopes")}(${varShared("rendered")});\n`,
      );
      this.#extractor.write(`${varShared("noop")}(`);
      this.#writeObjectKeys(hoists);
      this.#extractor.write(");\n");
    }

    if (didReturn) {
      this.#extractor.write(`return ${varLocal("return")}.return;\n}\n`);
    } else {
      this.#extractor.write("return;\n})();\n");
    }

    const templateBaseClass = varShared("Template");
    const internalInput = varLocal("input");
    const internalInputWithExtends = `${internalInput} extends unknown`;
    const internalApply = varLocal("apply");
    const renderAndReturn = `(input: Marko.Directives & Input${typeArgsStr} & ${varShared(
      "Relate",
    )}<${internalInput}, Marko.Directives & Input${typeArgsStr}>) => (${varShared(
      "ReturnWithScope",
    )}<${internalInput}, ${
      didReturn
        ? `typeof ${
            templateName + typeArgsStr
          } extends () => infer Return ? Return : never`
        : "void"
    }>)`;
    const templateOverrideClass = `${templateBaseClass}<{${
      this.#runtimeTypes
        ? getRuntimeOverrides(this.#runtimeTypes, typeParamsStr, typeArgsStr)
        : ""
    }
  _${
    typeParamsStr
      ? `<${internalApply} = 1>(): ${internalApply} extends 0
    ? ${typeParamsStr}() => <${internalInputWithExtends}>${renderAndReturn}
    : () => <${internalInputWithExtends}, ${typeParamsStr.slice(
      1,
      -1,
    )}>${renderAndReturn};`
      : `(): () => <${internalInputWithExtends}>${renderAndReturn};`
  }
}>`;

    this.#extractor.copy(START_OF_FILE);

    if (this.#scriptLang === ScriptLang.ts) {
      this.#extractor.write(`export default new (
  class Template extends ${templateOverrideClass} {}
);\n`);
    } else {
      this.#extractor.write(`export default new (
  /**
   * @extends {${removeNewLines(templateOverrideClass)}}
   */
  class Template extends ${templateBaseClass} {}
);\n`);
    }

    this.#writeComments(program);
  }

  #writeCommentPragmas(program: Node.Program) {
    const firstComments = program.static.length
      ? program.static[0].comments
      : program.body.length
        ? (program.body[0] as Node.Commentable).comments
        : program.comments;

    if (firstComments) {
      for (const comment of firstComments) {
        if (this.#testAtIndex(REG_COMMENT_PRAGMA, comment.start)) {
          WROTE_COMMENT.add(comment);
          this.#extractor.copy(comment).write("\n");
        }
      }
    }
  }

  #writeComments(node: Node.Commentable) {
    if (node.comments) {
      for (const comment of node.comments) {
        if (!WROTE_COMMENT.has(comment)) {
          if (this.#code.charAt(comment.start + 1) === "/") {
            this.#extractor.write("//").copy(comment.value).write("\n");
          } else {
            this.#extractor.write("/*").copy(comment.value).write("*/");
          }
        }
      }
    }
  }

  #writeReturn(
    returned: Range | string | undefined,
    localBindings: Repeatable<string>,
  ) {
    if (!returned && !localBindings) {
      this.#extractor.write(`return ${varShared("voidReturn")};\n`);
      return;
    }

    this.#extractor.write(`return new (class MarkoReturn<Return = void> {\n`);

    if (localBindings) {
      this.#extractor.write(`[Marko._.scope] = `);
      this.#writeObjectKeys(localBindings);
      this.#extractor.write(`;\n`);
    }

    this.#extractor.write(`declare return: Return;
constructor(_?: Return) {}
})(\n`);

    this.#extractor.copy(returned);
    this.#extractor.write(");\n");
  }

  #writeChildren(parent: Node.ParentNode, children: Node.ChildNode[]) {
    const last = children.length - 1;
    let returnTag: Node.Tag | undefined;
    let i = 0;

    while (i <= last) {
      const child = children[i++];
      switch (child.type) {
        case NodeType.Tag:
          switch (child.nameText) {
            case "return":
              returnTag = child;
              break;
            case "if": {
              // @ts-expect-error we know we are in an If Tag
              declare const child: IfTag;
              const alternates = IF_TAG_ALTERNATES.get(child);
              let renderId = this.#getRenderId(child);

              if (!renderId && alternates) {
                for (const { node } of alternates) {
                  if ((renderId = this.#getRenderId(node))) break;
                }
              }

              if (renderId) {
                this.#extractor.write(
                  `${varShared("assertRendered")}(${varShared(
                    "rendered",
                  )}, ${renderId}, (() => {\n`,
                );
              }

              this.#writeComments(child);
              this.#extractor
                .write("if (")
                .copy(
                  this.#getRangeWithoutTrailingComma(child.args?.value) ||
                    this.#getAttrValue(child, ATTR_UNAMED) ||
                    "undefined",
                )
                .write(") {\n");

              if (child.body) {
                const localBindings = getHoistSources(child);
                this.#writeChildren(child, child.body);

                if (localBindings) {
                  this.#extractor.write("return {\nscope:");
                  this.#writeObjectKeys(localBindings);
                  this.#extractor.write("\n};\n");
                }
              }

              let needsAlternate = true;
              if (alternates) {
                for (const { node, condition } of alternates) {
                  this.#writeComments(node);

                  if (condition) {
                    this.#extractor
                      .write("\n} else if (\n")
                      .copy(condition)
                      .write("\n) {\n");
                  } else if (node.nameText === "else") {
                    needsAlternate = false;
                    this.#extractor.write("\n} else {\n");
                  } else {
                    this.#extractor.write("\n} else if (undefined) {\n");
                  }

                  if (node.body) {
                    const localBindings = getHoistSources(node);
                    this.#writeChildren(node, node.body);

                    if (localBindings) {
                      this.#extractor.write("return {\nscope:");
                      this.#writeObjectKeys(localBindings);
                      this.#extractor.write("\n};\n");
                    }
                  }
                }
              }

              if (needsAlternate && renderId) {
                this.#extractor.write("\n} else {\nreturn undefined;\n}\n");
              } else {
                this.#extractor.write("\n}\n");
              }

              if (renderId) {
                this.#extractor.write("\n})())\n");
              }

              break;
            }
            case "for": {
              const renderId = this.#getRenderId(child);

              if (renderId) {
                this.#extractor.write(
                  `${varShared("assertRendered")}(${varShared(
                    "rendered",
                  )}, ${renderId}, `,
                );
              }

              this.#extractor.write(`${varShared("forTag")}({\n`);
              this.#writeAttrs(child);

              // Adds a comment containing the tag name inside the renderBody key
              // this causes any errors which are just for the renderBody
              // to show on the tag.
              this.#extractor
                .write(`["renderBody"/*`)
                .copy(child.name)
                .write(`*/]: (`);
              this.#writeComments(child);
              this.#extractor.copy(child.typeParams).write("(\n");

              if (child.params) {
                this.#copyWithMutationsReplaced(child.params.value);
              }

              this.#extractor.write("\n) => {\n");

              const body = this.#processBody(child);

              if (body?.renderBody) {
                this.#writeChildren(child, body.renderBody);
              }

              this.#writeReturn(
                undefined,
                body?.renderBody ? getHoistSources(child) : undefined,
              );

              this.#extractor.write("})");

              if (renderId) {
                this.#extractor.write("\n}));\n");
              } else {
                this.#extractor.write("\n});\n");
              }

              break;
            }
            case "while": {
              this.#writeComments(child);
              this.#extractor
                .write("while (\n")
                .copy(
                  this.#getRangeWithoutTrailingComma(child.args?.value) ||
                    "undefined",
                )
                .write("\n) {\n");

              const body = this.#processBody(child);
              if (body?.renderBody) {
                // The while tag is not available in the tags api and
                // so doesn't need to support hoisted vars or assignments.
                this.#writeChildren(child, body.renderBody);
              }

              this.#extractor.write("\n}\n");
              break;
            }

            default:
              this.#writeTag(child);
              break;
          }
          break;
        case NodeType.Placeholder:
          this.#writePlaceholder(child);
          break;
        case NodeType.Scriptlet:
          this.#writeScriptlet(child);
          break;
      }
    }

    const mutatedVars = getMutatedVars(parent);

    if (returnTag || mutatedVars) {
      this.#extractor.write(`const ${varLocal("return")} = {\n`);

      if (returnTag) {
        this.#extractor.write(`return: ${varShared("returnTag")}(`);
        this.#writeTagInputObject(returnTag);
        this.#extractor.write(")");

        if (mutatedVars) {
          this.#extractor.write(",\n");
        }
      }

      if (mutatedVars) {
        this.#extractor.write(`mutate: ${varShared("mutable")}([\n`);
        for (const binding of mutatedVars) {
          this.#extractor.write(
            `${
              // TODO use a different format to avoid const annotation.
              this.#scriptLang === ScriptLang.js ? "/** @type {const} */" : ""
            }[${
              JSON.stringify(binding.name) +
              (binding.sourceName && binding.sourceName !== binding.name
                ? `, ${JSON.stringify(binding.sourceName)}`
                : "")
            }, ${varShared("rendered")}.returns[${this.#getRenderId(
              binding.node as Node.ParentTag,
            )}]${binding.objectPath || ""}]${SEP_COMMA_NEW_LINE}`,
          );
        }
        this.#extractor.write(
          `]${this.#scriptLang === ScriptLang.ts ? " as const" : ""})`,
        );
      }

      this.#extractor.write("\n};\n");

      if (mutatedVars) {
        // Write out a read of all mutated vars to avoid them being seen
        // as unread if there are only writes.
        this.#extractor.write(`${varShared("noop")}({\n`);
        for (const binding of mutatedVars) {
          this.#extractor.write(binding.name + SEP_COMMA_NEW_LINE);
        }
        this.#extractor.write("});\n");
      }
    }

    return returnTag !== undefined;
  }

  #writeTag(tag: Node.Tag) {
    const tagName = tag.nameText;
    const renderId = this.#getRenderId(tag);

    if (renderId) {
      this.#extractor.write(
        `${varShared("assertRendered")}(${varShared(
          "rendered",
        )}, ${renderId}, `,
      );
    }

    if (tagName) {
      const def = this.#lookup.getTag(tagName);

      if (def) {
        const importPath = resolveTagImport(this.#filename, def);
        const renderer = importPath?.endsWith(".marko")
          ? `renderTemplate(import("${importPath}"))`
          : def.html
            ? `renderNativeTag("${def.name}")`
            : "missingTag";
        if (!def.html && REG_TAG_NAME_IDENTIFIER.test(tagName)) {
          this.#extractor
            .write(
              `${varShared("renderPreferLocal")}(
// @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
(${varShared("error")}, `,
            )
            .copy(tag.name)
            .write(`),\n${varShared(renderer)})`);
        } else {
          this.#extractor.write(varShared(renderer));
        }
      } else if (REG_TAG_NAME_IDENTIFIER.test(tagName)) {
        this.#extractor
          .write(`${varShared("renderDynamicTag")}(\n`)
          .copy(tag.name)
          .write("\n)");
      } else {
        this.#extractor.write(`${varShared("missingTag")}`);
      }
    } else {
      this.#extractor.write(`${varShared("renderDynamicTag")}(`);
      this.#writeDynamicTagName(tag);
      this.#extractor.write(")");
    }

    if (tag.typeArgs) {
      this.#extractor.write(`<0>()`).copy(tag.typeArgs).write("()(");
    } else {
      this.#extractor.write("()()(");
    }

    this.#writeTagInputObject(tag);

    if (renderId) {
      this.#extractor.write(`)`);
    }

    this.#extractor.write(");\n");

    if (renderId && tag.var) {
      this.#extractor.write(`const `);
      this.#copyWithMutationsReplaced(tag.var.value);
      this.#extractor.write(
        ` = ${varShared("rendered")}.returns[${renderId}].${ATTR_UNAMED};\n`,
      );
    }
  }

  #writeDynamicTagName(tag: Node.ParentTag) {
    const dynamicTagNameExpression = this.#getDynamicTagExpression(tag);
    if (dynamicTagNameExpression) {
      this.#extractor.copy(dynamicTagNameExpression);
    } else {
      this.#extractor
        .write(`${varShared("interpolated")}\``)
        .copy(tag.name)
        .write("`");
    }
  }

  #writeTagNameComment(tag: Node.ParentTag) {
    this.#extractor
      .write("/*")
      .copy(this.#getDynamicTagExpression(tag) || tag.name)
      .write("*/");
  }

  #writePlaceholder(placeholder: Node.Placeholder) {
    this.#writeComments(placeholder);
    this.#extractor.write("(").copy(placeholder.value).write(");\n");
  }

  #writeScriptlet(scriptlet: Node.Scriptlet) {
    this.#writeComments(scriptlet);
    this.#extractor.copy(scriptlet.value).write(";\n");
  }

  #writeAttrs(tag: Node.ParentTag) {
    let hasAttrs = false;
    if (tag.shorthandId) {
      hasAttrs = true;
      this.#extractor
        .write(`id: ${varShared("interpolated")}\``)
        .copy({
          start: tag.shorthandId.start + 1,
          end: tag.shorthandId.end,
        })
        .write("`" + SEP_COMMA_NEW_LINE);
    }

    if (tag.shorthandClassNames) {
      let sep = SEP_EMPTY;
      hasAttrs = true;
      this.#extractor.write(`class: ${varShared("interpolated")}\``);

      for (const shorthandClassName of tag.shorthandClassNames) {
        this.#extractor.write(sep).copy({
          start: shorthandClassName.start + 1,
          end: shorthandClassName.end,
        });
        sep = SEP_SPACE;
      }

      this.#extractor.write("`" + SEP_COMMA_NEW_LINE);
    }

    let attrWhitespaceStart = Math.max(
      tag.name.end,
      tag.shorthandId?.end ?? -1,
      tag.shorthandClassNames?.[tag.shorthandClassNames.length - 1]?.end ?? -1,
      tag.var?.end ?? -1,
      tag.args?.end ?? -1,
      tag.params?.end ?? -1,
    );

    if (tag.attrs) {
      hasAttrs = true;

      for (const attr of tag.attrs) {
        this.#copyWhitespaceWithin(attrWhitespaceStart, attr.start);
        attrWhitespaceStart = attr.end;

        switch (attr.type) {
          case NodeType.AttrSpread:
            this.#extractor.write(`...(\n`);
            this.#copyWithMutationsReplaced(attr.value);
            this.#extractor.write(`\n)`);
            break;
          case NodeType.AttrNamed: {
            const isDefault = isEmptyRange(attr.name);
            const value = attr.value;
            const modifierIndex =
              !isDefault &&
              (!value || value.type === NodeType.AttrValue) &&
              this.#getNamedAttrModifierIndex(attr);
            // This is printed before the object key so that we can use the
            // position of the default attribute even though there is no actual name in the source.
            const defaultMapPosition = isDefault ? attr.name : undefined;
            let name: string | Range = isDefault ? ATTR_UNAMED : attr.name;

            if (modifierIndex !== false) {
              name = { start: attr.name.start, end: modifierIndex };
            }

            if (value) {
              switch (value.type) {
                case NodeType.AttrMethod:
                  this.#extractor
                    .write('"')
                    .copy(defaultMapPosition) // TODO: see if this is working
                    .copy(name)
                    .write('"')
                    .copy(value.typeParams);
                  this.#copyWithMutationsReplaced(value.params);
                  this.#copyWithMutationsReplaced(value.body);
                  break;
                case NodeType.AttrValue:
                  this.#extractor
                    .write('"')
                    .copy(defaultMapPosition)
                    .copy(name)
                    .write('": (\n');
                  if (value.bound) {
                    const memberExpressionStart =
                      getBoundAttrMemberExpressionStartOffset(value);

                    if (memberExpressionStart === undefined) {
                      // Should have bound to an identifier, so we inline a function to assign to it.
                      const valueLiteral = this.#read(value.value);
                      this.#extractor
                        .copy(value.value)
                        .write(`\n)${SEP_COMMA_NEW_LINE}"`)
                        .copy(defaultMapPosition)
                        .copy(name)
                        .write(
                          `Change"(_${valueLiteral}) {\n${
                            isMutatedVar(tag.parent, valueLiteral)
                              ? `${varLocal("return")}.mutate.`
                              : ""
                          }`,
                        )
                        .copy(value.value)
                        .write(`= _${valueLiteral};\n}`);
                    } else if (this.#code[memberExpressionStart] === "[") {
                      // If we match a `[` was a computed member expression.
                      // we ensure the string "Change" is appended to the end of the expression.
                      const memberObjectRange = {
                        start: value.value.start,
                        end: memberExpressionStart + 1,
                      };
                      const memberPropertyRange = {
                        start: memberObjectRange.end,
                        end: value.value.end - 1,
                      };
                      const memberPropertyCloseRange = {
                        start: memberPropertyRange.end,
                        end: value.value.end,
                      };
                      this.#extractor
                        .copy(memberObjectRange)
                        .copy(memberPropertyRange)
                        .copy(memberPropertyCloseRange)
                        .write(`\n)${SEP_COMMA_NEW_LINE}"`)
                        .copy(defaultMapPosition)
                        .copy(name)
                        .write('Change": (\n')
                        .copy(memberObjectRange)
                        .write("\n`${\n")
                        .copy(memberPropertyRange)
                        .write("\n}Change`\n")
                        .copy(memberPropertyCloseRange)
                        .write("\n)");
                    } else {
                      // If we match here then we bound to a static member expression.
                      this.#extractor
                        .copy(value.value)
                        .write(`\n)${SEP_COMMA_NEW_LINE}"`)
                        .copy(defaultMapPosition)
                        .copy(name)
                        .write('Change"')
                        .write(": ")
                        .copy(value.value)
                        .write(`Change`);
                    }
                  } else {
                    this.#copyWithMutationsReplaced(value.value);
                    this.#extractor.write("\n)");
                  }

                  break;
              }
            } else if (attr.args) {
              this.#extractor.write('"').copy(name).write('": ');

              if (
                typeof name !== "string" &&
                this.#read(name).startsWith("on")
              ) {
                const stringLiteralFirstArgMatch = this.#execAtIndex(
                  REG_ATTR_ARG_LITERAL,
                  attr.args.value.start,
                );

                if (stringLiteralFirstArgMatch) {
                  const hasPartialArgs = stringLiteralFirstArgMatch[3] === ",";
                  const stringLiteralValue = stringLiteralFirstArgMatch[2];
                  const stringLiteralStart = stringLiteralFirstArgMatch.index;
                  const isValidProperty = REG_OBJECT_PROPERTY.test(
                    stringLiteralFirstArgMatch[2],
                  );

                  if (isValidProperty) {
                    const propertNameStart = stringLiteralStart + 1;
                    this.#extractor.write("component.").copy({
                      start: propertNameStart,
                      end: propertNameStart + stringLiteralValue.length,
                    });
                  } else {
                    this.#extractor
                      .write(`component[`)
                      .copy({
                        start: stringLiteralStart,
                        end: stringLiteralStart + stringLiteralValue.length + 2,
                      })
                      .write("]");
                  }

                  if (hasPartialArgs) {
                    this.#extractor
                      .write(`.bind(component, `)
                      .copy({
                        start:
                          stringLiteralStart +
                          stringLiteralFirstArgMatch[0].length,
                        end: attr.args.value.end,
                      })
                      .write(")");
                  }
                } else {
                  this.#extractor
                    .write(`${varShared("bind")}(component, \n`)
                    .copy(attr.args.value)
                    .write("\n)");
                }
              } else {
                this.#extractor.copy(attr.args);
              }
            } else {
              this.#extractor
                .write('"')
                .copy(defaultMapPosition)
                .copy(name)
                .write(`": ${modifierIndex === false ? "true" : '""'}`);
            }
            break;
          }
        }

        this.#extractor.write(SEP_COMMA_NEW_LINE);
      }
    }

    this.#copyWhitespaceWithin(
      attrWhitespaceStart,
      tag.open.end -
        (tag.concise
          ? this.#code[tag.open.end] === ";"
            ? 1
            : 0
          : tag.selfClosed
            ? 2
            : 1),
    );

    return hasAttrs;
  }

  #writeAttrTags(
    { staticAttrTags, dynamicAttrTagParents }: ProcessedBody,
    inMerge: boolean,
  ) {
    let wasMerge = false;

    if (dynamicAttrTagParents) {
      if (staticAttrTags) {
        this.#extractor.write(`...${varShared("mergeAttrTags")}({\n`);
        inMerge = wasMerge = true;
      } else if (dynamicAttrTagParents.length > 1) {
        this.#extractor.write(`...${varShared("mergeAttrTags")}(\n`);
        inMerge = wasMerge = true;
      } else {
        this.#extractor.write(`...`);
      }
    }

    if (staticAttrTags) {
      this.#writeStaticAttrTags(staticAttrTags, inMerge);
      if (dynamicAttrTagParents)
        this.#extractor.write(`}${SEP_COMMA_NEW_LINE}`);
    }

    if (dynamicAttrTagParents) {
      this.#writeDynamicAttrTagParents(dynamicAttrTagParents);
      if (wasMerge) this.#extractor.write(`)${SEP_COMMA_NEW_LINE}`);
    }
  }

  #writeStaticAttrTags(
    staticAttrTags: Exclude<ProcessedBody["staticAttrTags"], undefined>,
    wasMerge: boolean,
  ) {
    if (!wasMerge) this.#extractor.write("...{");
    this.#extractor.write(
      `[${varShared("never")}](){\nconst attrTags = ${varShared(
        "attrTagNames",
      )}(this);\n`,
    );

    for (const nameText in staticAttrTags) {
      for (const tag of staticAttrTags[nameText]) {
        this.#extractor.write(`attrTags["`);
        this.#extractor.copy(tag.name);
        this.#extractor.write('"];\n');
      }
    }

    this.#extractor.write("\n}");
    if (!wasMerge) this.#extractor.write("}");
    this.#extractor.write(SEP_COMMA_NEW_LINE);

    for (const nameText in staticAttrTags) {
      const attrTag = staticAttrTags[nameText];
      const attrTagDef = this.#lookup.getTag(nameText);
      const isRepeated = attrTag.length > 1;
      const [firstAttrTag] = attrTag;
      const name =
        attrTagDef?.targetProperty ||
        nameText.slice(nameText.lastIndexOf(":") + 1);

      this.#extractor.write(`["${name}"`);
      this.#writeTagNameComment(firstAttrTag);
      this.#extractor.write("]: ");

      if (isRepeated) {
        this.#extractor.write(`${varShared("repeatedAttrTag")}(\n`);
      }

      for (const childNode of attrTag) {
        this.#writeTagInputObject(childNode);
        this.#extractor.write(SEP_COMMA_NEW_LINE);
      }

      if (isRepeated) {
        this.#extractor.write(`)${SEP_COMMA_NEW_LINE}`);
      }
    }
  }

  #writeDynamicAttrTagParents(
    dynamicAttrTagParents: Exclude<
      ProcessedBody["dynamicAttrTagParents"],
      undefined
    >,
  ) {
    for (const tag of dynamicAttrTagParents) {
      switch (tag.nameText) {
        case "if": {
          // @ts-expect-error we know we are in an If Tag
          declare const tag: IfTag;
          const alternates = IF_TAG_ALTERNATES.get(tag);
          this.#writeComments(tag);
          this.#extractor
            .write("((\n")
            .copy(
              this.#getRangeWithoutTrailingComma(tag.args?.value) ||
                this.#getAttrValue(tag, ATTR_UNAMED) ||
                "undefined",
            )
            .write("\n) ? ");

          this.#writeDynamicAttrTagBody(tag);

          let needsAlternate = true;
          if (alternates) {
            for (const { node, condition } of alternates) {
              this.#writeComments(node);
              if (condition) {
                this.#extractor.write(": (\n").copy(condition).write("\n) ? ");
              } else if (node.nameText === "else") {
                needsAlternate = false;
                this.#extractor.write(": ");
              } else {
                this.#extractor.write(": undefined ? ");
              }

              this.#writeDynamicAttrTagBody(node);
            }
          }

          if (needsAlternate) {
            this.#extractor.write(" : {}");
          }

          this.#extractor.write(")");
          break;
        }
        case "for": {
          this.#extractor.write(`${varShared("forAttrTag")}({\n`);
          if (!this.#writeAttrs(tag)) this.#writeTagNameComment(tag);
          this.#extractor.write("}, \n");
          this.#writeComments(tag);
          this.#extractor
            .copy(tag.typeParams)
            .write("(\n")
            .copy(tag.params?.value)
            .write("\n) => (");
          this.#writeDynamicAttrTagBody(tag);
          this.#extractor.write("))");
          break;
        }
        case "while": {
          this.#writeComments(tag);
          this.#extractor
            .write("((\n")
            .copy(
              this.#getRangeWithoutTrailingComma(tag.args?.value) ||
                "undefined",
            )
            .write("\n) ? ");
          this.#writeDynamicAttrTagBody(tag);
          this.#extractor.write(" : {})");
          break;
        }
      }

      this.#extractor.write(SEP_COMMA_NEW_LINE);
    }
  }

  #writeTagInputObject(tag: Node.ParentTag) {
    if (!tag.params) this.#writeComments(tag);

    const body = this.#processBody(tag);
    let writeInputObj = true;
    let hasInput = false;

    if (tag.args) {
      hasInput = true;
      this.#extractor.copy(tag.args.value);

      if (body || tag.attrs || tag.shorthandId || tag.shorthandClassNames) {
        this.#extractor.write(",\n{\n");
      } else {
        writeInputObj = false;
      }
    } else {
      this.#extractor.write("{\n");
    }

    if (this.#writeAttrs(tag)) {
      hasInput = true;
    }

    let hasRenderBody = false;
    if (body) {
      hasInput = true;
      this.#writeAttrTags(body, false);
      hasRenderBody = body.renderBody !== undefined;
    } else if (tag.close) {
      hasRenderBody = true;
    }

    if (tag.params || hasRenderBody) {
      // Adds a comment containing the tag name inside the renderBody key
      // this causes any errors which are just for the renderBody
      // to show on the tag.
      this.#extractor.write('["renderBody"');
      this.#writeTagNameComment(tag);
      this.#extractor.write("]: ");

      if (tag.params) {
        this.#extractor.write("(");
        this.#writeComments(tag);
        this.#extractor.copy(tag.typeParams).write("(\n");
        this.#copyWithMutationsReplaced(tag.params.value);
        this.#extractor.write("\n) => {\n");
      } else {
        this.#extractor.write(`(() => {\n`);
      }

      const localBindings = getHoistSources(tag);
      const didReturn =
        body?.renderBody && this.#writeChildren(tag, body.renderBody);

      if (!tag.params) {
        this.#extractor.write(`return () => {\n`);
      }

      this.#writeReturn(
        didReturn ? `${varLocal("return")}.return` : undefined,
        localBindings,
      );

      if (tag.params) {
        this.#extractor.write("})");
      } else {
        this.#extractor.write("}\n})()");
      }

      this.#extractor.write(SEP_COMMA_NEW_LINE);
    }

    if (tag.type === NodeType.AttrTag) {
      this.#extractor
        .write("[/*")
        .copy(tag.name)
        .write(`*/Symbol.iterator]: ${varShared("any")}${SEP_COMMA_NEW_LINE}`);
    }

    if (!hasInput) {
      this.#writeTagNameComment(tag);
    }

    if (writeInputObj) {
      this.#extractor.write("\n}");
    }
  }

  #writeObjectKeys(keys: Iterable<string>) {
    this.#extractor.write("{");

    for (const key of keys) {
      this.#extractor.write(key + SEP_COMMA_SPACE);
    }

    this.#extractor.write("}");
  }

  #getCastedType(type: string) {
    return this.#scriptLang === ScriptLang.ts
      ? `${varShared("any")} as ${type}`
      : `/** @type {${type}} */(${varShared("any")})`;
  }

  #copyWithMutationsReplaced(range: Range) {
    const mutations = this.#mutationOffsets;
    if (!mutations) return this.#extractor.copy(range);

    const len = mutations.length;
    let curOffset = range.start;
    let minIndex = 0;

    do {
      let maxIndex = len;

      // Look for the next assignment that is greater than the current offset
      // using a binary search.
      while (minIndex < maxIndex) {
        const midIndex = (minIndex + maxIndex) >>> 1;

        if (mutations[midIndex] >= curOffset) {
          maxIndex = midIndex;
        } else {
          minIndex = midIndex + 1;
        }
      }

      const nextOffset = maxIndex === len ? range.end : mutations[maxIndex];

      if (nextOffset >= range.end) {
        // We didn't find any more mutations.
        this.#extractor.copy({
          start: curOffset,
          end: range.end,
        });
        return;
      }

      // Copy the content before the mutation.
      this.#extractor.copy({ start: curOffset, end: nextOffset });
      // splice in mutation prefix.
      this.#extractor.write(`${varLocal("return")}.mutate.`);

      curOffset = nextOffset;
      minIndex = maxIndex + 1;
      // eslint-disable-next-line no-constant-condition
    } while (true);
  }

  #copyWhitespaceWithin(start: number, end: number) {
    const code = this.#code;
    const max = Math.min(end, code.length);
    let lastPos = start;
    let pos = start;

    while (pos < max) {
      if (!isWhitespaceCode(code.charCodeAt(pos))) {
        lastPos = pos + 1;
        if (pos > lastPos) {
          this.#extractor.copy({ start: lastPos, end: pos });
        }
        return;
      }

      pos++;
    }

    if (pos > lastPos) {
      this.#extractor.copy({ start: lastPos, end: pos });
    }
  }

  #processBody(parent: Node.ParentNode): ProcessedBody | undefined {
    const { body } = parent;

    if (!body) return;

    const last = body.length - 1;
    let renderBody: ProcessedBody["renderBody"];
    let staticAttrTags: ProcessedBody["staticAttrTags"];
    let dynamicAttrTagParents: ProcessedBody["dynamicAttrTagParents"];
    let i = 0;

    while (i <= last) {
      const child = body[i++];

      switch (child.type) {
        case NodeType.AttrTag: {
          const attrName = child.nameText;
          if (staticAttrTags) {
            const attr = staticAttrTags[attrName];
            if (attr) {
              attr.push(child);
            } else {
              staticAttrTags[attrName] = [child];
            }
          } else {
            staticAttrTags = { [attrName]: [child] };
          }

          break;
        }
        case NodeType.Tag: {
          let hasDynamicAttrTags = false;

          switch (child.nameText) {
            case "for":
            case "while":
              hasDynamicAttrTags ||= child.hasAttrTags;
              break;
            case "if": {
              // If tags are special, here we group them with their related else-if and else tags.
              let alternates: IfTagAlternates;
              hasDynamicAttrTags ||= child.hasAttrTags;

              loop: while (i <= last) {
                const nextChild = body[i++];
                switch (nextChild.type) {
                  case NodeType.Text:
                    // Ignore empty text nodes.
                    if (this.#isEmptyText(nextChild)) {
                      continue loop;
                    } else {
                      break;
                    }
                  case NodeType.Tag:
                    switch (nextChild.nameText) {
                      case "else-if": {
                        const alternate: IfTagAlternate = {
                          condition:
                            this.#getRangeWithoutTrailingComma(
                              nextChild.args?.value,
                            ) || this.#getAttrValue(nextChild, ATTR_UNAMED),
                          node: nextChild as IfTagAlternate["node"],
                        };

                        hasDynamicAttrTags ||= nextChild.hasAttrTags;

                        if (alternates) {
                          alternates.push(alternate);
                        } else {
                          alternates = [alternate];
                        }

                        continue loop;
                      }
                      case "else": {
                        const alternate: IfTagAlternate = {
                          condition: this.#getAttrValue(nextChild, "if"),
                          node: nextChild as IfTagAlternate["node"],
                        };

                        hasDynamicAttrTags ||= nextChild.hasAttrTags;

                        if (alternates) {
                          alternates.push(alternate);
                        } else {
                          alternates = [alternate];
                        }

                        if (alternate.condition) {
                          continue loop;
                        } else {
                          break loop;
                        }
                      }
                    }

                    break;
                }

                i--;
                break;
              }

              IF_TAG_ALTERNATES.set(child as IfTag, alternates);
            }
          }

          if (hasDynamicAttrTags) {
            // @ts-expect-error we know we matched a control flow tag above.
            declare const child: Node.ControlFlowTag;
            if (dynamicAttrTagParents) {
              dynamicAttrTagParents.push(child);
            } else {
              dynamicAttrTagParents = [child];
            }
          } else if (renderBody) {
            renderBody.push(child);
          } else {
            renderBody = [child];
          }

          break;
        }
        case NodeType.Text: {
          // Only include text nodes if they have content.
          if (!this.#isEmptyText(child)) {
            if (renderBody) {
              renderBody.push(child);
            } else {
              renderBody = [child];
            }
          }

          break;
        }

        default:
          if (renderBody) {
            renderBody.push(child);
          } else {
            renderBody = [child];
          }
          break;
      }
    }

    if (renderBody || staticAttrTags || dynamicAttrTagParents) {
      return { renderBody, staticAttrTags, dynamicAttrTagParents };
    }
  }

  #writeDynamicAttrTagBody(tag: Node.ControlFlowTag) {
    const body = this.#processBody(tag);
    if (body) {
      if (body.renderBody) {
        this.#extractor.write("(() => {\n");
        this.#writeChildren(tag, body.renderBody);
        this.#extractor.write("return ");
      }
      this.#extractor.write("{\n");
      this.#writeAttrTags(body, true);
      this.#extractor.write("}");

      if (body.renderBody) {
        this.#extractor.write(";\n})()");
      }
    } else {
      this.#extractor.write("{}");
    }
  }

  #getAttrValue(tag: Node.ParentTag, name: string) {
    if (tag.attrs) {
      for (const attr of tag.attrs) {
        if (
          isValueAttribute(attr) &&
          (this.#read(attr.name) || ATTR_UNAMED) === name
        ) {
          return attr.value.value;
        }
      }
    }
  }

  #getRangeWithoutTrailingComma(range: Range | undefined) {
    if (!range) return undefined;

    const { start } = range;
    let end = range.end - 1;

    while (end >= start) {
      if (isWhitespaceCode(this.#code.charCodeAt(end))) {
        // Skip to the last non whitespace character.
        end--;
      } else if (this.#code.charAt(end) === ",") {
        // If we find a comma then we can return the range without the trailing comma.
        return { start, end };
      } else {
        break;
      }
    }

    return range;
  }

  #isEmptyText(text: Node.Text) {
    let pos = text.start;

    while (pos < text.end) {
      if (!isWhitespaceCode(this.#code.charCodeAt(pos))) {
        return false;
      }

      pos++;
    }

    return true;
  }

  #getInputType(program: Node.Program) {
    return this.#scriptLang === ScriptLang.ts
      ? this.#getTSInputType(program)
      : this.#ts && this.#getJSDocInputType(program);
  }

  #getTSInputType(program: Node.Program) {
    for (const node of program.static) {
      if (node.type === NodeType.Export) {
        const start = node.start + "export ".length;
        if (this.#testAtIndex(REG_INPUT_TYPE, start)) {
          const [inputType] = this.#scriptParser.statementAt<
            t.TSInterfaceDeclaration | t.TSTypeAliasDeclaration
          >(start, this.#read({ start, end: node.end }));

          return {
            typeParameters: inputType?.typeParameters?.params.map((param) => {
              return {
                name: param.name,
                constraint: param.constraint
                  ? this.#read(param.constraint as Range)
                  : undefined,
                default: param.default
                  ? this.#read(param.default as Range)
                  : undefined,
              };
            }),
          };
        }
      }
    }
  }

  #getJSDocInputType(program: Node.Program) {
    return (
      this.#getJSDocInputTypeFromNodes(program.static) ||
      this.#getJSDocInputTypeFromNodes(program.body) ||
      this.#getJSDocInputTypeFromNode(program)
    );
  }

  #getJSDocInputTypeFromNodes(nodes: Node.AnyNode[]) {
    for (const node of nodes) {
      const code = this.#read(node);
      code;
      const info = this.#getJSDocInputTypeFromNode(node);
      if (info) return info;
    }
  }

  #getJSDocInputTypeFromNode(node: Node.AnyNode) {
    const comments = (node as Node.Commentable).comments;
    if (comments) {
      for (const comment of comments) {
        if (this.#code.charAt(comment.start + 1) === "*") {
          const type = getJSDocInputType(this.#read(comment), this.#ts!);
          if (type) {
            WROTE_COMMENT.add(comment);
            this.#extractor.write("/*").copy(comment.value).write("*/");
            return type;
          }
        }
      }
    }
  }

  #getDynamicTagExpression(tag: Node.ParentTag) {
    if (
      tag.name.expressions.length === 1 &&
      isEmptyRange(tag.name.quasis[0]) &&
      isEmptyRange(tag.name.quasis[1])
    ) {
      return tag.name.expressions[0].value;
    }
  }

  #getRenderId(tag: Node.ParentTag) {
    let renderId = this.#renderIds.get(tag);
    if ((renderId === undefined && tag.var) || hasHoists(tag)) {
      renderId = this.#renderId++;
      this.#renderIds.set(tag, renderId);
    }

    return renderId;
  }

  #getNamedAttrModifierIndex(attr: Node.AttrNamed) {
    const start = attr.name.start + 1;
    const end = attr.name.end - 1;
    for (let i = end; i-- > start; ) {
      if (this.#code.charAt(i) === ":") return i;
    }

    return false;
  }

  #testAtIndex(reg: RegExp, index: number) {
    reg.lastIndex = index;
    return reg.test(this.#code);
  }

  #execAtIndex(reg: RegExp, index: number) {
    reg.lastIndex = index;
    return reg.exec(this.#code);
  }
}

function varLocal(name: string) {
  return VAR_LOCAL_PREFIX + name;
}

function varShared(name: string) {
  return VAR_SHARED_PREFIX + name;
}

function getReturnTag(parent: Node.ParentNode) {
  if (parent.body) {
    for (const child of parent.body) {
      if (child.type === NodeType.Tag && child.nameText === "return") {
        return child;
      }
    }
  }
}

function isValueAttribute(
  attr: Node.AttrNode,
): attr is Node.AttrNamed & { value: Node.AttrValue } {
  return (
    attr.type === NodeType.AttrNamed && attr.value?.type === NodeType.AttrValue
  );
}

function resolveTagImport(from: string, def: TagDefinition | undefined) {
  const filename = resolveTagFile(def);
  if (filename) {
    return from ? relativeImportPath(from, filename) : filename;
  }
}

function resolveTagFile(def: TagDefinition | undefined): string | undefined {
  return def && (def.types || def.template || def.renderer);
}

function isWhitespaceCode(code: number) {
  // For all practical purposes, the space character (32) and all the
  // control characters below it are whitespace.
  // This is also what the htmljs-parser considers a whitespace.
  return code <= 32;
}

function stripExt(filename: string) {
  return filename.replace(REG_EXT, "");
}

function removeNewLines(str: string) {
  return str.replace(REG_NEW_LINE, " ");
}

function isEmptyRange(range: Range) {
  return range.start === range.end;
}
