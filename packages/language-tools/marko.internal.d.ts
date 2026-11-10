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
      // Only what is exported is public (with `export {}`), so hovers name
      // `Void` alone, not `Marko._.Void`.
      export {};
      // Declared: an ambient `const` may not be initialized with an instance.
      interface Void {
        readonly [Marko._.scope]: never;
        return: void;
      }
      export const voidReturn: Void;
      export const scope: unique symbol;
      /**
       * The key of a tag's input that holds its rest attribute tags: each
       * attribute tag that is not the first of its name written directly under
       * the tag, as groups (see `AttrTagGroup`).
       */
      export const restAttrTags: typeof attributeTags;
      export const never: never;
      /**
       * The key, in a generic template, of its input with `any` for each type
       * parameter. `attrTags` reads it, as it checks attribute tags apart
       * from the tag (a loop's body, an `<if>`'s with a scriptlet, an
       * attribute tag's own) and so cannot see the tag's type arguments.
       */
      export const anyInput: unique symbol;
      /** A renderer's form for a tag with rest attribute tags. */
      export const withRestAttrTags: 3;
      export const any: any;

      export function getGlobal<Override>(
        override: Override,
      ): [0] extends [1 & Override] ? Marko.Global : Override;

      export function returned<T>(
        rendered: () => T,
      ): T extends { return: { value: infer Returned } } ? Returned : never;

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

      export function contentFor<Name>(tag: Name): ContentFor<Name>;

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

      export function instance<Constructor>(
        constructor: Constructor,
      ): Constructor extends abstract new (...args: any) => infer Instance
        ? Instance
        : never;

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
          ? Data extends {
              [K in `${SourceName extends string
                ? SourceName
                : LocalName}Change`]: (value: infer V, ...args: any[]) => any;
            }
            ? { [K in LocalName]: V }
            : { readonly [K in LocalName]: unknown }
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

      export function renderTemplate<Name>(
        template: Name,
      ): TemplateRenderer<Name>;
      export function renderNativeTag<Name extends string>(
        tag: Name,
      ): NativeTagRenderer<Name>;
      export const missingTag: DefaultRenderer;
      // A template's module, whose `default` a tag reads by its name, so
      // TypeScript shows the template's docs there.
      export function resolveTemplate<Module>(
        imported: Promise<Module>,
      ): Module;
      export function fallbackTemplate<Tag, Template>(
        tag: Tag,
        fallback: Template,
      ): [0] extends [1 & Tag] ? Template : Tag;
      export function renderDynamicTag<Name>(tag: Name): DynamicRenderer<Name>;

      export function returnTag<
        Input extends {
          value: unknown;
          valueChange?: ((value: any) => void) | false | null;
        },
      >(input: Input): Input;

      export function forOfTag<
        Value,
        Item extends [0] extends [1 & Value]
          ? any
          : Value extends Iterable<infer Item>
            ? Item
            : never,
        BodyContent extends Marko.Body<
          [item: Item, index: number, all: Exclude<Value, false | void | null>],
          void
        >,
      >(
        input: {
          of: Value & (Iterable<unknown> | false | void | null);
          by?: ((item: Item, index: number) => string) | string;
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
        To extends number,
        From extends void | number,
        Step extends void | number,
        BodyContent extends Marko.Body<[index: number], void>,
      >(
        input: {
          to: To;
          from?: From;
          step?: Step;
          by?: (index: number) => string;
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
          by?: (index: number) => string;
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
        ) & { by?: string | ((...args: unknown[]) => string) },
        content: BodyContent,
      ): ReturnAndScope<BodyContentScope<BodyContent>, void>;

      /** The attribute tags of a `<for of>`: its body's own type. */
      export function forOfAttrTag<
        Value,
        Item extends [0] extends [1 & Value]
          ? any
          : Value extends readonly (infer Item)[] | Iterable<infer Item>
            ? Item
            : never,
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
       * gives: an object of attribute tags, each name once (see `Directives`).
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
                // unknown ones: with the directives, as the input is checked.
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
       * merged by name as a renderer merges a tag's (see `Directives`), and
       * checked against that attribute tag's type. A tag's own groups are
       * given to its renderer where they are written, so that TypeScript
       * infers its type parameters from them too.
       */
      export function attrTags<Tag, Path extends readonly string[]>(
        tag: Tag,
        ...path: Path
      ): CheckedAttrTags<AttrTagGroup<AttrTagsInput<AnyInputFor<Tag>, Path>>>;

      export type DynamicRenderer<Name> = [0] extends [1 & Name]
        ? DefaultRenderer
        : [Name] extends [Marko.Template<any, any> | string]
          ? DynamicInputRenderer<Name>
          : [Name] extends [AnyMarkoBody]
            ? BodyRenderer<Name>
            : [Name] extends [
                  {
                    [BodyContentKey in DefaultBodyContentKey]?: infer BodyValue extends
                      AnyMarkoBody;
                  },
                ]
              ? BodyRenderer<BodyValue>
              : DefaultRenderer;

      export type TemplateRenderer<Template> = Template extends {
        _: infer Renderer;
      }
        ? Renderer
        : Template extends Marko.Template<infer Input, infer Return>
          ? BaseRenderer<Input, Return>
          : DefaultRenderer;

      // Each renderer's first call takes the form of renderer the tag needs
      // (see `Renderer`): `1` (the default) for a tag without rest attribute
      // tags, `withRestAttrTags` (`3`) for one with them, and `0` and `2`
      // likewise for a generic template given type arguments.
      export interface NativeTagRenderer<Name extends string> {
        <Mode extends number = 1>(
          mode?: Mode,
        ): () => Renderer<
          Marko.NativeTags[Name]["input"],
          Marko.NativeTags[Name]["return"],
          Mode
        >;
      }

      /**
       * A body's renderer: given its input, as a template's is, when its only
       * param is its input (eg a `<define>` with attributes), which is much
       * cheaper to check than its arguments, else given its arguments.
       * With rest attribute tags (`Mode` `2` or `3`), its input has them.
       */
      export interface BodyRenderer<Body extends AnyMarkoBody> {
        <Mode extends number = 1>(
          mode?: Mode,
        ): () => [0] extends [1 & BodyParamsWithDefault<Body>]
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
      }

      export interface BaseRenderer<Input, Return = void> {
        <Mode extends number = 1>(
          mode?: Mode,
        ): () => Renderer<Input, Return, Mode>;
      }

      export interface DefaultRenderer {
        <Mode extends number = 1>(
          mode?: Mode,
        ): () => Mode extends 2 | 3
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
       * Renders a tag without rest attribute tags given its input, with
       * `Marko.Directives`: related to it (with `Relate`), so that TypeScript types
       * it by it and reports what it does not have, while
       * `__marko_internal_input` keeps its type for `Scopes`.
       */
      export interface InputRenderer<Input, Return> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
        <__marko_internal_input extends unknown>(
          input: Marko.Directives &
            Input &
            Relate<__marko_internal_input, Marko.Directives & Input>,
        ): ReturnWithScope<__marko_internal_input, Return>;
        /** See `RestAttrTagsRenderer`. */
        readonly [rendererInput]?: (input: Input) => Input;
      }

      /**
       * Renders a tag given its input with rest attribute tags: its
       * attributes, the first attribute tag of each name written directly
       * under it, and (keyed by `restAttrTags`) its rest attribute tags as
       * groups (see `Directives`). One argument, so that TypeScript infers
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
       * What a generic template's renderer takes with rest attribute tags, as
       * `RestAttrTagsRenderer` does: named to keep its trailer short, and a
       * conditional type, so that once `Actual` is inferred TypeScript prints
       * it as the intersection, not by this name.
       */
      export type TagInput<Actual, Input> = [Actual] extends [unknown]
        ? RestAttrTagsInput<Input> & Relate<Actual, RestAttrTagsInput<Input>>
        : never;

      export type ResolveComponent<Component> = CheckNever<
        ComponentOf<
          InstanceOf<
            Component extends { default: infer Component }
              ? Component
              : Component
          >
        >,
        Marko.Component
      >;

      export type Relate<A, B> = B extends A ? A : B;
    }
  }
}

