export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const theme = Marko._.hoist(() => __marko_internal_hoist__theme);
  {
    const theme = Marko._.contextTag(() =>
      Marko._.renderTemplate(
        Marko._.resolveTemplate(import("./theme-provider.marko")),
      )()()(Marko._.any),
    );
    const __marko_internal_change__theme = Marko._.change("theme", {
      themeChange: (value = theme) => {},
    });
    Marko._.renderNativeTag("button")()()(
      //       ^?
      {
        onClick() {
          __marko_internal_change__theme.theme = "dark";
        },
        [Marko._.content]: (() => {
          theme;
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      },
    );
    var __marko_internal_hoist__theme = theme;
  }
  Marko._.noop({ theme, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
const ShowThemeRelative = new (class Template extends Marko._.Template<{
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
export default ShowThemeRelative;
