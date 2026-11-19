import type { TaglibLookup } from "@marko/compiler/babel-utils";

import { type Node, NodeType, type Parsed } from "../../../parser";

export type RuntimeAPI = (typeof RuntimeAPI)[keyof typeof RuntimeAPI];
export const RuntimeAPI = {
  tags: "tags",
  class: "class",
} as const;

export function getRuntimeAPI(
  translator: { preferAPI?: string } | undefined,
  lookup: TaglibLookup,
  parsed: Parsed,
) {
  const api = detectAPIFromTranslator(translator);
  return {
    interop: !api,
    api:
      api ||
      detectAPIFromFileName(parsed.filename, lookup) ||
      detectAPIFromProgram(parsed, parsed.program) ||
      (lookup.exclusiveTagDiscoveryDirs === "tags"
        ? RuntimeAPI.tags
        : RuntimeAPI.class),
  };
}

function detectAPIFromTranslator(
  translator: { preferAPI?: string } | undefined,
): RuntimeAPI | void {
  if (translator?.preferAPI === "tags") {
    return RuntimeAPI.tags;
  }
}

function detectAPIFromFileName(
  filename: string,
  lookup: TaglibLookup,
): RuntimeAPI | void {
  const dirs = lookup.discoveryDirs;
  const separator = dirs && /\/|\\/.exec(filename)?.[0];
  if (!separator) return;
  // The nearest discovery dir holding the file decides, as in the compiler's
  // interop translator. Those are `components` and `tags` dirs, so it is the
  // nearest such segment of the path that was discovered (one above the
  // package root was not).
  let end = filename.length;
  while (end > 0) {
    const sep = filename.lastIndexOf(separator, end - 1);
    if (sep < 0) return;
    const len = end - sep - 1;
    if (
      ((len === 4 && filename.startsWith("tags", sep + 1)) ||
        (len === 10 && filename.startsWith("components", sep + 1))) &&
      dirs.includes(filename.slice(0, end))
    ) {
      // A `marko.json` `tags-dir` naming a `tags` dir keeps it Class API.
      return len === 4 && !lookup.manualTagsDirs?.has(filename.slice(0, end))
        ? RuntimeAPI.tags
        : undefined;
    }
    end = sep;
  }
}

function detectAPIFromProgram(
  parsed: Parsed,
  program: Node.Program,
): RuntimeAPI | void {
  // A `use tags` or `use class` comment at the start of the template: the
  // parser gives a comment to the node after it (the program, if none is).
  const firstStatic = program.static[0];
  const firstChild = program.body[0];
  const first =
    firstStatic && (!firstChild || firstStatic.start < firstChild.start)
      ? firstStatic
      : firstChild;
  const comment = (
    first ? (first as Partial<Node.Commentable>).comments : program.comments
  )?.[0];
  if (comment) {
    switch (parsed.read(comment.value).trim()) {
      case "use tags":
        return RuntimeAPI.tags;
      case "use class":
        return RuntimeAPI.class;
    }
  }

  if (program.static) {
    for (const stmt of program.static) {
      switch (stmt.type) {
        case NodeType.Class:
        case NodeType.Style:
          return RuntimeAPI.class;
      }
    }
  }

  return detectAPIFromBody(parsed, program.body);
}

function detectAPIFromBody(
  parsed: Parsed,
  body: undefined | Node.ChildNode[],
): RuntimeAPI | void {
  if (body) {
    for (const child of body) {
      const api = detectAPIFromChild(parsed, child);
      if (api) return api;
    }
  }
}

function detectAPIFromChild(
  parsed: Parsed,
  child: Node.ChildNode,
): RuntimeAPI | void {
  switch (child.type) {
    case NodeType.Scriptlet:
      return RuntimeAPI.class;
    case NodeType.Tag:
    case NodeType.AttrTag:
      return detectAPIFromTag(parsed, child);
  }
}

function detectAPIFromTag(
  parsed: Parsed,
  tag: Node.ParentTag,
): RuntimeAPI | void {
  if (tag.var) {
    return RuntimeAPI.tags;
  }

  switch (tag.nameText) {
    case "await-reorderer":
    case "include-html":
    case "include-text":
    case "init-components":
    case "macro":
    case "module-code":
    case "while":
      return RuntimeAPI.class;
    case "const":
    case "debug":
    case "define":
    case "id":
    case "let":
    case "lifecycle":
    case "log":
    case "return":
    case "try":
      return RuntimeAPI.tags;
  }

  if (tag.attrs) {
    for (const attr of tag.attrs) {
      if (attr.type !== NodeType.AttrSpread) {
        if (attr.value?.type === NodeType.AttrValue && attr.value.bound) {
          return RuntimeAPI.tags;
        }

        if (attr.args) {
          return RuntimeAPI.class;
        }

        if (/:/.test(parsed.read(attr.name))) {
          return RuntimeAPI.class;
        }
      }
    }
  }

  return detectAPIFromBody(parsed, tag.body);
}
