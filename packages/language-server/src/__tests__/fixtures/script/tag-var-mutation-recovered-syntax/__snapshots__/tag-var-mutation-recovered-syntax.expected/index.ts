export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
const x = Marko._.hoist(() => __marko_internal_hoist__x);
{const x = Marko._.returned(() => __marko_internal_rendered_1);
const __marko_internal_rendered_1 = __marko_internal_module_1().default._(// A handler being typed that Babel recovers into parser-only nodes
// (`tion f(y: number)` reads `y: number` as a TSTypeCastExpression) must not
// fail the template's analysis while it mutates a tag variable.
{
"value": 1
,
});
const __marko_internal_change__x = Marko._.change("x", "value", __marko_internal_rendered_1);
Marko._.renderNativeTag("button")({
"onClick"(){
  tion update(y: number) {
    __marko_internal_change__x.x = y;
  }
},
[Marko._.content]: Marko._.voidBody,
});
var __marko_internal_hoist__x = x;
}Marko._.noop({ x, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
