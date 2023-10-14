import * as t from "@babel/types";
import {
  type Node,
  NodeType,
  Parsed,
  type Range,
  Repeatable,
  Repeated,
} from "../../../parser";
import type { ScriptParser } from "./script-parser";

export interface Options {
  parsed: Parsed;
  scriptParser: ScriptParser;
}

export type Scope = ProgramScope | TagScope;

export interface ProgramScope {
  parent: undefined;
  hoists: false;
  bindings: Bindings;
}

export interface TagScope {
  parent: Scope;
  hoists: boolean;
  bindings: undefined | Bindings;
}

export type Binding = VarBinding | ParamBinding | HoistedBinding;

export interface VarBinding {
  type: BindingType.var;
  name: string;
  node: Node.ParentNode;
  scope: Scope;
  hoisted: boolean;
  mutated: boolean;
  sourceName: string | undefined;
  objectPath: string | undefined;
}

export interface ParamBinding {
  type: BindingType.param;
  name: string;
  node: Node.ParentNode;
  scope: TagScope;
  hoisted: false;
}

export interface HoistedBinding {
  type: BindingType.hoisted;
  scope: Scope;
  bindings: Repeated<VarBinding>;
  hoisted: false;
}

export enum BindingType {
  var,
  param,
  hoisted,
}

type Bindings = { [name: string]: Binding };

const ATTR_UNAMED = "value";
const Scopes = new WeakMap<NonNullable<Node.ParentNode["body"]>, Scope>();
const BoundAttrMemberExpressionStartOffsets = new WeakMap<
  Node.AttrValue,
  number
>();

/**
 * Traverses the Marko tree and analyzes the bindings.
 */
