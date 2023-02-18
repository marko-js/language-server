// This is a typescript file which defines utilities used in the output of the typescript extractor.
declare global {
  namespace Marko {
    // Extend the Body type to keep track of what is yielded (used for scope hoisted types).
    export interface Body<
      in Params extends readonly any[] = [],
      out Return = void
    > {
      (...params: Params): MarkoReturn<Return>;
    }

    /**
     * Do not use or you will be fired.
     */
    namespace _ {
      export const voidReturn: MarkoReturn<void>;
      export const scope: unique symbol;
      export const out: Marko.Out;
      export const any: any;
      export const rendered: {
        scopes: Record<number, never>;
        returns: Record<number, never>;
      };

      export const Template: new <Overrides = unknown>() => {
        [K in Exclude<
          keyof Marko.Template,
          keyof Overrides
        >]: Marko.Template[K];
      } & Overrides;

      export function noop(value: any): void;

      export function state<Component>(
        component: Component
      ): Component extends {
        state: infer State extends object;
      }
        ? State
        : never;

      export type ReturnWithScope<Input, Return> = ReturnAndScope<
        Scopes<Input>,
        Return
      >;

      export function instance<Constructor>(
        constructor: Constructor
      ): Constructor extends abstract new (...args: any) => infer Instance
        ? Instance
        : never;

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
            Result extends { scope: infer Scope } ? Scope : undefined
          >
        >;
        returns: Result extends { return?: infer Return }
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

      export function renderTemplate<Name extends Marko.Template>(
        imported: Promise<{ default: Name }>
      ): CustomTagRenderer<Name>;
      export function renderNativeTag<Name extends string>(
        tag: Name
      ): NativeTagRenderer<Name>;
      export const missingTag: DefaultRenderer;
      export function renderPreferLocal<Name, Fallback>(
        name: Name,
        fallback: Fallback
      ): 0 extends 1 & Name ? Fallback : DynamicRenderer<Name>;
      export function renderDynamicTag<Name>(tag: Name): DynamicRenderer<Name>;

      export function returnTag<
        Input extends { value: unknown; valueChange?: (value: any) => void }
      >(input: Input): Input;

      export function forTag<
        Value,
        RenderBody extends Marko.Body<
          [
            value: Value extends readonly (infer Item)[] | Iterable<infer Item>
              ? Item
              : unknown,
            index: number,
            all: Value
          ],
          void
        >
      >(input: {
        of: Value;
        renderBody: RenderBody;
      }): ReturnAndScope<RenderBodyScope<RenderBody>, void>;

      export function forTag<
        Value,
        RenderBody extends Marko.Body<
          [key: keyof Value, value: Value[keyof Value]],
          void
        >
      >(input: {
        in: Value;
        renderBody: RenderBody;
      }): ReturnAndScope<RenderBodyScope<RenderBody>, void>;

      export function forTag<
        From extends void | number,
        To extends number,
        Step extends void | number,
        RenderBody extends Marko.Body<[index: number], void>
      >(input: {
        from?: From;
        to: To;
        step?: Step;
        renderBody: RenderBody;
      }): ReturnAndScope<RenderBodyScope<RenderBody>, void>;

      export function forTag<RenderBody extends AnyMarkoBody>(
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
        ) & { renderBody?: RenderBody }
      ): ReturnAndScope<RenderBodyScope<RenderBody>, void>;

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
            ? MaybeRepeatable<Item>
            : Step extends 0
            ? never
            : [To] extends [From extends void ? 0 : From]
            ? undefined
            : Repeatable<Item>
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
          ? MaybeRepeatable<Item>
          : never;
      };

      export function mergeAttrTags<Attrs extends readonly any[]>(
        ...attrs: Attrs
      ): MergeAttrTags<Attrs>;

      // TODO: this could be improved.
      // currently falls back to DefaultRenderer too eagerly.
      export type DynamicRenderer<Name> = 0 extends 1 & Name
        ? DefaultRenderer
        : [Name] extends [Marko.Template]
        ? CustomTagRenderer<Name>
        : [Name] extends [string]
        ? NativeTagRenderer<Name>
        : [Name] extends [AnyMarkoBody]
        ? BodyRenderer<Name>
        : [Name] extends [{ renderBody?: AnyMarkoBody }]
        ? [Name["renderBody"]] extends [AnyMarkoBody]
          ? BodyRenderer<Name["renderBody"]>
          : InputRenderer<
              RenderBodyInput<BodyParameters<Exclude<Name["renderBody"], void>>>
            >
        : DefaultRenderer;

      export type CustomTagRenderer<Template> = Template extends {
        _: infer Renderer;
      }
        ? Renderer
        : DefaultRenderer;

      export interface NativeTagRenderer<Name extends string> {
        (): () => <Input extends Marko.NativeTags[Name]["input"]>(
          input: Input
        ) => ReturnAndScope<Scopes<Input>, Marko.NativeTags[Name]["return"]>;
      }

      export interface BodyRenderer<Body extends AnyMarkoBody> {
        (): () => <Args extends BodyParameters<Body>>(
          input: RenderBodyInput<Args>
        ) => ReturnAndScope<Scopes<Args>, BodyReturnType<Body>>;
      }

      export interface InputRenderer<Input extends Record<any, unknown>> {
        (): () => (input: Input) => ReturnAndScope<Scopes<Input>, void>;
      }

      export interface DefaultRenderer {
        (): () => <Input extends Record<any, unknown>>(
          input: Input
        ) => ReturnAndScope<Scopes<Input>, void>;
      }

      export type Relate<A, B> = B extends A ? A : B;
    }
  }
}

declare abstract class MarkoReturn<Return> {
  return: Return;
}

type AnyMarkoBody = Marko.Body<any, any>;

type RenderBodyScope<RenderBody> = RenderBody extends (...params: any) => {
  [Marko._.scope]: infer Scope;
}
  ? Scope
  : never;

type ReturnAndScope<Scope, Return> = {
  return: Return;
  scope: Scope;
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

type ComponentEventHandlers<Component extends Marko.Component> = {
  [K in Exclude<
    keyof Component,
    Exclude<
      keyof Marko.Component,
      "emit" | "setState" | "setStateDirty" | "forceUpdate"
    >
  >]: Component[K] extends (...args: any) => any ? Component[K] : never;
};

type FlatScopes<Input extends object> = Input[keyof Input] extends infer Prop
  ? Prop extends (...args: any) => { [Marko._.scope]: infer Scope }
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
  ? Repeated<Item>
  : T extends readonly [any]
  ? Item
  : T extends readonly [any, ...any[]] | readonly [...any[], any]
  ? Repeatable<Item>
  : T extends readonly []
  ? undefined
  : MaybeRepeatable<Item>;

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
    [Keys] extends [KnownKeys] ? Item : Repeatable<Item>,
    Repeated<Item>,
    MaybeRepeatable<Item>
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

type Repeated<T> = [T, T, ...T[]];
type Repeatable<T> = T | Repeated<T>;
type MaybeRepeatable<T> = undefined | Repeatable<T>;

export {};
