import { workspace, window, type ExtensionContext } from "vscode";
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
        execArgv: ["--nolazy", "--inspect=6009", "--enable-source-maps"],
        env: { DEBUG: true },
      },
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for marko text documents
    documentSelector: [{ language: "marko" }],
    synchronize: {
      // Synchronize the setting section 'marko' to the server
      configurationSection: "marko",
      fileEvents: workspace.createFileSystemWatcher(
        "**/{*.marko,marko.json,marko-tag.json}",
        false,
        false,
        false
      ),
    },
  };

  // Create the language client and start the client.
  client = new LanguageClient("marko", "Marko", serverOptions, clientOptions);

  client.onNotification("showError", window.showErrorMessage);
  client.onNotification("showWarning", window.showWarningMessage);
  client.onNotification("showInformation", window.showInformationMessage);
  // Start the client. This will also launch the server
  await client.start();
}

export function deactivate(): Thenable<void> | void {
  if (!client) {
    return undefined;
  }

  return client.stop();
}
