import assert from "assert";

import { RuntimeAPI } from "../get-runtime-api";
import { getRuntimeOverrides } from "../runtime-overrides";

const overloadBlock = (body: string) =>
  `/** @marko-overload-start */${body}/** @marko-overload-end */`;

describe("getRuntimeOverrides", () => {
  it("reads each runtime's overloads regardless of which was read first", () => {
    // The first runtime's block ends past where the second runtime's starts.
    const classTypes = `${" ".repeat(100)}${overloadBlock("render(): Return;")}`;
    const tagsTypes = overloadBlock("mount(): Return;");

    assert.equal(
      getRuntimeOverrides(RuntimeAPI.class, classTypes, "", "", "R"),
      "render(): R;",
    );
    assert.equal(
      getRuntimeOverrides(RuntimeAPI.tags, tagsTypes, "", "", "R"),
      "mount(): R;",
    );
  });
});