export function crawlProgramScope(parsed: Parsed, scriptParser: ScriptParser) {
  const { program, read } = parsed;
  const mutations: number[] = [];
  const potentialHoists: VarBinding[] = [];
  const nodesToCheckForMutations = new Map<Scope, Repeated<t.Node>>();
  const programScope: ProgramScope = {
    parent: undefined,
    hoists: false,
    bindings: {},
  };

  programScope.bindings.input = {
    type: BindingType.var,
    name: "input",
    node: program,
    scope: programScope,
    hoisted: false,
    mutated: false,
    sourceName: undefined,
    objectPath: undefined,
  };

  visit(program.body, programScope);
  Scopes.set(program.body, programScope);

  for (const binding of potentialHoists) {
    const { scope, name } = binding as VarBinding;
    const parentScope = scope.parent;
    let curParent = parentScope;

    while (curParent) {
      const parentBinding = curParent.bindings?.[name];

      if (parentBinding) {
        if (parentBinding.type === BindingType.hoisted) {
          binding.hoisted = true;
          parentBinding.bindings.push(binding);
        }

        break;
      }

      if (curParent === programScope) {
        binding.hoisted = true;
        programScope.bindings![name] = {
          type: BindingType.hoisted,
          scope: programScope,
          bindings: [binding],
          hoisted: false,
        };
        break;
      }

      curParent = curParent.parent;
    }

    if (binding.hoisted) {
      curParent = scope;
      while (curParent && !curParent.hoists) {
        curParent.hoists = true;
        curParent = curParent.parent;
      }
    }
  }

  for (const [scope, nodes] of nodesToCheckForMutations) {
    for (const node of nodes) {
      trackMutationsInClosures(node, scope, mutations);
    }
  }

  if (mutations.length) {
    return mutations.sort((a, b) => a - b) as Repeated<number>;
  }

  function visit(body: Node.ChildNode[], parentScope: Scope) {
    for (const child of body) {
      switch (child.type) {
        case NodeType.Tag:
        case NodeType.AttrTag: {
          if (child.var) {
            parentScope.bindings ??= {};

            // TODO: should support member expression tag vars.
            const parsedFn = scriptParser.expressionAt<
              t.AssignmentExpression & { left: t.LVal }
            >(child.var.value.start - 6, `${read(child.var.value)}=0`);

            if (parsedFn) {
              const lVal = parsedFn.left;
              checkForMutations(parentScope, lVal);

              for (const id of getVarIdentifiers(
                parsed,
                lVal,
                "",
                ATTR_UNAMED,
              )) {
                const { name, objectPath, sourceName } = id;
                const binding: VarBinding = (parentScope.bindings[name] = {
                  type: BindingType.var,
                  name,
                  node: child,
                  scope: parentScope,
                  hoisted: false,
                  mutated: false,
                  objectPath,
                  sourceName,
                });

                potentialHoists.push(binding);
              }
            }
          }

          if (child.body) {
            const bodyScope: Scope = {
              parent: parentScope,
              hoists: false,
              bindings: {},
            };

            if (child.params) {
              bodyScope.bindings ??= {};

              const parsedFn =
                scriptParser.expressionAt<t.ArrowFunctionExpression>(
                  child.params.start,
                  `(${read(child.params.value)})=>{}`,
                );

              if (parsedFn) {
                for (const param of parsedFn.params) {
                  checkForMutations(bodyScope, param);
                  for (const name of getIdentifiers(param)) {
                    bodyScope.bindings[name] = {
                      type: BindingType.param,
                      name,
                      node: child,
                      scope: bodyScope,
                      hoisted: false,
                    };
                  }
                }
              }
            }

            visit(child.body, bodyScope);
            Scopes.set(child.body, bodyScope);
          }

          if (child.attrs) {
            for (const attr of child.attrs) {
              switch (attr.type) {
                case NodeType.AttrSpread: {
                  checkForMutations(
                    parentScope,
                    scriptParser.expressionAt(
                      attr.value.start,
                      read(attr.value),
                    ),
                  );
                  break;
                }
                case NodeType.AttrNamed: {
                  switch (attr.value?.type) {
                    case NodeType.AttrValue: {
                      const parsedValue = scriptParser.expressionAt(
                        attr.value.value.start,
                        read(attr.value.value),
                      );

                      if (parsedValue) {
                        switch (parsedValue.type) {
                          case "Identifier":
                            if (attr.value.bound) {
                              const binding = resolveWritableVar(
                                parentScope,
                                parsedValue.name,
                              );
                              if (binding) {
                                binding.mutated = true;
                              }
                            }
                            break;
                          case "MemberExpression":
                            if (attr.value.bound) {
                              BoundAttrMemberExpressionStartOffsets.set(
                                attr.value,
                                parsedValue.property.start! - 1,
                              );
                            }
                            break;
                          default:
                            checkForMutations(parentScope, parsedValue);
                            break;
                        }
                      }

                      break;
                    }

                    case NodeType.AttrMethod: {
                      checkForMutations(
                        parentScope,
                        scriptParser.expressionAt(
                          attr.value.params.start - 2,
                          `{_${read({
                            start: attr.value.params.start,
                            end: attr.value.body.end,
                          })}}`,
                        ),
                      );
                      break;
                    }
                  }
                  break;
                }
              }
            }
          }

          break;
        }
      }
    }
  }

  function checkForMutations(scope: Scope, node?: t.Node) {
    if (node) {
      const nodes = nodesToCheckForMutations.get(scope);

      if (nodes) {
        nodes.push(node);
      } else {
        nodesToCheckForMutations.set(scope, [node]);
      }
    }
  }
}

export function getHoists(node: Node.Program) {
  const { bindings } = Scopes.get(node.body)!;
  let result: Repeatable<string>;

  for (const key in bindings) {
    if (bindings[key].type === BindingType.hoisted) {
      if (result) {
        result.push(key);
      } else {
        result = [key];
      }
    }
  }

  return result;
}

export function getHoistSources(node: Node.ParentNode) {
  let result: Repeatable<string>;

  if (node.body) {
    const { bindings } = Scopes.get(node.body)!;

    for (const key in bindings) {
      if (bindings[key].hoisted) {
        if (result) {
          result.push(key);
        } else {
          result = [key];
        }
      }
    }
  }

  return result;
}

export function getMutatedVars(node: Node.ParentNode) {
  let result: Repeatable<VarBinding>;
  const { bindings } = Scopes.get(node.body!)!;

  for (const key in bindings) {
    const binding = bindings[key];
    if (binding.type === BindingType.var && binding.mutated) {
      if (result) {
        result.push(binding);
      } else {
        result = [binding];
      }
    }
  }

  return result;
}

