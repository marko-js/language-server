// This is a typescript file which defines utilities used in the output of the typescript extractor.
declare global {
  namespace Marko {
    // A template's signature as a tag, which a tag calls. Declared only here:
    // in Marko's types it would be an overload, and every error match neither.
    export interface Template<Input, Return> {
      /** Types only: its signature as a tag, never one to call. */
      _(input: Input): Return;
    }
    // And `TemplateOf` with a mark: what tells a template typed by its
    // signature (eg a generic one) from another, now that every one has `_`.
    export interface TemplateOf<Signature extends (input: any) => any> {
      /** Types only: never set. */
      readonly [templateOfMark]: true;
    }

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
      // Only what is exported is public (with `export {}`), so hovers name
      // `Void` alone, not `Marko._.Void`.
      export {};
      // Declared: an ambient `const` may not be initialized with an instance.
      interface Void {
        readonly [Marko._.scope]: never;
        return: void;
      }
      export const voidReturn: Void;
      // A body that returns nothing. A function, as reading a `const` is flow
      // analysed, at a cost that grows with the template.
      export function voidBody(): Void;
      export const scope: unique symbol;
      /**
       * The key of a tag's input that holds its rest attribute tags: each
       * attribute tag that is not the first of its name written directly under
       * the tag, as groups (see `AttrTagGroup`).
       */
      export const restAttrTags: typeof attributeTags;
      export const never: never;
      /** A renderer's form for a tag with rest attribute tags. */
      export const withRestAttrTags: 3;
      export const any: any;

      /** A template's tag's Marko 5 directives, which are not its input. */
      export function directives(directives: Marko.Directives): void;

      /** A tag variable's value: what its tag returns (`Marko.Return`). */
      export function returned<Rendered>(
        rendered: () => Rendered,
      ): TagReturnOf<Rendered> extends { value: infer Value } ? Value : never;

      export function hoist<T>(
        value: () => T,
      ): T extends () => infer R ? T & Iterable<R> : never;
      // TODO: hoist should really be the below implementation which accounts for hoisting from unknown
      // sections causing the getter to return undefined. Right now the type says it always has a value.
      // export function hoist<T, U = T>(
      //   value: () => T,
      // ): T extends () => infer R
      //   ? (T | (U extends undefined ? () => undefined : never)) & Iterable<R>
      //   : never;

      // Each helper given a tag's template takes a discovered one by the
      // function returning its module (see `contentFor`).
      export function attrTagNames<Template>(
        module: () => { readonly default: Template },
        fn: (input: AttrTagNames<InputFor<Template>>) => void,
      ): void;
      export function attrTagNames<Tag>(
        tag: Tag & NotGeneric<Tag>,
        fn: (input: AttrTagNames<InputFor<Tag>>) => void,
      ): void;
      export function attrTagNames<Input, Return>(
        tag: Marko.Template<Input, Return>,
        fn: (input: AttrTagNames<Input>) => void,
      ): void;
      export function attrTagNames<Tag>(
        tag: Tag,
        fn: (input: AttrTagNames<InputFor<Tag>>) => void,
      ): void;
      export function nestedAttrTagNames<Input>(
        input: Input,
        fn: (input: AttrTagNames<Input>) => void,
      ): void;

      export const content: DefaultBodyContentKey;

      export function el<Name extends string>(
        name: Name,
      ): Marko.NativeTags[Name]["return"]["value"];

      /**
       * The key a discovered template's tag's body is given by: see
       * `ContentFor`.
       */
      export function contentFor<Template>(
        module: () => { readonly default: Template },
      ): ContentFor<Template>;
      // And a tag's value's (eg a dynamic tag's), which may be typed by hand:
      // see `ValueContentFor`.
      export function contentFor<Name, Path extends readonly string[]>(
        tag: Name & NotGeneric<Name>,
        ...path: Path
      ): ValueContentFor<Name, Path>;
      export function contentFor<Input, Return, Path extends readonly string[]>(
        tag: Marko.Template<Input, Return>,
        ...path: Path
      ): ValueContentFor<Marko.Template<Input, Return>, Path>;
      export function contentFor<Name, Path extends readonly string[]>(
        tag: Name,
        ...path: Path
      ): ValueContentFor<Name, Path>;

      /**
       * A template's value: the runtime's `Marko.Template<Input, Return>`,
       * typed from its code.
       */
      export function template<Input, Return>(
        code: (input: Input) => Return,
      ): Marko.Template<Input, Return>;
      /**
       * And a Class API template's, which has its `Component`: what tells
       * it from one written in the Tags API (see `ContentFor`).
       */
      export function template<Input, Return, Component>(
        code: (input: Input) => Return,
        component: Component,
      ): Marko.Template<Input, Return> & { Component: Component };
      /**
       * A generic template's value: `Marko.TemplateOf` its code's signature,
       * which a tag calls (`_`).
       */
      export function templateOf<Signature extends (input: any) => any>(
        code: Signature,
      ): Marko.TemplateOf<Signature>;
      export function templateOf<
        Signature extends (input: any) => any,
        Component,
      >(
        code: Signature,
        component: Component,
      ): Marko.TemplateOf<Signature> & { Component: Component };

      /**
       * The signature of the template a tag renders. Generic itself, so that
       * TypeScript propagates its type parameters into the renderer.
       */
      export function signature<Template>(
        template: Template,
      ): Template extends {
        readonly [templateOfMark]: true;
        readonly _: infer Signature;
      }
        ? Signature
        : Template extends Marko.Template<infer Input, infer Return>
          ? (input: Input) => Return
          : never;
      /**
       * The input a tag is given: its type parameter propagates into the
       * renderer, which keeps the input's type for `Scopes`.
       */
      export function actualInput<Input>(input: Input): Input;

      export function noop(value: any): void;

      export function tuple<T extends readonly any[]>(...v: T): T;

      export function interpolated(
        strs: TemplateStringsArray,
        ...exprs: (string | number | void | null | false)[]
      ): string;

      export function mergeClasses<T>(...values: NoInfer<T>[]): T;

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

      export type ReturnWithRestAttrTagsScope<Input, Return> = ReturnAndScope<
        Scopes<Input> | RestAttrTagsScopes<Input>,
        Return
      >;

      export function readScopes<Rendered>(rendered: Rendered): MergeScopes<
        {
          [K in keyof Rendered]: Rendered[K] extends infer Value
            ? undefined extends Value
              ? Value extends { scope: infer Scope }
                ? [0] extends [1 & Scope]
                  ? never
                  : Partial<Scope>
                : never
              : Value extends { scope: infer Scope }
                ? [0] extends [1 & Scope]
                  ? never
                  : Scope
                : never
            : never;
        }[keyof Rendered]
      >;

      /**
       * The variables a template hoists (`readScope` or `readScopes`). One
       * they do not have is `any`: the extractor only hoists a variable it
       * found, so its type was lost, most often with its tag's input when that
       * fails its check (which TypeScript reports, and which loses the types
       * of its bodies that have an unannotated param). A missing name would
       * be reported with no location.
       */
      export function hoisted<Scope>(
        scope: Scope,
      ): Scope & { [name: string]: any };

      export function readScope<Value>(
        value: Value,
      ): MergeScopes<
        undefined extends Value
          ? Value extends { scope: infer Scope }
            ? [0] extends [1 & Scope]
              ? never
              : Partial<Scope>
            : never
          : Value extends { scope: infer Scope }
            ? [0] extends [1 & Scope]
              ? never
              : Scope
            : never
      >;

      export function change<const Item extends readonly unknown[]>(
        ...item: Item
      ): UnionToIntersection<
        Item extends
          | readonly [infer LocalName extends string, infer Data]
          | readonly [
              infer LocalName extends string,
              infer SourceName,
              infer Data,
            ]
          ? TagReturnOf<Data> extends {
              [
                K in `${SourceName extends string
                  ? SourceName
                  : LocalName}Change`
              ]: (value: infer V, ...args: any[]) => any;
            }
            ? { [K in LocalName]: V }
            : { readonly [K in LocalName]: unknown }
          : never
      >;

      export function bind<
        Owner extends Marko.Component,
        OwnerHandlers extends ComponentEventHandlers<Owner>,
        Handler extends
          keyof OwnerHandlers | ((...args: any) => any) | false | void,
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

      /**
       * A template's renderer, derived from its signature where it is used: a
       * generic template's type arguments are inferred from a tag's input.
       */
      export const renderer: TemplateInputRenderer &
        // Given no signature (eg type arguments a template does not take, which
        // TypeScript reports): any input, so that the error is not repeated.
        ((
          signature: unknown,
          actualInput: unknown,
        ) => <Input>(input: Input) => ReturnWithScope<Input, void>);
      /** `renderer`, for a tag with rest attribute tags. */
      export const restAttrTagsRenderer: SignatureRestAttrTagsRenderer &
        ((
          signature: unknown,
          actualInput: unknown,
        ) => <Input>(input: Input) => ReturnWithRestAttrTagsScope<Input, void>);
      // A native tag's renderer: its input alone, which TypeScript checks
      // without inferring anything. A call, not a member of an object of
      // renderers: one read by an index signature (eg a custom element's) is
      // possibly undefined under `noUncheckedIndexedAccess`.
      export function renderNativeTag<Name extends string>(
        tag: Name,
      ): (input: Marko.NativeTags[Name]["input"]) => void;
      // The same for a tag whose scopes are read (its body hoists): it keeps
      // the type of the input it is given (see `InputRenderer`).
      export function renderNativeTagWithScope<Name extends string>(
        tag: Name,
      ): InputRenderer<
        Marko.NativeTags[Name]["input"],
        Marko.NativeTags[Name]["return"]
      >;
      export const missingTag: DefaultRenderer;
      export function fallbackTemplate<Tag, Template>(
        tag: Tag,
        fallback: Template,
      ): [0] extends [1 & Tag] ? Template : Tag;
      /**
       * A dynamic tag's renderer, by the type of what it names (see
       * `DynamicRenderer`). A function: TypeScript types it once, not per read.
       */
      export function renderDynamicTag<
        Name extends { readonly [templateOfMark]: true },
        Input,
        Return,
        Actual,
      >(
        tag: Name & NotUnion<Name>,
        signature: (input: Input) => Return,
        actualInput: (input: Actual) => Actual,
      ): (
        input: Input & Relate<Actual, Input>,
      ) => ReturnWithScope<Actual, Return>;
      export function renderDynamicTag<Name>(
        tag: Name & NotGeneric<Name>,
        ...derived: unknown[]
      ): DynamicRenderer<Name, 1>;
      // A name of a type parameter's type (eg `as: S`) defers
      // `DynamicRenderer`, which is then not callable: such a name is checked
      // by the constraint it has, as with the other helpers given a tag.
      export function renderDynamicTag<Name extends keyof Marko.NativeTags>(
        tag: Name,
        ...derived: unknown[]
      ): NativeTagsRenderer<Name, 1>;
      export function renderDynamicTag<Input, Return>(
        tag: Marko.Template<Input, Return>,
        ...derived: unknown[]
      ): Renderer<InputOrAny<Input>, Return, 1>;
      export function renderDynamicTag<Name>(
        tag: Name,
        ...derived: unknown[]
      ): DynamicRenderer<Name, 1>;
      /** `renderDynamicTag`, for a tag with rest attribute tags. */
      export function renderDynamicTagWithRestAttrTags<
        Name extends { readonly [templateOfMark]: true },
        Input,
        Return,
        Actual,
      >(
        tag: Name & NotUnion<Name>,
        signature: (input: Input) => Return,
        actualInput: (input: Actual) => Actual,
      ): (
        input: TagInput<Actual, Input>,
      ) => ReturnWithRestAttrTagsScope<Actual, Return>;
      export function renderDynamicTagWithRestAttrTags<Name>(
        tag: Name & NotGeneric<Name>,
        ...derived: unknown[]
      ): DynamicRenderer<Name, 3>;
      // A name of a type parameter's type (eg `as: S`) defers `DynamicRenderer`
      // (not callable): it is checked by its constraint.
      export function renderDynamicTagWithRestAttrTags<
        Name extends keyof Marko.NativeTags,
      >(tag: Name, ...derived: unknown[]): NativeTagsRenderer<Name, 3>;
      export function renderDynamicTagWithRestAttrTags<Input, Return>(
        tag: Marko.Template<Input, Return>,
        ...derived: unknown[]
      ): Renderer<InputOrAny<Input>, Return, 3>;
      export function renderDynamicTagWithRestAttrTags<Name>(
        tag: Name,
        ...derived: unknown[]
      ): DynamicRenderer<Name, 3>;

      export function returnTag<
        Input extends {
          value: unknown;
          valueChange?: ((value: any) => void) | false | null;
        },
      >(input: Input): Input;

      export function forOfTag<
        Value,
        Item extends ([0] extends [1 & Value]
          ? any
          : Value extends Iterable<infer Item>
            ? Item
            : never),
        BodyContent extends Marko.Body<
          [item: Item, index: number, all: Exclude<Value, false | void | null>],
          void
        >,
      >(
        input: {
          of: Value & (Iterable<unknown> | false | void | null);
          by?: ((item: Item, index: number) => string | number) | string;
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
          by?: (key: keyof Value, value: Value[keyof Value]) => string | number;
        },
        content: BodyContent,
      ): ReturnAndScope<BodyContentScope<BodyContent>, void>;

      export function forToTag<
        To extends number,
        From extends void | number,
        Step extends void | number,
        BodyContent extends Marko.Body<[index: number], void>,
      >(
        input: {
          to: To;
          from?: From;
          step?: Step;
          by?: (index: number) => string | number;
        },
        content: BodyContent,
      ): ReturnAndScope<BodyContentScope<BodyContent>, void>;

      export function forUntilTag<
        Until extends number,
        From extends void | number,
        Step extends void | number,
        BodyContent extends Marko.Body<[index: number], void>,
      >(
        input: {
          until: Until;
          from?: From;
          step?: Step;
          by?: (index: number) => string | number;
        },
        content: BodyContent,
      ): ReturnAndScope<BodyContentScope<BodyContent>, void>;

      export function forTag<BodyContent extends AnyMarkoBody>(
        input: (
          | {
              to: number;
              from?: number;
              step?: number;
            }
          | {
              until: number;
              from?: number;
              step?: number;
            }
          | {
              in: any;
            }
          | {
              of: any;
            }
        ) & { by?: string | ((...args: unknown[]) => string | number) },
        content: BodyContent,
      ): ReturnAndScope<BodyContentScope<BodyContent>, void>;

      /** The attribute tags of a `<for of>`: its body's own type. */
      export function forOfAttrTag<
        Value,
        Item extends ([0] extends [1 & Value]
          ? any
          : Value extends readonly (infer Item)[] | Iterable<infer Item>
            ? Item
            : never),
        Return,
      >(
        input: {
          of: Value & (Iterable<unknown> | false | void | null);
        },
        content: (
          value: Item,
          index: number,
          all: Exclude<Value, false | void | null>,
        ) => Return,
      ): Return;

      export function forInAttrTag<Value extends object, Return>(
        input: {
          in: Value | false | void | null;
        },
        content: (key: keyof Value, value: Value[keyof Value]) => Return,
      ): Return;

      export function forToAttrTag<Return>(
        input: {
          to: number;
          from?: number;
          step?: number;
        },
        content: (index: number) => Return,
      ): Return;

      export function forUntilAttrTag<Return>(
        input: {
          until: number;
          from?: number;
          step?: number;
        },
        content: (index: number) => Return,
      ): Return;

      export function forAttrTag<Return>(
        input:
          | {
              of: Iterable<unknown> | false | void | null;
            }
          | {
              in: object | false | void | null;
            }
          | {
              to: number;
              from?: number;
              step?: number;
            }
          | {
              until: number;
              from?: number;
              step?: number;
            },
        content: (...args: unknown[]) => Return,
      ): Return;

      /**
       * What each group of the attribute tags of a tag (or of its attribute
       * tag) with `Input` is checked against, as the renderer checks the input
       * itself. A group is what one repetition, `<if>` chain or loop body
       * gives: an object of attribute tags, each name once (see `AttributeTags`).
       */
      export type AttrTagGroup<Input> = [0] extends [1 & Input]
        ? unknown
        : [Input] extends [never]
          ? // Untyped (eg a `<define>` tag's input), or an attribute tag the
            // tag does not have, which its input reports.
            unknown
          : [UnionKeys<Input>] extends [never]
            ? [Input] extends [object]
              ? // No properties (`{}`), which TypeScript does not check for
                // unknown ones: with a type whose properties are all optional.
                Marko.Directives & Input
              : unknown extends Input
                ? // A template that declares `unknown`: no input, as the
                  // input itself is checked (one whose input is not known is
                  // read as `any`, see `KnownInput`).
                  Marko.Directives
                : // A body's `undefined`, whose renderer checks its input.
                  unknown
            : Partial<Input>;

      /**
       * Spread into the input of a tag with rest attribute tags, after its
       * attributes, for the attribute tags only its rest attribute tags give
       * (each `never`, checked where it is written): so that one the tag
       * requires counts as given, and replaces one a spread has, as Marko
       * writes each attribute tag after the attributes.
       */
      export function givenAttrTags<Names extends string[]>(
        ...names: Names
      ): { [Name in Names[number]]: never };

      /**
       * The attribute tags of an attribute tag at `path` of a tag (or of the
       * tag itself, eg in a `<for>`) with rest attribute tags: its groups,
       * merged by name as a renderer merges a tag's (see `AttributeTags`), and
       * checked against that attribute tag's type. A tag's own groups are
       * given to its renderer where they are written, so that TypeScript
       * infers its type parameters from them too.
       */
      export function attrTags<Template, Path extends readonly string[]>(
        module: () => { readonly default: Template },
        ...path: Path
      ): CheckedAttrTags<
        AttrTagGroup<AttrTagsInput<AnyInputFor<Template>, Path>>
      >;
      export function attrTags<Tag, Path extends readonly string[]>(
        tag: Tag & NotGeneric<Tag>,
        ...path: Path
      ): CheckedAttrTags<AttrTagGroup<AttrTagsInput<AnyInputFor<Tag>, Path>>>;
      export function attrTags<Input, Return, Path extends readonly string[]>(
        tag: Marko.Template<Input, Return>,
        ...path: Path
      ): CheckedAttrTags<AttrTagGroup<AttrTagsInput<Input, Path>>>;
      export function attrTags<Tag, Path extends readonly string[]>(
        tag: Tag,
        ...path: Path
      ): CheckedAttrTags<AttrTagGroup<AttrTagsInput<AnyInputFor<Tag>, Path>>>;

      export type DynamicRenderer<Name, Mode> = [0] extends [1 & Name]
        ? DefaultInputRenderer<Mode>
        : [Name] extends [{ readonly [templateOfMark]: true }]
          ? // A generic template renders by its signature as is: its result is
            // its return alone. A union of templates takes any of their inputs.
            IsUnion<Name> extends false
            ? Mode extends 2 | 3
              ? RestAttrTagsRenderer<AnyInputFor<Name>, Marko.Return<Name>>
              : Name extends { readonly _: infer Signature }
                ? Signature
                : never
            : DynamicInputRenderer<Name, Mode>
          : [Name] extends [Marko.Template<infer Input, infer Return>]
            ? // A template typed only as `Marko.Template`: by its input, as
              // `renderer` renders one.
              IsUnion<Name> extends false
              ? Renderer<InputOrAny<Input>, Return, Mode>
              : DynamicInputRenderer<Name, Mode>
            : [Name] extends [Marko.Template<any, any> | string]
              ? DynamicInputRenderer<Name, Mode>
              : [Name] extends [AnyMarkoBody]
                ? BodyRenderer<Name, Mode>
                : [Name] extends [
                      {
                        [
                          BodyContentKey in DefaultBodyContentKey
                        ]?: infer BodyValue extends AnyMarkoBody;
                      },
                    ]
                  ? BodyRenderer<BodyValue, Mode>
                  : [Name] extends [DefaultRenderer]
                    ? // `missingTag`, a tag of no known type.
                      DefaultInputRenderer<Mode>
                    : [Name] extends [(input: infer Input) => infer Return]
                      ? // A generic template's signature given type
                        // arguments (`signature(tag)<T>`): by its input, as
                        // one typed only as `Marko.Template`.
                        Renderer<Input, Return, Mode>
                      : DefaultInputRenderer<Mode>;

      /** The renderer of a tag of unknown type: any input. */
      export type DefaultInputRenderer<Mode> = Mode extends 2 | 3
        ? <Input>(input: Input) => ReturnWithRestAttrTagsScope<Input, void>
        : <Input>(input: Input) => ReturnWithScope<Input, void>;

      /**
       * A body's renderer: given its input, as a template's is, when its only
       * param is its input (eg a `<define>` with attributes), which is much
       * cheaper to check than its arguments, else given its arguments.
       * With rest attribute tags (`Mode` `2` or `3`), its input has them.
       */
      export type BodyRenderer<Body extends AnyMarkoBody, Mode> = [0] extends [
        1 & BodyParamsWithDefault<Body>,
      ]
        ? BodyArgsRenderer<Body>
        : BodyParamsWithDefault<Body> extends readonly [input?: infer Input]
          ? Mode extends 2 | 3
            ? RestAttrTagsRenderer<
                KnownInput<Input>,
                Body extends Marko.Body<any, infer Return> ? Return : never
              >
            : BodyInputRenderer<
                Input,
                Body extends Marko.Body<any, infer Return> ? Return : never
              >
          : BodyArgsRenderer<Body>;

      /**
       * See `renderer`: its input is the template's alone, as a tag's call of
       * its signature takes it.
       */
      export type TemplateInputRenderer = <Input, Return, Actual>(
        signature: (input: Input) => Return,
        actualInput: (input: Actual) => Actual,
      ) => (
        input: Input & Relate<Actual, Input>,
      ) => ReturnWithScope<Actual, Return>;

      /** See `restAttrTagsRenderer`. */
      export type SignatureRestAttrTagsRenderer = <Input, Return, Actual>(
        signature: (input: Input) => Return,
        actualInput: (input: Actual) => Actual,
      ) => (
        input: TagInput<Actual, Input>,
      ) => ReturnWithRestAttrTagsScope<Actual, Return>;

      export interface DefaultRenderer {
        <Mode extends number = 1>(
          mode?: Mode,
        ): (
          ...signature: unknown[]
        ) => Mode extends 2 | 3
          ? <Input>(input: Input) => ReturnWithRestAttrTagsScope<Input, void>
          : <Input>(input: Input) => ReturnWithScope<Input, void>;
      }

      /**
       * A tag's renderer given its input, in the form `Mode` takes: with rest
       * attribute tags (`2` or `3`, `RestAttrTagsRenderer`), or without them
       * (`InputRenderer`), so that a tag without them costs only the latter.
       */
      export type Renderer<Input, Return, Mode> = Mode extends 2 | 3
        ? RestAttrTagsRenderer<Input, Return>
        : InputRenderer<Input, Return>;

      /**
       * Renders a tag without rest attribute tags given its input, related
       * to it (with `Relate`), so that TypeScript types it by it and reports
       * what it does not have, while
       * `__marko_internal_input` keeps its type for `Scopes`.
       */
      export interface InputRenderer<Input, Return> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
        <__marko_internal_input extends unknown>(
          input: Input & Relate<__marko_internal_input, Input>,
        ): ReturnWithScope<__marko_internal_input, Return>;
        /** See `RestAttrTagsRenderer`. */
        readonly [rendererInput]?: (input: Input) => Input;
      }

      /**
       * Renders a tag given its input with rest attribute tags: its
       * attributes, the first attribute tag of each name written directly
       * under it, and (keyed by `restAttrTags`) its rest attribute tags as
       * groups (see `AttributeTags`). One argument, so that TypeScript infers
       * the tag's type parameters from both and reports each of their
       * errors. It is related to the input (with `Relate`), so that
       * TypeScript types it by it and reports what it does not have, while
       * `__marko_internal_input` keeps its type, and so its groups', for
       * `Scopes`.
       */
      export interface RestAttrTagsRenderer<Input, Return> {
        <__marko_internal_input>(
          input: RestAttrTagsInput<Input> &
            Relate<__marko_internal_input, RestAttrTagsInput<Input>>,
        ): ReturnWithRestAttrTagsScope<__marko_internal_input, Return>;
        /**
         * Never set: keeps `Input` invariant, which its signature does not
         * (TypeScript measures `Input` there as having no effect), so that
         * two templates with different inputs (eg in a union of them) differ.
         */
        readonly [rendererInput]?: (input: Input) => Input;
      }

      /**
       * What a generic template's renderer takes with rest attribute tags. A
       * conditional type, so that TypeScript prints it resolved, not by name.
       */
      export type TagInput<Actual, Input> = [Actual] extends [unknown]
        ? RestAttrTagsInput<Input> & Relate<Actual, RestAttrTagsInput<Input>>
        : never;

      export type Relate<A, B> = B extends A ? A : B;
    }
  }
}

