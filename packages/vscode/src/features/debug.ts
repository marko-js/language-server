import {
  type BaseLanguageClient,
  ExecuteCommandParams,
  ExecuteCommandRequest,
} from "@volar/vscode";
import * as vscode from "vscode";

/**
 * Registers the debug commands for the Marko extension. This is useful if you don't have the Volar Labs
 * extension installed. Prefer using the Volar Labs extension if you have it installed because it's more
 * feature-rich.
 */
export function register(
  context: vscode.ExtensionContext,
  client: BaseLanguageClient,
) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "marko.debug.showScriptOutput",
      async () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
          vscode.window.showErrorMessage(
            "You must have an open Marko file to view the script output for.",
          );
          return;
        }

        const response = await client.sendRequest(ExecuteCommandRequest.type, {
          command: "marko.extractScript",
          arguments: [client.code2ProtocolConverter.asUri(editor.document.uri)],
        } satisfies ExecuteCommandParams);

        if (response) {
          await vscode.window.showTextDocument(
            await vscode.workspace.openTextDocument(response),
            {
              preview: true,
              viewColumn: vscode.ViewColumn.Beside,
            },
          );
        } else {
          vscode.window.showErrorMessage(
            "Unable to extract script for Marko document.",
          );
        }
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("marko.debug.showHtmlOutput", async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showErrorMessage(
          "You must have an open Marko file to view the HTML output for.",
        );
        return;
      }

      const response = await client.sendRequest(ExecuteCommandRequest.type, {
        command: "marko.extractHtml",
        arguments: [client.code2ProtocolConverter.asUri(editor.document.uri)],
      } satisfies ExecuteCommandParams);

      if (response) {
        await vscode.window.showTextDocument(
          await vscode.workspace.openTextDocument(response),
          {
            preview: true,
            viewColumn: vscode.ViewColumn.Beside,
          },
        );
      } else {
        vscode.window.showErrorMessage(
          "Unable to extract HTML for Marko document.",
        );
      }
    }),
  );
}