declare abstract class MarkoReturn<Return> {
  return: Return;
}

type AnyMarkoBody = Marko.Body<any, any>;

/**
 * Renders a tag named by a template or a string, or by one of several of them,
 * with any of their inputs (`Marko.Input<Name>`). The attributes are
 * intersected with it rather than related to it, which is cheaper than each
 * renderer's check, so unknown attributes are not reported. Its rest
 * attribute tags are checked against any of the inputs (a native tag has
 * none).
 */
type DynamicInputRenderer<Name> = {
  <Mode extends number = 1>(
    mode?: Mode,
  ): () => Mode extends 2 | 3
    ? DynamicInputRestAttrTagsRenderer<Name>
    : <Input extends Marko.Input<Name>>(
        input: Marko.Directives & Input,
      ) => Marko._.ReturnWithScope<Input, Marko.Return<Name>>;
};

/**
 * A tag's input for its groups: `any` where it is not known (a bare
 * `Marko.Template`'s, or a body's `unknown` param), which takes anything, as
 * its attributes do (`unknown` would take none, see `AttrTagGroup`). A
 * compiled template's is read with the directives, so one that declares
 * `unknown` takes none.
 */
type KnownInput<Input> = unknown extends Input ? any : Input;

/** `DynamicInputRenderer` for a tag with rest attribute tags. */
type DynamicInputRestAttrTagsRenderer<Name> = <
  // With the directives, whose rest attribute tags the input object has, so
  // that TypeScript infers it, rather than this constraint, when it has no
  // other property in common with an input whose properties are all optional.
  Input extends Directives<KnownInput<Marko.Input<Name>>> & Marko.Input<Name>,
