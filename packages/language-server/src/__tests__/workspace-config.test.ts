import assert from "node:assert/strict";

import * as workspace from "../utils/workspace";

describe("workspace config", () => {
  it("falls back to an empty section when the client cannot answer", async () => {
    workspace.setup({
      onDidChangeConfiguration() {},
      workspace: {
        getConfiguration: () => Promise.reject(new Error("unsupported")),
      },
    } as never);

    assert.deepEqual(await workspace.getConfig("typescript.unanswered"), {});
  });
});