/** The key of `Marko.TemplateOf`'s mark. */
declare const templateOfMark: unique symbol;

declare abstract class MarkoReturn<Return> {
  return: Return;
}

type AnyMarkoBody = Marko.Body<any, any>;

/**
 * Renders a tag named by a string, or by one of several templates or strings,
 * with any of their inputs (`Marko.Input<Name>`). The attributes are
 * intersected with it rather than related to it, which is cheaper than each
 * renderer's check, so unknown attributes are not reported. Its rest
 * attribute tags are checked against any of the inputs (a native tag has
 * none).
 */
type DynamicInputRenderer<Name, Mode> = Mode extends 2 | 3
  ? DynamicInputRestAttrTagsRenderer<Name>
  : <Input extends Marko.Input<Name>>(
      input: Input,
    ) => Marko._.ReturnWithScope<Input, Marko.Return<Name>>;

/**
 * A tag's input for its groups: `any` where it is not known (a bare
 * `Marko.Template`'s, or a body's `unknown` param), which takes anything, as
 * its attributes do (`unknown` would take none, see `AttrTagGroup`). A
 * compiled template's is read as it is, so one that declares
 * `unknown` takes none.
 */
type KnownInput<Input> = unknown extends Input ? any : Input;

/** `DynamicInputRenderer` for a tag with rest attribute tags. */
type DynamicInputRestAttrTagsRenderer<Name> = <
  // With its groups, which the input object has, so
  // that TypeScript infers it, rather than this constraint, when it has no
  // other property in common with an input whose properties are all optional.
  Input extends AttributeTags<KnownInput<Marko.Input<Name>>> &
    Marko.Input<Name>,
