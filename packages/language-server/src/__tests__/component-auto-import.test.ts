import assert from "node:assert/strict";

import { Project } from "@marko/language-tools";
import path from "path";
import { CancellationToken } from "vscode-languageserver";
import { URI } from "vscode-uri";

import MarkoLanguageService, { documents } from "../service";
import * as workspace from "../utils/workspace";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

// `doComplete` reads editor config through the workspace connection; a stub that
// resolves every section to `{}` keeps the default preferences (auto-imports on).
workspace.setup({
  onDidChangeConfiguration() {},
  workspace: { getConfiguration: async () => ({}) },
} as never);

// A fresh virtual directory per call avoids stale parse/project caches; it sits
// under `fixtures` so taglib/tsconfig resolution works, but nothing is written
// to disk.
let runId = 0;
function openAll(components: Record<string, string>) {
  const dir = path.join(
    __dirname,
    "fixtures",
    "script",
    `__component-${runId++}`,
  );
  const uris: Record<string, string> = {};
  const opened: string[] = [];
  for (const [rel, text] of Object.entries(components)) {
    const uri = URI.file(path.join(dir, rel)).toString();
    documents.doOpen({
      textDocument: { uri, languageId: "marko", version: 1, text },
    });
    uris[rel] = uri;
    opened.push(uri);
  }
  return {
    uris,
    dispose: () =>
      opened.forEach((uri) => documents.doClose({ textDocument: { uri } })),
  };
}

// Returns the default-export-related lines of a component's extracted module.
async function defaultExport(filename: string, text = "<div/>\n") {
  const { uris, dispose } = openAll({ [filename]: text });
  try {
    const out = (await MarkoLanguageService.commands["$/showScriptOutput"](
      uris[filename],
    )) as { content: string } | undefined;
    return (out?.content ?? "")
      .split("\n")
      .filter((line) => /export default|= new \(/.test(line))
      .join("\n");
  } finally {
    dispose();
  }
}

describe("marko component default export naming", () => {
  it("names the export for a discoverable component file", async () => {
    const out = await defaultExport("components/my-component.marko");
    assert.match(out, /const MyComponent = new \(/);
    assert.match(out, /export default MyComponent;/);
  });

  it("uses the directory name for index / self-named tag files", async () => {
    assert.match(
      await defaultExport("components/data-table/index.marko"),
      /const DataTable = new \(/,
    );
    assert.match(
      await defaultExport("tags/widget/widget.marko"),
      /const Widget = new \(/,
    );
  });

  it("leaves non-discoverable files as an anonymous export", async () => {
    // Not under a `components`/`tags` directory.
    assert.match(
      await defaultExport("src/Modal.marko"),
      /export default new \(/,
    );
    // A nested file that isn't the index or the self-named tag file.
    const nested = await defaultExport("components/foo/bar.marko");
    assert.match(nested, /export default new \(/);
    assert.doesNotMatch(nested, /const \w+ = new \(/);
  });

  it("falls back to an anonymous export when the name appears in the source", async () => {
    const out = await defaultExport(
      "components/widget.marko",
      "static const Widget = 1\n<div/>\n",
    );
    assert.match(out, /export default new \(/);
    assert.doesNotMatch(out, /const Widget = new \(/);
  });

  it("skips naming when the tag name is not a valid identifier", async () => {
    assert.match(
      await defaultExport("components/3d-view.marko"),
      /export default new \(/,
    );
  });

  it("offers a clean `import MyComponent` auto-import", async () => {
    const { uris, dispose } = openAll({
      "components/my-component.marko": "<div/>\n",
      "index.marko": "static const a = MyComponent\n",
    });
    try {
      const doc = documents.get(uris["index.marko"])!;
      const text = "static const a = MyComponent\n";
      const result = await MarkoLanguageService.doComplete(
        doc,
        {
          textDocument: { uri: uris["index.marko"] },
          position: doc.positionAt(text.indexOf("MyComponent") + 11),
          context: { triggerKind: 1 },
        } as never,
        CancellationToken.None,
      );
      const items = Array.isArray(result) ? result : (result?.items ?? []);
      const item = items.find(
        (i) =>
          i.label === "MyComponent" &&
          /\.marko$/.test(
            (i.data as { originalSource?: string })?.originalSource ?? "",
          ),
      );
      assert.ok(item, "expected a MyComponent auto-import");
      const resolved = await MarkoLanguageService.doCompletionResolve(
        JSON.parse(JSON.stringify(item)),
        CancellationToken.None,
      );
      assert.equal(
        (resolved?.additionalTextEdits ?? [])
          .map((e) => e.newText.trim())
          .join(""),
        'import MyComponent from "./components/my-component.marko";',
      );
    } finally {
      dispose();
    }
  });
});
