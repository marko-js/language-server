export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  const y = Marko._.hoist(() => __marko_internal_hoist__y);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  );
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
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("@marko/runtime-tags/tags/let.d.marko"),
    );
    {
      const y = Marko._.returned(() => __marko_internal_rendered_2);
      const __marko_internal_rendered_2 = Marko._.renderTemplate(
        __marko_internal_tag_2,
      )()()({
        value: [2],
      });
      const __marko_internal_change__y = Marko._.change(
        "y",
        "value",
        __marko_internal_rendered_2.return,
      );
      Marko._.renderNativeTag("button")()()({
        onClick() {
          [__marko_internal_change__x.x] = [2];
          ({ a: __marko_internal_change__x.x } = { a: 3 });
          [__marko_internal_change__x.x = 5, ...__marko_internal_change__y.y] =
            [1];
          for (__marko_internal_change__x.x of [1, 2]) {
            console.log(x);
          }
        },
        [Marko._.content]: (() => {
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      const __marko_internal_tag_3 = Marko._.resolveTemplate(
        import("./components/my-tag.marko"),
      );
      Marko._.renderTemplate(__marko_internal_tag_3)()()({
        [Marko._.contentFor(__marko_internal_tag_3)]: (x) => {
          Marko._.renderNativeTag("button")()()(
            // The tag param shadows the outer `x` so this is not a tag var mutation.
            {
              onClick() {
                x = 2;
                console.log(x);
              },
              [Marko._.content]: (() => {
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
            },
          );
          return Marko._.voidReturn;
        },
      });
      var __marko_internal_hoist__x = x;
      var __marko_internal_hoist__y = y;
    }
  }
  Marko._.noop({ x, y, input, $global, $signal });
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