>(
  input: AttributeTags<KnownInput<Marko.Input<Name>>> & Input,
) => Marko._.ReturnWithRestAttrTagsScope<Input, Marko.Return<Name>>;

/**
 * Native tags checked as any of `Names`, as `DynamicInputRenderer` checks a
 * union of them (with their rest attribute tags): `Relate` defers for a type
 * parameter's names.
 */
type NativeTagsRenderer<
  Names extends keyof Marko.NativeTags,
  Mode,
> = Mode extends 2 | 3
  ? <Input extends Marko.NativeTags[Names]["input"]>(
      input: AttributeTags<NoAttrTags> & Input & NoAttrTagsIn<Input>,
    ) => Marko._.ReturnWithRestAttrTagsScope<
      Input,
      Marko.NativeTags[Names]["return"]
    >
  : <Input extends Marko.NativeTags[Names]["input"]>(
      input: Input & NoAttrTagsIn<Input>,
    ) => Marko._.ReturnWithScope<Input, Marko.NativeTags[Names]["return"]>;

/** What a native tag takes as attribute tags: none. */
interface NoAttrTags {
  [name: string]: never;
}

/** The attribute tags of `Input` (the extractor marks each one), as `never`. */
type NoAttrTagsIn<Input> = {
  [
    Key in keyof Input as Input[Key] extends { [Symbol.iterator]: infer Mark }
      ? 0 extends 1 & Mark
        ? Key
        : never
      : never
  ]: never;
};

