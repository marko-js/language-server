/** @typedef {Record<string, unknown>} Input */
(
  /**
   * @this {void}
   */
  function () {
    const input = /** @type {Input} */ (Marko._.any);
    const $signal = /** @type {AbortSignal} */ (Marko._.any);
    const $global = Marko._.getGlobal(
      // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
      (Marko._.error, /** @type {MarkoRun.Context} */ (Marko._.any)),
    );
    const count = Marko._.hoist(() => __marko_internal_hoist__count);
    const __marko_internal_tag_1 = Marko._.interpolated`missing-template`;
    Marko._.renderDynamicTag(__marko_internal_tag_1)()()(
      // A tag whose taglib entry fails to load is reported on the tag, and the
      // rest of the template is still read.
      {},
    );
    const __marko_internal_tag_2 = Marko._.interpolated`broken-json`;
    Marko._.renderDynamicTag(__marko_internal_tag_2)()()({});
    const __marko_internal_tag_3 = Marko._.resolveTemplate(
      import("./components/ok-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_3)()()({
      label: "a",
    });
    const __marko_internal_tag_4 = Marko._.resolveTemplate(
      import("@marko/runtime-tags/tags/let.d.marko"),
    ).default;
    {
      const count = Marko._.returned(() => __marko_internal_rendered_4);
      const __marko_internal_rendered_4 = Marko._.renderTemplate(
        __marko_internal_tag_4,
      )()()(
        //  ^?
        {
          value: 1,
        },
      );
      Marko._.renderNativeTag("div")()()({
        [Marko._.content]: (() => {
          count;
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      var __marko_internal_hoist__count = count;
    }
    Marko._.noop({ count, input, $global, $signal });
    return;
  }
)();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
export default new /**
 * @extends { Marko._.Template<{              render(         input: Marko.TemplateInput<Input>,         stream?: {           write: (chunk: string) => void;           end: (chunk?: string) => void;         },       ): Marko.Out<never>;               render(         input: Marko.TemplateInput<Input>,         cb?: (           err: Error | null,           result: Marko.RenderResult<never>,         ) => void,       ): Marko.Out<never>;               renderSync(         input: Marko.TemplateInput<Input>,       ): Marko.RenderResult<never>;               renderToString(input: Marko.TemplateInput<Input>): string;               stream(         input: Marko.TemplateInput<Input>,       ): ReadableStream<string> & NodeJS.ReadableStream;               mount(         input: Marko.TemplateInput<Input>,         reference: Node,         position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",       ): Marko.MountedTemplate<typeof input, void>;          api: typeof __marko_internal_api,   _<A = 1>(m?: A): () => A extends 2 | 3     ? Marko._.RestAttrTagsRenderer<Input, void>     : <I>(input: Marko.Directives & Input & Marko._.Relate<I, Marko.Directives & Input>) => Marko._.ReturnWithScope<I, void>; }>}
 */
(class Template extends Marko._.Template {})();
//      ^?
