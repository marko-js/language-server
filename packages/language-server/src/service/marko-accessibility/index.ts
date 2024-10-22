import type { TextDocument } from "vscode-languageserver-textdocument";
import axe from "axe-core";
import { JSDOM } from "jsdom";
import type { Diagnostic, LanguageServicePlugin } from "@volar/language-server";
import { URI } from "vscode-uri";
import { MarkoVirtualCode } from "../core/marko-plugin";
import { ruleExceptions } from "./axe-rules/rule-exceptions";

// This plugin provides accessibility diagnostics for Marko templates.
export const create = (): LanguageServicePlugin => {
  return {
    name: "marko-accessibility",
    capabilities: {
      diagnosticProvider: {
        interFileDependencies: false,
        workspaceDiagnostics: false,
      },
    },
    create(context) {
      return {
        async provideDiagnostics(document, token) {
          if (token.isCancellationRequested) return;

          return await worker(document, async (virtualCode) => {
            const htmlAst = virtualCode.htmlAst;
            if (!htmlAst) {
              return [];
            }

            const htmlText = htmlAst.extracted.toString();
            const jsdom = new JSDOM(htmlText, {
              includeNodeLocations: true,
            });
            const { documentElement } = jsdom.window.document;

            const getViolationNodes = async (runOnly: string[]) =>
              (
                await axe.run(documentElement, {
                  runOnly,
                  rules: {
                    "color-contrast": { enabled: false },
                  },
                  resultTypes: ["violations"],
                  elementRef: true,
                })
              ).violations.flatMap(({ nodes, id }) =>
                nodes.map((node) => ({ ...node, ruleId: id })),
              );

            const release = await acquireMutexLock();
            const violations = await getViolationNodes(
              Object.keys(ruleExceptions),
            );
            release();

            return violations.flatMap((result) => {
              const { element } = result;
              if (!element) return [];
              const ruleId = result.ruleId as keyof typeof ruleExceptions;

              if (element.dataset.markoNodeId) {
                const details =
                  htmlAst.nodeDetails[element.dataset.markoNodeId];
                if (
                  (ruleExceptions[ruleId].attrSpread &&
                    details.hasDynamicAttrs) ||
                  (ruleExceptions[ruleId].unknownBody &&
                    details.hasDynamicBody) ||
                  ruleExceptions[ruleId].dynamicAttrs?.some(
                    (attr) => element.getAttribute(attr) === "dynamic",
                  )
                ) {
                  return [];
                }
              }

              const generatedLoc = jsdom.nodeLocation(element);
              if (!generatedLoc) return [];

              const sourceRange = htmlAst.extracted.sourceLocationAt(
                generatedLoc.startOffset + 1,
                generatedLoc.startOffset + 1 + element.tagName.length,
              );
              if (!sourceRange) return [];

              return [
                {
                  range: sourceRange,
                  severity: 3,
                  source: `axe-core(${ruleId})`,
                  message:
                    result.failureSummary ?? "unknown accessibility issue",
                } satisfies Diagnostic,
              ];
            });
          });
        },
      };

      async function worker<T>(
        document: TextDocument,
        callback: (markoDocument: MarkoVirtualCode) => T,
      ): Promise<Awaited<T> | undefined> {
        const decoded = context.decodeEmbeddedDocumentUri(
          URI.parse(document.uri),
        );
        const sourceScript =
          decoded && context.language.scripts.get(decoded[0]);
        const virtualCode =
          decoded && sourceScript?.generated?.embeddedCodes.get(decoded[1]);
        if (!(virtualCode instanceof MarkoVirtualCode)) return;

        return await callback(virtualCode);
      }
    },
  };
};

let lock: Promise<void> | undefined;
async function acquireMutexLock() {
  const currLock = lock;
  let resolve!: () => void;
  lock = new Promise((_) => (resolve = _));
  await currLock;
  return resolve;
}
