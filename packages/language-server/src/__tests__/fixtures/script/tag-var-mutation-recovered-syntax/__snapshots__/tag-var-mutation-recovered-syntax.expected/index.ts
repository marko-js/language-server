export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context)
  );
const x = Marko._.hoist(() => __marko_internal_hoist__x);
const __marko_internal_tag_1 = (
Marko._.resolveTemplate(import("@marko/runtime-tags/tags/let.d.marko")).default
);
{const x = Marko._.returned(() => __marko_internal_rendered_1);
const __marko_internal_rendered_1 = Marko._.renderTemplate(__marko_internal_tag_1)()()(// A handler being typed that Babel recovers into parser-only nodes
// (`tion f(y: number)` reads `y: number` as a TSTypeCastExpression) must not
// fail the template's analysis while it mutates a tag variable.
{
"value": 1
,

});
const __marko_internal_change__x = Marko._.change("x", "value", __marko_internal_rendered_1.return);
Marko._.renderNativeTag("button")()()({
"onClick"(){
  tion update(y: number) {
    __marko_internal_change__x.x = y;
  }
},
[Marko._.content]: (() => {
return () => {
return Marko._.voidReturn;
}
})(),

});
var __marko_internal_hoist__x = x;
}Marko._.noop({ x, input, $global, $signal });
return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