/**
 * The input of a template typed only as `Marko.Template<Input>`: any input,
 * as for a tag name it does not know, when that is `unknown` (or `any`).
 */
type InputOrAny<Input> = unknown extends Input
  ? Record<string, unknown>
  : Input;

/** `never` for a union. */
type NotUnion<T> = IsUnion<T> extends false ? unknown : never;

/** `never` for a type parameter's type, which defers conditional types. */
type NotGeneric<T> = [T] extends [never] ? never : unknown;

/** `false` when `T` is a single type, assignable to each of its members. */
type IsUnion<T, All = T> = T extends unknown
  ? [All] extends [T]
    ? false
    : true
  : never;

type BodyContentScope<BodyContent> = BodyContent extends (...params: any) => {
  [Marko._.scope]: infer Scope;
}
  ? Scope
  : never;

/** A tag's return, from its renderer's result, or a signature's own. */
type TagReturnOf<Rendered> =
  Rendered extends ReturnAndScope<any, infer Return> ? Return : Rendered;

/**
 * An interface, not a type alias: TypeScript resolves an interface's members,
 * and so `Scope`, only once one is read (as `readScopes` reads `scope`), where
 * an alias resolves its type arguments as soon as it is instantiated, which
 * would compute the scopes of every tag whether or not anything is hoisted.
 */
