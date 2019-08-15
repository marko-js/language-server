import { createConnection, ProposedFeatures } from "vscode-languageserver";
import { MLS } from "./service";

MLS.start(
  process.argv.length <= 2
    ? createConnection(process.stdin, process.stdout) // no arg specified
    : createConnection(ProposedFeatures.all)
);
