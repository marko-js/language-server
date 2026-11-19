export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1, 2, 3],
        },
        () =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              item: {
                size: "small",
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
      Marko._.forOfAttrTag(
        {
          of: [1, 2, 3],
        },
        () =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              item: {
                size: "small",
                [Symbol.iterator]: Marko._.any,
              },
            },
            {
              // ^?
              item: {
                size: "huge",
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("item"),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("./components/list.marko");
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
