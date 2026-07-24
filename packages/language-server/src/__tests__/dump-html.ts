// Prints the HTML extraction for a single .marko file (debug aid for the
// project-bench harness).
import fs from "fs";
import { URI } from "vscode-uri";

import { documents } from "../service";
import HTMLPlugin from "../service/html";

const file = process.argv[2];
const uri = URI.file(file).toString();
documents.doOpen({
  textDocument: {
    uri,
    languageId: "marko",
    version: 1,
    text: fs.readFileSync(file, "utf-8"),
  },
});
HTMLPlugin.commands!["$/showHtmlOutput"](uri).then((res: any) => {
  console.log(res?.content);
});
