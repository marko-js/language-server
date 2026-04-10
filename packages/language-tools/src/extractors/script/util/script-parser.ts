import type { types as t } from "@marko/compiler";
import {
  parse as parseStatement,
  parseExpression,
} from "@marko/compiler/internal/babel";

import type { Node, Parsed } from "../../../parser";
import { isTextOnlyScript } from "./is-text-only-script";

const plugins = ["exportDefaultFrom", "importAssertions", "typescript"];

export class ScriptParser {
  #parsed: Parsed;
  #cache = new Map<number, t.Node | t.Node[] | false>();

  constructor(parsed: Parsed) {
    this.#parsed = parsed;
  }

  tagName(name: Node.OpenTagName): t.Expression[] | undefined {
    return this.#templateExpressions(name);
  }

  tagShorthandId(shorthandId: Node.ShorthandId): t.Expression[] | undefined {
    return this.#templateExpressions(shorthandId);
  }

  tagShorthandClassName(
    node: Node.ShorthandClassName,
  ): t.Expression[] | undefined {
    return this.#templateExpressions(node);
  }

  tagVar(node: Node.TagVar): t.VariableDeclarator["id"] | undefined {
    const start = node.value.start - 1;
    const expr =
      this.#cache.get(start) ??
      this.#expressionAt(start, `(${this.#parsed.read(node.value)})=>0`);
    if (expr) {
      return (expr as t.ArrowFunctionExpression)
        .params[0] as t.VariableDeclarator["id"];
    }
  }

  tagParams(node: Node.TagParams): t.FunctionParameter[] | undefined {
    const start = node.start;
    const expr =
      this.#cache.get(start) ??
      this.#expressionAt(start, `(${this.#parsed.read(node.value)})=>0`);
    if (expr) {
      return (expr as t.ArrowFunctionExpression).params;
    }
  }

  tagTypeParams(
    node: Node.TagTypeParams,
  ): t.TSTypeParameterDeclaration | undefined {
    const start = node.value.start - 1;
    const expr =
      this.#cache.get(start) ??
      this.#expressionAt(start, `<${this.#parsed.read(node.value)}>()=>0`);
    if (expr) {
      return (expr as t.ArrowFunctionExpression)
        .typeParameters as t.TSTypeParameterDeclaration;
    }
  }

  tagArgs(node: Node.TagArgs): t.CallExpression["arguments"] | undefined {
    const start = node.value.start - 2;
    const expr =
      this.#cache.get(start) ??
      this.#expressionAt(start, `_(${this.#parsed.read(node.value)})`);
    if (expr) {
      return (expr as t.CallExpression).arguments;
    }
  }

  tagTypeArgs(
    node: Node.TagTypeArgs,
  ): t.TSTypeParameterInstantiation | undefined {
    const start = node.value.start - 2;
    const expr =
      this.#cache.get(start) ??
      this.#expressionAt(start, `_<${this.#parsed.read(node.value)}>()`);
    if (expr) {
      return (expr as t.CallExpression)
        .typeParameters as t.TSTypeParameterInstantiation;
    }
  }

