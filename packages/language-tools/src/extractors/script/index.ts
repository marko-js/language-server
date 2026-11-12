import type { types as t } from "@marko/compiler";
import type { TagDefinition, TaglibLookup } from "@marko/compiler/babel-utils";
import path from "path";
import { relativeImportPath } from "relative-import-path";
import type TS from "typescript/lib/tsserverlibrary";

import {
  isControlFlowTag,
  type Node,
  NodeType,
  type Parsed,
  type Range,
  type Repeatable,
  type Repeated,
} from "../../parser";
import { Extractor } from "../../util/extractor";
import { findStyleSelectors } from "../../util/find-style-selectors";
import { normalizePath } from "../../util/normalize-path";
import type { Meta } from "../../util/project";
import { writeStyleModuleType } from "../css-module";
import {
  crawlProgramScope,
  getBoundAttrRange,
  getHoistSources,
  getMutatedVars,
  getProgramBindings,
  hasHoists,
  isMutatedVar,
  type Mutation,
} from "./util/attach-scopes";
import { getComponentFilename } from "./util/get-component-filename";
import { getComponentName } from "./util/get-component-name";
import { getRuntimeAPI, RuntimeAPI } from "./util/get-runtime-api";
import { isTextOnlyScript } from "./util/is-text-only-script";
import getJSDocInputType from "./util/jsdoc-input-type";
import { getRuntimeOverrides } from "./util/runtime-overrides";
import { ScriptParser } from "./util/script-parser";

const SEP_EMPTY = "";
const SEP_SPACE = " ";
const SEP_COMMA_SPACE = ", ";
const SEP_COMMA_NEW_LINE = ",\n";
const VAR_LOCAL_PREFIX = "__marko_internal_";
/**
 * The `const` holding the resolved runtime api and the name it is exported as.
 * Consumers of the extracted output (eg the `.d.marko` printer) need to
 * recognize these to strip the internal export back out.
 */
