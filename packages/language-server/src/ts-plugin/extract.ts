import { relativeImportPath } from "relative-import-path";

import type { TagDefinition } from "@marko/babel-utils";
import { type Node, NodeType, type Range, type Ranges } from "../utils/parser";
import type { MarkoFile } from "../utils/file";
import { createExtractor } from "../utils/extractor";
import { isValidIdentifier } from "../utils/is-valid-identifier";

const blockReg = /(?<=\s*){/y;

// TODO: this file should be passed a `component.{js,ts}` path if there is one.
// TODO: attr tags
// TODO: tag var assignments (should call changeHandlers?...)
// TODO: automatically hoist tag vars as high as possible.

/**
 * Iterate over the Marko CST and extract all the script content.
 */
export function extractScripts({
  code,
  filename,
  parsed,
  project: { lookup },
}: Pick<MarkoFile, "code" | "filename" | "parsed" | "project">) {
  const { program } = parsed;
  const extractor = createExtractor(parsed);
  const addExpr = (range: Range) => extractor.write`(${range});\n`;
  const addTmplAsString = ({ expressions, quasis }: Ranges.Template) => {
    extractor.write`\`${quasis[0]}`;

    for (let i = expressions.length; i--; ) {
      extractor.write`\${${expressions[i].value}||""}${quasis[i + 1]}`;
    }

    extractor.write`\``;
  };
  const addAttrs = (tag: Node.Tag) => {
    if (tag.attrs) {
      for (const attr of tag.attrs) {
        switch (attr.type) {
          case NodeType.AttrSpread:
            extractor.write`...(${attr.value}),\n`;
            break;
          case NodeType.AttrNamed: {
            const name = isEmpty(attr.name) ? "default" : attr.name;
            const value = attr.value;
            extractor.write`"${name}"`;

            if (value) {
              switch (value.type) {
                case NodeType.AttrMethod:
                  extractor.write`(${value.params}){${value.body}},\n`;
                  break;
                case NodeType.AttrValue:
                  extractor.write`:(${value.value}),\n`;

                  if (value.bound) {
                    extractor.write`${name}Change(_${name}){${value.value}=_${name}},\n`;
                  }

                  break;
              }
            } else {
              extractor.write`:true,\n`;
            }

            break;
          }
        }
      }
    }

    if (tag.shorthandId) {
      extractor.write`id:`;
      addTmplAsString(tag.shorthandId);
      extractor.write`,\n`;
    }

    if (tag.shorthandClassNames) {
      extractor.write`class:""`;
      for (const shorthandClassName of tag.shorthandClassNames) {
        extractor.write`+`;
        addTmplAsString(shorthandClassName);
      }

      extractor.write`,\n`;
    }
  };

  const visit = (node: Node.ChildNode) => {
    switch (node.type) {
      case NodeType.Comment:
        extractor.write`/*${node.value}*/`;
        return;
      case NodeType.Placeholder:
        addExpr(node.value);
        return;
      case NodeType.Scriptlet:
        extractor.write`${node.value};\n`;
        return;
      case NodeType.Tag: {
        const tagName = node.nameText;
        if (tagName) {
          switch (tagName) {
            case "attrs":
            case "return":
              // Handled at the root level.
              return;
          }

          const tagDef = lookup.getTag(tagName);

          if (tagDef?.html) {
            if (node.var) {
              extractor.write`let ${node.var.value} = ()=>document.${
                tagDef.htmlType === "svg"
                  ? "createElementNS('http://www.w3.org/2000/svg',"
                  : "createElement("
              }`;
              addTmplAsString(node.name);
              extractor.write`;\n`;
            }

            extractor.write`{\n`;
            addAttrs(node);
            extractor.write`\n}`;

            if (node.body) {
              extractor.write`{\n`;
              for (const child of node.body) visit(child);
              extractor.write`\n}`;
            }

            return;
          }

          if (node.args) addExpr(node.args.value);
          if (node.var) extractor.write`let ${node.var.value} = `;

          extractor.write`(1 as any as typeof `;

          // TODO:
          // * handle return value
          // * must be kind of like a dynamic tag, at least if it's an identifier.
          // * probably should do something like `(1 as unknown as (attributes: Parameters<import("child.marko")>[0]) => void)(attrs)`
          const templatePath = resolveTemplatePath(filename, tagDef);
          const childImport = templatePath
            ? `import("${templatePath}").default`
            : "(1 as any)";
          // Check if this is possibly an identifier.
          if (isValidIdentifier(tagName)) {
            if (tagDef) {
              extractor.write`
// @ts-expect-error We expect the compiler to error because we are checking the tag is defined.
(1 as unknown as MARKO_NOT_DECLARED extends any ? 0 extends 1 & ${node.name} ? ${childImport} : ${node.name} : never)
`;
            } else {
              extractor.write`${node.name}`;
            }
          } else {
            extractor.write`${childImport}`;
          }
        } else {
          // TODO: print dynamic tag call.
        }

        extractor.write`)({\n`;
        addAttrs(node);

        if (node.body) {
          extractor.write`renderBody(${node.params || ""}){\n`;
          for (const child of node.body) visit(child);
          extractor.write`\n},\n`;
        }

        extractor.write`\n});\n`;

        return;
      }
      default:
        // add`${node.value};`;
        return;
    }
  };

  const attrsTag = program.body.find(
    (child) => child.type === NodeType.Tag && child.nameText === "attrs"
  ) as Node.Tag | undefined;
  const returnTag = program.body.find(
    (child) => child.type === NodeType.Tag && child.nameText === "return"
  ) as Node.Tag | undefined;

  for (const node of program.static) {
    switch (node.type) {
      case NodeType.Class:
        // TODO needs to extend Marko.Component
        addExpr(node);
        break;
      case NodeType.Export:
        extractor.write`${node}\n`;
        break;
      case NodeType.Import: {
        const tagImport = /(?<=(['"]))<([^\1>]+)>(?=\1)/g;
        tagImport.lastIndex = node.start + "import ".length;
        const tagImportMatch = tagImport.exec(code);

        if (tagImportMatch) {
          // Here we're looking for Marko's shorthand imports for tags and pre-resolving them so typescript knows what we're loading.
          const [{ length }, , tagName] = tagImportMatch;
          const templatePath = resolveTemplatePath(
            filename,
            lookup.getTag(tagName)
          );
          if (templatePath) {
            extractor.write`${{
              start: node.start,
              end: tagImportMatch.index,
            }}${templatePath}${{
              start: tagImportMatch.index + length,
              end: node.end,
            }}\n`;
            break;
          }
        }

        extractor.write`${node}\n`;
        break;
      }
      case NodeType.Static: {
        let start = node.start + "static ".length;
        let end = node.end;
        blockReg.lastIndex = start;

        if (blockReg.test(code)) {
          start = blockReg.lastIndex;
          end--;
        }

        extractor.write`${{
          start,
          end,
        }}\n`;
        break;
      }
      case NodeType.Comment:
        extractor.write`/*${node.value}*/`;
        break;
    }
  }

  if (attrsTag) {
    extractor.write`export default ((\n${attrsTag.var?.value || ""}\n) => {\n`;
  } else {
    extractor.write`// @ts-expect-error We expect the compiler to error because we are checking if "Input" is defined as a type.
type __input__ = MARKO_NOT_DECLARED extends any ? 0 extends 1 & Input ? Record<string, any> : Input : never;
export default ((component, input: __input__, state) => {`;
    // TODO should output code to invoke this function with something like
    // 1 as unknown as typeof __input__, 1 as unknown as Component["state"], 1 as Component
    // state should be undefined if we didn't find a component.
    // we also need to check for an importable class component here.
  }

  if (returnTag?.attrs) {
    extractor.write`return {\n`;
    addAttrs(returnTag);
    extractor.write`\n};\n`;
  }

  for (const node of program.body) {
    visit(node);
  }

  extractor.write`\n}) as unknown as Marko.Template<__input__>`;
  return extractor.end();
}

function isEmpty(range: Range) {
  return range.start === range.end;
}

function resolveTemplatePath(from: string, def: TagDefinition | undefined) {
  // TODO: should handle when there is no renderer.
  const filename = def && (def.template || def.renderer);
  if (filename) {
    return from ? relativeImportPath(from, filename) : filename;
  }
}
