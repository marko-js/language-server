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
  let i = 0;
  const __marko_internal_tag_1 = custom;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_1)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      ++i < 10
        ? {
            //         ^?
            a: {
              [Marko._.contentFor(__marko_internal_tag_1)]: (() => {
                [i];
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("a"),
  });
  let done = false;
  i = 0;
  const __marko_internal_tag_2 = custom;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_2)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      !done
        ? {
            //        ^?
            a: {
              [Marko._.contentFor(__marko_internal_tag_2)]: (() => {
                [done];
                //      ^?
                if (++i === 5) {
                  done = true;
                }
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("a"),
  });
  const __marko_internal_tag_3 = custom;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_3)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      undefined
        ? {
            a: {
              [Marko._.contentFor(__marko_internal_tag_3)]: (() => {
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("a"),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
