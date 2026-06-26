import { Project } from "@marko/language-tools";
import path from "path";
import * as prettier from "prettier";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

export type CompiledOutputTarget = "dom" | "html";

export interface CompiledOutput {
  language: string;
  content: string;
}

/**
 * Compiles a Marko document to its final JavaScript output for the requested
 * target (`dom` for client side or `html` for server side rendering).
 *
 * Compilation always assumes esm mode and reuses the translator/config resolved
 * for the document's project, so the output reflects whichever Marko runtime
 * (eg Marko 5 vs Marko 6) the project depends on.
 */
export async function compileDocument(
  doc: TextDocument,
  output: CompiledOutputTarget,
): Promise<CompiledOutput> {
  const { fsPath, scheme } = URI.parse(doc.uri);
  // Untitled documents have no path on disk, fall back to the cwd so the
  // compiler still has a real directory to resolve taglibs against.
  const filename =
    scheme === "file" ? fsPath : path.join(process.cwd(), "untitled.marko");
  const dir = path.dirname(filename);
  const compiler = Project.getCompiler(dir);
  const config = Project.getConfig(dir);

  try {
    const { code } = await compiler.compile(doc.getText(), filename, {
      ...config,
      output,
      modules: "esm",
      sourceMaps: false,
      ast: false,
      code: true,
    });

    return {
      language: "javascript",
      content: await prettier
        .format(code!, { parser: "babel" })
        .catch(() => code!),
    };
  } catch (err) {
    // Surface the compile error in the output document so the failure is
    // actionable rather than silently swallowed.
    return {
      language: "plaintext",
      content: err instanceof Error ? (err.stack ?? err.message) : String(err),
    };
  }
}
