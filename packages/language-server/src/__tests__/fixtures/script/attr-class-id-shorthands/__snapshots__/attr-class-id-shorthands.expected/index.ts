export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const value = Marko._.hoist(() => __marko_internal_hoist__value);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/const.d.marko"),
  );
  {
    const value = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1 /*const*/,
    )()()({
      value: "hi",
    });
    Marko._.renderNativeTag("div")()()({
      id: Marko._.interpolated`test`,
    });
    Marko._.renderNativeTag("div")()()({
      id: Marko._.interpolated`test-${value}`,
    });
    Marko._.renderNativeTag("div")()()({
      id: Marko._.interpolated`${value}-test`,
    });
    Marko._.renderNativeTag("div")()()({
      id: Marko._.interpolated`${value}-test-${value}`,
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.interpolated`test`,
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.interpolated`hello world`,
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.interpolated`test-${value}`,
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.interpolated`${value}-test`,
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.interpolated`${value}-test-${value}`,
    });
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_2 /*test-tag*/)()()({
      id: Marko._.interpolated`test`,
    });
    const __marko_internal_tag_3 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_3 /*test-tag*/)()()({
      id: Marko._.interpolated`test-${value}`,
    });
    const __marko_internal_tag_4 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_4 /*test-tag*/)()()({
      id: Marko._.interpolated`${value}-test`,
    });
    const __marko_internal_tag_5 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_5 /*test-tag*/)()()({
      id: Marko._.interpolated`${value}-test-${value}`,
    });
    const __marko_internal_tag_6 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_6 /*test-tag*/)()()({
      class: Marko._.interpolated`test`,
    });
    const __marko_internal_tag_7 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_7 /*test-tag*/)()()({
      class: Marko._.interpolated`hello world`,
    });
    const __marko_internal_tag_8 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_8 /*test-tag*/)()()({
      class: Marko._.interpolated`test-${value}`,
    });
    const __marko_internal_tag_9 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_9 /*test-tag*/)()()({
      class: Marko._.interpolated`${value}-test`,
    });
    const __marko_internal_tag_10 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_10 /*test-tag*/)()()({
      class: Marko._.interpolated`${value}-test-${value}`,
    });
    var __marko_internal_hoist__value = value;
  }
  Marko._.noop({ value, input, $global, $signal });
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
