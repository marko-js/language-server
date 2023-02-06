import "./marko";

declare global {
  namespace Marko {
    export interface Body<
      in Params extends readonly any[] = [],
      out Return = void,
      out _Scope = unknown
    > {
      (...params: Params): Generator<_Scope, Return, never>;
    }

    /**
     * @internal
     * Do not use or you will be fired.
     */
    namespace ᜭ {
      export const rendered: {
        scopes: Record<number, never>;
        returns: Record<number, never>;
      };

      export function noop(value: any): void;

      export function state<Component>(
        component: Component
      ): Component extends {
        state: infer State extends object;
      }
        ? State
        : never;

      export function returnWithScope<Input, Return>(
        input: Input,
        returned: Return
      ): ReturnWithScope<Scopes<Input>, Return>;

      export function instance<Constructor>(
        constructor: Constructor
      ): Constructor extends new (...args: any) => infer Instance
        ? Instance
        : never;

      export function inlineBody<Return = void, Scope = never>(
        result: ReturnWithScope<Scope, Return> | void
      ): Marko.Body<any, Return, Scope>;

      export function body<Params extends readonly any[], Return, Scope>(
        renderBody: Marko.Body<Params, Return, Scope>
      ): Marko.Body<Params, Return, Scope>;

      export function readScopes<Rendered>(
        rendered: Rendered
      ): MergeScopes<
        Rendered extends { scopes: Record<any, infer Scope> } ? Scope : never
      > &
        Record<any, never>;

      export function assertRendered<Index extends number, Rendered, Result>(
        rendered: Rendered,
        index: Index,
        result: Result
      ): asserts rendered is Rendered & {
        scopes: Record<
          Index,
          MergeOptionalScopes<
            Result extends ReturnWithScope<infer Scope, any> ? Scope : undefined
          >
        >;
        returns: Result extends ReturnWithScope<any, infer Return>
          ? Record<Index, Return>
          : Record<Index, never>;
      };

      export function mutable<Lookup>(lookup: Lookup): UnionToIntersection<
        Lookup extends readonly (infer Item)[]
          ? Item extends
              | readonly [infer LocalName extends string, infer Data]
              | readonly [infer LocalName, infer SourceName, infer Data]
            ? Data extends {
                [K in `${SourceName extends string
                  ? SourceName
                  : LocalName}Change`]: (value: infer V, ...args: any[]) => any;
              }
              ? { [K in LocalName]: V }
              : { readonly [K in LocalName]: unknown }
            : never
          : never
      >;

      export function bind<
        Owner extends Marko.Component,
        OwnerHandlers extends ComponentEventHandlers<Owner>,
        Handler extends keyof OwnerHandlers | ((...args: any) => any),
        Args extends readonly any[]
      >(
        owner: Owner,
        handler: Handler,
        ...args: Args
      ): Args extends readonly []
        ? Handler extends keyof OwnerHandlers
          ? OwnerHandlers[Handler]
          : Handler
        : (...args: any) => any; // If typescript ever actually supports partial application maybe we do this.

      export function renderTemplate<Name extends Template>(
        tag: Name
      ): CustomTagRenderer<Name>;
      export function renderTag<Name extends string>(
        tag: Name
      ): NativeTagRenderer<Name>;
      export function render<Name>(
        tag: Name
      ): 0 extends 1 & Name
        ? DefaultRenderer
        : Name extends Marko.Template
        ? CustomTagRenderer<Name>
        : Name extends string
        ? NativeTagRenderer<Name>
        : Name extends AnyMarkoBody
        ? BodyRenderer<Name>
        : Name extends { renderBody?: AnyMarkoBody }
        ? Name["renderBody"] extends AnyMarkoBody
          ? BodyRenderer<Name["renderBody"]>
          : InputRenderer<
              RenderBodyInput<
                Marko.BodyParamaters<Exclude<Name["renderBody"], void>>
              >
            >
        : DefaultRenderer;

      export function returnTag<
        Input extends { value: unknown; valueChange?: (value: any) => void }
      >(input: Input): Input;

      export function forTag<Value, Scope>(input: {
        of: Value;
        renderBody: Marko.Body<
          [
            value: Value extends readonly (infer Item)[] | Iterable<infer Item>
              ? Item
              : unknown,
            index: number,
            all: Value
          ],
          void,
          Scope
        >;
      }): ReturnWithScope<Scope, void>;

      export function forTag<Value, Scope>(input: {
        in: Value;
        renderBody: Marko.Body<
          [key: keyof Value, value: Value[keyof Value]],
          void,
          Scope
        >;
      }): ReturnWithScope<Scope, void>;

      export function forTag<
        From extends void | number,
        To extends number,
        Step extends void | number,
        Scope
      >(input: {
        from?: From;
        to: To;
        step?: Step;
        renderBody: Marko.Body<[index: number], void, Scope>;
      }): ReturnWithScope<Scope, void>;

      export function forTag<Scope>(
        input: (
          | {
              from?: number;
              to: number;
              step?: number;
            }
          | {
              in: unknown;
            }
          | {
              of: readonly unknown[] | Iterable<unknown>;
            }
        ) & { renderBody?: Marko.Body<any, any, Scope> }
      ): ReturnWithScope<Scope, void>;

      export function forAttrTag<
        Value extends Iterable<any> | readonly any[],
        Return
      >(
        input: {
          of: Value;
        },
        renderBody: (
          value: Value extends readonly (infer Item)[] | Iterable<infer Item>
            ? Item
            : unknown,
          index: number,
          all: Value
        ) => Return
      ): {
        [Key in keyof Return]: Return[Key] extends
          | readonly (infer Item)[]
          | infer Item
          ? AttrTagByListSize<Value, Item>
          : never;
      };

      export function forAttrTag<Value extends object, Return>(
        input: {
          in: Value;
        },
        renderBody: (key: keyof Value, value: Value[keyof Value]) => Return
      ): {
        [Key in keyof Return]: Return[Key] extends
          | readonly (infer Item)[]
          | infer Item
          ? AttrTagByObjectSize<Value, Item>
          : never;
      };

      export function forAttrTag<
        From extends void | number,
        To extends number,
        Step extends void | number,
        Return
      >(
        input: {
          from?: From;
          to: To;
          step?: Step;
        },
        renderBody: (index: number) => Return
      ): {
        [Key in keyof Return]: Return[Key] extends
          | readonly (infer Item)[]
          | infer Item
          ? number extends From | To | Step
            ? Marko.MaybeRepeatable<Item>
            : Step extends 0
            ? never
            : [To] extends [From extends void ? 0 : From]
            ? undefined
            : Marko.Repeatable<Item>
          : never;
      };

      export function forAttrTag<Return>(attrs: {
        input:
          | {
              of: any;
            }
          | {
              in: any;
            }
          | {
              from?: any;
              to: any;
              step?: any;
            };
        renderBody: (index: number) => Return;
      }): {
        [Key in keyof Return]: Return[Key] extends
          | readonly (infer Item)[]
          | infer Item
          ? Marko.MaybeRepeatable<Item>
          : never;
      };

      export function mergeAttrTags<Attrs extends readonly any[]>(
        ...attrs: Attrs
      ): MergeAttrTags<Attrs>;

      export type CustomTagRenderer<Template> = Template extends {
        ᜭ: infer Renderer;
      }
        ? Renderer
        : DefaultRenderer;

      export interface NativeTagRenderer<Name extends string> {
        <Input extends Marko.NativeTags[Name]["input"]>(
          input: Input
        ): ReturnWithScope<Scopes<Input>, Marko.NativeTags[Name]["return"]>;
      }

      export interface BodyRenderer<Body extends AnyMarkoBody> {
        <Args extends Marko.BodyParamaters<Body>>(
          input: RenderBodyInput<Args>
        ): ReturnWithScope<Scopes<Args>, Marko.BodyReturnType<Body>>;
      }

      export interface InputRenderer<Input extends Record<any, unknown>> {
        (input: Input): ReturnWithScope<Scopes<Input>, void>;
      }

      export interface DefaultRenderer {
        <Input = Record<any, unknown>>(input: Input): ReturnWithScope<
          Scopes<Input>,
          void
        >;
      }

      export type Relate<T, I> = T extends I ? T : T;
    }
  }
}

