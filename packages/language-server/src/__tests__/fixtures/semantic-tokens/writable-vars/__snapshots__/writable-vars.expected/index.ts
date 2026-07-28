export interface Input {
  pair: { a: string; b: number };
}
const value = 1;
const doubled = value * 2;
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const mutable = Marko._.hoist(() => __marko_internal_hoist__mutable);
  const a = Marko._.hoist(() => __marko_internal_hoist__a);
  const b = Marko._.hoist(() => __marko_internal_hoist__b);
  const frozen = Marko._.hoist(() => __marko_internal_hoist__frozen);
  const typed = Marko._.hoist(() => __marko_internal_hoist__typed);
  const plain = Marko._.hoist(() => __marko_internal_hoist__plain);
  const value = Marko._.hoist(() => __marko_internal_hoist__value);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  );
  {
    const mutable = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      value: 2,
    });
    const __marko_internal_change__mutable = Marko._.change(
      "mutable",
      "value",
      __marko_internal_rendered_1.return,
    );
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("@marko/runtime-tags/tags/let.d.marko"),
    );
    {
      const { a, b } = Marko._.returned(() => __marko_internal_rendered_2);
      const __marko_internal_rendered_2 = Marko._.renderTemplate(
        __marko_internal_tag_2,
      )()()({
        value: input.pair,
      });
      const __marko_internal_change__a = Marko._.change(
        "a",
        __marko_internal_rendered_2.return.a,
      );
      const __marko_internal_tag_3 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/const.d.marko"),
      );
      {
        const frozen = Marko._.returned(() => __marko_internal_rendered_3);
        const __marko_internal_rendered_3 = Marko._.renderTemplate(
          __marko_internal_tag_3,
        )()()({
          value: 3,
        });
        const __marko_internal_tag_4 = Marko._.resolveTemplate(
          import("./components/my-input.marko"),
        );
        {
          const typed = Marko._.returned(() => __marko_internal_rendered_4);
          const __marko_internal_rendered_4 = Marko._.renderTemplate(
            __marko_internal_tag_4,
          )()()({
            value: "x",
          });
          const __marko_internal_change__typed = Marko._.change(
            "typed",
            "value",
            __marko_internal_rendered_4.return,
          );
          const __marko_internal_tag_5 = Marko._.resolveTemplate(
            import("./components/my-ro.marko"),
          );
          {
            const plain = Marko._.returned(() => __marko_internal_rendered_5);
            const __marko_internal_rendered_5 = Marko._.renderTemplate(
              __marko_internal_tag_5,
            )()()({
              value: "y",
            });
            Marko._.renderNativeTag("button")()()({
              onClick() {
                __marko_internal_change__mutable.mutable = mutable + 1;
                __marko_internal_change__typed.typed = "z";
                __marko_internal_change__a.a = "b";
              },
              [Marko._.content]: (() => {
                doubled;
                mutable;
                a;
                b;
                frozen;
                typed;
                plain;
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
            });
            const __marko_internal_rendered_6 = Marko._.forOfTag(
              {
                of: [1, 2],
              },
              (i) => {
                const __marko_internal_tag_7 = Marko._.resolveTemplate(
                  import("@marko/runtime-tags/tags/let.d.marko"),
                );
                {
                  const value = Marko._.returned(
                    () => __marko_internal_rendered_7,
                  );
                  const __marko_internal_rendered_7 = Marko._.renderTemplate(
                    __marko_internal_tag_7,
                  )()()({
                    value: i,
                  });
                  value;
                  return new (class MarkoReturn<Return = void> {
                    readonly [Marko._.scope] = { value };
                    declare return: Return;
                    constructor(_?: Return) {}
                  })();
                }
              },
            );
            var __marko_internal_hoist__mutable = mutable;
            var __marko_internal_hoist__a = a;
            var __marko_internal_hoist__b = b;
            var __marko_internal_hoist__frozen = frozen;
            var __marko_internal_hoist__typed = typed;
            var __marko_internal_hoist__plain = plain;
            var { value: __marko_internal_hoist__value } = Marko._.readScope(
              __marko_internal_rendered_6,
            );
          }
        }
      }
    }
  }
  Marko._.noop({
    mutable,
    a,
    b,
    frozen,
    typed,
    plain,
    value,
    input,
    $global,
    $signal,
  });
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
