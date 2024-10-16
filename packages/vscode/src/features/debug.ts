import {
  type BaseLanguageClient,
  ExecuteCommandParams,
  ExecuteCommandRequest,
} from "@volar/vscode";
import * as vscode from "vscode";

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
