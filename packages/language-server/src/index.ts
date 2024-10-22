import { dirname } from "path";
import {
  createConnection,
  createServer,
  createTypeScriptProject,
  loadTsdkByPath,
} from "@volar/language-server/node";
import {
  addMarkoTypes,
  getLanguagePlugins,
  getLanguageServicePlugins,
} from "./service";

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
        languagePlugins: getLanguagePlugins(typescript),
        setup({ project }) {
          const { languageServiceHost, configFileName } = project.typescript!;

          const rootPath = configFileName
            ? configFileName.split("/").slice(0, -1).join("/")
            : env.workspaceFolders[0]!.fsPath;
          const nearestPackageJson = typescript.findConfigFile(
            rootPath,
            typescript.sys.fileExists,
            "package.json",
          );

          if (nearestPackageJson) {
            addMarkoTypes(
              dirname(nearestPackageJson),
              typescript,
              languageServiceHost,
            );
          }
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
