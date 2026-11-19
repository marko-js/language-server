// Code ending in a line comment must not swallow the generated code after
// it: the `missing*` reads are the only errors.
const count: number = 1;
export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("div")({
    [Marko._.content]: (() => {
      if (
        count // a condition ending in a comment
      ) {
        [count.missingInIf];
      }
      return Marko._.voidBody;
    })(),
  });
  __marko_internal_module_1().default._({
    async [Marko._.never]() {
      count.missingInScript;
      // a script ending in a comment
    },
  });
  __marko_internal_module_1().default._({
    async [Marko._.never]() {
      count.missingInInlineScript; // also inline
    },
  });
  Marko._.renderNativeTag("div")({
    "data-x": count, // an attribute ending in a comment
  });
  Marko._.renderNativeTag("div")({
    [Marko._.content]: (() => {
      [count.missingAfter];
      return Marko._.voidBody;
    })(),
  });
  Marko._.renderNativeTag("div")(
    // A `@ts-expect-error` that ends a body applies to nothing after it: the next
    // tag's error is reported
    {
      [Marko._.content]: (() => {
        Marko._.renderNativeTag("span")({});
        return Marko._.voidBody;
      })(),
    },
  );
  Marko._.renderNativeTag("div")({
    [Marko._.content]: (() => {
      [count.missingAfterExpectError];
      return Marko._.voidBody;
    })(),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("marko/src/core-tags/core/script.d.marko");
