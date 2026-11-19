export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  __marko_internal_module_1().default._(
    /* use tags */ {
      value() {
        $signal.onabort = () => {
          // ^?
          console.log("aborted");
        };
      },
    },
  );
  Marko._.noop({ input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/effect.d.marko");
