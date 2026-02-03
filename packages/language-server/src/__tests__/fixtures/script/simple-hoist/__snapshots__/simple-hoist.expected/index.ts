export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  const el = Marko._.hoist(() => __marko_internal_hoist__el);
  const __marko_internal_rendered_1 = Marko._.renderNativeTag("div")()()({
    [Marko._.content /*div*/]: (() => {
      const __marko_internal_tag_2 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/let.d.marko"),
      );
      const __marko_internal_rendered_2 = Marko._.renderTemplate(
        __marko_internal_tag_2 /*let*/,
      )()()({
        value: 1,
      });
      {
        const x = __marko_internal_rendered_2.return.value;
        const __marko_internal_change__x = Marko._.change(
          "x",
          "value",
          __marko_internal_rendered_2.return,
        );
        x;
        Marko._.renderNativeTag("button")()()({
          onClick() {
            __marko_internal_change__x.x = 2;
            __marko_internal_change__x.x++;
            ++__marko_internal_change__x.x;
          },
          [Marko._.content /*button*/]: (() => {
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        });
        {
          const el = Marko._.el("button");
          return () => {
            return new (class MarkoReturn<Return = void> {
              [Marko._.scope] = { x, el };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        }
      }
    })(),
  });
  const __marko_internal_tag_3 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/effect.d.marko"),
  );
  Marko._.renderTemplate(__marko_internal_tag_3 /*effect*/)()()({
    value() {
      console.log(el());
      //            ^?
    },
  });
  var { x: __marko_internal_hoist__x, el: __marko_internal_hoist__el } =
    Marko._.readScope(__marko_internal_rendered_1);
  Marko._.noop({ x, el, input, $global, $signal });
  return;
})();
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

  api: "tags";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
