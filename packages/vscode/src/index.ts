import {
  type ExtensionContext,
  Position,
  Range,
  TextEdit,
  ViewColumn,
  WorkspaceEdit,
  commands,
  window,
  workspace,
} from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
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
        "**/{*.ts,*.mts,*.cts,*.js,*.mjs,*.cts,*.marko,marko.json,marko-tag.json,tsconfig.json,jsconfig.json,package.json,package-lock.json,pnpm-lock.yaml,yarn.lock}",
        false,
        false,
        false,
      ),
    },
  };

  // Create the language client and start the client.
  client = new LanguageClient("marko", "Marko", serverOptions, clientOptions);

  client.onNotification("showError", window.showErrorMessage);
  client.onNotification("showWarning", window.showWarningMessage);
  client.onNotification("showInformation", window.showInformationMessage);
  client.onNotification("executeCommand", commands.executeCommand);

  ctx.subscriptions.push(
    commands.registerCommand("marko.showScriptOutput", async () => {
      if (!window.activeTextEditor) {
        window.showErrorMessage(
          "You must have an open Marko file to view the script output for.",
        );
        return;
      }

      const result = await client.sendRequest<
        { language: string; content: string } | undefined
      >("$/showScriptOutput", window.activeTextEditor.document.uri.toString());

      if (result) {
        await window.showTextDocument(
          await workspace.openTextDocument(result),
          {
            preview: true,
            viewColumn: ViewColumn.Beside,
          },
        );
      } else {
        window.showErrorMessage("Unable to extract script for Marko document.");
      }
    }),
  );

  ctx.subscriptions.push(
    commands.registerCommand("marko.showHtmlOutput", async () => {
      if (!window.activeTextEditor) {
        window.showErrorMessage(
          "You must have an open Marko file to view the static HTML output for.",
        );
        return;
      }

      const result = await client.sendRequest<
        { language: string; content: string } | undefined
      >("$/showHtmlOutput", window.activeTextEditor.document.uri.toString());

      if (result) {
        await window.showTextDocument(
          await workspace.openTextDocument(result),
          {
            preview: true,
            viewColumn: ViewColumn.Beside,
          },
        );
      } else {
        window.showErrorMessage(
          "Unable to extract static HTML for Marko document.",
        );
      }
    }),
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

  // Start the client. This will also launch the server
  await client.start();
}

export function deactivate(): Thenable<void> | void {
  if (!client) {
    return undefined;
  }

  return client.stop();
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
