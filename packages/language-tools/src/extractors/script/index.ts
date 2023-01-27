import type * as t from "@babel/types";
import { relativeImportPath } from "relative-import-path";

import type { TagDefinition, TaglibLookup } from "@marko/babel-utils";
import {
  type Node,
  NodeType,
  type Parsed,
  type Range,
  type Ranges,
  type Repeatable,
  type Repeated,
} from "../../parser";
import { Extractor } from "../../util/extractor";
import { ScriptParser } from "./util/script-parser";
import { isValidIdentifier } from "./util/is-valid-identifier";
import {
  crawlProgramScope,
  getBoundAttrMemberExpressionStartOffset,
  getHoistSources,
  getHoists,
  getMutatedVars,
  hasHoists,
  isMutatedVar,
} from "./util/attach-scopes";

const SEP_EMPTY = "";
const SEP_SPACE = " ";
const SEP_COMMA_SPACE = ", ";
const SEP_COMMA_NEW_LINE = ",\n";
const VAR_CLASS = "ட";
const VAR_TEMPLATE = "ˍ";
const VAR_GENERICS = "ᜭ";
const VAR_INTERNAL = "Marko.ட";
const VAR_DYNAMIC_PREFIX = "ᜭ";
const ATTR_UNAMED = "value";
const REG_BLOCK = /\s*{/y;
const REG_TAG_IMPORT = /(?<=(['"]))<([^\1>]+)>(?=\1)/g;
const REG_INPUT_TYPE = /\s*(interface|type)\s+Input\b/y;
const UPPER_CASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const IF_TAG_ALTERNATES = new WeakMap<IfTag, IfTagAlternates>();

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

// TODO: js mode
// TODO: css modules

/**
 * Iterate over the Marko CST and extract all the script content.
 */

export interface ExtractScriptOptions {
  parsed: Parsed;
  lookup: TaglibLookup;
  scriptKind: "js" | "ts";
  rootDir?: string;
  componentClassImport?: string | undefined;
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
  #isTS: boolean;
  #templateId: string;
  #mutationOffsets: Repeatable<number>;
  #referencedTags = new Set<TagDefinition>();
  #renderId = 1;
  constructor(opts: ExtractScriptOptions) {
    const { parsed, lookup } = opts;
    this.#filename = parsed.filename;
    this.#code = parsed.code;
    this.#parsed = parsed;
    this.#lookup = lookup;
    this.#isTS = opts.scriptKind === "ts";
    this.#extractor = new Extractor(parsed);
    this.#scriptParser = new ScriptParser(parsed.filename, parsed.code);
    this.#read = parsed.read.bind(parsed);
    this.#mutationOffsets = crawlProgramScope(this.#parsed, this.#scriptParser);
    this.#templateId =
      opts.rootDir &&
      this.#filename.startsWith(opts.rootDir) &&
      /[/\\]/.test(this.#filename[opts.rootDir.length])
        ? JSON.stringify(`@${this.#filename.slice(opts.rootDir.length + 1)}`)
        : this.#isTS
        ? "unique symbol"
        : JSON.stringify(btoa(this.#code));
    this.#writeProgram(parsed.program, opts.componentClassImport);
  }

  end() {
    return this.#extractor.end();
  }

  #writeProgram(
    program: Node.Program,
    componentClassImport: ExtractScriptOptions["componentClassImport"]
  ) {
    let componentClassBody: Range | void;
    let typeParameters: (t.TSTypeParameterDeclaration & Range) | void | null;
    let hasInput = false;

    // TODO: in JS mode should scan for `Input` type comment.

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
          const start = node.start + "export ".length;
          this.#writeComments(node);

          // TODO: should only scan for `Input` type if in ts mode.
          if (!hasInput && this.#testAtIndex(REG_INPUT_TYPE, start)) {
            const [inputType] = this.#scriptParser.statementAt<
              t.TSInterfaceDeclaration | t.TSTypeAliasDeclaration
            >(start, this.#read({ start, end: node.end }));
            hasInput = true;

            if (inputType) {
              typeParameters =
                inputType.typeParameters as t.TSTypeParameterDeclaration &
                  Range;
            }
          }

          this.#extractor.copy(node).write("\n");
          break;
        }
        case NodeType.Import: {
          const tagImportMatch = this.#execAtIndex(
            REG_TAG_IMPORT,
            node.start + "import ".length
          );
          this.#writeComments(node);

          if (tagImportMatch) {
            // Here we're looking for Marko's shorthand imports for tags and pre-resolving them so typescript knows what we're loading.
            const [{ length }, , tagName] = tagImportMatch;
            const templatePath = resolveTagImport(
              this.#filename,
              this.#lookup.getTag(tagName)
            );
            if (templatePath) {
              this.#extractor
                .copy({
                  start: node.start,
                  end: tagImportMatch.index,
                })
                .write(templatePath)
                .copy({
                  start: tagImportMatch.index + length,
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

    let userGenericsStr = "";
    let registryGenericsStr = "";
    let registryInterfaceStr = "CustomTags";
    let hasComplexTypeParameters = false;

    // TODO: this whole section needs to be redone for js mode.
    if (hasInput) {
      if (typeParameters) {
        let sep = SEP_EMPTY;
        userGenericsStr = registryGenericsStr = "<";
        registryInterfaceStr += `${typeParameters.params.length}<`;
        for (let i = 0; i < typeParameters.params.length; i++) {
          const generic = typeParameters.params[i];
          const registryGenericName = UPPER_CASE_LETTERS[i];
          userGenericsStr += sep + generic.name;
          registryGenericsStr += sep + registryGenericName;
          registryInterfaceStr += sep + registryGenericName;
          sep = SEP_COMMA_SPACE;

          if (generic.constraint || generic.default) {
            hasComplexTypeParameters = true;
          }
        }

        userGenericsStr += ">";
        registryGenericsStr += ">";
        registryInterfaceStr += ">";
      }
    } else {
      this.#extractor.write("export type Input = Record<string, never>;\n");
    }

    this.#extractor.write(`function ${VAR_TEMPLATE}`);

    if (typeParameters) {
      this.#extractor.write(this.#read(typeParameters));
    }

    // TODO: will need changed for js mode.
    this.#extractor.write(`\
(input: Input${userGenericsStr}) {
const out = 1 as unknown as Marko.Out;
const component = 1 as unknown as ${VAR_CLASS + userGenericsStr};
const state = 1 as unknown as typeof component extends { state: infer State extends object } ? State : never;
${VAR_INTERNAL}.noop({ input, out, component, state });
`);
    // The final console log above is to prevent unused variable errors.

    const body = this.#processBody(program); // TODO: handle top level attribute tags.
    const didReturn =
      body?.renderBody && this.#writeChildren(program, body.renderBody);
    const hoists = getHoists(program);

    if (hoists) {
      this.#extractor.write("const ");
      this.#writeObjectKeys(hoists);
      this.#extractor.write(
        ` = ${VAR_INTERNAL}.readScopes(${VAR_INTERNAL}.rendered);\n`
      );
      this.#extractor.write(`${VAR_INTERNAL}.noop(`);
      this.#writeObjectKeys(hoists);
      this.#extractor.write(");\n");
    }

    if (didReturn) {
      this.#extractor.write(`return ${VAR_DYNAMIC_PREFIX}.return;\n`);
    } else {
      this.#extractor.write("return;\n");
    }

    this.#extractor.write("\n}\n");

    if (!componentClassBody && componentClassImport) {
      this.#extractor.write(
        `import ${VAR_CLASS} from "${componentClassImport}";\n`
      );
    } else {
      this.#extractor.write(`class ${VAR_CLASS}`);

      if (typeParameters) {
        this.#extractor.write(this.#read(typeParameters));
      }

      // TODO: in js mode this should use a comment like
      // extends /* @type {typeof Marko.Component<Input<${userGenericsStr}>>} */ (Marko.Component)

      // or https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#extends
      this.#extractor
        .write(` extends Marko.Component<Input${userGenericsStr}>`)
        .copy(componentClassBody || "{}")
        .write(";\n");
    }

    // TODO: need to figure out what to do with the namespace here.
    // I _think_ it can be turned into a type.
    this.#extractor.write(`\
declare namespace ${VAR_TEMPLATE} {
const id: ${this.#templateId};
const template: Marko.Template<typeof id>;
`);

    if (this.#referencedTags.size) {
      this.#extractor.write("const tags: {\n");

      for (const tag of this.#referencedTags) {
        this.#extractor.write(`"${tag.name}": ${VAR_INTERNAL}.`);

        if (tag.html) {
          this.#extractor.write(`NativeTagRenderer<"${tag.name}">`);
        } else {
          const importPath = resolveTagImport(this.#filename, tag);
          if (importPath) {
            this.#extractor.write(
              `CustomTagRenderer<typeof import("${importPath}").default>`
            );
          } else {
            this.#extractor.write("DefaultRenderer");
          }
        }

        this.#extractor.write(`;\n`);
      }

      this.#extractor.write(`};\n`);
    }

    this.#extractor.write(`}\n`);

    // TODO: this needs to be changed for js mode.
    this.#extractor.write(
      `export default 1 as unknown as typeof ${VAR_TEMPLATE}.template;\n`
    );

    // TODO: this needs to be changed for js mode.
    if (hasComplexTypeParameters) {
      this.#extractor.write(
        `type ${VAR_GENERICS + userGenericsStr.slice(0, -1)}`
      );
      let curInternalVar = VAR_GENERICS;
      let referenceInternalVar = "";
      for (const param of typeParameters!.params) {
        this.#extractor.write(`, ${curInternalVar} extends ${param.name} `);
        referenceInternalVar += ` & ${curInternalVar}`;
        curInternalVar += VAR_GENERICS;

        if (param.constraint) {
          this.#extractor.write(
            `extends ${this.#read(param.constraint as Range)} ? ${
              param.name
            } : `
          );
        }

        if (param.default) {
          this.#extractor.write(
            `extends unknown ? ${this.#read(param.default as Range)} : `
          );
        }

        if (param.constraint || param.default) {
          this.#extractor.write("never");
        }
      }

      this.#extractor.write(`> = any${referenceInternalVar}\n`);
    }

    // TODO: this needs to be changed for js mode.
    this.#extractor.write(`\
declare global {
namespace Marko {
interface ${registryInterfaceStr} {
[${VAR_TEMPLATE}.id]:`);

    if (hasComplexTypeParameters) {
      let interfaceGenerics = "";
      let inferredGenerics = "";
      let sep = SEP_EMPTY;

      for (let i = 0; i < typeParameters!.params.length; i++) {
        const interfaceGeneric = UPPER_CASE_LETTERS[i];
        inferredGenerics += `${sep}infer ${interfaceGeneric}`;
        interfaceGenerics += sep + interfaceGeneric;
        sep = SEP_COMMA_SPACE;
      }

      this.#extractor.write(
        `1 extends ${VAR_GENERICS}<${interfaceGenerics},${inferredGenerics}> ? `
      );
    }

    this.#extractor.write(
      `CustomTag<Input${registryGenericsStr}, ReturnType<typeof ${
        VAR_TEMPLATE + registryGenericsStr
      }>, ${VAR_CLASS + registryGenericsStr}>`
    );

    if (hasComplexTypeParameters) {
      this.#extractor.write(" : never");
    }

    this.#extractor.write("\n}\n}\n}\n");
    this.#writeComments(program);
  }

  #writeComments(node: Node.Commentable) {
    if (node.comments) {
      for (const comment of node.comments) {
        this.#extractor.write("/*").copy(comment.value).write("*/");
      }
    }
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
                  `${VAR_INTERNAL}.assertRendered(${VAR_INTERNAL}.rendered, ${renderId}, (() => {\n`
                );
              }

              this.#writeComments(child);
              this.#extractor
                .write("if (")
                .copy(
                  child.args?.value ||
                    this.#getAttrValue(child, ATTR_UNAMED) ||
                    "undefined"
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
                  `${VAR_INTERNAL}.assertRendered(${VAR_INTERNAL}.rendered, ${renderId}, `
                );
              }

              this.#extractor.write(`${VAR_INTERNAL}.forTag({\n`);
              const sep = this.#writeAttrs(SEP_EMPTY, child);
              const body = this.#processBody(child);

              if (body?.renderBody) {
                this.#writeComments(child);

                // Adds a comment containing the tag name inside the renderBody key
                // this causes any errors which are just for the renderBody
                // to show on the tag.
                this.#extractor
                  .write(`${sep}[/*`)
                  .copy(child.name)
                  .write(`*/"renderBody"]: ${VAR_INTERNAL}.body(function*`)
                  .copy(child.typeParams)
                  .write("(\n");

                if (child.params) {
                  this.#copyWithMutationsReplaced(child.params.value);
                }

                this.#extractor.write("\n) {\n");

                const localBindings = getHoistSources(child);
                this.#writeChildren(child, body.renderBody);

                if (localBindings) {
                  this.#extractor.write("yield ");
                  this.#writeObjectKeys(localBindings);
                  this.#extractor.write(";\n");
                }

                this.#extractor.write("\n})");
              }

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
                .copy(child.args?.value || "undefined")
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
      this.#extractor.write(`const ${VAR_DYNAMIC_PREFIX} = {\n`);
      if (returnTag) {
        this.#extractor.write(`return: ${VAR_INTERNAL}.returnTag(`);
        this.#writeTagInputObject(returnTag);
        this.#extractor.write(")");

        if (mutatedVars) {
          this.#extractor.write(",\n");
        }
      }

      if (mutatedVars) {
        let sep = SEP_EMPTY;
        this.#extractor.write(`mutate: ${VAR_INTERNAL}.mutable([\n`);
        for (const binding of mutatedVars) {
          this.#extractor.write(
            `${sep}[${
              JSON.stringify(binding.name) +
              (binding.sourceName && binding.sourceName !== binding.name
                ? `, ${JSON.stringify(binding.sourceName)}`
                : "")
            }, ${VAR_INTERNAL}.rendered.returns[${this.#getRenderId(
              binding.node as Node.ParentTag
            )}]${binding.objectPath || ""}]`
          );
          sep = SEP_COMMA_NEW_LINE;
        }
        this.#extractor.write(`\n] as const)`); // TODO: need to figure out as const in js mode
      }

      this.#extractor.write("\n};\n");

      if (mutatedVars) {
        // Write out a read of all mutated vars to avoid them being seen
        // as unread if there are only writes.
        let sep = SEP_EMPTY;
        this.#extractor.write(`${VAR_INTERNAL}.noop({`);
        for (const binding of mutatedVars) {
          this.#extractor.write(`${sep}${binding.name}`);
          sep = SEP_COMMA_SPACE;
        }
        this.#extractor.write("});\n");
      }
    }

    return returnTag !== undefined;
  }

  #writeTag(tag: Node.Tag) {
    const tagName = tag.nameText;

    if (tag.args) {
      // Arguments are no longer supported, the code below passes them
      // to an empty iife which will give an error saying that arguments
      // are not supported.
      this.#extractor.write("(() => {})(\n");
      this.#extractor.copy(tag.args.value);
      this.#extractor.write("\n);\n");
    }

    const renderId = this.#getRenderId(tag);

    if (renderId) {
      this.#extractor.write(
        `${VAR_INTERNAL}.assertRendered(${VAR_INTERNAL}.rendered, ${renderId}, `
      );
    }

    if (tagName) {
      const def = this.#lookup.getTag(tagName);
      let isHtml = false;
      let tagId: string | undefined;

      if (def) {
        this.#referencedTags.add(def);
        tagId = internalTagVar(def.name);
        isHtml = def.html;
      }

      if (!isHtml && isValidIdentifier(tagName)) {
        this.#extractor.write(`${VAR_INTERNAL}.render(`);
        if (def) {
          // TODO: must change for js mode.
          this.#extractor
            .write(
              `\
// @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
(1 as unknown as MARKO_NOT_DECLARED extends any ? 0 extends 1 & typeof `
            )
            .copy(tag.name)
            .write(` ? typeof ${tagId!} : typeof `)
            .copy(tag.name)
            .copy(tag.typeArgs)
            .write(" : never)");
        } else {
          this.#extractor.copy(tag.name).copy(tag.typeArgs);
        }

        this.#extractor.write(")(");
      } else if (tagId) {
        this.#extractor.write(tagId).copy(tag.typeArgs).write("(");
      } else {
        // TODO: must change for js mode. Maybe `Marko.internal.unknown?
        this.#extractor.write(`${VAR_INTERNAL}.render(1 as unknown)(`);
      }
    } else {
      this.#extractor.write(`${VAR_INTERNAL}.render(`);
      this.#writeDynamicTagName(tag);
      this.#extractor.write(")(");
    }

    this.#writeTagInputObject(tag);

    if (renderId) {
      this.#extractor.write(`)`);
    }

    this.#extractor.write(");\n");

    if (renderId && tag.var) {
      this.#extractor.write(`const { ${ATTR_UNAMED}:\n`);
      this.#copyWithMutationsReplaced(tag.var.value);
      this.#extractor.write(
        `\n} = ${VAR_INTERNAL}.rendered.returns[${renderId}];\n`
      );
    }
  }

  #writeDynamicTagName(tag: Node.ParentTag) {
    if (
      tag.name.expressions.length === 1 &&
      isEmptyRange(tag.name.quasis[0]) &&
      isEmptyRange(tag.name.quasis[1])
    ) {
      this.#extractor.copy(tag.name.expressions[0].value);
    } else {
      this.#writeTemplateLiteral(tag.name);
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

  #writeAttrs(initialSep: string, tag: Node.ParentTag) {
    let sep = initialSep;

    if (tag.shorthandId) {
      this.#extractor.write("id:");
      this.#writeTemplateLiteral(tag.shorthandId);
      sep = SEP_COMMA_NEW_LINE;
    }

    if (tag.shorthandClassNames) {
      this.#extractor.write(`${sep}class: \``);
      sep = SEP_EMPTY;

      for (const shorthandClassName of tag.shorthandClassNames) {
        this.#extractor.write(sep);
        this.#writeTemplateLiteralContent(shorthandClassName);
        sep = SEP_SPACE;
      }

      this.#extractor.write("`");
      sep = SEP_COMMA_NEW_LINE;
    }

    if (tag.attrs) {
      for (const attr of tag.attrs) {
        switch (attr.type) {
          case NodeType.AttrSpread:
            this.#extractor.write(`${sep}...(\n`);
            this.#copyWithMutationsReplaced(attr.value);
            this.#extractor.write("\n)");
            sep = SEP_COMMA_NEW_LINE;
            break;
          case NodeType.AttrNamed: {
            const isDefault = isEmptyRange(attr.name);
            const name = isDefault ? ATTR_UNAMED : attr.name;
            const value = attr.value;

            // This is printed before the object key so that we can use the
            // position of the default attribute even though there is no actual name in the source.
            const defaultMapPosition = isDefault ? attr.name : undefined;

            if (value) {
              switch (value.type) {
                case NodeType.AttrMethod:
                  this.#extractor
                    .write(`${sep}"`)
                    .copy(defaultMapPosition)
                    .copy(name)
                    .write('"')
                    .copy(value.typeParams);
                  this.#copyWithMutationsReplaced(value.params);
                  this.#copyWithMutationsReplaced(value.body);
                  break;
                case NodeType.AttrValue:
                  if (value.bound) {
                    const memberExpressionStart =
                      getBoundAttrMemberExpressionStartOffset(value);
                    this.#extractor
                      .write(`${sep}"`)
                      .copy(defaultMapPosition)
                      .copy(name)
                      .write('Change"');

                    if (memberExpressionStart === undefined) {
                      // Should have bound to an identifier, so we inline a function to assign to it.

                      this.#extractor
                        .write(
                          `(${VAR_TEMPLATE}) {\n${
                            isMutatedVar(tag.parent, this.#read(value.value))
                              ? `${VAR_DYNAMIC_PREFIX}.mutate.`
                              : ""
                          }`
                        )
                        .copy(value.value)
                        .write(`= ${VAR_TEMPLATE};\n}${SEP_COMMA_NEW_LINE}"`)
                        .copy(defaultMapPosition)
                        .copy(name)
                        .write('": (\n')
                        .copy(value.value)
                        .write("\n)");
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
                        .write(": (\n")
                        .copy(memberObjectRange)
                        .write("`${")
                        .copy(memberPropertyRange)
                        .write("}Change`")
                        .copy(memberPropertyCloseRange)
                        .write(`)${SEP_COMMA_NEW_LINE}"`)
                        .copy(defaultMapPosition)
                        .copy(name)
                        .write('": (\n')
                        .copy(memberObjectRange)
                        .copy(memberPropertyRange)
                        .copy(memberPropertyCloseRange)
                        .write("\n)");
                    } else {
                      // If we match here then we bound to a static member expression.
                      this.#extractor
                        .write(": ")
                        .copy(value.value)
                        .write(`Change${SEP_COMMA_NEW_LINE}"`)
                        .copy(defaultMapPosition)
                        .copy(name)
                        .write('": (\n')
                        .copy(value.value)
                        .write("\n)");
                    }
                  } else {
                    this.#extractor
                      .write(`${sep}"`)
                      .copy(defaultMapPosition)
                      .copy(name)
                      .write('": (\n');
                    this.#copyWithMutationsReplaced(value.value);
                    this.#extractor.write("\n)");
                  }

                  break;
              }
            } else if (attr.args) {
              this.#extractor
                .write(`${sep}"`)
                .copy(defaultMapPosition)
                .copy(name)
                .write(`": ${VAR_INTERNAL}.bind(component, (\n`)
                .copy(attr.args.value)
                .write("\n))");
            } else {
              this.#extractor
                .write(`${sep}"`)
                .copy(defaultMapPosition)
                .copy(name)
                .write('": true');
            }

            sep = SEP_COMMA_NEW_LINE;
            break;
          }
        }
      }
    }

    return sep;
  }

  #writeAttrTags(
    initialSep: string,
    { staticAttrTags, dynamicAttrTagParents }: ProcessedBody
  ) {
    let sep = initialSep;
    let wasMerge = false;

    if (dynamicAttrTagParents) {
      if (staticAttrTags) {
        this.#extractor.write(`${sep}...${VAR_INTERNAL}.mergeAttrTags({\n`);
        wasMerge = true;
      } else if (dynamicAttrTagParents.length > 1) {
        this.#extractor.write(`${sep}...${VAR_INTERNAL}.mergeAttrTags(\n`);
        wasMerge = true;
      } else {
        this.#extractor.write(`${sep}...`);
      }
      sep = SEP_EMPTY;
    }

    if (staticAttrTags) {
      sep = this.#writeStaticAttrTags(sep, staticAttrTags);
      if (dynamicAttrTagParents) this.#extractor.write("\n}");
    }

    if (dynamicAttrTagParents) {
      sep = this.#writeDynamicAttrTagParents(sep, dynamicAttrTagParents);
      if (wasMerge) this.#extractor.write("\n)");
    }

    return sep;
  }

  #writeStaticAttrTags(
    initialSep: string,
    staticAttrTags: Exclude<ProcessedBody["staticAttrTags"], undefined>
  ) {
    let sep = initialSep;
    for (const nameText in staticAttrTags) {
      const attrTag = staticAttrTags[nameText];
      const attrTagDef = this.#lookup.getTag(nameText);
      const isRepeated = attrTag.length > 1 ? true : attrTagDef?.isRepeated;
      const name =
        attrTagDef?.targetProperty ||
        nameText.slice(-nameText.lastIndexOf(":"));

      this.#extractor.write(`${sep}"${name}": `);
      sep = SEP_EMPTY;

      if (isRepeated) {
        this.#extractor.write("[\n");
      }

      for (const childNode of attrTag) {
        this.#extractor.write(sep);
        this.#writeTagInputObject(childNode);
        sep = SEP_COMMA_NEW_LINE;
      }

      if (isRepeated) {
        this.#extractor.write("\n]");
      }
    }

    return sep;
  }

  #writeDynamicAttrTagParents(
    initialSep: string,
    dynamicAttrTagParents: Exclude<
      ProcessedBody["dynamicAttrTagParents"],
      undefined
    >
  ) {
    let sep = initialSep;
    for (const tag of dynamicAttrTagParents) {
      switch (tag.nameText) {
        case "if": {
          // @ts-expect-error we know we are in an If Tag
          declare const tag: IfTag;
          const alternates = IF_TAG_ALTERNATES.get(tag);
          this.#writeComments(tag);
          this.#extractor
            .write(`${sep}((\n`)
            .copy(
              tag.args?.value ||
                this.#getAttrValue(tag, ATTR_UNAMED) ||
                "undefined"
            )
            .write("\n) ? ");
          sep = SEP_COMMA_NEW_LINE;

          this.#extractor.write("{\n");
          const body = this.#processBody(tag);
          if (body) this.#writeAttrTags(SEP_EMPTY, body);
          this.#extractor.write("\n} ");

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

              this.#extractor.write("{\n");
              const body = this.#processBody(tag);
              if (body) this.#writeAttrTags(SEP_EMPTY, body);
              this.#extractor.write("\n}");
            }
          }

          if (needsAlternate) {
            this.#extractor.write(" : {}");
          }

          this.#extractor.write(")\n");
          break;
        }
        case "for": {
          this.#extractor.write(`${sep}${VAR_INTERNAL}.forAttrTag({\n`);
          sep = SEP_COMMA_NEW_LINE;

          // Adds a comment containing the tag name inside the attrs
          // this causes any errors which span all of the attributes
          // to show on the tag.
          this.#extractor.write("/*").copy(tag.name).write("*/\n");
          this.#writeAttrs(SEP_EMPTY, tag);
          this.#extractor.write("\n}, \n");
          this.#writeComments(tag);
          this.#extractor
            .copy(tag.typeParams)
            .write("(\n")
            .copy(tag.params?.value)
            .write("\n) => ({\n");

          const body = this.#processBody(tag);

          // It's technically impossible to have a for tag which has no body and attribute tags.
          // This is unlike the `<if>` tag which gets marked as an attribute tag parent if
          // the alternates (`<else>` and `<elseif>`) have attribute tags.
          // We keep the check here just incase this changes in the future to eg allow an `<else>`
          // tag to be used with the `<for>` tag.
          if (body) this.#writeAttrTags(SEP_EMPTY, body);
          this.#extractor.write("\n}))\n");
          break;
        }
        case "while": {
          this.#writeComments(tag);
          this.#extractor
            .write(`${sep + VAR_INTERNAL}.mergeAttrTags((\n`)
            .copy(tag.args?.value || "undefined")
            .write("\n) ? [{\n");
          sep = SEP_COMMA_NEW_LINE;
          const body = this.#processBody(tag);
          this.#writeAttrTags(SEP_EMPTY, body!);
          this.#extractor.write("\n}] : [])\n");
          break;
        }
      }
    }

    return sep;
  }

  #writeTagInputObject(tag: Node.ParentTag) {
    if (!tag.params) this.#writeComments(tag);

    this.#extractor.write("{\n");

    // Adds a comment containing the tag name inside the attrs
    // this causes any errors which span all of the attributes
    // to show on the tag.
    this.#extractor.write("/*");

    if (tag.nameText) {
      this.#extractor.copy(tag.name);
    } else {
      this.#writeDynamicTagName(tag);
    }

    this.#extractor.write("*/\n");

    const body = this.#processBody(tag);
    let sep = this.#writeAttrs(SEP_EMPTY, tag);

    if (body) {
      sep = this.#writeAttrTags(sep, body);

      if (body.renderBody) {
        this.#extractor.write(`${sep}[`);

        // Adds a comment containing the tag name inside the renderBody key
        // this causes any errors which are just for the renderBody
        // to show on the tag.
        this.#extractor.write("/*");

        if (tag.nameText) {
          this.#extractor.copy(tag.name);
        } else {
          this.#writeDynamicTagName(tag);
        }

        this.#extractor.write("*/\n");

        this.#extractor.write(`"renderBody"]: ${VAR_INTERNAL}.`);

        if (tag.params) {
          this.#writeComments(tag);
          this.#extractor
            .write("body(function *")
            .copy(tag.typeParams)
            .write("(\n");
          this.#copyWithMutationsReplaced(tag.params.value);
          this.#extractor.write("\n) {\n");
        } else {
          this.#extractor.write(`inlineBody((() => {\n`);
        }

        const localBindings = getHoistSources(tag);
        const didReturn = this.#writeChildren(tag, body.renderBody);

        if (tag.params) {
          if (localBindings) {
            this.#extractor.write(`yield `);
            this.#writeObjectKeys(localBindings);
            this.#extractor.write(`;\n`);
          }

          if (didReturn) {
            this.#extractor.write(`return ${VAR_DYNAMIC_PREFIX}.return;\n`);
          } else {
            this.#extractor.write("return;\n");
          }
          this.#extractor.write("\n})");
        } else {
          if (didReturn || localBindings) {
            this.#extractor.write("return {\n");

            if (localBindings) {
              this.#extractor.write(`scope: `);
              this.#writeObjectKeys(localBindings);
              this.#extractor.write(didReturn ? ",\n" : "\n");
            }

            if (didReturn) {
              this.#extractor.write(`return: ${VAR_DYNAMIC_PREFIX}.return`);
            }

            this.#extractor.write("\n};");
          }

          this.#extractor.write("\n})())");
        }
      }
    }

    this.#extractor.write("\n}");
  }

  #writeTemplateLiteral(template: Ranges.Template) {
    this.#extractor.write("`");
    this.#writeTemplateLiteralContent(template);
    this.#extractor.write("`");
  }

  #writeTemplateLiteralContent({ expressions, quasis }: Ranges.Template) {
    this.#extractor.copy(quasis[0]);

    for (let i = 0; i < expressions.length; i++) {
      this.#extractor
        .write("${")
        .copy(expressions[i].value)
        .write(' || ""}')
        .copy(quasis[i + 1]);
    }
  }

  #writeObjectKeys(keys: Iterable<string>) {
    let sep = SEP_EMPTY;
    this.#extractor.write("{");

    for (const key of keys) {
      this.#extractor.write(sep + key);
      sep = SEP_COMMA_SPACE;
    }

    this.#extractor.write("}");
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
      this.#extractor.write(`${VAR_DYNAMIC_PREFIX}.mutate.`);

      curOffset = nextOffset;
      minIndex = maxIndex + 1;
      // eslint-disable-next-line no-constant-condition
    } while (true);
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
                            nextChild.args?.value ||
                            this.#getAttrValue(nextChild, ATTR_UNAMED),
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

    return { renderBody, staticAttrTags, dynamicAttrTagParents };
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

  #getRenderId(tag: Node.ParentTag) {
    let renderId = this.#renderIds.get(tag);
    if ((renderId === undefined && tag.var) || hasHoists(tag)) {
      renderId = this.#renderId++;
      this.#renderIds.set(tag, renderId);
    }

    return renderId;
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

function isValueAttribute(
  attr: Node.AttrNode
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
  return def && ((def as any).types || def.template || def.renderer);
}

function internalTagVar(name: string) {
  return `${VAR_TEMPLATE}.tags["${name}"]`;
}

function isWhitespaceCode(code: number) {
  // For all practical purposes, the space character (32) and all the
  // control characters below it are whitespace.
  // This is also what the htmljs-parser considers a whitespace.
  return code <= 32;
}

function isEmptyRange(range: Range) {
  return range.start === range.end;
}
