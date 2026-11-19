export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const result = Marko._.hoist(() => __marko_internal_hoist__result);
  {
    const result = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      data: 1 as const,
      [Marko._.contentFor(__marko_internal_module_1)]: <A,>(data: A) => {
        var __marko_internal_return = Marko._.returnTag(
          //                         ^?
          {
            value: { result: data },
          },
        );
        return new (class MarkoReturn<Return = void> {
          declare return: Return;
          constructor(_?: Return) {}
        })(__marko_internal_return);
      },
    });
    [result];
    var __marko_internal_hoist__result = result;
  }
  Marko._.noop({ result, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("./components/test-tag.marko");
//   ^?
