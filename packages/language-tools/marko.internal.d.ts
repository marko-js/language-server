// This is a typescript file which defines utilities used in the output of the typescript extractor.
declare global {
  namespace Marko {
    export interface Directives {}

    // Extend the Body type to keep track of what is yielded (used for scope hoisted types).
    export interface Body<
      in Params extends readonly any[] = [],
      out Return = void,
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
      export const never: never;
      export const any: any;

      export function getGlobal<Override>(
        override: Override,
      ): [0] extends [1 & Override] ? Marko.Global : Override;

      export function attrTagNames<Tag>(
        tag: Tag,
        fn: (input: AttrTagNames<Marko.Input<Tag>>) => void,
      ): void;
      export function nestedAttrTagNames<Input>(
        input: Input,
        fn: (input: AttrTagNames<Input>) => void,
      ): void;

      export const rendered: {
        scopes: Record<number, never>;
        returns: Record<number, never>;
      };

      export const tags: Record<number, unknown>;
      export const content: DefaultBodyContentKey;

      export function contentFor<Name>(
        tag: Name,
      ): Name extends { api: infer API }
        ? API extends "tags"
          ? "content"
          : API extends "class"
            ? "renderBody"
            : DefaultBodyContentKey
        : DefaultBodyContentKey;

      export const Template: new <Overrides = unknown>() => {
        [K in Exclude<
          keyof Marko.Template,
          keyof Overrides
        >]: Marko.Template[K];
      } & Overrides;

      export function noop(value: any): void;

      export function tuple<T extends readonly any[]>(...v: T): T;

      export function interpolated(
        strs: TemplateStringsArray,
        ...exprs: (string | number | void | null | false)[]
      ): string;

      export function state<Component>(
        component: Component,
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
        constructor: Constructor,
      ): Constructor extends abstract new (...args: any) => infer Instance
        ? Instance
        : never;

      export function readScopes<Rendered>(
        rendered: Rendered,
      ): MergeScopes<
        Rendered extends { scopes: Record<any, infer Scope> } ? Scope : never
      > &
        Record<any, never>;

      export function assertTag<Index extends number, Tags, Tag>(
        tags: Tags,
        index: Index,
        tag: Tag,
      ): asserts tags is Tags &
        Record<Index, [0] extends [1 & Tag] ? any : Tag>;

      export function assertRendered<Index extends number, Rendered, Result>(
        rendered: Rendered,
        index: Index,
        result: Result,
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
        Handler extends
          | keyof OwnerHandlers
          | ((...args: any) => any)
          | false
          | void,
        Args extends readonly any[],
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
        template: Name,
      ): TemplateRenderer<Name>;
      export function renderNativeTag<Name extends string>(
        tag: Name,
      ): NativeTagRenderer<Name>;
      export const missingTag: DefaultRenderer;
      export function resolveTemplate<Template>(
        imported: Promise<{ default: Template }>,
      ): Template;
      export function fallbackTemplate<Tag, Template>(
        tag: Tag,
        fallback: Promise<{ default: Template }>,
      ): [0] extends [1 & Tag] ? Template : Tag;
      export function input<Name>(tag: Name): Marko.Input<Name>;
      export function renderDynamicTag<Name>(tag: Name): DynamicRenderer<Name>;

      export function returnTag<
        Input extends { value: unknown; valueChange?: (value: any) => void },
      >(input: Input): Input;

      export function forOfTag<
        Value,
        Item extends Value extends
          | readonly (infer Item)[]
          | Iterable<infer Item>
          ? Item
          : unknown,
        BodyContent extends Marko.Body<
          [item: Item, index: number, all: Value],
          void
        >,
      >(
        input: {
          of: Value | false | void | null;
          by?: (item: Item, index: number) => string;
        },
        content: BodyContent,
      ): ReturnAndScope<BodyContentScope<BodyContent>, void>;

      export function forInTag<
        Value,
        BodyContent extends Marko.Body<
          [key: keyof Value, value: Value[keyof Value]],
          void
        >,
      >(
        input: {
          in: Value | false | void | null;
          by?: (value: Value[keyof Value], key: keyof Value) => string;
        },
        content: BodyContent,
      ): ReturnAndScope<BodyContentScope<BodyContent>, void>;

      export function forToTag<
        From extends void | number,
        To extends number,
        Step extends void | number,
        BodyContent extends Marko.Body<[index: number], void>,
      >(
        input: {
          from?: From;
          to: To;
          step?: Step;
          by?: (index: number) => string;
        },
        content: BodyContent,
      ): ReturnAndScope<BodyContentScope<BodyContent>, void>;

      export function forTag<BodyContent extends AnyMarkoBody>(
        input: (
          | {
              from?: number;
              to: number;
              step?: number;
            }
          | {
              in: object | false | void | null;
            }
          | {
              of: Iterable<unknown> | readonly unknown[] | false | void | null;
            }
        ) & { by?: (...args: unknown[]) => string },
        content: BodyContent,
      ): ReturnAndScope<BodyContentScope<BodyContent>, void>;

      export function forOfAttrTag<
        Value extends Iterable<any> | readonly any[],
        const Return,
      >(
        input: {
          of: Value | false | void | null;
        },
        content: (
          value: Value extends readonly (infer Item)[] | Iterable<infer Item>
            ? Item
            : unknown,
          index: number,
          all: Value,
        ) => Return,
      ): {
        [Key in keyof Return]: Return[Key] extends
          | readonly (infer Item)[]
          | (infer Item extends Record<PropertyKey, any>)
          ? AttrTagByListSize<Value, Item>
          : never;
      };

      export function forInAttrTag<Value extends object, const Return>(
        input: {
          in: Value | false | void | null;
        },
        content: (key: keyof Value, value: Value[keyof Value]) => Return,
      ): {
        [Key in keyof Return]: Return[Key] extends
          | readonly (infer Item)[]
          | (infer Item extends Record<PropertyKey, any>)
          ? AttrTagByObjectSize<Value, Item>
          : never;
      };

      export function forToAttrTag<
        From extends void | number,
        To extends number,
        Step extends void | number,
        const Return,
      >(
        input: {
          from?: From;
          to: To;
          step?: Step;
        },
        content: (index: number) => Return,
      ): {
        [Key in keyof Return]: Return[Key] extends
          | readonly (infer Item)[]
          | (infer Item extends Record<PropertyKey, any>)
          ? number extends From | To | Step
            ? undefined | Marko.AttrTag<Item>
            : Step extends 0
              ? never
              : [To] extends [From extends void ? 0 : From]
                ? undefined
                : Marko.AttrTag<Item>
          : never;
      };

      export function forAttrTag<const Return>(
        input:
          | {
              of: Iterable<unknown> | readonly unknown[] | false | void | null;
            }
          | {
              in: object;
            }
          | {
              from?: number;
              to: number;
              step?: number;
            },
        content: (...args: unknown[]) => Return,
      ): {
        [Key in keyof Return]: Return[Key] extends
          | readonly (infer Item)[]
          | (infer Item extends Record<PropertyKey, any>)
          ? undefined | Marko.AttrTag<Item>
          : never;
      };

      export function mergeAttrTags<Attrs extends readonly any[]>(
        ...attrs: Attrs
      ): MergeAttrTags<Attrs>;
      export function attrTag<AttrTag>(attrTags: AttrTag[]): AttrTag;
      export function attrTagFor<Tag, Path extends readonly string[]>(
        tag: Tag,
        ...path: Path
      ): <AttrTag>(
        attrTags: Relate<
          AttrTag,
          [0] extends [1 & Tag]
            ? Marko.AttrTag<unknown>
            : Marko.Input<Tag> extends infer Input
              ? [0] extends [1 & Input]
                ? Marko.AttrTag<unknown>
                : AttrTagValue<Marko.Input<Tag>, Path>
              : Marko.AttrTag<unknown>
        >[],
      ) => AttrTag;

      // TODO: this could be improved.
      // currently falls back to DefaultRenderer too eagerly.
      export type DynamicRenderer<Name> = [0] extends [1 & Name]
        ? DefaultRenderer
        : [Name] extends [Marko.Template]
          ? TemplateRenderer<Name>
          : [Name] extends [string]
            ? NativeTagRenderer<Name>
            : [Name] extends [AnyMarkoBody]
              ? BodyRenderer<Name>
              : [Name] extends [
                    {
                      [BodyContentKey in DefaultBodyContentKey]?: infer BodyValue;
                    },
                  ]
                ? [BodyValue] extends [AnyMarkoBody]
                  ? BodyRenderer<BodyValue>
                  : BaseRenderer<
                      BodyContentInput<BodyParameters<Exclude<BodyValue, void>>>
                    >
                : DefaultRenderer;

      export type TemplateRenderer<Template> = Template extends {
        _: infer Renderer;
      }
        ? Renderer
        : Template extends Marko.Template<
              infer Input extends Record<string, unknown>,
              infer Return
            >
          ? BaseRenderer<Input, Return>
          : never;

      export interface NativeTagRenderer<Name extends string> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
        (): () => <__marko_internal_input extends unknown>(
          input: Marko.Directives &
            Marko.NativeTags[Name]["input"] &
            Relate<
              __marko_internal_input,
              Marko.Directives & Marko.NativeTags[Name]["input"]
            >,
        ) => ReturnAndScope<
          Scopes<__marko_internal_input>,
          Marko.NativeTags[Name]["return"]
        >;
      }

      export interface BodyRenderer<Body extends AnyMarkoBody> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
        (): () => <__marko_internal_input extends unknown>(
          input: Marko.Directives &
            BodyContentInput<BodyParameters<Body>> &
            Relate<
              __marko_internal_input,
              Marko.Directives & BodyContentInput<BodyParameters<Body>>
            >,
        ) => ReturnAndScope<
          Scopes<__marko_internal_input>,
          BodyReturnType<Body>
        >;
      }

      export interface BaseRenderer<
        Input extends Record<PropertyKey, unknown>,
        Return = void,
      > {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
        (): () => <__marko_input_with_scope extends unknown>(
          input: Marko.Directives &
            Input &
            Relate<__marko_input_with_scope, Marko.Directives & Input>,
        ) => ReturnAndScope<Scopes<__marko_input_with_scope>, Return>;
      }

      export interface DefaultRenderer {
        (): () => <Input extends Record<PropertyKey, unknown>>(
          input: Input,
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

type BodyContentScope<BodyContent> = BodyContent extends (...params: any) => {
  [Marko._.scope]: infer Scope;
}
  ? Scope
  : never;

type ReturnAndScope<Scope, Return> = {
  return: Return;
  scope: Scope;
};

type BodyContentInput<Args extends readonly unknown[]> = Args extends {
  length: infer Length;
}
  ? number extends Length
    ? { value?: Args }
    : 0 extends Length
      ? { value?: [] }
      : { value: Args }
  : never;

type Scopes<Input> = [0] extends [1 & Input]
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

type FlatScopes<Input extends object, Objects = Input> = Input[keyof Input &
  (string | number)] extends infer Prop
  ? [0] extends [1 & Prop]
    ? unknown
    : Prop extends (...args: any) => { [Marko._.scope]: infer Scope }
      ? unknown extends Scope
        ? never
        : Scope
      : Prop extends object
        ? Prop extends Extract<Objects, Prop>
          ? never
          : FlatScopes<Prop, Objects | Prop>
        : never
  : unknown;

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
  ...infer Rest,
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

type MergeAttrTagValue<A, B> = A extends readonly (infer AType)[]
  ? B extends readonly (infer BType)[]
    ? AType | BType
    : B extends void
      ? A
      : AType | B
  : A extends void
    ? B
    : B extends void
      ? A
      : A | B;

type AttrTagByListSize<T, Item> = T extends
  | readonly [any, ...any[]]
  | readonly [...any[], any]
  ? Marko.AttrTag<Item>
  : T extends readonly []
    ? undefined
    : undefined | Marko.AttrTag<Item>;

type AttrTagByObjectSize<
  Value,
  Item,
  Keys = RecordKeys<Value>,
  KnownKeys = KnownRecordKeys<Value>,
> = CheckNever<
  Keys,
  undefined,
  CheckNever<KnownKeys, Marko.AttrTag<Item>, undefined | Marko.AttrTag<Item>>
>;

type AttrTagValue<Input, Path extends readonly string[]> = Path extends [
  infer Prop extends keyof Input,
  ...infer Rest extends readonly string[],
]
  ? Input[Prop] & Marko.AttrTag<unknown> extends infer Value
    ? Rest extends readonly []
      ? Value
      : AttrTagValue<Value, Rest>
    : Marko.AttrTag<unknown>
  : Marko.AttrTag<unknown>;

type AttrTagNames<Input> = Record<string, never> &
  (Input extends infer Input extends {}
    ? {
        [Key in keyof Input & string as `@${Input[Key] extends infer Value
          ? Value extends Marko.AttrTag<any>
            ? Key
            : never
          : never}`]: Input[Key];
      }
    : never);

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
  _: infer U,
) => any
  ? U
  : never;

type DefaultBodyContentKey = keyof Exclude<
  Marko.Renderable,
  Marko.Template<any, any> | Marko.Body<any, any> | string
>;

export {};
