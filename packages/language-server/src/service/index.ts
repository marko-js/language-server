// import { create as createEmmetService } from "volar-service-emmet";
import { create as createCssService } from "volar-service-css";
import { create as createTypeScriptTwoSlashService } from "volar-service-typescript-twoslash-queries";
import { create as createTypeScriptServices } from "volar-service-typescript";
import type {
  Connection,
  LanguageServicePlugin,
  LanguageServicePluginInstance,
} from "@volar/language-server";
import { Project } from "@marko/language-tools";
import ts from "typescript";
import { URI } from "vscode-uri";
import { create as createHtmlService } from "./html";
import { create as createMarkoService } from "./marko";
import { MarkoVirtualCode, getMarkoLanguagePlugin } from "./core/marko-plugin";
import { getMarkoPrettierService } from "./format";

const decoratedHosts = new WeakSet<ts.LanguageServiceHost>();

export function addMarkoTypes(
  rootDir: string,
  ts: typeof import("typescript"),
  host: ts.LanguageServiceHost,
) {
  if (decoratedHosts.has(host)) {
    return;
  }
  decoratedHosts.add(host);

  const getScriptFileNames = host.getScriptFileNames.bind(host);

  host.getScriptFileNames = () => {
    const addedFileNames = [];

    const typeLibs = Project.getTypeLibs(rootDir, ts, host);

    addedFileNames.push(typeLibs.internalTypesFile);
    if (typeLibs.markoRunTypesFile) {
      addedFileNames.push(typeLibs.markoRunTypesFile);
    }
    if (typeLibs.markoRunGeneratedTypesFile) {
      addedFileNames.push(typeLibs.markoRunGeneratedTypesFile);
    }
    addedFileNames.push(typeLibs.markoTypesFile);

    return [...getScriptFileNames(), ...addedFileNames];
  };
}

export function getLanguagePlugins(ts: typeof import("typescript")) {
  return [getMarkoLanguagePlugin(ts)];
}

export function getLanguageServicePlugins(
  connection: Connection,
  ts: typeof import("typescript"),
) {
  const result = [
    createHtmlService(),
    createCssService(),
    ...createTypeScriptServices(ts),
    createTypeScriptTwoSlashService(ts),
    createMarkoService(ts),
    getMarkoPrettierService(connection),
    {
      name: "marko-debug",
      capabilities: {
        executeCommandProvider: {
          commands: ["marko.extractScript", "marko.extractHtml"],
        },
      },
      create(context): LanguageServicePluginInstance {
        console.log("Creating marko-debug service");
        return {
          executeCommand(command: string, [fileUri]: any[]) {
            console.log("executeCommand", command, fileUri);
            const uri = URI.parse(fileUri);

            const sourceFile = context.language.scripts.get(uri);
            if (!sourceFile) {
              return { content: "Error finding source file", language: "ts" };
            }

            const rootCode = sourceFile?.generated?.root;
            if (!(rootCode instanceof MarkoVirtualCode)) {
              return { content: "Error finding root code", language: "ts" };
            }

            switch (command) {
              case "marko.extractScript": {
                const code = rootCode.embeddedCodes.find((code) => {
                  return code.id === "script";
                });
                const content = code?.snapshot.getText(
                  0,
                  code.snapshot.getLength(),
                );
                return { content, language: "typescript" };
              }
              case "marko.extractHtml": {
                const code = rootCode.embeddedCodes.find((code) => {
                  return code.id === "html";
                });
                const content = code?.snapshot.getText(
                  0,
                  code.snapshot.getLength(),
                );
                return { content, language: "html" };
              }
            }
          },
        };
      },
    } satisfies LanguageServicePlugin,
  ];
  return result;
}
