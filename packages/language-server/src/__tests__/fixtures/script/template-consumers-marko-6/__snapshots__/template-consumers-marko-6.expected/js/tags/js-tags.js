/**
 * @typedef {{ name: string }} Input
 *//**
 * @this {void}
 */
function __marko_internal_template() {
  const input = /** @type {Input} */ (Marko._.any);
  const $signal = /** @type {AbortSignal} */ (Marko._.any);
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, /** @type {MarkoRun.Context} */ (Marko._.any)),
  );
  const name = Marko._.hoist(() => __marko_internal_hoist__name);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("marko/tags/let.d.marko"),
  ).default;
  {
    const name = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      value: input.name,
    });
    var __marko_internal_return = Marko._.returnTag({
      value: name,
    });
    var __marko_internal_hoist__name = name;
  }
  Marko._.noop({ name, input, $global, $signal });
  return __marko_internal_return;
}
const Input = new /**
 * @extends { Marko._.Template<{              render(         input: Marko.TemplateInput<Input>,       ): Marko.RenderedTemplate;               mount(         input: Marko.TemplateInput<Input>,         reference: Node,         position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",       ): Marko.MountedTemplate<typeof input, typeof __marko_internal_template extends () => infer Return ? Return : never>;             _<A = 1>(m?: A): () => A extends 2 | 3     ? Marko._.RestAttrTagsRenderer<Input, typeof __marko_internal_template extends () => infer Return ? Return : never>     : <I>(input: Marko.Directives & Input & Marko._.Relate<I, Marko.Directives & Input>) => Marko._.ReturnWithScope<I, typeof __marko_internal_template extends () => infer Return ? Return : never>; }>}
 */
(class Template extends Marko._.Template {})();
export default Input;