  attrValue(node: Node.AttrValue): t.Expression | undefined {
    const start = node.value.start;
    return ((this.#cache.get(start) ??
      this.#expressionAt(start, this.#parsed.read(node.value))) ||
      undefined) as t.Expression | undefined;
  }

  attrSpread(node: Node.AttrSpread): t.Expression | undefined {
    const start = node.value.start;
    return ((this.#cache.get(start) ??
      this.#expressionAt(start, this.#parsed.read(node.value))) ||
      undefined) as t.Expression | undefined;
  }

  attrMethod(node: Node.AttrMethod): t.ObjectMethod | undefined {
    const start = node.params.start - 2;
    const expr =
      this.#cache.get(start) ??
      this.#expressionAt(
        start,
        `{_${this.#parsed.read({ start: node.params.start, end: node.body.end })}}`,
      );
    if (expr) {
      return (expr as t.ObjectExpression).properties[0] as
        | t.ObjectMethod
        | undefined;
    }
  }

  attrArgs(node: Node.AttrArgs): t.Expression | undefined {
    const start = node.value.start;
    return ((this.#cache.get(start) ??
      this.#expressionAt(start, this.#parsed.read(node.value))) ||
      undefined) as t.Expression | undefined;
  }

  placeholder(node: Node.Placeholder): t.Expression | undefined {
    const start = node.value.start;
    return ((this.#cache.get(start) ??
      this.#expressionAt(start, this.#parsed.read(node.value))) ||
      undefined) as t.Expression | undefined;
  }

  scriptBody(node: Node.ParentTag): t.Statement[] | undefined {
    if (!isTextOnlyScript(node)) return;

    const start = node.body[0].start;
    const statements =
      this.#cache.get(start) ??
      this.#statementsAt(
        start,
        this.#parsed.read({ start, end: node.body[node.body.length - 1].end }),
      );
    if (statements) {
      return statements as t.Statement[];
    }
  }

  scriptlet(node: Node.Scriptlet): t.Statement[] | undefined {
    const start = node.value.start;
    const statements =
      this.#cache.get(start) ??
      this.#statementsAt(start, this.#parsed.read(node.value));
    if (statements) {
      return statements as t.Statement[];
    }
  }

  import(node: Node.Import): t.ImportDeclaration | undefined {
    const statements =
      this.#cache.get(node.start) ??
      this.#statementsAt(node.start, this.#parsed.read(node));
    if (statements) {
      return (statements as t.Statement[])[0] as t.ImportDeclaration;
    }
  }

  export(node: Node.Export): t.ExportDeclaration | undefined {
    const statements =
      this.#cache.get(node.start) ??
      this.#statementsAt(node.start, this.#parsed.read(node));
    if (statements) {
      return (statements as t.Statement[])[0] as t.ExportDeclaration;
    }
  }

  class(node: Node.Class): t.ClassExpression | undefined {
    const expr =
      this.#cache.get(node.start) ??
      this.#expressionAt(node.start, this.#parsed.read(node));
    return (expr as t.ClassExpression) || undefined;
  }

  static(node: Node.Static): t.Statement[] | undefined {
    const start = node.start + "static ".length;
    const statements =
      this.#cache.get(start) ??
      this.#statementsAt(start, this.#parsed.read({ start, end: node.end }));
    if (statements) {
      return statements as t.Statement[];
    }
  }

  #templateExpressions(
    template: Node.OpenTagName | Node.ShorthandId | Node.ShorthandClassName,
  ): t.Expression[] | undefined {
    const { expressions } = template;
    if (!expressions.length) return;

    const result: t.Expression[] = [];
    for (const expr of expressions) {
      const start = expr.value.start;
      const parsed =
        this.#cache.get(start) ??
        this.#expressionAt(start, this.#parsed.read(expr.value));
      if (!parsed) return;
      result.push(parsed as t.Expression);
    }

    if (result.length) return result;
  }

  #statementsAt(startIndex: number, src: string): t.Statement[] | undefined {
    try {
      const pos = this.#parsed.positionAt(startIndex);
      const result = parseStatement(src, {
        plugins,
        startIndex,
        startLine: pos.line + 1,
        startColumn: pos.character,
        strictMode: true,
        errorRecovery: true,
        sourceType: "module",
        allowUndeclaredExports: true,
        allowSuperOutsideMethod: true,
        allowAwaitOutsideFunction: true,
        allowReturnOutsideFunction: true,
        sourceFilename: this.#parsed.filename,
      }).program.body as t.Statement[];
      if (result.length) {
        this.#cache.set(startIndex, result);
        return result;
      }
    } catch {
      // ignore parse errors.
    }

    this.#cache.set(startIndex, false);
  }
  #expressionAt(startIndex: number, src: string): t.Expression | undefined {
    try {
      const pos = this.#parsed.positionAt(startIndex);
      const result = parseExpression(src, {
        plugins,
        startIndex,
        startLine: pos.line + 1,
        startColumn: pos.character,
        strictMode: true,
        errorRecovery: true,
        sourceType: "module",
        allowUndeclaredExports: true,
        allowSuperOutsideMethod: true,
        allowAwaitOutsideFunction: true,
        allowReturnOutsideFunction: true,
        sourceFilename: this.#parsed.filename,
      }) as t.Expression;
      this.#cache.set(startIndex, result);
      return result;
    } catch {
      this.#cache.set(startIndex, false);
    }
  }
}
