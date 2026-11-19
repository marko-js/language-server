export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  const el = Marko._.hoist(() => __marko_internal_hoist__el);
  const __marko_internal_rendered_1 = Marko._.renderNativeTagWithScope("div")({
    [Marko._.content]: (() => {
      {
        const x = Marko._.returned(() => __marko_internal_rendered_2);
        const __marko_internal_rendered_2 =
          __marko_internal_module_1().default._({
            value: 1,
          });
        const __marko_internal_change__x = Marko._.change(
          "x",
          "value",
          __marko_internal_rendered_2,
        );
        [x];
        {
          const el = Marko._.el("button");
          Marko._.renderNativeTag("button")({
            onClick() {
              __marko_internal_change__x.x = 2;
              __marko_internal_change__x.x++;
              ++__marko_internal_change__x.x;
            },
            [Marko._.content]: Marko._.voidBody,
          });
          return () => {
            return new (class MarkoReturn<Return = void> {
              readonly [Marko._.scope] = { x, el };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        }
      }
    })(),
  });
  __marko_internal_module_2().default._({
    value() {
      console.log(el());
      //            ^?
    },
  });
  var { x: __marko_internal_hoist__x, el: __marko_internal_hoist__el } =
    Marko._.hoisted(Marko._.readScope(__marko_internal_rendered_1));
  Marko._.noop({ x, el, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/effect.d.marko");
