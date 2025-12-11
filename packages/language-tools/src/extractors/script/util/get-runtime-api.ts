import type { TaglibLookup } from "@marko/compiler/babel-utils";

import { Node, NodeType, Parsed } from "../../../parser";

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
  const tagsDir = getTagsDir(filename);
  if (tagsDir && !lookup.manualTagsDirs?.has(tagsDir)) {
    return RuntimeAPI.tags;
  }
}

function getTagsDir(filename: string) {
  const pathSeparator = /\/|\\/.exec(filename)?.[0];
  if (pathSeparator) {
    let previousIndex = filename.length - 1;
    while (previousIndex > 0) {
      const index = filename.lastIndexOf(pathSeparator, previousIndex);
      switch (previousIndex - index) {
        case 4 /** "tags".length */: {
          if (filename.startsWith("tags", index + 1)) {
            return filename.slice(0, index + 5);
          }
          break;
        }
        case 10 /** "components".length */: {
          if (filename.startsWith("components", index + 1)) {
            return false;
          }
          break;
        }
      }
      previousIndex = index - 1;
    }
  }
  return false;
}

function detectAPIFromProgram(
  parsed: Parsed,
  program: Node.Program,
): RuntimeAPI | void {
  if (program.comments) {
    switch (parsed.read(program.comments[0].value).trim()) {
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