>(
  input: Directives<KnownInput<Marko.Input<Name>>> & Input,
) => Marko._.ReturnWithRestAttrTagsScope<Input, Marko.Return<Name>>;

type BodyContentScope<BodyContent> = BodyContent extends (...params: any) => {
  [Marko._.scope]: infer Scope;
}
  ? Scope
  : never;

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
  [K in Exclude<
    keyof Component,
    Exclude<
      keyof Marko.Component,
      "emit" | "setState" | "setStateDirty" | "forceUpdate"
    >
  >]: Component[K] extends (...args: any) => any ? Component[K] : never;
};

type Scopes<Input> = [0] extends [1 & Input]
  ? never
  :
      | (Input[("content" | "renderBody") & keyof Input] extends infer Prop
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
 * `InputFor`, but a generic template's with `any` type arguments, and `any`
 * where it is not known (see `KnownInput`).
 */
type AnyInputFor<Tag> = Tag extends { [Marko._.anyInput]: infer Input }
  ? Input
  : KnownInput<InputFor<Tag>>;

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
type RestAttrTagsInput<Input> = Input & Directives<Input>;

/** The key of `Marko._.InputRenderer`'s `Input`. */
declare const rendererInput: unique symbol;

/**
 * The key of a tag's input that holds its rest attribute tags
 * (`Marko._.restAttrTags`), declared out of `Marko._` so that TypeScript prints
 * it as `[attributeTags]`.
 */
declare const attributeTags: unique symbol;

/**
 * `Marko.Directives`, with the rest attribute tags of a tag's input, as groups
 * (the static ones, an object per repetition, so that each has a name once; an
 * `<if>` chain or a `<while>`; or a `<for>`'s `for*AttrTag`), merged by name.
 * `| []` infers a tuple.
 */
interface Directives<Input> extends Marko.Directives {
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

type AttrTagValue<Input, Path extends readonly string[]> = Path extends [
  infer Prop extends keyof Input,
  ...infer Rest extends readonly string[],
]
  ? Exclude<Input[Prop], undefined | null> extends infer Value
    ? Rest extends readonly []
      ? Value
      : AttrTagValue<Value, Rest>
    : never
  : never;

/** The keys of each member of `T` (`keyof` a union has only common keys). */
type UnionKeys<T> = T extends unknown ? keyof T : never;

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

type CheckNever<T, If, Else = T> = [T] extends [never] ? If : Else;
type ComponentOf<T> = T extends Marko.Component ? T : T & Marko.Component;
type InstanceOf<T> = T extends abstract new () => infer R ? R : T;

type UnionToIntersection<T> = (T extends any ? (_: T) => any : never) extends (
  _: infer U,
) => any
  ? U
  : never;

type DefaultBodyContentKey = keyof Exclude<
  Marko.Renderable,
  Marko.Template<any, any> | Marko.Body<any, any> | string
>;

type ContentFor<Name> = [0] extends [1 & Name]
  ? DefaultBodyContentKey
  : Name extends { api: infer API }
    ? API extends "tags"
      ? "content"
      : API extends "class"
        ? "renderBody"
        : DefaultBodyContentKey
    : DefaultBodyContentKey;

type InputFor<Name> = 0 extends 1 & Name
  ? any
  : Name extends string
    ? Name extends keyof Marko.NativeTags
      ? Marko.NativeTags[Name]["input"]
      : Record<string, unknown>
    : Name extends
          | Marko.Template<infer Input, any>
          | { _(): () => (input: infer Input) => any }
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
