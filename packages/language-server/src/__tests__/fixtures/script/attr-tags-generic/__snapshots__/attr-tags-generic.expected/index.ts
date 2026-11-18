export interface Input {}
export type Component = Marko.Component<Input>;
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@then"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
    value: 1 as const,
    then: {
      [Marko._.contentFor(__marko_internal_module_1)]: (foo) => {
        //   ^?
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@then"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    value: 1 as const,
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1],
        },
        (i) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              then: {
                [Marko._.contentFor(__marko_internal_module_1)]: (foo) => {
                  //   ^?
                  [i];
                  //^?
                  [foo];
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("then"),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./tags/foo/index.marko");
