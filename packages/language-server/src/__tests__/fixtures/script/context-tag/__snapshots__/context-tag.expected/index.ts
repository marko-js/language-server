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
    import("./components/theme-provider.marko"),
  );
  Marko._.renderTemplate(__marko_internal_tag_1)()()({
    start: "light",
    [Marko._.contentFor(__marko_internal_tag_1)]: (() => {
      const __marko_internal_tag_2 = Marko._.resolveTemplate(
        import("./components/show-theme.marko"),
      );
      Marko._.renderTemplate(__marko_internal_tag_2)()()({});
      const __marko_internal_tag_3 = Marko._.resolveTemplate(
        import("./components/show-theme-relative.marko"),
      );
      Marko._.renderTemplate(__marko_internal_tag_3)()()({});
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  const __marko_internal_tag_4 = Marko._.resolveTemplate(
    import("./components/mode-provider.marko"),
  );
  Marko._.renderTemplate(__marko_internal_tag_4)()()({
    [Marko._.contentFor(__marko_internal_tag_4)]: (() => {
      const __marko_internal_tag_5 = Marko._.resolveTemplate(
        import("./components/show-mode.marko"),
      );
      Marko._.renderTemplate(__marko_internal_tag_5)()()({});
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  const __marko_internal_tag_6 = Marko._.resolveTemplate(
    import("./components/labeled-region.marko"),
  );
  Marko._.renderTemplate(__marko_internal_tag_6)()()({
    label: "outer",
    [Marko._.contentFor(__marko_internal_tag_6)]: (() => {
      const __marko_internal_tag_7 = Marko._.resolveTemplate(
        import("./components/labeled-region.marko"),
      );
      Marko._.renderTemplate(__marko_internal_tag_7)()()({
        label: "inner",
      });
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
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