export const INTERNAL_API_VAR = `${VAR_LOCAL_PREFIX}api`;
export const INTERNAL_API_EXPORT_NAME = "~api";
const VAR_SHARED_PREFIX = `Marko._.`;
const ATTR_UNNAMED = "value";
const REG_EXT = /(?<=[/\\][^/\\]+)\.[^.]+$/;
const REG_BLOCK = /\s*{/y;
const REG_NEW_LINE = /^|(\r?\n)/g;
const REG_ATTR_ARG_LITERAL = /(["'])((?:\\.|(?!\1)[^\\])*)\1\s*([,)])/y;
const REG_TAG_IMPORT = /(?<=(['"]))<([^'">]+)>(?=\1)/;
const REG_INPUT_TYPE = /\s*(interface|type)\s+Input\b/y;
const REG_OBJECT_PROPERTY = /^[_$a-z][_$a-z0-9]*$/i;
// Match https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-path- and https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check
const REG_COMMENT_PRAGMA = /\/\/(?:\s*@ts-|\/\s*<)/y;
const REG_TAG_NAME_IDENTIFIER = /^[A-Z][a-zA-Z0-9_$]+$/;
const REG_NODE_MODULES = /[\\/]node_modules[\\/]/;
const IF_TAG_ALTERNATES = new WeakMap<IfTag, IfTagAlternates>();
const TAG_ID = new WeakMap<Node.Tag, number>();
const RENDER_VAR = new WeakMap<Node.Tag, string>();
const TEMPLATE_VAR = new WeakMap<Node.Tag, string>();
const WROTE_COMMENT = new WeakSet<Node.Comment>();
const START_OF_FILE: Range = { start: 0, end: 0 };

type ProcessedBody = {
  content: Repeatable<Node.ChildNode>;
  /**
   * The static attribute tags by repetition: the first of each name, then
   * the second of each repeated one, and so on.
   */
  staticAttrTags: undefined | Repeated<Repeated<Node.AttrTag>>;
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
type AttrTagTree = {
  [x: string]: {
    tags: Node.AttrTag[];
    nested?: AttrTagTree;
  };
};

// TODO: Dedupe taglib completions with TS completions. (typescript project ignore taglib completions)
// TODO: special types for macro and tag tags.

// Later todos:
// TODO: completions within attr whitespace should not include quotes.
// TODO: handle top level attribute tags.
// TODO: css modules
// TODO: support #style directive with custom extension, eg `#style.less=""`.

// SUPER LATER TODOS:
// Have it self close tags by default if we detect it's input does not have a content.

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
  translator: Meta["config"]["translator"];
}
export function extractScript(opts: ExtractScriptOptions) {
  return new ScriptExtractor(opts).end();
}

class ScriptExtractor {
  #code: string;
  #filename: string;
  #api: RuntimeAPI;
  #interop: boolean;
  #parsed: Parsed;
  #extractor: Extractor;
  #ast: ScriptParser;
  #read: Parsed["read"];
  #lookup: TaglibLookup;
  #scriptLang: ScriptLang;
  #ts: ExtractScriptOptions["ts"];
  #runtimeTypes: ExtractScriptOptions["runtimeTypesCode"];
  #mutations: Repeatable<Mutation>;
  /** Whether the template declares its `Input` itself. */
  #declaresInput = false;
  #tagId = 1;
  #attrTagTrees = new WeakMap<Node.Tag, AttrTagTree | undefined>();
  #closeBrackets: number[] = [0];
  constructor(opts: ExtractScriptOptions) {
    const { parsed, lookup, scriptLang } = opts;
    const { api, interop } = getRuntimeAPI(
      opts.translator,
      opts.lookup,
      parsed,
    );
    this.#code = parsed.code;
    this.#filename = parsed.filename;
    this.#api = api;
    this.#interop = interop;
    this.#scriptLang = scriptLang;
    this.#parsed = parsed;
    this.#lookup = lookup;
    this.#ts = opts.ts;
    this.#runtimeTypes = opts.runtimeTypesCode;
    this.#extractor = new Extractor(parsed);
    this.#ast = new ScriptParser(parsed);
    this.#read = parsed.read.bind(parsed);
    this.#mutations = crawlProgramScope(this.#parsed, this.#ast);
    this.#writeProgram(parsed.program);
  }

  end() {
    return this.#extractor.end();
  }

  #writeProgram(program: Node.Program) {
    this.#writeCommentPragmas(program);

    const componentFileName =
      this.#api === RuntimeAPI.class
        ? getComponentFilename(this.#filename)
        : undefined;
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
              const fromEnd = fromStart + length;
              this.#extractor
                .copy({
                  start: node.start,
                  end: fromStart,
                })
                .write(templatePath)
                .copy({
                  start: fromEnd,
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
    let anyTypeArgsStr = "";
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
          anyTypeArgsStr += sep + "any";
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
          `/** @typedef {Record<string, unknown>} Input */\n`,
        );
      }
    }

    if (this.#api === RuntimeAPI.class) {
      if (isExternalComponentFile) {
        const componentImport = `"${stripExt(relativeImportPath(this.#filename, componentFileName))}"`;
        if (this.#scriptLang === ScriptLang.ts) {
          if (typeArgsStr) {
            this.#extractor.write(
              `import type Component from ${componentImport};\nexport type { Component };\n`,
            );
          } else {
            this.#extractor.write(
              `export interface Component extends ${varShared("ResolveComponent")}<typeof import(${componentImport})> {}\n`,
            );
          }
        } else {
          if (typeArgsStr) {
            this.#extractor.write(
              `/** @import Component from ${componentImport} */\n`,
            );
          } else {
            this.#extractor.write(
              `/** @typedef {${varShared("ResolveComponent")}<typeof import(${componentImport})>} Component */\n`,
            );
          }
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
  const input = ${this.#getCastedType(`Input${typeArgsStr}`)};${
    this.#api === RuntimeAPI.class
      ? `
  const component = ${this.#getCastedType(`Component${typeArgsStr}`)};
  const state = ${varShared("state")}(component);
  const out = ${this.#getCastedType("Marko.Out")};`
      : ""
  }
  const $signal = ${this.#getCastedType("AbortSignal")};
  const $global = ${varShared("getGlobal")}(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (${varShared("error")}, ${this.#getCastedType("MarkoRun.Context")})
  );\n`);

    const body = this.#processBody(program); // TODO: handle top level attribute tags.
    const bindings = getProgramBindings(program);

    if (bindings) {
      for (const binding of bindings.all) {
        this.#extractor
          .write("const ")
          .copy(binding.sources)
          .write(
            ` = ${varShared("hoist")}(() => ${varLocal(`hoist__${binding.name}`)});\n`,
          );
      }
    }

    if (body?.content) {
      this.#writeChildren(body.content);

      if (bindings) {
        if (bindings.vars) {
          for (const binding of bindings.vars) {
            this.#extractor
              .write(`var ${varLocal(`hoist__${binding.name}`)} = `)
              .copy(binding.sources[0])
              .write(";\n");
          }
        }

        if (bindings.hoists) {
          this.#extractor.write(
            `var {${bindings.hoists
              .map(
                (binding) =>
                  `${binding.name}: ${varLocal(`hoist__${binding.name}`)}`,
              )
              .join(
                SEP_COMMA_SPACE,
              )}} = ${varShared("hoisted")}(${this.#getBodyHoistScopeExpression(program.body)!});\n`,
          );
        }
      }

      this.#endChildren();
    }

    this.#extractor.write(
      `${varShared("noop")}({ ${
        bindings
          ? bindings.all.map((binding) => binding.name).join(SEP_COMMA_SPACE) +
            SEP_COMMA_SPACE
          : ""
      }${this.#api === RuntimeAPI.class ? "component, state, out, " : ""}input, $global, $signal });\n`,
    );

    if (didReturn) {
      this.#extractor.write(`return ${varLocal("return")};\n}\n`);
    } else {
      this.#extractor.write("return;\n})();\n");
    }

    const templateBaseClass = varShared("Template");
    const internalApply = varLocal("apply");
    const returnTypeStr = didReturn
      ? `typeof ${
          templateName + typeArgsStr
        } extends () => infer Return ? Return : never`
      : "void";
    const internalInput = varLocal("input");
    const typeParams = typeParamsStr.slice(1, -1);
    const apiVar = INTERNAL_API_VAR;
    // A template's renderer (its `_`), in the form its first call takes (see
    // `Marko._.Renderer`). A tag without rest attribute tags renders by the
    // signature written here, which is cheaper to check than a named one (its
    // type parameters can have short names, as the template has none).
    const renderer = typeParamsStr
      ? `<${internalApply} = 1>(m?: ${internalApply}): ${internalApply} extends 0 | 2
    ? ${typeParamsStr}() => ${varShared("Renderer")}<Input${typeArgsStr}, ${returnTypeStr}, ${internalApply}>
    : ${internalApply} extends 1
    ? () => <${internalInput}, ${typeParams}>(input: Marko.Directives & Input${typeArgsStr} & ${varShared("Relate")}<${internalInput}, Marko.Directives & Input${typeArgsStr}>) => ${varShared("ReturnWithScope")}<${internalInput}, ${returnTypeStr}>
    : () => <${internalInput}, ${typeParams}>(input: ${varShared("TagInput")}<${internalInput}, Input${typeArgsStr}>) => ${varShared("ReturnWithRestAttrTagsScope")}<${internalInput}, ${returnTypeStr}>;`
      : `<A = 1>(m?: A): () => A extends 3
    ? ${varShared("RestAttrTagsRenderer")}<Input, ${returnTypeStr}>
    : <I>(input: Marko.Directives & Input & ${varShared("Relate")}<I, Marko.Directives & Input>) => ${varShared("ReturnWithScope")}<I, ${returnTypeStr}>;`;
    const templateOverrideClass = `${templateBaseClass}<{${
      this.#runtimeTypes
        ? getRuntimeOverrides(
            this.#api,
            this.#runtimeTypes,
            typeParamsStr,
            typeArgsStr,
            returnTypeStr,
          )
        : ""
    }
  ${this.#interop ? `api: typeof ${apiVar},` : ""}
  _${renderer}${
    anyTypeArgsStr
      ? `\n  [${varShared("anyInput")}]: Input<${anyTypeArgsStr}>;`
      : ""
  }
}>`;

    if (this.#interop) {
      // Expose the resolved runtime api as a standalone export so tooling can
      // read it via `import { "~api" as API } from "./template.marko"` without
      // pulling in `Input` (and the circular dependencies it can cause) the way
      // reading the default export's `api` property would. The default export's
      // `api` property is derived from this same `const` (via `typeof`) so the
      // literal is only written in one place. A plain `const` (rather than a
      // type-only `declare`) is used so the same output is valid for both the
      // `.ts` and `.js` extractions; it still surfaces the api as a
      // `"tags"`/`"class"` string literal.
      this.#extractor.write(
        `const ${apiVar} = "${this.#api}";\nexport { ${apiVar} as "${INTERNAL_API_EXPORT_NAME}" };\n`,
      );
    }

    // Naming the default export's binding lets TypeScript offer a clean
    // `import MyButton` for auto-imports instead of the file-derived
    // `MyButtonMarko`. Only auto-discoverable tags get a name, and only when it
    // is not already referenced in the source — a cheap conservative check that
    // keeps the anonymous default export rather than risk a redeclaration.
    // A template declaring its `Input` names its template `Input` too: one
    // symbol, which the comment above `Input` documents wherever the
    // template is used (eg by a tag's name, which reads its `default`).
    const componentName = getComponentName(this.#filename);
    const exportName = this.#declaresInput
      ? "Input"
      : componentName && !this.#code.includes(componentName)
        ? componentName
        : undefined;

    this.#extractor
      .write(exportName ? `const ${exportName} = new ` : `export default new `)
      .anchor(START_OF_FILE);
    if (this.#scriptLang === ScriptLang.ts) {
      this.#extractor.write(`(
  class Template extends ${templateOverrideClass} {}
);\n`);
    } else {
      this.#extractor.write(`(
  /**
   * @extends {${removeNewLines(templateOverrideClass)}}
   */
  class Template extends ${templateBaseClass} {}
);\n`);
    }
    if (exportName) {
      this.#extractor.write(`export default ${exportName};\n`);
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
          } else if (this.#code.charAt(comment.start + 1) === "!") {
            this.#extractor.write("/*");
            let startIndex = comment.value.start;
            // handle closing JS comments _within_ the HTML comment
            for (const { index } of this.#read(comment.value).matchAll(
              /\*\//g,
            )) {
              this.#extractor
                .copy({
                  start: startIndex,
                  end: (startIndex = comment.value.start + index + 1),
                })
                .write("\\");
            }
            this.#extractor.copy({ start: startIndex, end: comment.value.end });
            this.#extractor.write("*/");
          } else {
            this.#extractor.write("/*").copy(comment.value).write("*/");
          }
        }
      }
    }
  }

  #writeReturn(
    returned: Range | string | undefined,
    body: Node.ParentNode["body"],
  ) {
    const hasScope = this.#hasScopeExpression(body);
    if (!returned && !hasScope) {
      this.#extractor.write(`return ${varShared("voidReturn")};\n`);
      return;
    }

    if (this.#scriptLang === ScriptLang.ts) {
      this.#extractor.write(`return new (class MarkoReturn<Return = void> {\n`);

      if (hasScope) {
        this.#extractor.write(`readonly [${varShared("scope")}] = `);
        this.#writeScopeExpression(body);
        this.#extractor.write(";\n");
      }

      this.#extractor.write(`declare return: Return;
constructor(_?: Return) {}
})(\n`);
    } else {
      this.#extractor.write(`return new (/**
* @template [Return=void]
*/
class MarkoReturn {\n`);

      if (hasScope) {
        this.#extractor.write(`[${varShared("scope")}] = `);
        this.#writeScopeExpression(body);
        this.#extractor.write(";\n");
      }

      this.#extractor.write(`/** @type {Return} */
return;
/** @param {Return} [_] */
constructor(_) {}
})(\n`);
    }

    this.#extractor.copy(returned);
    this.#extractor.write(");\n");
  }

  #writeChildren(children: Node.ChildNode[], skipRenderId = false) {
    const last = children.length - 1;
    let returnTag: Node.Tag | undefined;
    let i = 0;
    this.#closeBrackets.push(0);

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
              let didHoist = false;

              if (!skipRenderId) {
                didHoist = hasHoists(child);
                if (!didHoist && alternates) {
                  for (const { node } of alternates) {
                    if ((didHoist = hasHoists(node))) {
                      break;
                    }
                  }
                }

                if (didHoist) {
                  this.#extractor.write(
                    `const ${this.#getRenderVar(child, true)} = (() => {\n`,
                  );
                }
              }

              this.#writeComments(child);
              this.#extractor
                .write("if (")
                .copy(
                  this.#getRangeWithoutTrailingComma(child.args?.value) ||
                    this.#getAttrValue(child, ATTR_UNNAMED) ||
                    "undefined",
                )
                // On its own line: the condition can end in a line comment.
                .write("\n) {\n");

              const ifBody = this.#processBody(child);
              if (ifBody?.content) {
                this.#writeChildren(ifBody.content, true);

                if (this.#hasScopeExpression(child.body)) {
                  this.#extractor.write("return {\nscope: ");
                  this.#writeScopeExpression(child.body);
                  this.#extractor.write("\n};\n");
                }

                this.#endChildren();
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

                  const alternateBody = this.#processBody(node);
                  if (alternateBody?.content) {
                    this.#writeChildren(alternateBody.content, true);

                    if (this.#hasScopeExpression(node.body)) {
                      this.#extractor.write("return {\nscope: ");
                      this.#writeScopeExpression(node.body);
                      this.#extractor.write("\n};\n");
                    }

                    this.#endChildren();
                  }
                }
              }

              if (needsAlternate && didHoist) {
                this.#extractor.write("\n} else {\nreturn undefined;\n}\n");
              } else {
                this.#extractor.write("\n}\n");
              }

              if (didHoist) {
                this.#extractor.write("\n})();\n");
              }

              break;
            }
            case "for": {
              if (hasHoists(child)) {
                this.#extractor.write(
                  `const ${this.#getRenderVar(child, true)} = `,
                );
              }

              this.#extractor
                .write(
                  `${varShared(getForTagRuntime(this.#parsed, child))}({\n`,
                )
                .anchor(child.name);
              this.#writeAttrs(child);
              this.#extractor
                .write("\n}" + SEP_COMMA_NEW_LINE)
                .copy(child.typeParams)
                .write("(\n");
              this.#writeComments(child);

              if (child.params) {
                this.#copyWithMutationsReplaced(child.params.value);
              }

              this.#extractor.write("\n) => {\n");

              const body = this.#processBody(child);

              if (body?.content) {
                this.#writeChildren(body.content);
              }

              this.#writeReturn(undefined, body?.content && child.body);

              if (body?.content) {
                this.#endChildren();
              }

              this.#extractor.write("\n});\n");

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
              if (body?.content) {
                // The while tag is not available in the tags api and
                // so doesn't need to support hoisted vars or assignments.
                this.#writeChildren(body.content);
                this.#endChildren();
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

    if (returnTag) {
      this.#extractor.write(
        `var ${varLocal("return")} = ${varShared("returnTag")}(`,
      );
      this.#writeTagInputObject(returnTag, this.#processBody(returnTag));
      this.#extractor.write(");\n");
    }

    return returnTag !== undefined;
  }

  #writeTag(tag: Node.Tag) {
    const tagName = tag.nameText;
    const def = tagName ? this.#lookup.getTag(tagName) : undefined;
    const importPath = resolveTagImport(this.#filename, def);
    const isHTML = !importPath && def?.html;
    const needsHoist = hasHoists(tag);
    const mutatedVars = tag.var && !isHTML && getMutatedVars(tag);
    let isTemplate = false;
    let renderVar: undefined | string;
    let templateVar: undefined | string;

    if (!def || importPath) {
      const isIdentifier = tagName && REG_TAG_NAME_IDENTIFIER.test(tagName);
      const isMarkoFile = importPath?.endsWith(".marko");

      if (isIdentifier || isMarkoFile || !importPath) {
        templateVar = this.#getTemplateVar(tag, true);
        this.#extractor.write(`const ${templateVar} = (\n`);

        if (isIdentifier) {
          if (importPath) {
            // The name is a local variable if one is declared, and otherwise
            // (typed `any`, and ignored) the discovered tag.
            this.#extractor.write(
              `${varShared("fallbackTemplate")}(\n// @ts-ignore\n${tagName},\n`,
            );
            if (isMarkoFile) {
              this.#extractor.write(
                `${varShared("resolveTemplate")}(import("${importPath}")).`,
              );
              this.#writeTemplateExport(tag);
            } else {
              this.#extractor.write(varShared("any"));
            }
            this.#extractor.write(")");
          } else {
            this.#extractor.copy(tag.name);
          }
        } else if (isMarkoFile) {
          isTemplate = true;
          this.#extractor.write(
            `${varShared("resolveTemplate")}(import("${importPath}")).`,
          );
          this.#writeTemplateExport(tag);
        } else {
          this.#writeDynamicTagName(tag);
        }

        this.#extractor.write("\n);\n");
      } else {
        templateVar = varShared("missingTag");
      }

      const attrTagTree = this.#getTagAttrTagTree(tag);
      if (attrTagTree) {
        this.#writeAttrTagTree(attrTagTree, templateVar);
        this.#extractor.write(";\n");
      }
    }

    if (needsHoist || tag.var) {
      renderVar = this.#getRenderVar(tag, true);

      if (tag.var) {
        this.#closeBrackets[this.#closeBrackets.length - 1]++;
        this.#extractor.write("{const ");

        if (tagName === "style") {
          // `<style/foo>` is a CSS module; type its var as an object of the
          // embedded stylesheet's class/id names.
          this.#extractor.copy(tag.var.value).write(" = ");
          this.#writeStyleModuleVar(tag);
          this.#extractor.write(";\n");
        } else if (isHTML) {
          this.#extractor
            .copy(tag.var.value)
            .write(` = ${varShared("el")}(${JSON.stringify(def.name)});\n`);
        } else {
          this.#copyWithMutationsReplaced(tag.var.value);
          this.#extractor.write(
            ` = ${varShared("returned")}(() => ${renderVar});\n`,
          );
        }
      }

      if (needsHoist || !isHTML) {
        this.#extractor.write(`const ${renderVar} = `);
      }
    }

    if (isHTML) {
      this.#extractor
        .write(`${varShared("renderNativeTag")}("`)
        .copy(isEmptyRange(tag.name) ? tagName : tag.name)
        .write('")');
    } else if (templateVar) {
      this.#extractor
        .write(
          `${varShared(isTemplate ? "renderTemplate" : "renderDynamicTag")}(${templateVar}`,
        )
        .anchor(tag.name)
        .write(")");
    } else {
      this.#extractor.write(varShared("missingTag"));
    }

    // The renderer's form (see `Marko._.Renderer`): with rest attribute tags
    // only for a tag that has them (and no arguments, which take its input).
    const body = this.#processBody(tag);
    const withRestAttrTags = !!(
      body &&
      !this.#getTagArgs(tag) &&
      hasRestAttrTags(body)
    );
    if (tag.typeArgs) {
      this.#extractor
        .write(withRestAttrTags ? `<2>()` : `<0>()`)
        .copy(tag.typeArgs)
        .write("()(");
    } else {
      this.#extractor.write(
        withRestAttrTags ? `(${varShared("withRestAttrTags")})()(` : "()()(",
      );
    }

    this.#writeTagInputObject(tag, body, withRestAttrTags);

    this.#extractor.write(");\n");

    if (mutatedVars) {
      for (const binding of mutatedVars) {
        this.#extractor.write(
          `const ${varLocal(`change__${binding.name}`)} = ${varShared("change")}(${
            JSON.stringify(binding.name) +
            (binding.sourceName && binding.sourceName !== binding.name
              ? `, ${JSON.stringify(binding.sourceName)}`
              : "")
          }, ${renderVar}.return${binding.objectPath || ""});\n`,
        );
      }
    }
  }

  /** Types a `<style/foo>` CSS module var as an object of its class/id names. */
  #writeStyleModuleVar(tag: Node.Tag) {
    const selectors = this.#getStyleModuleSelectors(tag);
    if (this.#scriptLang === ScriptLang.ts) {
      this.#extractor.write(`${varShared("any")} as `);
      writeStyleModuleType(this.#extractor, selectors);
    } else {
      this.#extractor.write("/** @type {");
      writeStyleModuleType(this.#extractor, selectors);
      this.#extractor.write(`} */(${varShared("any")})`);
    }
  }

  #getStyleModuleSelectors(tag: Node.Tag) {
    const result = new Map<string, Range[]>();
    if (tag.body) {
      for (const child of tag.body) {
        if (child.type === NodeType.Text) {
          const found = findStyleSelectors(
            this.#code.slice(child.start, child.end),
            child.start,
          );
          for (const [name, ranges] of found) {
            const existing = result.get(name);
            if (existing) {
              existing.push(...ranges);
            } else {
              result.set(name, ranges);
            }
          }
        }
      }
    }

    return result;
  }

  #endChildren() {
    const pendingBrackets = this.#closeBrackets.pop();
    if (pendingBrackets) {
      this.#extractor.write("}".repeat(pendingBrackets));
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

    const mergedClassAttr = tag.shorthandClassNames
      ? this.#getMergeableClassAttr(tag.attrs)
      : undefined;

    if (tag.shorthandClassNames) {
      let sep = SEP_EMPTY;
      hasAttrs = true;
      this.#extractor.write(
        mergedClassAttr
          ? `class: ${varShared("mergeClasses")}(${varShared("interpolated")}\``
          : `class: ${varShared("interpolated")}\``,
      );

      for (const shorthandClassName of tag.shorthandClassNames) {
        this.#extractor.write(sep).copy({
          start: shorthandClassName.start + 1,
          end: shorthandClassName.end,
        });
        sep = SEP_SPACE;
      }

      this.#extractor.write("`");

      if (mergedClassAttr) {
        this.#extractor.write(", (\n");
        this.#copyWithMutationsReplaced(mergedClassAttr.value.value);
        this.#extractor.write("\n))");
      }

      this.#extractor.write(SEP_COMMA_NEW_LINE);
    }

    if (tag.attrs) {
      hasAttrs = true;

      for (const attr of tag.attrs) {
        if (attr === mergedClassAttr) continue;
        switch (attr.type) {
          case NodeType.AttrSpread:
            this.#extractor.write(`...(\n`);
            this.#copyWithMutationsReplaced(attr.value);
            this.#extractor.write(`\n)`);
            break;
          case NodeType.AttrNamed: {
            const isDefault = isEmptyRange(attr.name);
            const value = attr.value;
            const modifier =
              !value || value.type === NodeType.AttrValue
                ? this.#getNamedAttrModifier(attr)
                : undefined;
            // This is printed before the object key so that we can use the
            // position of the default attribute even though there is no actual name in the source.
            const defaultMapPosition = isDefault ? attr.name : undefined;
            let name: string | Range = isDefault ? ATTR_UNNAMED : attr.name;

            if (modifier) {
              name = { start: attr.name.start, end: modifier.start - 1 };
            }

            if (value) {
              switch (value.type) {
                case NodeType.AttrMethod:
                  if (value.async) this.#extractor.write("async ");
                  this.#extractor
                    .write('"')
                    .anchor(defaultMapPosition)
                    .copy(name)
                    .write('"')
                    .copy(value.typeParams);
                  this.#copyWithMutationsReplaced(value.params);
                  this.#copyWithMutationsReplaced(value.body);
                  break;
                case NodeType.AttrValue: {
                  const boundRange = value.bound && getBoundAttrRange(value);
                  this.#extractor
                    .write('"')
                    .anchor(defaultMapPosition)
                    .copy(name)
                    .write('": (\n');
                  if (boundRange) {
                    if (!boundRange.member) {
                      // Should have bound to an identifier, so we inline a function to assign to it.
                      const valueLiteral = this.#read(boundRange.value);
                      this.#extractor
                        .copy(boundRange.value)
                        .write(" ")
                        .copy(boundRange.types)
                        .write(`\n)${SEP_COMMA_NEW_LINE}"`)
                        .anchor(defaultMapPosition)
                        .copy(name)
                        .write(
                          `Change"(\n// @ts-ignore\n_${valueLiteral}\n) {\n${
                            isMutatedVar(tag.parent, valueLiteral)
                              ? varLocal(`change__${valueLiteral}.`)
                              : ""
                          }`,
                        )
                        .copy(boundRange.value)
                        .write("= ")
                        .copy(modifier)
                        .write(`(_${valueLiteral});\n}`);
                    } else if (boundRange.member.computed) {
                      // we ensure the string "Change" is appended to the end of the expression.
                      this.#extractor
                        .copy(boundRange.value)
                        .copy({
                          start: boundRange.value.end,
                          end: boundRange.value.end + 1,
                        })
                        .copy(boundRange.member)
                        .copy({
                          start: boundRange.member.end,
                          end: boundRange.member.end + 1,
                        })
                        .copy(boundRange.types)
                        .write(`\n)${SEP_COMMA_NEW_LINE}"`)
                        .anchor(defaultMapPosition)
                        .copy(name)
                        .write('Change": (\n');

                      if (modifier) {
                        this.#extractor
                          .copy(boundRange.value)
                          .write("[`${\n")
                          .copy(boundRange.member)
                          .write("\n}Change`] && ((\n// @ts-ignore\n_\n)=>{\n")
                          .copy(boundRange.value)
                          .write("[`${\n")
                          .copy(boundRange.member)
                          .write("\n}Change`](")
                          .copy(modifier)
                          .write("(_));\n})");
                      } else {
                        this.#extractor
                          .copy(boundRange.value)
                          .write("[`${\n")
                          .copy(boundRange.member)
                          .write("\n}Change`]");
                      }

                      this.#extractor.write(")");
                    } else {
                      const memberRange = {
                        start: boundRange.value.start,
                        end: boundRange.member.end,
                      };
                      // If we match here then we bound to a static member expression.
                      this.#extractor
                        .copy(memberRange)
                        .copy(boundRange.types)
                        .write(`\n)${SEP_COMMA_NEW_LINE}"`)
                        .anchor(defaultMapPosition)
                        .copy(name)
                        .write('Change": (\n');

                      if (modifier) {
                        this.#extractor
                          .copy(memberRange)
                          .write("Change && ((\n// @ts-ignore\n_\n)=>{\n")
                          .copy(memberRange)
                          .write("Change(")
                          .copy(modifier)
                          .write("(_));\n})");
                      } else {
                        this.#extractor.copy(memberRange).write("Change");
                      }

                      this.#extractor.write(")");
                    }
                  } else {
                    this.#copyWithMutationsReplaced(value.value);
                    this.#extractor.write("\n)");
                  }

                  break;
                }
              }
            } else if (attr.args) {
              this.#extractor.write('"').copy(name).write('": ');

              if (
                this.#api === RuntimeAPI.class &&
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
                    const propertyNameStart = stringLiteralStart + 1;
                    this.#extractor.write("component.").copy({
                      start: propertyNameStart,
                      end: propertyNameStart + stringLiteralValue.length,
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
                .anchor(defaultMapPosition)
                .copy(name)
                .write(`": ${modifier ? '""' : "true"}`);
            }
            break;
          }
        }

        this.#extractor.write(SEP_COMMA_NEW_LINE);
      }
    }

    return hasAttrs;
  }

  /**
   * Writes an attribute tag's (or a control flow tag's) attribute tags into
   * its input. Without rest attribute tags each goes in the input itself,
   * which types and checks it; otherwise all of them are merged by
   * `attrTags`.
   */
  #writeAttrTags(body: ProcessedBody, owner: string) {
    const { staticAttrTags } = body;
    if (hasRestAttrTags(body)) {
      this.#extractor.write("...");
      this.#writeAttrTagsCall(body, owner);
      this.#extractor.write(SEP_COMMA_NEW_LINE);
    } else if (staticAttrTags) {
      this.#writeAttrTagProps(staticAttrTags[0]);
    }
  }

  /**
   * `attrTags(owner)([...groups])`, see `#writeAttrTagGroups`.
   */
  #writeAttrTagsCall(body: ProcessedBody, owner: string) {
    const { staticAttrTags, dynamicAttrTagParents } = body;
    if (
      !staticAttrTags &&
      dynamicAttrTagParents!.length === 1 &&
      dynamicAttrTagParents![0].nameText === "for"
    ) {
      // One group, already checked: a loop.
      this.#writeDynamicAttrTagParents(dynamicAttrTagParents!, owner, "");
      return;
    }

    this.#extractor.write(`${varShared("attrTags")}(${owner})([\n`);
    this.#writeAttrTagGroups(body, owner);
    this.#extractor.write("])");
  }

  /**
   * The groups of a body's attribute tags: the static ones (an object per
   * repetition, so that each has a name once; from the second, the rest
   * attribute tags, with `fromRepetition`, as the first is written in the
   * input itself), then each `<if>` chain, `<while>` and `<for>` (merged by
   * name, so their order does not matter), each followed by a comma.
   */
  #writeAttrTagGroups(
    { staticAttrTags, dynamicAttrTagParents }: ProcessedBody,
    owner: string,
    fromRepetition = 0,
  ) {
    if (staticAttrTags) {
      for (let i = fromRepetition; i < staticAttrTags.length; i++) {
        this.#extractor.write("{\n");
        this.#writeAttrTagProps(staticAttrTags[i]);
        this.#extractor.write(`}${SEP_COMMA_NEW_LINE}`);
      }
    }

    if (dynamicAttrTagParents) {
      this.#writeDynamicAttrTagParents(dynamicAttrTagParents, owner);
    }
  }

  /** Writes attribute tags as properties, each followed by a comma. */
  #writeAttrTagProps(attrTags: readonly Node.AttrTag[]) {
    for (const attrTag of attrTags) {
      // Quoted, not bare: the name is not copied, so its anchor has to fall
      // inside the key TypeScript reports a problem on.
      this.#extractor
        .write(`"`)
        .anchor(attrTag.name)
        .write(`${this.#getAttrTagName(attrTag)}": `);
      this.#writeTagInputObject(attrTag, this.#processBody(attrTag));
      this.#extractor.write(SEP_COMMA_NEW_LINE);
    }
  }

  /**
   * Names the attribute tags only a tag's rest attribute tags give, so that
   * one it requires counts as given. After its attributes: Marko writes each
   * attribute tag after them (as nothing, if no `<if>` or `<for>` gives it),
   * so it replaces one a spread has.
   */
  #writeGivenAttrTags(
    tag: Node.ParentTag,
    inline: readonly Node.AttrTag[] | undefined,
  ) {
    const tree =
      tag.type === NodeType.Tag
        ? this.#getTagAttrTagTree(tag)
        : this.#getAttrTagTree(tag);
    let sep = `...${varShared("givenAttrTags")}(`;
    for (const name in tree) {
      if (!inline?.some((t) => tree[name].tags.includes(t))) {
        this.#extractor.write(`${sep}${JSON.stringify(name)}`);
        sep = SEP_COMMA_SPACE;
      }
    }
    if (sep === SEP_COMMA_SPACE) {
      this.#extractor.write(`)${SEP_COMMA_NEW_LINE}`);
    }
  }

  /**
   * An anchor at the first attribute tag in a control flow tag, so that an
   * error on its whole group is reported from it.
   */
  #anchorAttrTag(tag: Node.ControlFlowTag) {
    let first = getFirstAttrTag(tag);
    const alternates = IF_TAG_ALTERNATES.get(tag as IfTag);
    if (!first && alternates) {
      for (const { node } of alternates) {
        if ((first = getFirstAttrTag(node))) break;
      }
    }
    if (first) this.#extractor.anchor(first.name);
  }

  #writeDynamicAttrTagParents(
    dynamicAttrTagParents: readonly Node.ControlFlowTag[],
    owner: string,
    sep = SEP_COMMA_NEW_LINE,
  ) {
    for (const tag of dynamicAttrTagParents) {
      switch (tag.nameText) {
        case "if": {
          // @ts-expect-error we know we are in an If Tag
          declare const tag: IfTag;
          const alternates = IF_TAG_ALTERNATES.get(tag);
          const test =
            this.#getRangeWithoutTrailingComma(tag.args?.value) ||
            this.#getAttrValue(tag, ATTR_UNNAMED);
          this.#writeComments(tag);
          // An error on a whole group (which TypeScript does not elaborate
          // into a ternary) from its first attribute tag, not the condition.
          this.#extractor.write("((");
          if (test) this.#anchorAttrTag(tag);
          this.#extractor
            .write("\n")
            .copy(test || "undefined")
            .write("\n) ? ");

          this.#writeDynamicAttrTagBody(tag, owner);

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

              this.#writeDynamicAttrTagBody(node, owner);
            }
          }

          if (needsAlternate) {
            this.#extractor.write(` : ${varShared("never")}`);
          }

          this.#extractor.write(")");
          break;
        }
        case "for": {
          // An error on its whole group (eg on a type parameter the tag
          // infers otherwise) from its first attribute tag; one on its
          // attributes from its name.
          this.#extractor.write(
            `${varShared(getForAttrTagRuntime(this.#parsed, tag))}(`,
          );
          this.#anchorAttrTag(tag);
          this.#extractor.write("{\n").anchor(tag.name);
          this.#writeAttrs(tag);
          this.#extractor.write("\n}, \n");
          this.#writeComments(tag);
          this.#extractor
            .copy(tag.typeParams)
            .write("(\n")
            .copy(tag.params?.value)
            .write("\n) => ");
          // Returned, which TypeScript does not check for unknown properties,
          // so always through `attrTags`.
          this.#writeDynamicAttrTagBody(tag, owner, true);
          this.#extractor.write(")");
          break;
        }
        case "while": {
          this.#writeComments(tag);
          this.#extractor.write("((");
          if (tag.args) this.#anchorAttrTag(tag);
          this.#extractor
            .write("\n")
            .copy(
              this.#getRangeWithoutTrailingComma(tag.args?.value) ||
                "undefined",
            )
            .write("\n) ? ");
          this.#writeDynamicAttrTagBody(tag, owner);
          this.#extractor.write(` : ${varShared("never")})`);
          break;
        }
      }

      this.#extractor.write(sep);
    }
  }

  /**
   * Writes a tag's input. With `withRestAttrTags`, its rest attribute tags go
   * in it as groups (keyed by `restAttrTags`), for its renderer to merge,
   * unless the tag has arguments (passed before its input object), which
   * merges them with `attrTags`.
   */
  #writeTagInputObject(
    tag: Node.ParentTag,
    body: ProcessedBody | undefined,
    withRestAttrTags?: boolean,
  ) {
    if (!tag.params) this.#writeComments(tag);

    const args = this.#getTagArgs(tag);
    const restAttrTagsBody = withRestAttrTags ? body : undefined;
    let hasInput = false;
    let writeInputObj = true;

    if (args) {
      hasInput = true;
      this.#extractor.copy(args.value);

      if (body || tag.attrs || tag.shorthandId || tag.shorthandClassNames) {
        this.#extractor.write(",\n{\n");
      } else {
        writeInputObj = false;
      }
    } else {
      this.#extractor.write("{\n");

      if (restAttrTagsBody) {
        // An anchor where the rest of the input starts (its first attribute,
        // shorthand id or class, or arguments; else the tag's name), so that
        // an error on the whole input (eg a missing attribute tag) is
        // reported from there rather than from inside its body.
        const inputStart = getInputStart(tag);
        this.#extractor.anchor(
          inputStart === undefined
            ? tag.name
            : { start: inputStart, end: inputStart },
        );
      }

      if (tag.args) {
        hasInput = true;
        this.#extractor
          .write("[")
          .copy({
            start: tag.args.start,
            end: tag.args.start + 1,
          })
          .write('"value"')
          .copy({
            start: tag.args.end - 1,
            end: tag.args.end,
          })
          .write(`]: ${varShared("tuple")}(`)
          .copy(tag.args.value)
          .write(")")
          .write(",\n");
      }
    }

    if (this.#writeAttrs(tag)) {
      hasInput = true;
    }

    const isScript = isTextOnlyScript(tag);
    let hasBodyContent = false;

    if (isScript) {
      this.#extractor.write(
        `async ${this.#api === RuntimeAPI.tags ? "value" : `[${varShared("never")}]`}(){`,
      );
      this.#copyWithMutationsReplaced({
        start: tag.body[0].start,
        end: tag.body[tag.body.length - 1].end,
      });
      // On its own line: the script can end in a line comment.
      this.#extractor.write(`\n}${SEP_COMMA_NEW_LINE}`);
    } else if (body) {
      if (!restAttrTagsBody) {
        hasInput = true;
        if (tag.type === NodeType.AttrTag && hasRestAttrTags(body)) {
          // Each name its groups give, as a tag's (see `#writeGivenAttrTags`).
          this.#writeGivenAttrTags(tag, undefined);
        }
        // A tag with arguments takes its attributes after them, which
        // `attrTags` cannot type: its attribute tags are not checked.
        this.#writeAttrTags(
          body,
          args ? varShared("any") : this.#getAttrTagsOwner(tag),
        );
      } else if (body.staticAttrTags) {
        // The first of each name is the attribute itself (its iterator
        // yields the others), so it is written as one written once is.
        this.#writeAttrTagProps(body.staticAttrTags[0]);
      }
      hasBodyContent = body.content !== undefined;
    } else if (tag.close) {
      hasBodyContent = true;
    }

    if (tag.params || hasBodyContent) {
      this.#extractor.write("[").anchor(tag.name);

      if (this.#interop) {
        const templateVar = this.#getTemplateVar(
          tag.type === NodeType.AttrTag ? tag.owner! : tag,
        );
        if (templateVar) {
          this.#extractor.write(`${varShared("contentFor")}(${templateVar})`);
        } else {
          this.#extractor.write(varShared("content"));
        }
      } else {
        this.#extractor.write('"content"');
      }

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

      let didReturn = false;

      if (body?.content) {
        didReturn = this.#writeChildren(body.content);
      }

      if (!tag.params) {
        this.#extractor.write(`return () => {\n`);
      }

      this.#writeReturn(didReturn ? varLocal("return") : undefined, tag.body);

      if (body?.content) {
        this.#endChildren();
      }

      if (tag.params) {
        this.#extractor.write("})");
      } else {
        this.#extractor.write("}\n})()");
      }

      this.#extractor.write(SEP_COMMA_NEW_LINE);
    }

    if (tag.type === NodeType.AttrTag) {
      this.#extractor
        .write("[")
        .anchor(tag.name)
        .write(`Symbol.iterator]: ${varShared("any")}${SEP_COMMA_NEW_LINE}`);
    }

    if (restAttrTagsBody) {
      // Last, so that a message that prints the input shows what is written
      // on the tag first.
      this.#extractor.write(`[${varShared("restAttrTags")}]: [\n`);
      this.#writeAttrTagGroups(
        restAttrTagsBody,
        this.#getAttrTagsOwner(tag),
        1,
      );
      this.#extractor.write(`]${SEP_COMMA_NEW_LINE}`);
      // After everything else written (which a spread then prints after
      // them), and after the attributes, as Marko writes each attribute tag.
      this.#writeGivenAttrTags(tag, restAttrTagsBody.staticAttrTags?.[0]);
    }

    if (!hasInput) {
      this.#extractor.anchor(tag.name);
    }

    if (writeInputObj) {
      this.#extractor.write("\n}");
    }
  }

  /**
   * The `default` a tag reads off its module (its types, as for a core tag,
   * or its template), with the tag's name mapped onto it: TypeScript's hover
   * there shows the comment above its `Input`.
   */
  #writeTemplateExport(tag: Node.Tag) {
    this.#extractor.anchor(tag.name, true).write("default");
  }

  /** A tag's arguments, when they are passed before its input object. */
  #getTagArgs(tag: Node.ParentTag) {
    return tag.args &&
      (this.#api === RuntimeAPI.tags || !!this.#getDynamicTagExpression(tag))
      ? tag.args
      : undefined;
  }

  #getCastedType(type: string) {
    return this.#scriptLang === ScriptLang.ts
      ? `${varShared("any")} as ${type}`
      : `/** @type {${type}} */(${varShared("any")})`;
  }

  #copyWithMutationsReplaced(range: Range) {
    const mutations = this.#mutations;
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

        if (mutations[midIndex].start >= curOffset) {
          maxIndex = midIndex;
        } else {
          minIndex = midIndex + 1;
        }
      }

      const mutation = maxIndex !== len && mutations[maxIndex];
      if (!mutation || mutation.start >= range.end) {
        // We didn't find any more mutations.
        this.#extractor.copy({
          start: curOffset,
          end: range.end,
        });
        return;
      }

      // Copy the content before the mutation.
      this.#extractor.copy({ start: curOffset, end: mutation.start });
      // splice in mutation prefix.
      this.#extractor.write(`${varLocal(`change__${mutation.binding.name}`)}.`);

      curOffset = mutation.start;
      minIndex = maxIndex + 1;
      // eslint-disable-next-line no-constant-condition
    } while (true);
  }

  #processBody(parent: Node.ParentNode): ProcessedBody | undefined {
    const { body } = parent;

    if (!body) return;

    const last = body.length - 1;
    let content: ProcessedBody["content"];
    let staticAttrTags: ProcessedBody["staticAttrTags"];
    let attrTagCounts: Map<string, number> | undefined;
    let dynamicAttrTagParents: ProcessedBody["dynamicAttrTagParents"];
    let i = 0;

    while (i <= last) {
      const child = body[i++];

      switch (child.type) {
        case NodeType.AttrTag: {
          if (staticAttrTags) {
            const repetition = attrTagCounts!.get(child.nameText) || 0;
            attrTagCounts!.set(child.nameText, repetition + 1);
            if (repetition < staticAttrTags.length) {
              staticAttrTags[repetition].push(child);
            } else {
              staticAttrTags.push([child]);
            }
          } else {
            staticAttrTags = [[child]];
            attrTagCounts = new Map([[child.nameText, 1]]);
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
                            ) || this.#getAttrValue(nextChild, ATTR_UNNAMED),
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
          } else if (content) {
            content.push(child);
          } else {
            content = [child];
          }

          break;
        }
        case NodeType.Text: {
          // Only include text nodes if they have content.
          if (!this.#isEmptyText(child)) {
            if (content) {
              content.push(child);
            } else {
              content = [child];
            }
          }

          break;
        }

        default:
          if (content) {
            content.push(child);
          } else {
            content = [child];
          }
          break;
      }
    }

    if (content || staticAttrTags || dynamicAttrTagParents) {
      return { content, staticAttrTags, dynamicAttrTagParents };
    }
  }

  /**
   * A control flow tag's attribute tags, after its other content (as a
   * loop's arrow body, `isFor`, or in a function called once): an object
   * (which TypeScript keeps normalized with the other branches of an
   * `<if>`, as merging by name needs); or, with rest attribute tags or where
   * it is returned (which TypeScript does not check for unknown
   * properties), merged by `#writeAttrTagsCall`.
   */
  #writeDynamicAttrTagBody(
    tag: Node.ControlFlowTag,
    owner: string,
    isFor?: boolean,
  ) {
    const body = this.#processBody(tag);
    if (body?.content) {
      this.#extractor.write(isFor ? "{\n" : "(() => {\n");
      this.#writeChildren(body.content);
      this.#extractor.write("return ");
    }

    if (!body?.staticAttrTags && !body?.dynamicAttrTagParents) {
      // A branch that gives nothing: not `{}`, which would absorb a branch a
      // function returns (`cond ? (() => …)() : {}` is typed `{}`).
      this.#extractor.write(
        isFor ? (body?.content ? "{}" : "({})") : varShared("never"),
      );
    } else if (!isFor && !body.content) {
      this.#extractor.write("{\n");
      this.#writeAttrTags(body, owner);
      this.#extractor.write("}");
    } else {
      this.#writeAttrTagsCall(body, owner);
    }

    if (body?.content) {
      this.#endChildren();
      this.#extractor.write(isFor ? ";\n}" : ";\n})()");
    }
  }

  #getAttrValue(tag: Node.ParentTag, name: string) {
    if (tag.attrs) {
      for (const attr of tag.attrs) {
        if (
          isValueAttribute(attr) &&
          (this.#read(attr.name) || ATTR_UNNAMED) === name
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
        if (this.#testAtIndex(REG_INPUT_TYPE, node.start + "export ".length)) {
          this.#declaresInput = true;
          const exported = this.#ast.export(node) as
            undefined | t.ExportNamedDeclaration;
          const inputType = exported?.declaration as
            | t.TSInterfaceDeclaration
            | t.TSTypeAliasDeclaration
            | null
            | undefined;

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
      } else if (node.type === NodeType.Import) {
        // A type imported into the module scope, eg `import { Input }` or
        // `import type { Input }` (also covers default/aliased imports).
        const imported = this.#ast.import(node);
        if (imported) {
          for (const specifier of imported.specifiers) {
            if (specifier.local.name === "Input") {
              return { typeParameters: undefined };
            }
          }
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
            this.#declaresInput = true;
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

  #getRenderVar(tag: Node.Tag, declared: true): string;
  #getRenderVar(tag: Node.Tag): string | undefined;
  #getRenderVar(tag: Node.Tag, declared = false) {
    let id = RENDER_VAR.get(tag);
    if (!id && declared) {
      RENDER_VAR.set(tag, (id = varLocal("rendered_" + this.#getTagId(tag))));
    }

    return id;
  }

  #getTemplateVar(tag: Node.Tag, declared: true): string;
  #getTemplateVar(tag: Node.Tag): string | undefined;
  #getTemplateVar(tag: Node.Tag, declared = false) {
    let id = TEMPLATE_VAR.get(tag);
    if (!id && declared) {
      TEMPLATE_VAR.set(tag, (id = varLocal("tag_" + this.#getTagId(tag))));
    }

    return id;
  }

  #getTagId(tag: Node.Tag) {
    let id = TAG_ID.get(tag);
    if (id === undefined) {
      id = this.#tagId++;
      TAG_ID.set(tag, id);
    }

    return id;
  }

  #hasScopeExpression(body: Node.ParentNode["body"]) {
    return !!(getHoistSources(body) || this.#getBodyHoistScopeExpression(body));
  }

  #writeScopeExpression(body: Node.ParentNode["body"]) {
    const sources = getHoistSources(body);
    const hoists = this.#getBodyHoistScopeExpression(body);

    if (!sources) {
      if (hoists) this.#extractor.write(hoists);
      return;
    }

    this.#extractor.write(`{ ${hoists ? `...${hoists}, ` : ""}`);

    let sep = SEP_EMPTY;
    for (const binding of sources) {
      this.#extractor.write(sep).copy(binding.range);
      sep = SEP_COMMA_SPACE;
    }

    this.#extractor.write(" }");
  }

  #getBodyHoistScopeExpression(body: Node.ParentNode["body"]) {
    let hoistVars: Repeated<string> | undefined;
    if (body) {
      for (const child of body) {
        if (child.type === NodeType.Tag) {
          const renderVar = this.#getRenderVar(child);
          if (renderVar && (!child.var || hasHoists(child))) {
            if (hoistVars) {
              hoistVars.push(renderVar);
            } else {
              hoistVars = [renderVar];
            }
          }
        }
      }
    }

    if (hoistVars) {
      if (hoistVars.length === 1) {
        return `${varShared("readScope")}(${hoistVars[0]})`;
      }

      return `${varShared("readScopes")}({ ${hoistVars.join(SEP_COMMA_SPACE)} })`;
    }
  }

  #getNamedAttrModifier(attr: Node.AttrNamed) {
    const start = attr.name.start;
    const end = attr.name.end;
    for (let i = end - 1; i-- > start;) {
      if (this.#code.charAt(i) === ":") return { start: i + 1, end };
    }
  }

  #getMergeableClassAttr(
    attrs: Repeatable<Node.AttrNode>,
  ): (Node.AttrNamed & { value: Node.AttrValue }) | undefined {
    if (attrs) {
      for (const attr of attrs) {
        if (
          attr.type === NodeType.AttrNamed &&
          !attr.args &&
          attr.value?.type === NodeType.AttrValue &&
          !attr.value.bound &&
          this.#read(attr.name) === "class"
        ) {
          return attr as Node.AttrNamed & { value: Node.AttrValue };
        }
      }
    }
  }

  #getAttrTagName(tag: Node.AttrTag) {
    const { nameText } = tag;
    return (
      this.#lookup.getTag(nameText)?.targetProperty ||
      nameText.slice(nameText.lastIndexOf(":") + 1)
    );
  }

  #getAttrTagPath(tag: Node.AttrTag): string {
    let path = `"${this.#getAttrTagName(tag)}"`;
    let curTag = tag.parent;
    while (curTag) {
      if (curTag.type === NodeType.AttrTag) {
        path = `"${this.#getAttrTagName(curTag)}",${path}`;
      } else if (!isControlFlowTag(curTag as Node.Tag)) {
        break;
      }
      curTag = curTag.parent as Node.ParentTag;
    }
    return path;
  }

  /** The arguments of `attrTags` for the attribute tags of `tag`. */
  #getAttrTagsOwner(tag: Node.ParentTag): string {
    if (tag.type === NodeType.AttrTag) {
      const templateVar = tag.owner && this.#getTemplateVar(tag.owner);
      return templateVar
        ? `${templateVar},${this.#getAttrTagPath(tag)}`
        : varShared("any");
    }

    return this.#getTemplateVar(tag) || varShared("any");
  }

  #writeAttrTagTree(tree: AttrTagTree, valueExpression: string, nested?: true) {
    this.#extractor.write(
      `${varShared(nested ? "nestedAttrTagNames" : "attrTagNames")}(${valueExpression},input=>{\n`,
    );
    for (const name in tree) {
      const { tags, nested } = tree[name];
      for (const tag of tags) {
        this.#extractor.write('input["').copy(tag.name).write('"];\n');
      }

      if (nested) {
        this.#writeAttrTagTree(nested, `input["@${name}"]`, true);
      }
    }
    this.#extractor.write(`});`);
  }

  /** A tag's `#getAttrTagTree`, built once. */
  #getTagAttrTagTree(tag: Node.Tag) {
    if (!this.#attrTagTrees.has(tag)) {
      this.#attrTagTrees.set(tag, this.#getAttrTagTree(tag));
    }
    return this.#attrTagTrees.get(tag);
  }

  #getAttrTagTree(tag: Node.Tag | Node.AttrTag, attrTags?: AttrTagTree) {
    if (!tag.hasAttrTags || !tag.body) return attrTags;

    const curAttrTags = attrTags || {};
    for (const child of tag.body) {
      switch (child.type) {
        case NodeType.AttrTag: {
          const name = this.#getAttrTagName(child);
          const prev = curAttrTags[name];

          if (prev) {
            prev.tags.push(child);
            prev.nested = this.#getAttrTagTree(child, prev.nested);
          } else {
            curAttrTags[name] = {
              tags: [child],
              nested: this.#getAttrTagTree(child),
            };
          }
          break;
        }
        case NodeType.Tag:
          if (isControlFlowTag(child)) {
            this.#getAttrTagTree(child, curAttrTags);
          }
          break;
      }
    }

    return curAttrTags;
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