export function isMutatedVar(node: Node.ParentNode, name: string) {
  const { bindings } = Scopes.get(node.body!)!;
  const binding = bindings?.[name];
  return binding?.type === BindingType.var && binding.mutated;
}

export function hasHoists(node: Node.ParentTag) {
  return node.body ? Scopes.get(node.body)!.hoists : false;
}

export function getBoundAttrMemberExpressionStartOffset(value: Node.AttrValue) {
  return BoundAttrMemberExpressionStartOffsets.get(value);
}

function resolveWritableVar(scope: Scope, name: string) {
  let curScope: Scope | undefined = scope;
  do {
    const binding = curScope.bindings?.[name];
    if (binding?.type === BindingType.var && binding.sourceName !== undefined) {
      return binding;
    }
  } while ((curScope = curScope.parent));
}

function* getIdentifiers(lVal: t.LVal): Generator<string, void> {
  switch (lVal.type) {
    case "Identifier":
      yield lVal.name;
      break;
    case "ObjectPattern":
      for (const prop of lVal.properties) {
        if (prop.type === "RestElement") {
          yield* getIdentifiers(prop.argument);
        } else {
          yield* getIdentifiers(prop.value as t.LVal);
        }
      }
      break;
    case "ArrayPattern":
      for (const element of lVal.elements) {
        if (element) {
          if (element.type === "RestElement") {
            yield* getIdentifiers(element.argument);
          } else {
            yield* getIdentifiers(element);
          }
        }
      }
      break;
    case "AssignmentPattern":
      yield* getIdentifiers(lVal.left);
      break;
  }
}

function* getVarIdentifiers(
  parsed: Parsed,
  lVal: t.LVal,
  objectPath: string,
  sourceName?: string,
): Generator<{
  name: string;
  objectPath: string;
  sourceName: string | undefined;
}> {
  switch (lVal.type) {
    case "Identifier":
      yield {
        name: lVal.name,
        objectPath,
        sourceName,
      };
      break;
    case "ObjectPattern":
      for (const prop of lVal.properties) {
        if (prop.type === "RestElement") {
          yield* getVarIdentifiers(
            parsed,
            prop.argument,
            objectPath,
            sourceName,
          );
        } else {
          let sourceName: string;
          let accessor: string;

          if (prop.key.type === "Identifier") {
            sourceName = prop.key.name;
            accessor = `.${sourceName}`;
          } else {
            sourceName = parsed.read(prop.key as Range);
            accessor = `[${sourceName}]`;
          }

          yield* getVarIdentifiers(
            parsed,
            prop.value as t.LVal,
            objectPath + accessor,
            sourceName,
          );
        }
      }
      break;
    case "ArrayPattern": {
      let i = -1;
      for (const element of lVal.elements) {
        i++;
        if (element) {
          if (element.type === "RestElement") {
            // TODO: technically this is wrong, but it's not worth the effort to fix it
            // Ideally when destructuring we should handle nested spreads with an array
            // destructuring at the end, eg:
            // const [a, ...[b, ...[c]]] = [1, 2, 3];
            yield* getVarIdentifiers(parsed, element.argument, objectPath);
          } else {
            yield* getVarIdentifiers(parsed, element, objectPath + `[${i}]`);
          }
        }
      }
      break;
    }
    case "AssignmentPattern":
      yield* getVarIdentifiers(parsed, lVal.left, objectPath, sourceName);
      break;
  }
}

function trackMutationsInClosures(
  root: t.Node,
  scope: Scope,
  mutations: number[],
) {
  traverse(root, (node) => {
    switch (node.type) {
      // Since the root will always be an expression it's impossible
      // to hit a "FunctionDeclaration" without first going through
      // a a different function context. So we don't need to track it.
      // case "FunctionDeclaration":
      case "FunctionExpression":
      case "ObjectMethod":
      case "ArrowFunctionExpression":
      case "ClassMethod":
      case "ClassPrivateMethod":
        trackMutations(node, scope, mutations, node, new Set(), []);
        return true;
    }
  });
}