type AnyMarkoBody = Marko.Body<any, any, any>;

type ReturnWithScope<Scope, Return> = {
  return?: Return;
  scope?: Scope;
};

type RenderBodyInput<Args extends readonly unknown[]> = Args extends {
  length: infer Length;
}
  ? number extends Length
    ? { value?: Args }
    : 0 extends Length
    ? { value?: [] }
    : { value: Args }
  : never;

type Scopes<Input> = 0 extends 1 & Input
  ? never
  : Input extends Record<any, unknown>
  ? MergeScopes<FlatScopes<Input>>
  : never;

type ComponentEventHandlers<C extends Marko.Component> = {
  [K in
    | Exclude<
        keyof C,
        | "onCreate"
        | "onInput"
        | "onRender"
        | "onMount"
        | "onUpdate"
        | "onDestroy"
        | keyof Marko.Component
      >
    | "emit"
    | "setState"
    | "setStateDirty"
    | "forceUpdate"]: C[K] extends (...args: any) => any ? C[K] : never;
};

type FlatScopes<Input extends object> = Input[keyof Input] extends infer Prop
  ? Prop extends Marko.Body<any, any, infer Scope>
    ? unknown extends Scope
      ? never
      : Scope
    : 0 extends 1 & Prop
    ? never
    : Prop extends object
    ? FlatScopes<Prop>
    : never
  : never;

