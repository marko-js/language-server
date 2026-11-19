export interface Input<T extends string> {
  name: T;
}
const Input = Marko._.templateOf(<T extends string>(input: Input<T>) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  const y = Marko._.hoist(() => __marko_internal_hoist__y);
  const promise = Marko._.hoist(() => __marko_internal_hoist__promise);
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
        {
          const y = Marko._.returned(() => __marko_internal_rendered_3);
          const __marko_internal_rendered_3 =
            __marko_internal_module_2().default._({
              value: "hi",
            });
          const __marko_internal_change__y = Marko._.change(
            "y",
            "value",
            __marko_internal_rendered_3,
          );
          {
            const promise = Marko._.returned(() => __marko_internal_rendered_4);
            const __marko_internal_rendered_4 =
              __marko_internal_module_2().default._({
                value: Promise.resolve("world"),
              });
            __marko_internal_module_3().default._({
              async value() {
                console.log(x);
                //              ^?
                console.log(y);
                //              ^?
                console.log(input.name);
                //                    ^?

                const resolved = await promise;
                console.log(resolved);
                //          ^?
                __marko_internal_change__x.x = 2;
                __marko_internal_change__y.y = "bye";
              },
            });
            return () => {
              return new (class MarkoReturn<Return = void> {
                readonly [Marko._.scope] = { x, y, promise };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            };
          }
        }
      }
    })(),
  });
  var {
    x: __marko_internal_hoist__x,
    y: __marko_internal_hoist__y,
    promise: __marko_internal_hoist__promise,
  } = Marko._.hoisted(Marko._.readScope(__marko_internal_rendered_1));
  Marko._.noop({ x, y, promise, input, $global, $signal });
});
export default Input;
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_3(): typeof import("marko/src/core-tags/core/script.d.marko");
