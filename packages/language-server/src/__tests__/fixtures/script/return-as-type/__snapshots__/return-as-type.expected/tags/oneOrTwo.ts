export interface Input {}
function __marko_internal_template(this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  ).default;
  {
    const x = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      value: 1,
    });
    const __marko_internal_change__x = Marko._.change(
      "x",
      "value",
      __marko_internal_rendered_1.return,
    );
    var __marko_internal_return = Marko._.returnTag({
      value: x as 1 | 2,
      valueChange(
        // @ts-ignore
        _x,
      ) {
        __marko_internal_change__x.x = _x;
      },
    });
    var __marko_internal_hoist__x = x;
  }
  Marko._.noop({ x, input, $global, $signal });
  return __marko_internal_return;
}
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<
  Input,
  Marko._.ReturnOf<typeof __marko_internal_template>
> {}
const OneOrTwo = new Template();
export default OneOrTwo;
// ^?
