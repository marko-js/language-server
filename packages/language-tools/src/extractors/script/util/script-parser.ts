import type { types as t } from "@marko/compiler";
import {
  parse as parseStatement,
  parseExpression,
} from "@marko/compiler/internal/babel";

import type { Parsed } from "../../../parser";

const plugins: any[] = ["exportDefaultFrom", "importAssertions", "typescript"];

export class ScriptParser {
  #parsed: Parsed;
  constructor(parsed: Parsed) {
    this.#parsed = parsed;
  }

  statementAt<T = t.Statement[]>(startIndex: number, src: string) {
    const pos = this.#parsed.positionAt(startIndex);
    try {
      return parseStatement(src, {
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
      }).program.body as unknown as T extends unknown[] ? T : Readonly<[T]>;
    } catch {
      return [];
    }
  }

  expressionAt<T = t.Expression>(startIndex: number, src: string) {
    const pos = this.#parsed.positionAt(startIndex);
    try {
      return parseExpression(src, {
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
      }) as unknown as T;
    } catch {
      return;
    }
  }
}
