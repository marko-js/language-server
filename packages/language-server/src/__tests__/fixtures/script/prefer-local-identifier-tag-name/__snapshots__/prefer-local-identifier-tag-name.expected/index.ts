import CustomTagA from "./components/TestTagA.marko";
import CustomTagB from "./components/TestTagB.marko";
export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const TestTagA = Marko._.hoist(() => __marko_internal_hoist__TestTagA);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/const.d.marko"),
  );
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1,
  )()()({
    value: CustomTagA,
  });
  {
    const TestTagA = __marko_internal_rendered_1.return.value;
    const __marko_internal_tag_2 = Marko._.fallbackTemplate(
      TestTagA,
      import("./components/TestTagA.marko"),
    );
    Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
      a: "hello",
    });
    const __marko_internal_tag_3 = Marko._.fallbackTemplate(
      TestTagB,
      import("./components/TestTagB.marko"),
    );
    Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
      b: "hello",
    });
    Marko._.renderNativeTag("div")()()({
      [Marko._.content /*div*/]: (() => {
        const __marko_internal_tag_4 = Marko._.resolveTemplate(
          import("@marko/runtime-tags/tags/const.d.marko"),
        );
        const __marko_internal_rendered_2 = Marko._.renderTemplate(
          __marko_internal_tag_4,
        )()()({
          value: CustomTagB,
        });
        {
          const TestTagA = __marko_internal_rendered_2.return.value;
          const __marko_internal_tag_5 = Marko._.fallbackTemplate(
            TestTagA,
            import("./components/TestTagA.marko"),
          );
          Marko._.renderDynamicTag(__marko_internal_tag_5)()()({
            a: "hello",
          });
          return () => {
            return Marko._.voidReturn;
          };
        }
      })(),
    });
    const __marko_internal_tag_6 = Marko._.fallbackTemplate(
      TestTagA,
      import("./components/TestTagA.marko"),
    );
    Marko._.renderDynamicTag(__marko_internal_tag_6)()()({
      a: "hello",
    });
    var __marko_internal_hoist__TestTagA = TestTagA;
  }
  Marko._.noop({ TestTagA, input, $global, $signal });
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
