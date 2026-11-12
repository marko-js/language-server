/**
 * @template T
 * @typedef {{ value: T, format?: (value: T) => string }} Input
 *//**
 * @template T
 * @this {void}
 */
function __marko_internal_template() {
  const input = /** @type {Input<T>} */ (Marko._.any);
  const $signal = /** @type {AbortSignal} */ (Marko._.any);
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, /** @type {MarkoRun.Context} */ (Marko._.any)),
  );
  const formatted = Marko._.hoist(() => __marko_internal_hoist__formatted);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("marko/tags/const.d.marko"),
  ).default;
  {
    const formatted = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      value: input.format ? input.format(input.value) : String(input.value),
    });
    Marko._.renderNativeTag("div")()()({
      ["content"]: (() => {
        [formatted];
        return () => {
          return Marko._.voidReturn;
        };
      })(),
    });
    var __marko_internal_return = Marko._.returnTag({
      value: input.value,
    });
    var __marko_internal_hoist__formatted = formatted;
  }
  Marko._.noop({ formatted, input, $global, $signal });
  return __marko_internal_return;
}
const Input = new /**
 * @extends { Marko._.Template<{              render<T>(         input: Marko.TemplateInput<Input<T>>,       ): Marko.RenderedTemplate;               mount<T>(         input: Marko.TemplateInput<Input<T>>,         reference: Node,         position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",       ): Marko.MountedTemplate<typeof input, typeof __marko_internal_template<T> extends () => infer Return ? Return : never>;             _<__marko_internal_apply = 1>(m?: __marko_internal_apply): __marko_internal_apply extends 0 | 2     ? <T>() => Marko._.Renderer<Input<T>, typeof __marko_internal_template<T> extends () => infer Return ? Return : never, __marko_internal_apply>     : __marko_internal_apply extends 1     ? () => <__marko_internal_input, T>(input: Marko.Directives & Input<T> & Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>) => Marko._.ReturnWithScope<__marko_internal_input, typeof __marko_internal_template<T> extends () => infer Return ? Return : never>     : () => <__marko_internal_input, T>(input: Marko._.TagInput<__marko_internal_input, Input<T>>) => Marko._.ReturnWithRestAttrTagsScope<__marko_internal_input, typeof __marko_internal_template<T> extends () => infer Return ? Return : never>;   [Marko._.anyInput]: Input<any>; }>}
 */
(class Template extends Marko._.Template {})();
export default Input;
