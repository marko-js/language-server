import { inspect } from "util";

import type { Connection } from "vscode-languageserver";

let connection!: Connection;
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
  setImmediate(() => connection.sendNotification(type, msg));
}
