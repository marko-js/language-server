import { readFileSync } from "fs";
import {
  commands,
  type Disposable,
  type ExtensionContext,
  type LanguageConfiguration,
  languages,
  Position,
  Range,
  TextEdit,
  type TextEditor,
  ViewColumn,
  window,
  workspace,
  WorkspaceEdit,
} from "vscode";
import {
  LanguageClient,
  type LanguageClientOptions,
  type ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

export async function activate(ctx: ExtensionContext) {
  const module = ctx.asAbsolutePath("dist/server");
  const transport = TransportKind.ipc;
  const serverOptions: ServerOptions = {
    run: { module, transport },
    debug: {
      module,
      transport,
      options: {
        execArgv: ["--inspect-brk=6009", "--enable-source-maps"],
        env: { DEBUG: true },
      },
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for marko text documents
    documentSelector: [
      { scheme: "file", language: "marko" },
      { scheme: "untitled", language: "marko" },
    ],
    synchronize: {
      // Synchronize the setting section 'marko' to the server
      configurationSection: "marko",
      fileEvents: workspace.createFileSystemWatcher(
        "**/{*.ts,*.mts,*.cts,*.js,*.mjs,*.cts,*.marko,*.module.css,*.module.scss,*.module.less,marko.json,marko-tag.json,tsconfig.json,jsconfig.json,package.json,package-lock.json,pnpm-lock.yaml,yarn.lock}",
        false,
        false,
        false,
      ),
    },
  };

  // Create the language client and start the client.
  client = new LanguageClient("marko", "Marko", serverOptions, clientOptions);

  client.onNotification("showError", (msg: string) => {
    void window.showErrorMessage(msg);
  });
  client.onNotification("showWarning", (msg: string) => {
    void window.showWarningMessage(msg);
  });
  client.onNotification("showInformation", (msg: string) => {
    void window.showInformationMessage(msg);
  });
  client.onNotification("executeCommand", (cmd: string) => {
    void commands.executeCommand(cmd);
  });

  ctx.subscriptions.push(
    commands.registerCommand("marko.showScriptOutput", () =>
      showOutput(
        "$/showScriptOutput",
        (uri) => uri,
        "Unable to extract script for Marko document.",
      ),
    ),
  );

  ctx.subscriptions.push(
    commands.registerCommand("marko.showHtmlOutput", () =>
      showOutput(
        "$/showHtmlOutput",
        (uri) => uri,
        "Unable to extract static HTML for Marko document.",
      ),
    ),
  );

  ctx.subscriptions.push(
    commands.registerCommand("marko.showCompiledDomOutput", () =>
      showOutput(
        "$/showCompiledOutput",
        (uri) => ({ uri, output: "dom" }),
        "Unable to compile DOM output for Marko document.",
      ),
    ),
  );

  ctx.subscriptions.push(
    commands.registerCommand("marko.showCompiledHtmlOutput", () =>
      showOutput(
        "$/showCompiledOutput",
        (uri) => ({ uri, output: "html" }),
        "Unable to compile HTML output for Marko document.",
      ),
    ),
  );

  ctx.subscriptions.push(
    commands.registerCommand("marko.formatToConciseMode", async () => {
      formatForced("concise");
    }),
  );

  ctx.subscriptions.push(
    commands.registerCommand("marko.formatToHtmlMode", async () => {
      formatForced("html");
    }),
  );

  ctx.subscriptions.push(
    commands.registerCommand("marko.restartServer", async () => {
      const restartMarko = (async () => {
        if (client.isRunning()) {
          await client.stop();
        }
        await client.start();
      })();

      await Promise.all([
        restartMarko,
        commands.executeCommand("typescript.restartTsServer"),
      ]);
    }),
  );

  ctx.subscriptions.push(...setupTagParamsPipeAutoClosing(ctx));

  // Start the client. This will also launch the server
  await client.start();
}

// `|` should only auto-close when typing the start of a tag's params (eg
// `<for█>` -> `<for|item|>`). The static config leaves the `|` pair out and we
// add it back only where the server says params can start — no `notIn` token
// scope can express that.
function setupTagParamsPipeAutoClosing(ctx: ExtensionContext): Disposable[] {
  // Reuse the static `autoClosingPairs` (which omits `|`, but keeps its `notIn`
  // scopes) so the list lives in one place, and add the `|` pair back.
  const { autoClosingPairs } = JSON.parse(
    readFileSync(ctx.asAbsolutePath("marko.configuration.json"), "utf8"),
  ) as {
    autoClosingPairs: NonNullable<LanguageConfiguration["autoClosingPairs"]>;
  };
  const autoClosingPairsWithPipe = autoClosingPairs.concat({
    open: "|",
    close: "|",
  });

  let pipeOverride: Disposable | undefined;
  const setPipeAutoClosingEnabled = (enabled: boolean) => {
    if (enabled === !!pipeOverride) return;
    if (enabled) {
      pipeOverride = languages.setLanguageConfiguration("marko", {
        autoClosingPairs: autoClosingPairsWithPipe,
      });
    } else {
      pipeOverride!.dispose();
      pipeOverride = undefined;
    }
  };

  const refresh = async (editor: TextEditor | undefined) => {
    if (editor?.document.languageId !== "marko") return;
    const { active } = editor.selection;
    try {
      const canOpenTagParams = await client.sendRequest<boolean>(
        "$/canOpenTagParams",
        {
          textDocument: { uri: editor.document.uri.toString() },
          position: { line: active.line, character: active.character },
        },
      );
      // Only apply if this is still the focused editor by the time we respond.
      if (editor === window.activeTextEditor) {
        setPipeAutoClosingEnabled(canOpenTagParams);
      }
    } catch {
      // Server not ready or request canceled; keep the current state.
    }
  };

  return [
    window.onDidChangeActiveTextEditor(refresh),
    window.onDidChangeTextEditorSelection((e) => {
      if (e.textEditor === window.activeTextEditor) void refresh(e.textEditor);
    }),
    { dispose: () => pipeOverride?.dispose() },
  ];
}

export function deactivate(): Thenable<void> | void {
  if (!client) {
    return undefined;
  }

  return client.stop();
}

async function showOutput(
  request: string,
  getParams: (uri: string) => unknown,
  unavailableMessage: string,
) {
  const editor = window.activeTextEditor;
  if (editor?.document.languageId !== "marko") {
    window.showErrorMessage(
      "You must have an open Marko file to view its output.",
    );
    return;
  }

  const result = await client.sendRequest<
    { language: string; content: string } | undefined
  >(request, getParams(editor.document.uri.toString()));

  if (result) {
    await window.showTextDocument(await workspace.openTextDocument(result), {
      preview: true,
      viewColumn: ViewColumn.Beside,
    });
  } else {
    window.showErrorMessage(unavailableMessage);
  }
}

async function formatForced(mode: "concise" | "html") {
  const { activeTextEditor } = window;
  if (!activeTextEditor) {
    window.showErrorMessage("No open Marko file detected for formatting");
    return;
  }
  const edits: TextEdit[] = await client.sendRequest("$/formatWithMode", {
    doc: activeTextEditor.document.uri.toString(),
    options: {
      tabSize: activeTextEditor.options.tabSize,
      insertSpaces: activeTextEditor.options.insertSpaces,
      mode,
    },
  });

  const workspaceEdit = new WorkspaceEdit();

  for (const edit of edits) {
    workspaceEdit.replace(
      activeTextEditor.document.uri,
      new Range(
        new Position(edit.range.start.line, edit.range.start.character),
        new Position(edit.range.end.line, edit.range.end.character),
      ),
      edit.newText,
    );
  }

  await workspace.applyEdit(workspaceEdit);
}
