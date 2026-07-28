import assert from "node:assert/strict";

import { CancellationToken, type SemanticTokens } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

import { createService } from "../service/create-service";
import {
  decodeTsClassification,
  TokenModifier,
  TokenType,
} from "../service/semantic-tokens";
import type { SemanticToken } from "../service/types";
import { formatSemanticTokens } from "./util/semantic-tokens";

const doc = TextDocument.create("file:///test.marko", "marko", 0, "");
const fullParams = { textDocument: { uri: doc.uri } };

function token(
  line: number,
  start: number,
  end: number,
  type = TokenType.variable,
  modifiers = 0,
): SemanticToken {
  return {
    range: { start: { line, character: start }, end: { line, character: end } },
    type,
    modifiers,
  };
}

function getTokens(
  pluginTokens: (SemanticToken[] | undefined)[],
  params: typeof fullParams & { range?: SemanticToken["range"] } = fullParams,
  forDoc = doc,
) {
  const service = createService(
    pluginTokens.map((tokens) => ({ getSemanticTokens: () => tokens })),
  );
  return service.getSemanticTokens(
    forDoc,
    params,
    CancellationToken.None,
  ) as Promise<SemanticTokens | undefined>;
}

describe("semantic tokens facade", () => {
  it("merges, sorts, and delta-encodes tokens across plugins", async () => {
    const result = await getTokens([
      [token(2, 4, 6, TokenType.class)],
      [
        token(0, 5, 8, TokenType.function, TokenModifier.async),
        token(0, 0, 3, TokenType.keyword),
      ],
    ]);

    assert.deepEqual(result?.data, [
      ...[0, 0, 3, TokenType.keyword, 0],
      ...[0, 5, 3, TokenType.function, TokenModifier.async],
      ...[2, 4, 2, TokenType.class, 0],
    ]);
    assert.equal(result?.resultId, undefined);
  });

  it("drops a token overlapping one from an earlier plugin", async () => {
    const result = await getTokens([
      [token(0, 2, 6, TokenType.class)],
      [token(0, 4, 8, TokenType.variable), token(0, 6, 9, TokenType.property)],
    ]);

    assert.deepEqual(result?.data, [
      ...[0, 2, 4, TokenType.class, 0],
      ...[0, 4, 3, TokenType.property, 0],
    ]);
  });

  it("drops a token duplicating an earlier plugin's start", async () => {
    const result = await getTokens([
      [token(1, 1, 4, TokenType.class)],
      [token(1, 1, 4, TokenType.variable)],
    ]);

    assert.deepEqual(result?.data, [...[1, 1, 3, TokenType.class, 0]]);
  });

  it("splits multiline tokens per line and drops empty ones", async () => {
    const multilineDoc = TextDocument.create(
      "file:///multiline.marko",
      "marko",
      0,
      "hello\nworld\nok\n",
    );
    const result = await getTokens(
      [
        [
          {
            range: {
              start: { line: 0, character: 2 },
              end: { line: 2, character: 1 },
            },
            type: TokenType.string,
            modifiers: 0,
          },
          token(3, 3, 3),
          token(4, 1, 2),
        ],
      ],
      fullParams,
      multilineDoc,
    );

    assert.deepEqual(result?.data, [
      ...[0, 2, 3, TokenType.string, 0],
      ...[1, 0, 5, TokenType.string, 0],
      ...[1, 0, 1, TokenType.string, 0],
      ...[2, 1, 1, TokenType.variable, 0],
    ]);
  });

  it("resolves overlaps identically for full and range requests", async () => {
    const pluginTokens = [
      [token(0, 2, 6, TokenType.class)],
      [token(0, 4, 8, TokenType.property)],
    ];

    const full = await getTokens(pluginTokens);
    assert.deepEqual(full?.data, [...[0, 2, 4, TokenType.class, 0]]);

    const ranged = await getTokens(pluginTokens, {
      ...fullParams,
      range: {
        start: { line: 0, character: 7 },
        end: { line: 0, character: 20 },
      },
    });
    assert.deepEqual(ranged?.data, []);
  });

  it("filters to the requested range", async () => {
    const result = await getTokens(
      [[token(0, 0, 2), token(2, 4, 8), token(5, 0, 3)]],
      {
        ...fullParams,
        range: {
          start: { line: 1, character: 0 },
          end: { line: 3, character: 0 },
        },
      },
    );

    assert.deepEqual(result?.data, [...[2, 4, 4, TokenType.variable, 0]]);
  });

  it("ignores a throwing plugin and returns nothing when no plugin responds", async () => {
    const service = createService([
      {
        getSemanticTokens() {
          throw new Error("boom");
        },
      },
      { getSemanticTokens: () => [token(4, 0, 2)] },
    ]);
    const result = (await service.getSemanticTokens(
      doc,
      fullParams,
      CancellationToken.None,
    )) as SemanticTokens | undefined;
    assert.deepEqual(result?.data, [...[4, 0, 2, TokenType.variable, 0]]);

    assert.equal(await getTokens([undefined, []]), undefined);
  });
});

describe("decodeTsClassification", () => {
  it("splits the 2020 encoding into an aligned type index and modifier set", () => {
    assert.deepEqual(decodeTsClassification(((7 + 1) << 8) | 0b100101), {
      type: TokenType.variable,
      modifiers:
        TokenModifier.declaration | TokenModifier.async | TokenModifier.local,
    });
    assert.deepEqual(decodeTsClassification((11 + 1) << 8), {
      type: TokenType.method,
      modifiers: 0,
    });
  });

  it("rejects unclassified and out-of-range values", () => {
    assert.equal(decodeTsClassification(0), undefined);
    assert.equal(decodeTsClassification(255), undefined);
    assert.equal(decodeTsClassification((12 + 1) << 8), undefined);
  });
});

describe("formatSemanticTokens", () => {
  it("renders one readable line per token", () => {
    const code = "let a = 1;\nconst b = a;\n";
    assert.equal(
      formatSemanticTokens(code, {
        data: [
          ...[0, 4, 1, TokenType.variable, TokenModifier.declaration],
          ...[
            1,
            6,
            1,
            TokenType.variable,
            TokenModifier.declaration | TokenModifier.readonly,
          ],
          ...[0, 4, 1, TokenType.variable, 0],
        ],
      }),
      "Ln 1, Col 5 (len 1) variable [declaration] `a`\n" +
        "Ln 2, Col 7 (len 1) variable [declaration readonly] `b`\n" +
        "Ln 2, Col 11 (len 1) variable `a`\n",
    );
  });

  it("throws on out-of-order or malformed data", () => {
    assert.throws(() =>
      formatSemanticTokens("a b", { data: [0, -2, 1, TokenType.variable, 0] }),
    );
    assert.throws(() =>
      formatSemanticTokens("a b", { data: [0, 0, 0, TokenType.variable, 0] }),
    );
    assert.throws(() =>
      formatSemanticTokens("a b", { data: [0, 0, 1, 99, 0] }),
    );
    assert.throws(() =>
      formatSemanticTokens("a b", { data: [0, 0, 3, TokenType.variable, 0] }),
    );
    assert.equal(
      formatSemanticTokens("", { data: [] }),
      "(no semantic tokens)\n",
    );
  });
});
