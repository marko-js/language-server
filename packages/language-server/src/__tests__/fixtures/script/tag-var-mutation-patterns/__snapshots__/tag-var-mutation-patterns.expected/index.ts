export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  const y = Marko._.hoist(() => __marko_internal_hoist__y);
  {
    const x = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: 1,
    });
    const __marko_internal_change__x = Marko._.change(
      "x",
      "value",
      __marko_internal_rendered_1,
    );
    {
      const y = Marko._.returned(() => __marko_internal_rendered_2);
      const __marko_internal_rendered_2 = __marko_internal_module_1().default._(
        {
          value: [2],
        },
      );
      const __marko_internal_change__y = Marko._.change(
        "y",
        "value",
        __marko_internal_rendered_2,
      );
      Marko._.renderNativeTag("button")({
        onClick() {
          [__marko_internal_change__x.x] = [2];
          ({ a: __marko_internal_change__x.x } = { a: 3 });
          [__marko_internal_change__x.x = 5, ...__marko_internal_change__y.y] =
            [1];
          for (__marko_internal_change__x.x of [1, 2]) {
            console.log(x);
          }
        },
        [Marko._.content]: Marko._.voidBody,
      });
      __marko_internal_module_2().default._({
        [Marko._.contentFor(__marko_internal_module_2)]: (x) => {
          Marko._.renderNativeTag("button")(
            // The tag param shadows the outer `x` so this is not a tag var mutation.
            {
              onClick() {
                x = 2;
                console.log(x);
              },
              [Marko._.content]: Marko._.voidBody,
            },
          );
          return Marko._.voidReturn;
        },
      });
      var __marko_internal_hoist__x = x;
      var __marko_internal_hoist__y = y;
    }
  }
  Marko._.noop({ x, y, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("./components/my-tag.marko");
