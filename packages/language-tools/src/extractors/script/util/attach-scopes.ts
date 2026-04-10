import { types as t } from "@marko/compiler";

import {
  type Node,
  NodeType,
  Parsed,
  type Range,
  Repeatable,
  Repeated,
} from "../../../parser";
import { ScriptParser } from "./script-parser";

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
  scope: Scope;
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

export interface Mutation {
  start: number;
  binding: VarBinding;
}

type Bindings = { [name: string]: Binding };

const VISITOR_KEYS = (t as any).VISITOR_KEYS;
const ATTR_UNNAMED = "value";
const Scopes = new WeakMap<NonNullable<Node.ParentNode["body"]>, Scope>();
const BoundAttrValueRange = new WeakMap<
  Node.AttrValue,
  {
    value: Range;
    types: undefined | Range;
    member:
      | undefined
      | (Range & {
          computed: boolean;
        });
  }
>();

/**
 * Traverses the Marko tree and analyzes the bindings.
 */
export function crawlProgramScope(parsed: Parsed, ast: ScriptParser) {
  const { program } = parsed;
  const mutations: Mutation[] = [];
  const potentialHoists: VarBinding[] = [];
  const potentialMutations = new Map<Scope, Repeated<t.Node>>();
  const programScope: ProgramScope = {
    parent: undefined,
    hoists: false,
    bindings: {},
  };

  programScope.bindings.input = {
    type: BindingType.param,
    name: "input",
    node: program,
    scope: programScope,
    hoisted: false,
  };

  visit(program.body, programScope);
  Scopes.set(program.body, programScope);

  for (const binding of potentialHoists) {
    const { scope, name } = binding as VarBinding;
    let curParent = scope.parent;

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
      scope.hoists = true;
      curParent = scope.parent;
      while (curParent && !curParent.hoists && curParent !== programScope) {
        curParent.hoists = true;
        curParent = curParent.parent;
      }
    }
  }

  for (const [scope, nodes] of potentialMutations) {
    const shadows = new Set<string>();
    const blockMutations: t.Identifier[] = [];
    for (const node of nodes) {
      trackMutations(node, scope, mutations, shadows, blockMutations);
    }

    flushMutations(scope, mutations, shadows, blockMutations);
  }

  if (mutations.length) {
    return mutations.sort(byStart) as Repeated<Mutation>;
  }

  function visit(body: Node.ChildNode[], parentScope: Scope) {
    for (const child of body) {
      switch (child.type) {
        case NodeType.Tag:
        case NodeType.AttrTag: {
          if (child.var) {
            parentScope.bindings ??= {};

            const tagVar = ast.tagVar(child.var);

            if (tagVar) {
              checkForMutations(parentScope, tagVar);

              for (const id of getVarIdentifiers(
                parsed,
                tagVar,
                "",
                ATTR_UNNAMED,
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

              const parsedParams = ast.tagParams(child.params);

              if (parsedParams) {
                for (const param of parsedParams) {
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

            const scriptBody = ast.scriptBody(child);
            if (scriptBody) {
              const nodes = potentialMutations.get(parentScope);
              if (nodes) {
                nodes.push(...scriptBody);
              } else {
                potentialMutations.set(parentScope, [
                  ...scriptBody,
                ] as Repeated<t.Node>);
              }
            } else {
              visit(child.body, bodyScope);
            }
            Scopes.set(child.body, bodyScope);
          }

          if (child.attrs) {
            for (const attr of child.attrs) {
              switch (attr.type) {
                case NodeType.AttrSpread: {
                  checkForMutations(parentScope, ast.attrSpread(attr));
                  break;
                }
                case NodeType.AttrNamed: {
                  switch (attr.value?.type) {
                    case NodeType.AttrValue: {
                      let parsedValue = ast.attrValue(attr.value);

                      if (parsedValue) {
                        if (!attr.value.bound) {
                          checkForMutations(parentScope, parsedValue);
                        } else {
                          let types: Range | undefined;
                          if (
                            parsedValue.type === "TSAsExpression" ||
                            parsedValue.type === "TSSatisfiesExpression"
                          ) {
                            types = {
                              start: parsedValue.expression.end! + 1,
                              end: parsedValue.end!,
                            };
                            parsedValue = parsedValue.expression;
                          }

                          if (parsedValue.type === "Identifier") {
                            const binding = resolveWritableVar(
                              parentScope,
                              parsedValue.name,
                            );
                            if (binding) {
                              binding.mutated = true;
                            }

                            BoundAttrValueRange.set(attr.value, {
                              types,
                              value: {
                                start: parsedValue.start!,
                                end: parsedValue.end!,
                              },
                              member: undefined,
                            });
                          } else if (parsedValue.type === "MemberExpression") {
                            BoundAttrValueRange.set(attr.value, {
                              types,
                              value: {
                                start: parsedValue.start!,
                                end: parsedValue.property.start! - 1,
                              },
                              member: {
                                start: parsedValue.property.start!,
                                end: parsedValue.property.end!,
                                computed: parsedValue.computed,
                              },
                            });
                          }
                        }
                      }

                      break;
                    }

                    case NodeType.AttrMethod: {
                      checkForMutations(
                        parentScope,
                        ast.attrMethod(attr.value),
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
      traverse(node, (child) => {
        // Since the root will always be an expression it's impossible
        // to hit a "FunctionDeclaration" without first going through
        // a a different function context. So we don't need to track it.
        // case "FunctionDeclaration":
        switch (child.type) {
          case "FunctionDeclaration":
          case "FunctionExpression":
          case "ObjectMethod":
          case "ArrowFunctionExpression":
          case "ClassMethod":
          case "ClassPrivateMethod": {
            const nodes = potentialMutations.get(scope);
            if (nodes) {
              nodes.push(child);
            } else {
              potentialMutations.set(scope, [child]);
            }
            return true;
          }
        }
      });
    }
  }
}

export function getProgramBindings(node: Node.Program) {
  const { bindings } = Scopes.get(node.body)!;
  let hoists: Repeatable<string>;
  let vars: Repeatable<string>;

  for (const key in bindings) {
    switch (bindings[key].type) {
      case BindingType.hoisted:
        if (hoists) {
          hoists.push(key);
        } else {
          hoists = [key];
        }
        break;
      case BindingType.var:
        if (vars) {
          vars.push(key);
        } else {
          vars = [key];
        }
        break;
    }
  }

  if (hoists || vars) {
    return {
      all: (vars
        ? hoists
          ? [...vars, ...hoists]
          : vars
        : hoists) as Repeated<string>,
      vars,
      hoists,
    };
  }
}

export function getMutatedVars(tag: Node.Tag) {
  const { bindings } = Scopes.get(tag.parent.body!)!;
  let vars: Repeatable<VarBinding>;

  for (const key in bindings) {
    const binding = bindings[key];
    if (
      binding.type == BindingType.var &&
      binding.node === tag &&
      binding.mutated
    ) {
      if (vars) {
        vars.push(binding);
      } else {
        vars = [binding];
      }
    }
  }

  return vars;
}

export function getHoistSources(body: Node.ParentNode["body"]) {
  let result: Repeatable<string>;

  if (body) {
    const { bindings } = Scopes.get(body)!;

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

export function isMutatedVar(node: Node.ParentNode, name: string) {
  let scope = Scopes.get(node.body!);

  while (scope) {
    const binding = scope.bindings?.[name];
    if (binding?.type === BindingType.var && binding.mutated) {
      return true;
    }

    scope = scope.parent;
  }

  return false;
}

export function hasHoists(node: Node.Tag) {
  return node.body ? Scopes.get(node.body)!.hoists : false;
}

export function getBoundAttrRange(value: Node.AttrValue) {
  return BoundAttrValueRange.get(value);
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

function* getIdentifiers(
  lVal: t.LVal | t.VoidPattern,
): Generator<string, void> {
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
  lVal: t.LVal | t.VoidPattern,
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

function trackMutations(
  node: t.Node | null | void,
  scope: Scope,
  mutations: Mutation[],
  parentBlockShadows: Set<string>,
  parentBlockMutations: t.Identifier[],
): void {
  if (!node) return;

  let blockShadows = parentBlockShadows;
  let blockMutations = parentBlockMutations;

  switch (node.type) {
    case "BlockStatement":
      if (blockMutations === parentBlockMutations) {
        blockShadows = new Set(blockShadows);
        blockMutations = [];
      }
      break;
    case "ForStatement":
    case "ForInStatement":
    case "ForOfStatement":
      blockShadows = new Set(blockShadows);
      blockMutations = [];
      break;
    case "ArrowFunctionExpression":
      blockShadows = new Set(blockShadows);
      blockMutations = [];

      for (const param of node.params) {
        trackShadows(param, scope, blockShadows);
      }

      break;
    case "ObjectMethod":
    case "ClassMethod":
    case "ClassPrivateMethod":
      blockShadows = new Set(blockShadows);
      blockMutations = [];

      for (const param of node.params) {
        trackShadows(param, scope, blockShadows);
      }

      break;
    case "FunctionExpression":
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

      blockShadows = new Set(blockShadows);
      blockMutations = [];

      for (const param of node.params) {
        trackShadows(param, scope, blockShadows);
      }

      break;
    case "ClassExpression":
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

      blockShadows = new Set(blockShadows);
      blockMutations = [];

      break;
    case "CatchClause":
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

  for (const key of VISITOR_KEYS[node.type]) {
    const child = (node as any)[key] as void | null | t.Node | t.Node[];

    if (Array.isArray(child)) {
      for (const item of child) {
        trackMutations(item, scope, mutations, blockShadows, blockMutations);
      }
    } else {
      trackMutations(child, scope, mutations, blockShadows, blockMutations);
    }
  }

  if (blockMutations !== parentBlockMutations && blockMutations.length) {
    flushMutations(scope, mutations, blockShadows, blockMutations);
  }
}

function flushMutations(
  scope: Scope,
  mutations: Mutation[],
  blockShadows: Set<string>,
  blockMutations: t.Identifier[],
) {
  for (const { name, start } of blockMutations) {
    if (start == null || blockShadows.has(name)) continue;
    const binding = resolveWritableVar(scope, name);
    if (binding) {
      binding.mutated = true;
      mutations.push({ start, binding });
    }
  }
}

function trackShadows(
  node: t.LVal | t.VoidPattern,
  scope: Scope,
  shadows: Set<string>,
) {
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
  for (const key of VISITOR_KEYS[node.type]) {
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

function byStart(a: { start: number }, b: { start: number }) {
  return a.start - b.start;
}
