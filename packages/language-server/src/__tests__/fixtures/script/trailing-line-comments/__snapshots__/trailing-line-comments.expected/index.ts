// Code ending in a line comment must not swallow the generated code after
// it: the `missing*` reads are the only errors.
const count: number = 1;
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
  Marko._.renderNativeTag("div")()()({
    [Marko._.content]: (() => {
      if (
        count // a condition ending in a comment
      ) {
        [count.missingInIf];
      }
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("marko/src/core-tags/core/script.d.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_1)()()({
    async [Marko._.never]() {
      count.missingInScript;
      // a script ending in a comment
    },
  });
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("marko/src/core-tags/core/script.d.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_2)()()({
    async [Marko._.never]() {
      count.missingInInlineScript; // also inline
    },
  });
  Marko._.renderNativeTag("div")()()({
    "data-x": count, // an attribute ending in a comment
  });
  Marko._.renderNativeTag("div")()()({
    [Marko._.content]: (() => {
      [count.missingAfter];
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("div")()()(
    // A `@ts-expect-error` that ends a body applies to nothing after it: the next
    // tag's error is reported
    {
      [Marko._.content]: (() => {
        Marko._.renderNativeTag("span")()()({});
        return () => {
          return Marko._.voidReturn;
        };
      })(),
    },
  );
  Marko._.renderNativeTag("div")()()({
    [Marko._.content]: (() => {
      [count.missingAfterExpectError];
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
