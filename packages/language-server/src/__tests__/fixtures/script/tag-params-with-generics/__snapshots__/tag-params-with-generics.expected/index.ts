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
    import("./components/loader.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_1)()()({
    value() {
      //      ^?    ^?
      return 1;
    },
    [Marko._.contentFor(__marko_internal_tag_1)]: (data) => {
      return Marko._.voidReturn;
    },
  });
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("./components/loader.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_2)()()({
    value() {
      //      ^?    ^?
      return "hi" as const;
    },
    [Marko._.contentFor(__marko_internal_tag_2)]: (data) => {
      return Marko._.voidReturn;
    },
  });
  const __marko_internal_tag_3 = Marko._.resolveTemplate(
    import("./components/loader.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_3)()()({
    [Marko._.contentFor(__marko_internal_tag_3)]: (data) => {
      return Marko._.voidReturn;
    },
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
