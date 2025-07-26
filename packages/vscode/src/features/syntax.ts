import {
  type BaseLanguageClient,
  ExecuteCommandParams,
  ExecuteCommandRequest,
  TextEdit,
} from "@volar/vscode";
import * as vscode from "vscode";

export function register(
  context: vscode.ExtensionContext,
  client: BaseLanguageClient,
) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "marko.actions.formatToConciseSyntax",
      formatWithSyntax("concise"),
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "marko.actions.formatToHtmlSyntax",
      formatWithSyntax("html"),
    ),
  );

  function formatWithSyntax(mode: "concise" | "html") {
    return async () => {
      const { activeTextEditor } = vscode.window;
      if (!activeTextEditor) {
        vscode.window.showErrorMessage(
          "No open Marko file detected for formatting",
        );
        return;
      }

      const response: TextEdit[] = await client.sendRequest(
        ExecuteCommandRequest.type,
        {
          command: "marko.formatWithSyntax",
          arguments: [
            client.code2ProtocolConverter.asUri(activeTextEditor.document.uri),
            {
              markoSyntax: mode,
            },
          ],
        } satisfies ExecuteCommandParams,
      );

      const edits = await client.protocol2CodeConverter.asTextEdits(response);

      if (edits) {
        activeTextEditor.edit((editBuilder) => {
          for (const edit of edits) {
            editBuilder.replace(edit.range, edit.newText);
          }
        });
      } else {
        vscode.window.showInformationMessage(
          "No changes were made to the document",
        );
      }
    };
  }
}
