import {
  createConnection,
  createServer,
  createTypeScriptProject,
  loadTsdkByPath,
} from "@volar/language-server/node";
import { URI } from "vscode-uri";
import { getLanguageServicePlugins } from "./plugins";
import { addMarkoTypes, createMarkoLanguagePlugin } from "./language";

const connection = createConnection();
const server = createServer(connection);

connection.listen();

connection.onInitialize((params) => {
  const tsdk = params.initializationOptions?.typescript?.tsdk;

  if (!tsdk) {
    throw new Error(
      "The `typescript.tsdk` init option is required. It should point to a directory containing a `typescript.js` or `tsserverlibrary.js` file, such as `node_modules/typescript/lib`.",
    );
  }

  const { typescript, diagnosticMessages } = loadTsdkByPath(
    tsdk,
    params.locale,
  );

  return server.initialize(
    params,
    createTypeScriptProject(typescript, diagnosticMessages, ({ env }) => {
      return {
        languagePlugins: [
          createMarkoLanguagePlugin(typescript, (uri: URI) =>
            uri.fsPath.replace(/\\/g, "/"),
          ),
        ],
        setup({ project }) {
          const { languageServiceHost, configFileName } = project.typescript!;

          const rootPath = configFileName
            ? configFileName.split("/").slice(0, -1).join("/")
            : env.workspaceFolders[0]!.fsPath;

          addMarkoTypes(rootPath, typescript, languageServiceHost);
        },
      };
    }),
    getLanguageServicePlugins(connection, typescript),
  );
});

connection.onInitialized(() => {
  server.initialized();
  server.fileWatcher.watchFiles([
    `**/*.{${["js", "cjs", "mjs", "ts", "cts", "mts", "json", "marko"].join(
      ",",
    )}}`,
  ]);
});