function trackMutations(
  node: t.Node | null | void,
  scope: Scope,
  mutations: number[],
  parentBlock: t.Node,
  parentBlockShadows: Set<string>,
  parentBlockMutations: t.Identifier[],
): void {
  if (!node) return;

  let block = parentBlock;
  let blockShadows = parentBlockShadows;
  let blockMutations = parentBlockMutations;

  switch (node.type) {
    case "BlockStatement":
      if (block !== node) {
        block = node;
        blockShadows = new Set(blockShadows);
        blockMutations = [];
      }
      break;
    case "ForStatement":
    case "ForInStatement":
    case "ForOfStatement":
      block = node.body;
      blockShadows = new Set(blockShadows);
      blockMutations = [];
      break;
    case "ArrowFunctionExpression":
      block = node.body;
      blockShadows = new Set(blockShadows);
      blockMutations = [];

      for (const param of node.params) {
        trackShadows(param, scope, blockShadows);
      }

      break;
    case "ObjectMethod":
    case "ClassMethod":
    case "ClassPrivateMethod":
      block = node.body;
      blockShadows = new Set(blockShadows);
      blockMutations = [];

      for (const param of node.params) {
        trackShadows(param, scope, blockShadows);
      }

      break;
    case "FunctionExpression":
      block = node.body;
      blockShadows = new Set(blockShadows);
      blockMutations = [];

      if (node.id) {
        trackShadows(node.id, scope, blockShadows);
      }

      for (const param of node.params) {
        trackShadows(param, scope, blockShadows);
      }

      break;
    case "FunctionDeclaration":
      trackShadows(node.id!, scope, parentBlockShadows);

      block = node.body;
      blockShadows = new Set(blockShadows);
      blockMutations = [];

      for (const param of node.params) {
        trackShadows(param, scope, blockShadows);
      }

      break;
    case "ClassExpression":
      block = node.body;
      blockShadows = new Set(blockShadows);
      blockMutations = [];

      if (node.id) {
        trackShadows(node.id, scope, blockShadows);
      }
      break;
    case "ClassDeclaration":
      if (node.id) {
        trackShadows(node.id, scope, parentBlockShadows);
      }

      block = node.body;
      blockShadows = new Set(blockShadows);
      blockMutations = [];

      break;
    case "CatchClause":
      block = node.body;
      blockShadows = new Set(blockShadows);
      blockMutations = [];

      if (node.param) {
        trackShadows(node.param, scope, blockShadows);
      }
      break;
    case "VariableDeclaration":
      for (const decl of node.declarations) {
        trackShadows(decl.id, scope, blockShadows);
      }
      break;
    case "UpdateExpression":
      if (node.argument.type === "Identifier") {
        parentBlockMutations.push(node.argument);
      }
      break;
    case "AssignmentExpression":
      if (node.left.type === "Identifier") {
        parentBlockMutations.push(node.left);
      }
      break;
  }

  for (const key of t.VISITOR_KEYS[node.type]) {
    const child = (node as any)[key] as void | null | t.Node | t.Node[];

    if (Array.isArray(child)) {
      for (const item of child) {
        trackMutations(
          item,
          scope,
          mutations,
          block,
          blockShadows,
          blockMutations,
        );
      }
    } else {
      trackMutations(
        child,
        scope,
        mutations,
        block,
        blockShadows,
        blockMutations,
      );
    }
  }

  if (block !== parentBlock && blockMutations.length) {
    for (const { name, start } of blockMutations) {
      if (blockShadows.has(name)) continue;
      const binding = resolveWritableVar(scope, name);
      if (binding) {
        binding.mutated = true;
        mutations.push(start!);
      }
    }
  }
}

function trackShadows(node: t.LVal, scope: Scope, shadows: Set<string>) {
  for (const name of getIdentifiers(node)) {
    if (resolveWritableVar(scope, name)) {
      shadows.add(name);
    }
  }
}

/**
 * Traverse a babel AST and calls enter for each node.
 */
function traverse(
  node: t.Node | null | void,
  enter: (node: t.Node) => void | boolean, // return true to stop traversing
): void {
  if (!node) return;
  if (enter(node)) return;
  for (const key of t.VISITOR_KEYS[node.type]) {
    const child = (node as any)[key] as void | null | t.Node | t.Node[];

    if (Array.isArray(child)) {
      for (const item of child) {
        traverse(item, enter);
      }
    } else {
      traverse(child, enter);
    }
  }
}
