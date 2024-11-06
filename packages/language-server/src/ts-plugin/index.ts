import { createLanguageServicePlugin } from "@volar/typescript/lib/quickstart/createLanguageServicePlugin.js";
import { addMarkoTypes, createMarkoLanguagePlugin } from "../language";

export const init = createLanguageServicePlugin((ts, info) => {
  return {
    languagePlugins: [createMarkoLanguagePlugin(ts, (id) => id)],
    setup(_language) {
      const { languageServiceHost } = info;
      const rootPath = languageServiceHost.getCurrentDirectory();
      addMarkoTypes(rootPath, ts, languageServiceHost);
    },
  };
});
