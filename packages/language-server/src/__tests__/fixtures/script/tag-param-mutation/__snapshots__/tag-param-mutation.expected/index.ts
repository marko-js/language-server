export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const string = Marko._.hoist(() => __marko_internal_hoist__string);
  const inputId = Marko._.hoist(() => __marko_internal_hoist__inputId);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  );
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1,
  )()()({
    value: "bar",
  });
  {
    const string = __marko_internal_rendered_1.return.value;
    const __marko_internal_change__string = Marko._.change(
      "string",
      "value",
      __marko_internal_rendered_1.return,
    );
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_2)()()({
      //  ^?
      [Marko._.contentFor(__marko_internal_tag_2) /*test-tag*/]: (val) => {
        Marko._.renderNativeTag("button")()()({
          onClick() {
            __marko_internal_change__string.string = val;
          },
          [Marko._.content /*button*/]: (() => {
            //   ^?      ^?
            val;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        });
        return Marko._.voidReturn;
      },
    });
    const __marko_internal_rendered_3 = Marko._.forOfTag(
      {
        /*for*/ of: [],
      },
      (_unused) => {
        const __marko_internal_tag_4 = Marko._.resolveTemplate(
          import("@marko/runtime-tags/tags/let.d.marko"),
        );
        const __marko_internal_rendered_4 = Marko._.renderTemplate(
          __marko_internal_tag_4,
        )()()({
          value: "",
        });
        {
          const inputId = __marko_internal_rendered_4.return.value;
          Marko._.renderNativeTag("input")()()({
            id: inputId,
          });
          return new (class MarkoReturn<Return = void> {
            [Marko._.scope] = { inputId };
            declare return: Return;
            constructor(_?: Return) {}
          })();
        }
      },
    );
    Marko._.renderNativeTag("button")()()({
      onClick() {
        inputId;
        // ^?
      },
      [Marko._.content /*button*/]: (() => {
        return () => {
          return Marko._.voidReturn;
        };
      })(),
    });
    var __marko_internal_hoist__string = string;
    var { inputId: __marko_internal_hoist__inputId } = Marko._.readScope(
      __marko_internal_rendered_3,
    );
  }
  Marko._.noop({ string, inputId, input, $global, $signal });
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
