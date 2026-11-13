export interface Input {
  start: number;
}
function __marko_internal_template(this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const count = Marko._.hoist(() => __marko_internal_hoist__count);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  ).default;
  {
    const count = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      value: input.start,
    });
    const __marko_internal_change__count = Marko._.change(
      "count",
      "value",
      __marko_internal_rendered_1.return,
    );
    Marko._.renderNativeTag("button")()()({
      onClick() {
        __marko_internal_change__count.count++;
      },
      [Marko._.content]: (() => {
        [count];
        return () => {
          return Marko._.voidReturn;
        };
      })(),
    });
    var __marko_internal_return = Marko._.returnTag({
      value: count,
    });
    var __marko_internal_hoist__count = count;
  }
  Marko._.noop({ count, input, $global, $signal });
  return __marko_internal_return;
}
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<
  Input,
  Marko._.ReturnOf<typeof __marko_internal_template>
> {}
const Input = new Template();
export default Input;
