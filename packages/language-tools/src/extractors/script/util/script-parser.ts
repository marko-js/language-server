import type * as t from "@babel/types";
import {
  ParserOptions,
  parseExpression,
  parse as parseStatement,
} from "@babel/parser";

const plugins: ParserOptions["plugins"] = [
  "exportDefaultFrom",
  "importAssertions",
  "typescript",
];

export class ScriptParser {
  #sourceFileName: string;
  #whitespace: string;
  constructor(sourceFileName: string, code: string) {
    this.#sourceFileName = sourceFileName;
    this.#whitespace = code.replace(/[^\s]/g, " "); // used to ensure that babel provides the correct source locations.
  }

  statementAt<T = t.Statement[]>(offset: number, src: string) {
    try {
      return parseStatement(this.#whitespace.slice(0, offset) + src, {
        plugins,
        strictMode: true,
        errorRecovery: true,
        sourceType: "module",
        allowUndeclaredExports: true,
        allowSuperOutsideMethod: true,
        allowAwaitOutsideFunction: true,
        allowReturnOutsideFunction: true,
        sourceFilename: this.#sourceFileName,
      }).program.body as unknown as T extends unknown[] ? T : Readonly<[T]>;
    } catch {
      return [];
    }
  }

  expressionAt<T = t.Expression>(offset: number, src: string) {
    try {
      return parseExpression(this.#whitespace.slice(0, offset) + src, {
        plugins,
        strictMode: true,
        errorRecovery: true,
        sourceType: "module",
        allowUndeclaredExports: true,
        allowSuperOutsideMethod: true,
        allowAwaitOutsideFunction: true,
        allowReturnOutsideFunction: true,
        sourceFilename: this.#sourceFileName,
      }) as unknown as T;
    } catch {
      return;
    }
  }
}
