export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
{const { %x } = Marko._.returned(() => __marko_internal_rendered_1);
const __marko_internal_rendered_1 = __marko_internal_module_1().default._(// Should be resistant to syntax errors.
{
"value": 1
,
});
}Marko._.noop({ input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
