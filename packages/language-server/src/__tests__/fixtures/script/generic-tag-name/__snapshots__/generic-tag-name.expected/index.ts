export interface Input<
  S extends keyof Marko.NativeTags,
  A extends "a" | "button",
> {
  as: S;
  link: A;
}
// As a name of the constraint's type
declare const anyTag: keyof Marko.NativeTags;
declare const linkTag: "a" | "button";
abstract class Component<
  S extends keyof Marko.NativeTags,
  A extends "a" | "button",
> extends Marko.Component<Input<S, A>> {}
export { type Component };
(function <S extends keyof Marko.NativeTags, A extends "a" | "button">(
  this: void,
) {
  const input = Marko._.any as Input<S, A>;
  const component = Marko._.any as Component<S, A>;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const __marko_internal_tag_1 = input.as;
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()({
    class: "x",
    onClick() {},
  });
  const __marko_internal_tag_2 = input.as;
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
    class: 1,
  });
  const __marko_internal_tag_3 = input.as;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()(
    // A native tag has no attribute tags: once, repeated, in an <if> and a <for>.
    {
      item: {
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  const __marko_internal_tag_4 = input.as;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_4)(Marko._.withRestAttrTags)()({
    item: {
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_5 = input.as;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_5)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      input.as
        ? {
            item: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_6 = input.as;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_6)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1],
        },
        (x) =>
          Marko._.attrTags(__marko_internal_tag_6)([
            {
              item: {
                title: `${x}`,
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_7 = input.as;
  Marko._.renderDynamicTag(__marko_internal_tag_7)()()({
    class: ["a", "b"],
    title: "x",
    [Marko._.contentFor(__marko_internal_tag_7)]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  const __marko_internal_tag_8 = input.link;
  Marko._.renderDynamicTag(__marko_internal_tag_8)()()({
    class: "x",
  });
  const __marko_internal_tag_9 = input.link;
  Marko._.renderDynamicTag(__marko_internal_tag_9)()()({
    href: "/",
  });
  const __marko_internal_tag_10 = input.as || "div";
  Marko._.renderDynamicTag(__marko_internal_tag_10)()()({
    class: "x",
  });
  Marko._.renderNativeTag("div")()()(
    // As a concrete name
    {
      class: 1,
    },
  );
  Marko._.renderNativeTag("button")()()({
    href: "/",
  });
  const __marko_internal_tag_11 = anyTag;
  Marko._.renderDynamicTag(__marko_internal_tag_11)()()({
    class: 1,
  });
  const __marko_internal_tag_12 = linkTag;
  Marko._.renderDynamicTag(__marko_internal_tag_12)()()({
    href: "/",
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.GenericTemplate<
  {
    [__marko_internal_key in keyof Marko._.TemplateMethods]: <
      S extends keyof Marko.NativeTags,
      A extends "a" | "button",
    >(
      ...args: Marko._.MethodParams<Input<S, A>, void, __marko_internal_key>
    ) => Marko._.MethodReturn<Input<S, A>, void, __marko_internal_key>;
  } & { [Marko._.anyInput]: Input<any, any> },
  <__marko_internal_apply = 1>(
    m?: __marko_internal_apply,
  ) => __marko_internal_apply extends 0 | 2
    ? <
        S extends keyof Marko.NativeTags,
        A extends "a" | "button",
      >() => Marko._.Renderer<Input<S, A>, void, __marko_internal_apply>
    : __marko_internal_apply extends 1
      ? () => <
          __marko_internal_input,
          S extends keyof Marko.NativeTags,
          A extends "a" | "button",
        >(
          input: Marko.Directives &
            Input<S, A> &
            Marko._.Relate<
              __marko_internal_input,
              Marko.Directives & Input<S, A>
            >,
        ) => Marko._.ReturnWithScope<__marko_internal_input, void>
      : () => <
          __marko_internal_input,
          S extends keyof Marko.NativeTags,
          A extends "a" | "button",
        >(
          input: Marko._.TagInput<__marko_internal_input, Input<S, A>>,
        ) => Marko._.ReturnWithRestAttrTagsScope<__marko_internal_input, void>,
  "class"
> {}
const Input = new Template();
export default Input;
