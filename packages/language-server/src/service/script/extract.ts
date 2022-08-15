import type { TagDefinition, TaglibLookup } from "@marko/babel-utils";
import { types as t } from "@marko/compiler";
import { relativeImportPath } from "relative-import-path";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import {
  type Node,
  NodeType,
  type Parsed,
  type Range,
  type Ranges,
} from "../../utils/parser";
import { createExtractor } from "../../utils/extractor";

const blockReg = /(?<=\s*){/y;

// TODO: this file should be passed a `component.{js,ts}` path if there is one.

/**
 * Iterate over the Marko CST and extract all the script content.
 */
export function extractScripts(
  doc: TextDocument,
  parsed: Parsed,
  lookup: TaglibLookup
) {
  const code = doc.getText();
  const { program } = parsed;
  const { fsPath } = URI.parse(doc.uri);
  const extractor = createExtractor(parsed);
  const addExpr = (range: Range) => extractor.write`(${range});\n`;
  const addTmpl = (range: Ranges.Template) => {
    for (const expr of range.expressions) extractor.write`(${expr.value});\n`;
  };
  const addAttrs = (tag: Node.Tag) => {
    extractor.write`{`;
    if (tag.attrs) {
      let first = true;
      for (const attr of tag.attrs) {
        if (first) {
          first = false;
        } else {
          extractor.write`,`;
        }

        switch (attr.type) {
          case NodeType.AttrSpread:
            extractor.write`...(${attr.value})`;
            break;
          case NodeType.AttrNamed: {
            const name = isEmpty(attr.name) ? "default" : attr.name;
            const value = attr.value;
            extractor.write`"${name}"`;

            if (value) {
              switch (value.type) {
                case NodeType.AttrMethod:
                  extractor.write`(${value.params}){${value.body}}`;
                  break;
                case NodeType.AttrValue:
                  if (value.value) {
                    extractor.write`:(${value.value})`;

                    if (value.bound) {
                      extractor.write`,${name}Change(_${name}){${value.value}=_${name}}`;
                    }
                  } else {
                    extractor.write`:true`;
                  }
                  break;
              }
            }

            break;
          }
        }
      }
    }
    extractor.write`}`;
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
            // TODO
          } else {
            // TODO:
            // * handle return value
            // * must be kind of like a dynamic tag, at least if it's an identifier.
            // * probably should do something like `(1 as unknown as (attributes: Parameters<import("child.marko")>[0]) => void)(attrs)`
            const templatePath = resolveTemplatePath(fsPath, tagDef);
            const childImport = templatePath
              ? `import("${templatePath}")`
              : "(1 as any)";
            // Check if this is possibly an identifier.
            if (t.isValidIdentifier(tagName)) {
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
          }
        } else {
          // TODO: print dynamic tag call.
        }

        if (node.attrs) {
          extractor.write`(`;
          addAttrs(node);
          extractor.write`);\n`;
        }

        addTmpl(node.name);

        if (node.shorthandId) {
          addTmpl(node.shorthandId);
        }

        if (node.shorthandClassNames) {
          for (const shorthandClassName of node.shorthandClassNames) {
            addTmpl(shorthandClassName);
          }
        }

        if (node.args) addExpr(node.args.value);
        if (node.var) extractor.write`let ${node.var.value};\n`;
        if (node.body) {
          extractor.write`{\n`;
          for (const child of node.body) visit(child);
          extractor.write`\n}`;
        }

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
            fsPath,
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
    if (attrsTag.var) {
      extractor.write`export default ((\n${attrsTag.var.value}\n) => {\n`;
    } else {
      extractor.write`export default (() => {\n`;
    }
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
    extractor.write`return `;
    addAttrs(returnTag);
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

function resolveTemplatePath(from: string, tagDef: TagDefinition | undefined) {
  // TODO: should handle when there is no renderer.
  if (tagDef) {
    const templatePath = tagDef.template ?? tagDef.renderer;
    if (templatePath)
      return from ? relativeImportPath(from, templatePath) : templatePath;
  }
}