interface ReturnAndScope<Scope, Return> {
  return: Return;
  scope: Scope;
}

/**
 * A tag's renderer for a body whose only param is its input: related to it
 * (with `Relate`), so that TypeScript types it by it and reports what it does
 * not have, while `__marko_internal_input` keeps its type for `Scopes`.
 */
interface BodyInputRenderer<Input, Return> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  <__marko_internal_input extends unknown>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>,
  ): Marko._.ReturnWithScope<__marko_internal_input, Return>;
}

/** A tag's renderer for a body with params other than one input. */
interface BodyArgsRenderer<Body extends AnyMarkoBody> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  <__marko_internal_input extends unknown>(
    ...args: BodyParamsWithDefault<Body> &
      Marko._.Relate<__marko_internal_input, BodyParamsWithDefault<Body>>
  ): Marko._.ReturnWithScope<
    __marko_internal_input extends [infer Input] ? Input : never,
    Body extends Marko.Body<any, infer Return> ? Return : never
  >;
}

type BodyParamsWithDefault<Body extends AnyMarkoBody> =
  Body extends Marko.Body<infer Params, any>
    ? Params extends []
      ? [input?: Record<string, never>]
      : Params
    : never;

type ComponentEventHandlers<Component extends Marko.Component> = {
  [
    K in Exclude<
      keyof Component,
      Exclude<
        keyof Marko.Component,
        "emit" | "setState" | "setStateDirty" | "forceUpdate"
      >
    >
  ]: Component[K] extends (...args: any) => any ? Component[K] : never;
};

