import { Node, NodeType, Parsed } from "../../../parser";

export type RuntimeAPI = (typeof RuntimeAPI)[keyof typeof RuntimeAPI] | void;
export const RuntimeAPI = {
  tags: "tags",
  class: "class",
} as const;

export function getRuntimeAPI(
  translator: { preferAPI?: string } | undefined,
  parsed: Parsed,
): RuntimeAPI {
  return (
    detectAPIFromTranslator(translator) ||
    detectAPIFromFileName(parsed.filename) ||
    detectAPIFromProgram(parsed, parsed.program)
  );
}

function detectAPIFromTranslator(
  translator: { preferAPI?: string } | undefined,
): RuntimeAPI {
  switch (translator?.preferAPI) {
    case "class":
      return RuntimeAPI.class;
    case "tags":
      return RuntimeAPI.tags;
  }
}

function detectAPIFromFileName(filename: string): RuntimeAPI {
  for (let end = filename.length, i = end; --i; ) {
    switch (filename[i]) {
      case "/":
      case "\\":
        if (filename.startsWith("tags", i + 1)) {
          // Anything in a `tags` directory MUST BE tags api.
          return RuntimeAPI.tags;
        } else if (filename.startsWith("components", i + 1)) {
          // If it's in a components directory it could be interop.
          return;
        }

        end = i;
        break;
    }
  }
}

function detectAPIFromProgram(
  parsed: Parsed,
  program: Node.Program,
): RuntimeAPI {
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
): RuntimeAPI {
  if (body) {
    for (const child of body) {
      const api = detectAPIFromChild(parsed, child);
      if (api) return api;
    }
  }
}

function detectAPIFromChild(parsed: Parsed, child: Node.ChildNode): RuntimeAPI {
  switch (child.type) {
    case NodeType.Scriptlet:
      return RuntimeAPI.class;
    case NodeType.Tag:
    case NodeType.AttrTag:
      return detectAPIFromTag(parsed, child);
  }
}

function detectAPIFromTag(parsed: Parsed, tag: Node.ParentTag): RuntimeAPI {
  switch (tag.nameText) {
    case "macro":
    case "include-text":
    case "include-html":
    case "init-components":
    case "await-reorderer":
    case "while":
    case "module-code":
      return RuntimeAPI.class;
    case "const":
    case "debug":
    case "define":
    case "html-script":
    case "html-style":
    case "id":
    case "let":
    case "lifecycle":
    case "log":
    case "return":
      return RuntimeAPI.tags;
  }

  if (tag.var) {
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

        if (
          /^(?:key|no-update(?:-body)?(?:-if)?)$|:(scoped:no-update)$/.test(
            parsed.read(attr.name),
          )
        ) {
          return RuntimeAPI.class;
        }
      }
    }
  }

  return detectAPIFromBody(parsed, tag.body);
}
