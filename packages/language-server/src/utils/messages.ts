import { inspect } from "util";

import type { Connection } from "vscode-languageserver";

let connection!: Connection;
const previousMessagesByType = new Map<string, string[]>();
export default function setup(_: Connection) {
  connection = _;
}

export function displayInformation(data: unknown) {
  display("showInformation", data);
}

export function displayWarning(data: unknown) {
  display("showWarning", data);
}

export function displayError(data: unknown) {
  display("showError", data);
}

function display(type: string, data: unknown) {
  const msg =
    typeof data === "string" ? data : inspect(data, { colors: false });

  const previousMessages = previousMessagesByType.get(type);
  if (previousMessages) {
    if (previousMessages.includes(msg)) return;

    previousMessages.push(msg);

    // Only keep the last 3 messages.
    if (previousMessages.length > 3) {
      previousMessages.unshift();
    }
  } else {
    previousMessagesByType.set(type, [msg]);
  }

  setImmediate(() => connection.sendNotification(type, msg));
}
