export interface Input<T extends string> {
  name: T;
}
const Input = Marko._.templateOf(<T extends string>(input: Input<T>) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  const __marko_internal_rendered_1 = Marko._.renderNativeTagWithScope("div")({
    [Marko._.content]: (() => {
      {
        const x = Marko._.returned(() => __marko_internal_rendered_2);
        const __marko_internal_rendered_2 =
          __marko_internal_module_1().default._({
            value: () => 1,
          });
        [new Thing()];
        //      ^?
        [x];
        //  ^?
        [input.name];
        return () => {
          return new (class MarkoReturn<Return = void> {
            readonly [Marko._.scope] = { x };
            declare return: Return;
            constructor(_?: Return) {}
          })();
        };
      }
    })(),
  });
  [x];
  var { x: __marko_internal_hoist__x } = Marko._.hoisted(
    Marko._.readScope(__marko_internal_rendered_1),
  );
  Marko._.noop({ x, input, $global, $signal });
});
export default Input;
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
//   ^?
