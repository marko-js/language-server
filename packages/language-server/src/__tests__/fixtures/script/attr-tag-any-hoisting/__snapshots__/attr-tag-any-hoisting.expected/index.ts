export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const Foo = Marko._.hoist(() => __marko_internal_hoist__Foo);
  const nested = Marko._.hoist(() => __marko_internal_hoist__nested);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/define.d.marko"),
  );
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1 /*define*/,
  )()()({
    [Marko._.contentFor(__marko_internal_tag_1) /*define*/]: (input: any) => {
      const __marko_internal_tag_2 = input.section;
      Marko._.renderDynamicTag(__marko_internal_tag_2 /*input.section*/)()()({
        /*input.section*/
      });
      return Marko._.voidReturn;
    },
  });
  {
    const Foo = __marko_internal_rendered_1.return.value;
    const __marko_internal_tag_3 = Foo;
    Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
      input["@section"];
      input["@section"];
    });
    const __marko_internal_rendered_3 = Marko._.renderDynamicTag(
      __marko_internal_tag_3 /*Foo*/,
    )()()({
      ["section" /*@section*/]: Marko._.attrTagFor(
        __marko_internal_tag_3,
        "section",
      )(
        "section",
        {
          ["section" /*@section*/]: {
            [Marko._.contentFor(__marko_internal_tag_3) /*@section*/]: (() => {
              const __marko_internal_tag_4 = Marko._.resolveTemplate(
                import("@marko/runtime-tags/tags/const.d.marko"),
              );
              const __marko_internal_rendered_4 = Marko._.renderTemplate(
                __marko_internal_tag_4 /*const*/,
              )()()({
                value: () => 1,
              });
              {
                const nested = __marko_internal_rendered_4.return.value;
                return () => {
                  return new (class MarkoReturn<Return = void> {
                    [Marko._.scope] = { nested };
                    declare return: Return;
                    constructor(_?: Return) {}
                  })();
                };
              }
            })(),
            [/*@section*/ Symbol.iterator]: Marko._.any,
          },
        },
        {
          ["section" /*@section*/]: {
            [Marko._.contentFor(__marko_internal_tag_3) /*@section*/]: (() => {
              return () => {
                return Marko._.voidReturn;
              };
            })(),
            [/*@section*/ Symbol.iterator]: Marko._.any,
          },
        },
      ),
    });
    const __marko_internal_tag_5 = Marko._.resolveTemplate(
      import("marko/src/core-tags/core/script.d.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_5 /*script*/)()()({
      async value() {
        nested;
        // ^?
      },
      /*script*/
    });
    var __marko_internal_hoist__Foo = Foo;
    var { nested: __marko_internal_hoist__nested } = Marko._.readScope(
      __marko_internal_rendered_3,
    );
  }
  Marko._.noop({ Foo, nested, input, $global, $signal });
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