type Scopes<Input> = [0] extends [1 & Input]
  ? never
  : | (Input[("content" | "renderBody") & keyof Input] extends infer Prop
        ? Prop extends (...args: any[]) => { [Marko._.scope]: infer Scope }
          ? Scope
          : never
        : never)
    | (Input[string & keyof Input] extends infer Prop
        ? Prop extends { [Symbol.iterator]: any }
          ? Prop extends readonly any[]
            ? never
            : Scopes<Prop>
          : never
        : never);

type MergeScopes<Scopes> = {
  [K in Scopes extends Scopes ? keyof Scopes : never]: Scopes extends Scopes
    ? Scopes[K & keyof Scopes]
    : never;
};

/**
 * Attribute tag `Groups` merged by name, as Marko applies them: each attribute
 * tag is one of those the groups give, given if any of them gives it. Not a
 * group at a time, which nests a type per group, too deep for TypeScript from
 * about 50 (eg repetitions of one). A conditional, so that TypeScript prints
 * the merged object rather than this name and the groups.
 */
type MergeAttrTags<Groups extends readonly any[]> = Groups extends unknown
  ? {
      [Key in UnionKeys<Groups[number]>]: {
        [Index in keyof Groups]: Key extends keyof Groups[Index]
          ? Groups[Index][Key]
          : never;
      }[number] extends infer Value
        ? // Missing (eg an `<if>` branch that does not give it) where no
          // group gives it.
          [Exclude<Value, void>] extends [never]
          ? Value
          : Exclude<Value, void>
        : never;
    }
  : never;

