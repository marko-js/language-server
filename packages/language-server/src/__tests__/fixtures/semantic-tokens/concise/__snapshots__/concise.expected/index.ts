export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const count = Marko._.hoist(() => __marko_internal_hoist__count);
  const __marko_internal_rendered_1 = Marko._.renderNativeTag("div")()()({
    class: Marko._.interpolated`layout`,
    [Marko._.content]: (() => {
      const __marko_internal_tag_2 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/let.d.marko"),
      );
      {
        const count = Marko._.returned(() => __marko_internal_rendered_2);
        const __marko_internal_rendered_2 = Marko._.renderTemplate(
          __marko_internal_tag_2,
        )()()({
          value: 7,
        });
        Marko._.renderNativeTag("span")()()({
          [Marko._.content]: (() => {
            count;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        });
        return () => {
          return new (class MarkoReturn<Return = void> {
            readonly [Marko._.scope] = { count };
            declare return: Return;
            constructor(_?: Return) {}
          })();
        };
      }
    })(),
  });
  var { count: __marko_internal_hoist__count } = Marko._.readScope(
    __marko_internal_rendered_1,
  );
  Marko._.noop({ count, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<never>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<never>) => void,
  ): Marko.Out<never>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<never>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: typeof __marko_internal_api;
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
