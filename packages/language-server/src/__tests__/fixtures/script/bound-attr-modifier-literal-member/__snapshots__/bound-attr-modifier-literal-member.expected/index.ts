export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const a = Marko._.hoist(() => __marko_internal_hoist__a);
  {
    const a = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: { b: 1, bChange(_value: number) {} },
    });
    __marko_internal_module_2().default._({
      value: a.b,
      valueChange:
        a.bChange &&
        ((
          // @ts-ignore
          _,
        ) => {
          a.bChange(parseInt(_));
        }),
    });
    __marko_internal_module_2().default._(
      //      ^?    ^?
      {
        value: a.b,
        valueChange:
          a.bChange &&
          ((
            // @ts-ignore
            _,
          ) => {
            a.bChange(Boolean(_));
          }),
      },
    );
    var __marko_internal_hoist__a = a;
  }
  Marko._.noop({ a, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("./tags/child.marko");
//      ^?    ^?
