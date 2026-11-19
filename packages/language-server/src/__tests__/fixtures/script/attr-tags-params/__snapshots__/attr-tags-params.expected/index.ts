import Child from "./components/child.marko";
export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@foo"];
    input["@foo"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    foo: {
      bar: true,
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        foo: {
          [Marko._.contentFor(__marko_internal_module_1)]: (data) => {
            [data];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_1 = Child;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@foo"];
    input["@foo"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_1,
    Marko._.signature(__marko_internal_tag_1),
    Marko._.actualInput,
  )({
    foo: {
      bar: true,
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        foo: {
          [Marko._.contentFor(__marko_internal_tag_1, "foo")]: (data) => {
            [data];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_2 = true && Child;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@foo"];
    input["@foo"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_2,
    Marko._.signature(__marko_internal_tag_2),
    Marko._.actualInput,
  )(
    // This errors for now, because `typeof (some + expression)` is not allowed
    {
      foo: {
        bar: true,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          foo: {
            [Marko._.contentFor(__marko_internal_tag_2, "foo")]: (data) => {
              [data];
              return Marko._.voidReturn;
            },
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("./components/child.marko");
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