type MergeScopes<Scopes> = {
  [K in Scopes extends Scopes ? keyof Scopes : never]: Scopes extends Scopes
    ? Scopes[K & keyof Scopes]
    : never;
};

type MergeOptionalScopes<Scopes> = {
  [K in Scopes extends Scopes ? keyof Scopes : never]: Scopes extends Scopes
    ? K extends keyof Scopes
      ? Scopes[K]
      : undefined
    : never;
};

type MergeAttrTags<Attrs extends readonly any[]> = Attrs extends readonly [
  infer A,
  infer B,
  ...infer Rest
]
  ? MergeAttrTags<[MergeAttrTag<A, B>, ...Rest]>
  : Attrs extends readonly [infer A]
  ? A
  : never;

type MergeAttrTag<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A
    ? K extends keyof B
      ? MergeAttrTagValue<A[K], B[K]>
      : A[K]
    : K extends keyof B
    ? B[K]
    : never;
};

type MergeAttrTagValue<A, B> = A extends readonly any[]
  ? B extends readonly any[]
    ? [...A, ...B]
    : B extends void
    ? A
    : [...A, B]
  : A extends void
  ? B
  : B extends void
  ? A
  : [A, B];

type AttrTagByListSize<T, Item> = T extends
  | readonly [any, any, ...any[]]
  | readonly [...any[], any, any]
  | readonly [any, ...any[], any]
  ? Marko.Repeated<Item>
  : T extends readonly [any]
  ? Item
  : T extends readonly [any, ...any[]] | readonly [...any[], any]
  ? Marko.Repeatable<Item>
  : T extends readonly []
  ? undefined
  : Marko.MaybeRepeatable<Item>;

type AttrTagByObjectSize<
  Value,
  Item,
  Keys = RecordKeys<Value>,
  KnownKeys = KnownRecordKeys<Value>
> = CheckNever<
  Keys,
  undefined,
  CheckUnionSize<
    KnownKeys,
    [Keys] extends [KnownKeys] ? Item : Marko.Repeatable<Item>,
    Marko.Repeated<Item>,
    Marko.MaybeRepeatable<Item>
  >
>;

type CheckUnionSize<T, IfOne, IfMany, Else, Copy = T> = CheckNever<
  T,
  Else,
  T extends T
    ? (Copy extends T ? never : true) extends never
      ? IfOne
      : IfMany
    : never
>;

type RecordKeys<T> = keyof {
  [K in keyof T as CheckNever<T[K], never, K>]: 0;
};

type KnownRecordKeys<T> = keyof {
  [Key in keyof T as string extends Key
    ? never
    : number extends Key
    ? never
    : symbol extends Key
    ? never
    : CheckNever<T[Key], never, Key>]: 0;
};

type CheckNever<T, If, Else> = [T] extends [never] ? If : Else;

type UnionToIntersection<T> = (T extends any ? (_: T) => any : never) extends (
  _: infer U
) => any
  ? U
  : never;

export {};
