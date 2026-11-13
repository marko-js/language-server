export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context)
  );
const __marko_internal_tag_1 = (
Marko._.resolveTemplate(import("@marko/runtime-tags/tags/let.d.marko")).default
);
{const { %x } = Marko._.returned(() => __marko_internal_rendered_1);
const __marko_internal_rendered_1 = Marko._.renderTemplate(__marko_internal_tag_1)()()(// Should be resistant to syntax errors.
{
"value": 1
,

});
}Marko._.noop({ input, $global, $signal });
return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
