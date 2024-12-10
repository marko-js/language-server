import type { LanguageServicePlugin } from "@volar/language-server";
import { create as createHtmlService } from "volar-service-html";

export const create = (): LanguageServicePlugin => {
  // We currently opt-in to specific features of the HTML service because not all
  // of them are useful given the virtual HTML template we generate.
  const baseService = createHtmlService({});
  return {
    name: "marko-html",
    capabilities: {
      documentLinkProvider: baseService.capabilities.documentLinkProvider,
    },
    create(context) {
      const baseServiceInstance = baseService.create(context);
      return {
        provideDocumentLinks(document, token) {
          // Defer to the HTML service to provide links for us.
          // This is used for things like src attributes that link to local files.
          return baseServiceInstance.provideDocumentLinks?.(document, token);
        },
      };
    },
  };
};