/**
 * `InputFor`, but `any` where it is not known, and a generic template's with
 * its bodies' params `any`: `attrTags` checks attribute tags apart.
 */
type AnyInputFor<Tag> = Tag extends { readonly [templateOfMark]: true }
  ? AnyBodies<InputFor<Tag>>
  : KnownInput<InputFor<Tag>>;

/** An input with each body's params (its own, and its attribute tags') `any`. */
type AnyBodies<Input> =
  Input extends Marko.Body<any, infer Return>
    ? Marko.Body<any, Return>
    : Input extends (...args: any) => any
      ? Input
      : Input extends object
        ? { [Key in keyof Input]: AnyBodies<Input[Key]> }
        : Input;

type AttrTagsInput<
  Input,
  Path extends readonly string[],
> = Path extends readonly [] ? Input : AttrTagValue<Input, Path>;

// One array of groups, not an argument each: TypeScript reports only the first
// failing argument of a call, but every failing element of an array literal.
// `| []` infers a tuple.
type CheckedAttrTags<Group> = <Groups extends readonly Group[] | []>(
  groups: (readonly Group[] | []) & Marko._.Relate<Groups, readonly Group[]>,
) => // `NoInfer`: TypeScript 7.1's language service infers `Groups` from it
// when it checks this call first, which types the attribute tags' params as
// `any`.
NoInfer<
  number extends Groups["length"]
    ? // Not a tuple: a group failed its check, which inferred the constraint
      // and which TypeScript reported. Nothing, so that it is not reported
      // again, and the attribute tag it is spread into is still checked (its
      // names are given, see `givenAttrTags`).
      {}
    : MergeAttrTags<Groups>
