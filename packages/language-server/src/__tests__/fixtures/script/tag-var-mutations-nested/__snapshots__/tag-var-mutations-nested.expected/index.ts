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
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1,
  )()()({
    value: 1,
  });
  {
    const x = __marko_internal_rendered_1.return.value;
    Marko._.renderNativeTag("button")()()({
      onClick() {
        __marko_internal_return.mutate.x++;
        //^?
      },
      [Marko._.content /*button*/]: (() => {
        return () => {
          return Marko._.voidReturn;
        };
      })(),
    });
    const __marko_internal_tag_2 = Marko._.interpolated`foo`;
    const __marko_internal_rendered_2 = Marko._.renderDynamicTag(
      __marko_internal_tag_2,
    )()()({
      [Marko._.contentFor(__marko_internal_tag_2) /*foo*/]: (() => {
        const __marko_internal_tag_3 = Marko._.resolveTemplate(
          import("@marko/runtime-tags/tags/let.d.marko"),
        );
        const __marko_internal_rendered_3 = Marko._.renderTemplate(
          __marko_internal_tag_3,
        )()()({
          value: "hello",
        });
        {
          const y = __marko_internal_rendered_3.return.value;
          Marko._.renderNativeTag("button")()()({
            onClick() {
              __marko_internal_return.mutate.x++;
              //  ^?
              __marko_internal_return.mutate.y = "goodbye";
              //  ^?
            },
            [Marko._.content /*button*/]: (() => {
              return () => {
                return Marko._.voidReturn;
              };
            })(),
          });
          var __marko_internal_return = {
            mutate: Marko._.mutable([
              ["x", "value", __marko_internal_rendered_1.return],
              ["y", "value", __marko_internal_rendered_3.return],
            ] as const),
          };
          Marko._.noop({
            x,
            y,
          });
          return () => {
            return new (class MarkoReturn<Return = void> {
              [Marko._.scope] = { y };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        }
      })(),
    });
    var __marko_internal_return = {
      mutate: Marko._.mutable([
        ["x", "value", __marko_internal_rendered_1.return],
      ] as const),
    };
    Marko._.noop({
      x,
    });
    var __marko_internal_hoist__x = x;
    var { y: __marko_internal_hoist__y } = Marko._.readScope(
      __marko_internal_rendered_2,
    );
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
