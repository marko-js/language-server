/**
 * A button, typed with JSDoc.
 * @deprecated Use `<js-link>` instead.
 * @typedef {{ label: string }} Input
 *//**
 * @extends {Marko.Component<Input>}
 * @abstract
 */
export class Component extends Marko.Component {}
/**
 * @this {void}
 */
(function () {
  const input = /** @type {Input} */ (Marko._.any);
  const component = /** @type {Component} */ (Marko._.any);
  const state = Marko._.state(component);
  const out = /** @type {Marko.Out} */ (Marko._.any);
  const $signal = /** @type {AbortSignal} */ (Marko._.any);
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, /** @type {MarkoRun.Context} */ (Marko._.any)),
  );
  Marko._.renderNativeTag("button")()()({
    [Marko._.content]: (() => {
      input.label;
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
const Input = new /**
 * @extends { Marko._.Template<{              render(         input: Marko.TemplateInput<Input>,         stream?: {           write: (chunk: string) => void;           end: (chunk?: string) => void;         },       ): Marko.Out<Component>;               render(         input: Marko.TemplateInput<Input>,         cb?: (           err: Error | null,           result: Marko.RenderResult<Component>,         ) => void,       ): Marko.Out<Component>;               renderSync(         input: Marko.TemplateInput<Input>,       ): Marko.RenderResult<Component>;               renderToString(input: Marko.TemplateInput<Input>): string;               stream(         input: Marko.TemplateInput<Input>,       ): ReadableStream<string> & NodeJS.ReadableStream;               mount(         input: Marko.TemplateInput<Input>,         reference: Node,         position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",       ): Marko.MountedTemplate<typeof input>;          api: typeof __marko_internal_api,   _<A = 1>(m?: A): () => A extends 3     ? Marko._.RestAttrTagsRenderer<Input, void>     : <I>(input: Marko.Directives & Input & Marko._.Relate<I, Marko.Directives & Input>) => Marko._.ReturnWithScope<I, void>; }>}
 */
(class Template extends Marko._.Template {})();
export default Input;
