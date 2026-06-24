import { extractCSSModule } from "../extractors/css-module";
import type { ProcessorConfig } from ".";

export default {
  extensions: [".module.css", ".module.scss", ".module.less"],
  create({ ts }) {
    return {
      getScriptExtension() {
        return ts.Extension.Ts;
      },
      getScriptKind() {
        return ts.ScriptKind.TS;
      },
      extract(fileName, code) {
        return extractCSSModule({ code, fileName });
      },
      print({ extracted }) {
        // A CSS module's runtime value comes from the bundler; nothing to emit.
        return { code: extracted.toString() };
      },
      printTypes({ sourceFile, printer }) {
        // `sourceFile` is TypeScript's declaration-transformed file, so its
        // statements already form a valid `.d.ts`.
        let code = "";
        for (const statement of sourceFile.statements) {
          code +=
            printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile) +
            "\n";
        }

        return { code };
      },
    };
  },
} satisfies ProcessorConfig;
