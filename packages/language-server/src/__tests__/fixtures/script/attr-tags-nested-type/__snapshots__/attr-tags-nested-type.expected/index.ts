export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@a"];
    Marko._.nestedAttrTagNames(input["@a"], (input) => {
      input["@b"];
    });
  });
  __marko_internal_module_1().default._({
    a: {
      ...Marko._.givenAttrTags("b"),
      ...Marko._.forOfAttrTag(
        {
          of: [1, 2, 3],
        },
        () =>
          Marko._.attrTags(
            __marko_internal_module_1,
            "a",
          )([
            {
              b: {
                size: "small",
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
      [Symbol.iterator]: Marko._.any,
    },
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("./components/list.marko");
