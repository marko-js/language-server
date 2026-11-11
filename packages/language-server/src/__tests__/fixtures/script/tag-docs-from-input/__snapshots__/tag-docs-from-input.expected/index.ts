export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./components/fancy-button.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_1)()()({
    label: "Go",
  });
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("./components/plain-button.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_2)()()(
    // ^?   ^?
    {
      label: "Go",
    },
  );
  const __marko_internal_tag_3 = Marko._.resolveTemplate(
    import("./components/no-input.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_3)()()(
    //    ^?
    {},
  );
  const __marko_internal_tag_4 = Marko._.resolveTemplate(
    import("./components/generic-list.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_4)()()(
    //  ^?
    {
      items: [1, 2],
    },
  );
  const __marko_internal_tag_5 = Marko._.resolveTemplate(
    import("./components/dir-button/index.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_5)()()(
    //  ^?
    {},
  );
  const __marko_internal_tag_6 = Marko._.fallbackTemplate(
    // @ts-ignore
    ShinyButton,
    Marko._.resolveTemplate(import("./components/ShinyButton.marko")).default,
  );
  Marko._.renderDynamicTag(__marko_internal_tag_6)()()(
    //  ^?
    {},
  );
  const __marko_internal_tag_7 = Marko._.resolveTemplate(
    import("./components/class-counter.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_7)()()(
    //  ^?
    {
      start: 1,
    },
  );
  const __marko_internal_tag_8 = Marko._.resolveTemplate(
    import("./tags/tags-counter.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_8)()()(
    //  ^?
    {
      start: 1,
    },
  );
  const __marko_internal_tag_9 = Marko._.resolveTemplate(
    import("./lib/button-impl.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_9)()()(
    //  ^?
    {},
  );
  const __marko_internal_tag_10 = Marko._.resolveTemplate(
    import("./lib/typed-button.d.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_10)()()(
    //  ^?
    {
      label: "Go",
    },
  );
  const __marko_internal_tag_11 = Marko._.resolveTemplate(
    import("./components/split-button/index.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_11)()()(
    //  ^?
    {
      label: "Go",
    },
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<Component>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component>) => void,
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

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
//  ^?