const enum ForTagType {
  unknown,
  of,
  in,
  to,
  until,
}
function getForTagType(parsed: Parsed, tag: Node.Tag) {
  if (tag.attrs) {
    for (const attr of tag.attrs) {
      if (attr.type === NodeType.AttrSpread) {
        return ForTagType.unknown;
      }

      switch (parsed.read(attr.name)) {
        case "of":
          return ForTagType.of;
        case "in":
          return ForTagType.in;
        case "to":
          return ForTagType.to;
        case "until":
          return ForTagType.until;
      }
    }
  }

  return ForTagType.unknown;
}

function getForTagRuntime(parsed: Parsed, tag: Node.Tag) {
  switch (getForTagType(parsed, tag)) {
    case ForTagType.of:
      return "forOfTag";
    case ForTagType.in:
      return "forInTag";
    case ForTagType.to:
      return "forToTag";
    case ForTagType.until:
      return "forUntilTag";
    default:
      return "forTag";
  }
}

function getForAttrTagRuntime(parsed: Parsed, tag: Node.Tag) {
  switch (getForTagType(parsed, tag)) {
    case ForTagType.of:
      return "forOfAttrTag";
    case ForTagType.in:
      return "forInAttrTag";
    case ForTagType.to:
      return "forToAttrTag";
    case ForTagType.until:
      return "forUntilAttrTag";
    default:
      return "forAttrTag";
  }
}

