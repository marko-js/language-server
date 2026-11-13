export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./components/list.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@item"];
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1, 2, 3],
        },
        () =>
          Marko._.attrTags(__marko_internal_tag_1)([
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
          Marko._.attrTags(__marko_internal_tag_1)([
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
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