>;

/** A tag's input with rest attribute tags. */
type RestAttrTagsInput<Input> = Input & AttributeTags<Input>;

/** The key of `Marko._.InputRenderer`'s `Input`. */
declare const rendererInput: unique symbol;

/**
 * The key of a tag's input that holds its rest attribute tags
 * (`Marko._.restAttrTags`), declared out of `Marko._` so that TypeScript prints
 * it as `[attributeTags]`.
 */
declare const attributeTags: unique symbol;

/**
 * The rest attribute tags of a tag's input, as groups
 * (the static ones, an object per repetition, so that each has a name once; an
 * `<if>` chain or a `<while>`; or a `<for>`'s `for*AttrTag`), merged by name.
 * `| []` infers a tuple.
 */
interface AttributeTags<Input> {
  [attributeTags]?: readonly Marko._.AttrTagGroup<Input>[] | [];
}

/** The scopes of the attribute tag bodies in each group of an input. */
type RestAttrTagsScopes<Input> = Input extends {
  [attributeTags]: readonly (infer Group)[];
}
  ? Group extends unknown
    ? Scopes<Group>
    : never
  : never;

/**
 * The attribute tag at `Path` of an input: of any of its members that has it,
 * so that a tag named by one of several templates types it as one does
 * (`never` if none has it).
 */
type AttrTagValue<Input, Path extends readonly string[]> = Input extends unknown
  ? Path extends [
      infer Prop extends keyof Input,
      ...infer Rest extends readonly string[],
    ]
    ? Exclude<Input[Prop], undefined | null> extends infer Value
      ? Rest extends readonly []
        ? Value
        : AttrTagValue<Value, Rest>
      : never
    : never
  : never;

/** The keys of each member of `T` (`keyof` a union has only common keys). */
type UnionKeys<T> = T extends unknown ? keyof T : never;

type AttrTagNames<Input> = Record<string, never> &
  (Input extends infer Input extends {}
    ? {
        [
          Key in keyof Input & string as `@${Input[Key] extends infer Value
            ? Value extends Marko.AttrTag<any>
              ? Key
              : never
            : never}`
        ]: Input[Key];
      }
    : never);

type UnionToIntersection<T> = (T extends any ? (_: T) => any : never) extends (
  _: infer U,
) => any
  ? U
  : never;

type DefaultBodyContentKey = keyof Exclude<
  Marko.Renderable,
  Marko.Template<any, any> | Marko.Body<any, any> | string
>;

/**
 * The key a discovered template's tag's body is given by, as the compiler
 * picks it: `renderBody` for one with a `Component`, else `content`.
 */
type ContentFor<Template> = [0] extends [1 & Template]
  ? DefaultBodyContentKey
  : [Template] extends [{ Component: any }]
    ? "renderBody"
    : "content";

/**
 * And a tag's value's: one with no `Component` may be a Class API template
 * typed by hand, so it takes its body by the key its input declares.
 */
type ValueContentFor<Name, Path extends readonly string[]> = [0] extends [
  1 & Name,
]
  ? DefaultBodyContentKey
  : [Name] extends [{ Component: any }]
    ? "renderBody"
    : BodyContentKeyOf<
        Exclude<AttrTagsInput<InputFor<Name>, Path>, undefined | null>
      >;

/**
 * The key an input declares its body by: the one it requires, else the one
 * it has; one with both or neither takes the runtime's.
 */
type BodyContentKeyOf<Input> = [0] extends [1 & Input]
  ? DefaultBodyContentKey
  : [Input] extends [{ renderBody: any }]
    ? "renderBody"
    : [Input] extends [{ content: any }]
      ? "content"
      : "content" extends UnionKeys<Input>
        ? "renderBody" extends UnionKeys<Input>
          ? DefaultBodyContentKey
          : "content"
        : "renderBody" extends UnionKeys<Input>
          ? "renderBody"
          : DefaultBodyContentKey;

type InputFor<Name> = 0 extends 1 & Name
  ? any
  : Name extends string
    ? Name extends keyof Marko.NativeTags
      ? Marko.NativeTags[Name]["input"]
      : Record<string, unknown>
    : Name extends Marko.Template<infer Input, any>
      ? Input
      : Name extends
            | Marko.Body<infer Args, any>
            | Record<
                DefaultBodyContentKey,
                undefined | null | false | Marko.Body<infer Args, any>
              >
        ? Args extends {
            length: infer Length;
          }
          ? number extends Length
            ? Args[0] | undefined
            : 0 extends Length
              ? undefined
              : Args[0]
          : never
        : never;

export {};
