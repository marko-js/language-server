import type { Diagnostic as CompilerDiagnostic } from "@marko/compiler/babel-utils";
import { Project } from "@marko/language-tools";
import path from "path";
import * as prettier from "prettier";
import * as markoPrettier from "prettier-plugin-marko";
import {
  type CodeAction,
  CodeActionKind,
  type Diagnostic,
  type InitializeParams,
  type Position,
  type Range,
  TextEdit,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";

import { getFSPath } from "../../utils/file";
import * as documents from "../../utils/text-documents";
import type { Plugin } from "../types";
import { compilerConfig, getMarkoDiagnostics } from "./validate";

type LocRange = Exclude<CompilerDiagnostic["loc"], undefined | false>;

interface FixCandidate {
  title: string;
  /** Value handed to the compiler `applyFixes` map for this fix. */
  value: unknown;
  isPreferred: boolean;
}

const FIX_ACTION_SOURCE = "marko/fix";
const FIX_ALL_SOURCE = "marko/fix-all";

/** Code action kind for the batched "fix all" source action. */
export const SOURCE_FIX_ALL_KIND = "source.fixAll.marko";

/** Title shown for the batched "fix all" source action. */
const FIX_ALL_TITLE = "Fix all auto-fixable Marko issues";

/** Code action kinds this plugin produces, advertised to the client. */
export const markoCodeActionKinds = [
  CodeActionKind.QuickFix,
  SOURCE_FIX_ALL_KIND,
];

/**
 * Serializable payload stored on a deferred fix action so its edit can be built
 * later in `doCodeActionResolve` rather than up front.
 */
interface MarkoFixActionData {
  source: typeof FIX_ACTION_SOURCE;
  uri: string;
  version: number;
  index: number;
  value: unknown;
}

/** Serializable payload for a deferred batched "fix all" action. */
interface MarkoFixAllActionData {
  source: typeof FIX_ALL_SOURCE;
  uri: string;
  version: number;
}

/**
 * Whether the client can resolve a code action's `edit` lazily. When it can, we
 * defer the (relatively expensive) reprint + format until the user actually
 * engages a fix instead of building an edit for every offered action up front.
 */
let resolveSupported = false;

export function initialize(params: InitializeParams): void {
  resolveSupported = Boolean(
    params.capabilities.textDocument?.codeAction?.resolveSupport?.properties.includes(
      "edit",
    ),
  );
}

/**
 * Surfaces the Marko compiler's diagnostic `fix`es (in place AST edits suggested
 * by compiler plugins) as in editor code actions: a quick fix per fixable
 * diagnostic in range, plus a batched "fix all" source action.
 *
 * A fix mutates the AST during compilation, so it can't be serialized into a
 * text edit directly. Instead we re-run the compiler asking it to apply the
 * relevant fix(es) -- via the `applyFixes` config keyed by diagnostic index --
 * reprint the result in `migrate` mode, format it with prettier, and diff it
 * against the original document to produce a minimal text edit.
 *
 * A fix is either an automatic function fix or an interactive `confirm`/`select`
 * prompt; see `getFixCandidates` and `collectBatchFixes` for how each is
 * surfaced.
 */
export const doCodeActions: Plugin["doCodeActions"] = async (
  doc,
  params,
  cancel,
) => {
  // Gate the per-diagnostic quick fixes and the batched "fix all" source action
  // independently so a `source.fixAll`-only request (e.g. fix-on-save) returns
  // just the batch, and a `quickfix`-only request returns just the quick fixes.
  const { only } = params.context;
  const wantsQuickFix = isKindRequested(only, CodeActionKind.QuickFix);
  const wantsFixAll = isKindRequested(only, SOURCE_FIX_ALL_KIND);
  if (!wantsQuickFix && !wantsFixAll) return;

  // Reuse the diagnostics compile from `doValidate` (cached per document
  // version) so requesting code actions doesn't compile the document again.
  const { diagnostics } = getMarkoDiagnostics(doc);
  if (!diagnostics?.length) return;

  const filename = getFSPath(doc);
  const compiler = Project.getCompiler(filename && path.dirname(filename));
  const originalText = doc.getText();
  const actions: CodeAction[] = [];

  if (wantsQuickFix) {
    // The index of a diagnostic is the key used to apply its fix, so iterate by
    // index. The diagnostics here line up with what `doValidate` reports because
    // both use the same `compilerConfig`.
    for (let index = 0; index < diagnostics.length; index++) {
      const diag = diagnostics[index];
      if (!diag.fix || !diag.loc) continue;

      const range = locToRange(diag.loc);
      if (!rangesOverlap(range, params.range)) continue;

      const relatedDiagnostics = findRelatedDiagnostics(
        params.context.diagnostics,
        range,
        diag.label,
      );

      for (const candidate of getFixCandidates(diag)) {
        if (cancel.isCancellationRequested) return;

        const action: CodeAction = {
          title: candidate.title,
          kind: CodeActionKind.QuickFix,
          diagnostics: relatedDiagnostics.length
            ? relatedDiagnostics
            : undefined,
          isPreferred: candidate.isPreferred || undefined,
        };

        if (resolveSupported) {
          // Defer the reprint + format until the action is resolved.
          action.data = {
            source: FIX_ACTION_SOURCE,
            uri: doc.uri,
            version: doc.version,
            index,
            value: candidate.value,
          } satisfies MarkoFixActionData;
        } else {
          const edit = await buildFixEdit(
            doc,
            compiler,
            filename,
            originalText,
            new Map([[index, candidate.value]]),
          );
          if (cancel.isCancellationRequested) return;
          if (!edit) continue;
          action.edit = { changes: { [doc.uri]: [edit] } };
        }

        actions.push(action);
      }
    }
  }

  if (wantsFixAll) {
    // A single "fix all" applies every auto-fixable diagnostic in one compile
    // pass (the `applyFixes` map takes many entries). This is both faster than
    // and more correct than chaining the individual fixes, whose edits are each
    // computed against the original text and would shift one another's ranges.
    const fixes = collectBatchFixes(diagnostics);
    if (fixes.size) {
      const action: CodeAction = {
        title: FIX_ALL_TITLE,
        kind: SOURCE_FIX_ALL_KIND,
      };

      if (resolveSupported) {
        action.data = {
          source: FIX_ALL_SOURCE,
          uri: doc.uri,
          version: doc.version,
        } satisfies MarkoFixAllActionData;
        actions.push(action);
      } else {
        const edit = await buildFixEdit(
          doc,
          compiler,
          filename,
          originalText,
          fixes,
        );
        if (cancel.isCancellationRequested) return;
        if (edit) {
          action.edit = { changes: { [doc.uri]: [edit] } };
          actions.push(action);
        }
      }
    }
  }

  return actions.length ? actions : undefined;
};

/**
 * Resolves a deferred fix (or fix-all) action by re-running the compiler to
 * apply the fix(es) and attaching the resulting text edit.
 */
export const doCodeActionResolve: NonNullable<
  Plugin["doCodeActionResolve"]
> = async (action, cancel) => {
  const data = action.data as
    | MarkoFixActionData
    | MarkoFixAllActionData
    | undefined;
  if (data?.source !== FIX_ACTION_SOURCE && data?.source !== FIX_ALL_SOURCE) {
    return; // not one of ours
  }

  const doc = documents.get(data.uri);
  // The action was created for a specific document version; if the document has
  // since changed we can no longer trust the diagnostic indices, so leave it be.
  if (!doc || doc.version !== data.version) return action;

  let fixes: Map<number, unknown>;
  if (data.source === FIX_ACTION_SOURCE) {
    fixes = new Map([[data.index, data.value]]);
  } else {
    const { diagnostics } = getMarkoDiagnostics(doc);
    if (!diagnostics) return action;
    fixes = collectBatchFixes(diagnostics);
  }
  if (!fixes.size) return action;

  const filename = getFSPath(doc);
  const compiler = Project.getCompiler(filename && path.dirname(filename));
  const edit = await buildFixEdit(
    doc,
    compiler,
    filename,
    doc.getText(),
    fixes,
  );
  if (cancel.isCancellationRequested) return;
  if (edit) action.edit = { changes: { [doc.uri]: [edit] } };

  return action;
};

/**
 * Maps a diagnostic's fix to the quick fix action(s) to offer for it.
 *
 * The compiler's diagnostics API models a `fix` as one of three things:
 * - `true`: an automatic function fix (applied by the compiler in `migrate`
 *   output without asking) -> a single, preferred quick fix.
 * - a `confirm` prompt (a yes/no decision) -> a single quick fix whose
 *   invocation answers "yes" (`apply(true)`).
 * - a `select` prompt (pick one of N options) -> one quick fix per option
 *   (`apply(option.value)`).
 *
 * `confirm`/`select` are interactive prompts, so they are never marked preferred
 * -- the user must consciously choose, rather than have "Auto Fix" answer for
 * them -- and they are excluded from the batched "fix all".
 */
export function getFixCandidates(diag: CompilerDiagnostic): FixCandidate[] {
  const { fix } = diag;

  // An automatic function fix.
  if (fix === true) {
    return [{ title: diag.label, value: undefined, isPreferred: true }];
  }

  if (typeof fix === "object") {
    switch (fix.type) {
      // A yes/no prompt; invoking the action answers "yes".
      case "confirm":
        return [{ title: fix.message, value: true, isPreferred: false }];
      // A pick-one prompt; offer one action per option.
      case "select":
        return fix.options.map((option) => ({
          title: `${fix.message}: ${option.label ?? option.value}`,
          value: option.value,
          isPreferred: false,
        }));
    }
  }

  return [];
}

/**
 * Re-compiles the document applying the given `fixes` (one entry for a single
 * quick fix, many for "fix all") in a single pass and returns a minimal text
 * edit representing the change.
 */
async function buildFixEdit(
  doc: TextDocument,
  compiler: ReturnType<typeof Project.getCompiler>,
  filename: string | undefined,
  originalText: string,
  fixes: Map<number, unknown>,
): Promise<TextEdit | undefined> {
  let fixedCode: string | undefined;
  try {
    ({ code: fixedCode } = compiler.compileSync(
      originalText,
      filename || "untitled.marko",
      {
        ...compilerConfig,
        code: true,
        applyFixes: fixes,
      },
    ));
  } catch {
    // Applying the fix produced a state the compiler could not print.
    return;
  }

  if (!fixedCode) return;

  const formatted = await formatMarko(fixedCode, filename);
  return getMinimalEdit(doc, originalText, formatted ?? fixedCode);
}

/**
 * Builds the `applyFixes` map for a batched "fix all" from the diagnostics whose
 * fix is applied automatically -- function fixes (`fix === true`), the same set
 * the compiler applies in `migrate` output without prompting.
 *
 * `confirm`/`select` fixes are interactive prompts: the compiler only applies
 * them when given an explicit answer (with no answer their `apply` is a no-op),
 * so they're deliberately excluded here and instead offered as individual quick
 * fixes where the user makes the choice.
 */
export function collectBatchFixes(
  diagnostics: CompilerDiagnostic[],
): Map<number, unknown> {
  const fixes = new Map<number, unknown>();
  diagnostics.forEach((diag, index) => {
    if (diag.fix === true) fixes.set(index, undefined);
  });
  return fixes;
}

/**
 * Formats reprinted Marko source with prettier (reusing the same plugin and
 * resolved config as the formatter) so applying a fix doesn't reflow the rest of
 * the document. Falls back to the unformatted source if prettier throws.
 */
async function formatMarko(
  code: string,
  filepath: string | undefined,
): Promise<string | undefined> {
  try {
    return await prettier.format(code, {
      parser: "marko",
      filepath,
      plugins: [markoPrettier],
      ...(filepath
        ? await prettier
            .resolveConfig(filepath, { editorconfig: true })
            .catch(() => null)
        : null),
    });
  } catch {
    return undefined;
  }
}

/**
 * Produces a single text edit covering only the region that differs between the
 * original and updated text by trimming the common prefix and suffix.
 */
function getMinimalEdit(
  doc: TextDocument,
  oldText: string,
  newText: string,
): TextEdit | undefined {
  if (oldText === newText) return undefined;

  const maxStart = Math.min(oldText.length, newText.length);
  let start = 0;
  while (
    start < maxStart &&
    oldText.charCodeAt(start) === newText.charCodeAt(start)
  ) {
    start++;
  }

  let oldEnd = oldText.length;
  let newEnd = newText.length;
  while (
    oldEnd > start &&
    newEnd > start &&
    oldText.charCodeAt(oldEnd - 1) === newText.charCodeAt(newEnd - 1)
  ) {
    oldEnd--;
    newEnd--;
  }

  return TextEdit.replace(
    { start: doc.positionAt(start), end: doc.positionAt(oldEnd) },
    newText.slice(start, newEnd),
  );
}

/**
 * Finds the published diagnostics that this fix resolves so the editor can
 * associate the quick fix with the squiggle it appears on.
 */
function findRelatedDiagnostics(
  contextDiagnostics: Diagnostic[],
  range: Range,
  label: string,
): Diagnostic[] {
  return contextDiagnostics.filter(
    (diagnostic) =>
      diagnostic.source === "marko" &&
      diagnostic.message === label &&
      rangesEqual(diagnostic.range, range),
  );
}

function locToRange(loc: LocRange): Range {
  return {
    start: { line: loc.start.line - 1, character: loc.start.column },
    end: { line: loc.end.line - 1, character: loc.end.column },
  };
}

function isKindRequested(only: string[] | undefined, kind: string): boolean {
  return (
    !only ||
    only.some(
      (requested) => kind === requested || kind.startsWith(`${requested}.`),
    )
  );
}

function rangesOverlap(a: Range, b: Range): boolean {
  return (
    comparePositions(a.start, b.end) <= 0 &&
    comparePositions(b.start, a.end) <= 0
  );
}

function rangesEqual(a: Range, b: Range): boolean {
  return (
    comparePositions(a.start, b.start) === 0 &&
    comparePositions(a.end, b.end) === 0
  );
}

function comparePositions(a: Position, b: Position): number {
  return a.line - b.line || a.character - b.character;
}
