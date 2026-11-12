import assert from "node:assert/strict";

import type { Connection } from "vscode-languageserver";

import setupMessages, { displayInformation } from "../utils/messages";

describe("displayed messages", () => {
  const sent: string[] = [];
  before(() =>
    setupMessages({
      sendNotification: (_type: string, msg: string) => sent.push(msg),
    } as Connection),
  );
  after(() => setupMessages(undefined!));

  it("shows a message again once three others have been shown", async () => {
    for (const msg of ["one", "two", "three", "four", "four", "one"]) {
      displayInformation(msg);
      await new Promise(setImmediate);
    }

    // The latest three are not repeated, the oldest one is forgotten.
    assert.deepEqual(sent, ["one", "two", "three", "four", "one"]);
  });
});