/** Where the attributes (or class API arguments) of a tag's input start. */
/**
 * The first attribute tag in a control flow tag's body or in the control flow
 * nested in it.
 */
function getFirstAttrTag(tag: Node.ParentTag): Node.AttrTag | undefined {
  if (tag.body) {
    for (const child of tag.body) {
      if (child.type === NodeType.AttrTag) return child;
      if (
        child.type === NodeType.Tag &&
        child.hasAttrTags &&
        isControlFlowTag(child)
      ) {
        const first = getFirstAttrTag(child);
        if (first) return first;
      }
    }
  }
}

function getInputStart(tag: Node.ParentTag) {
  return minStart(
    minStart(minStart(tag.attrs?.[0]?.start, tag.args), tag.shorthandId),
    tag.shorthandClassNames?.[0],
  );
}

function minStart(start: number | undefined, range: Range | undefined) {
  return range && (start === undefined || range.start < start)
    ? range.start
    : start;
}

/**
 * Whether a body has rest attribute tags: attribute tags that are not all
 * written once (one is repeated, or given by an `<if>`, `<while>` or `<for>`),
 * and so are merged as groups.
 */
function hasRestAttrTags({
  staticAttrTags,
  dynamicAttrTagParents,
}: ProcessedBody) {
  return !!(
    dynamicAttrTagParents ||
    (staticAttrTags && staticAttrTags.length > 1)
  );
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
  if (!def || !filename) return;
  if (!from) return filename;

  // `from` is parsed.filename which is already normalized, but the taglib
  // provided path must use native separators too or relativeImportPath
  // falls back to returning the absolute path.
  const to = normalizePath(filename);
  return packageImportPath(from, def, to) || relativeImportPath(from, to);
}

/**
 * A tag installed into `node_modules` is imported through the name its package was
 * resolved by, since its path is a realpath which may not be importable at all.
 */
function packageImportPath(from: string, def: TagDefinition, filename: string) {
  const { packageName, packageRoot } = def;
  if (!packageName || !packageRoot || !REG_NODE_MODULES.test(filename)) return;

  // Within the package we stay relative, both because it always resolves and
  // because a self reference would only work if the package exports the tag.
  if (!isWithin(packageRoot, filename) || isWithin(packageRoot, from)) return;

  const subPath = path.relative(packageRoot, filename);
  return `${packageName}/${subPath.split(path.sep).join("/")}`;
}

function isWithin(dir: string, filename: string) {
  const rel = path.relative(dir, filename);
  // `path.relative` walks out of the dir with `..`, or returns an absolute path
  // when it cannot relate the two at all, eg across windows drives.
  return (
    !!rel &&
    rel !== ".." &&
    !rel.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(rel)
  );
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
