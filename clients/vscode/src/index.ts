import { workspace, window } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;
const serverModule = require.resolve("@marko/language-server");

export function activate() {
  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  const debugOptions = {
    execArgv: ["--nolazy", "--inspect=6009", "--enable-source-maps"],
    env: { DEBUG: true },
  };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
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
        "**/{components/*.marko,components/*/*.marko,marko.json,marko-tag.json}",
        false,
        false,
        false
      ),
    },
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    "marko",
    "Marko",
    serverOptions,
    clientOptions
  );

  client.onReady().then(() => {
    client.onNotification("showError", window.showErrorMessage);
    client.onNotification("showWarning", window.showWarningMessage);
    client.onNotification("showInformation", window.showInformationMessage);
  });

  // Start the client. This will also launch the server
  client.start();
}

export function deactivate(): Thenable<void> | void {
  if (!client) {
    return undefined;
  }

  return client.stop();
}
