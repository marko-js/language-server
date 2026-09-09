export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const badge = Marko._.hoist(() => __marko_internal_hoist__badge);
  Marko._.renderNativeTag(
    "typed-badge",
    Marko._.any as {
      /** Badge label. */
      label?: string;
      count?: number;
      size?: "small" | "large";
      active?: boolean;
      model?: unknown;
      items?: unknown;
      weight?: -1 | 0 | 1;
      broken?: unknown;
    },
  )()()({});
  {
    const badge = Marko._.el("typed-badge");
    Marko._.renderNativeTag(
      "typed-badge",
      Marko._.any as {
        /** Badge label. */
        label?: string;
        count?: number;
        size?: "small" | "large";
        active?: boolean;
        model?: unknown;
        items?: unknown;
        weight?: -1 | 0 | 1;
        broken?: unknown;
      },
    )()()(
      // ^?
      {
        label:
          "hello",
          //^?
        count: 1,
        //^?
        size: "small",
        //^?
        id: "badge",
        active: true,
        weight: -1,
        model: { value: 1 },
        items: ["a"],
        broken: 1,
        "aria-label": "Badge",
        "data-testid": "badge",
        onClick() {
          badge().setAttribute("active", "");
        },
        [Marko._.content]: (() => {
          Marko._.renderNativeTag("span")()()({
            [Marko._.content]: (() => {
              return () => {
                return Marko._.voidReturn;
              };
            })(),
          });
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      },
    );
    Marko._.renderNativeTag(
      "typed-badge",
      Marko._.any as {
        /** Badge label. */
        label?: string;
        count?: number;
        size?: "small" | "large";
        active?: boolean;
        model?: unknown;
        items?: unknown;
        weight?: -1 | 0 | 1;
        broken?: unknown;
      },
    )()()({
      count: "invalid",
      size: "medium",
    });
    Marko._.renderNativeTag(
      "typed-badge",
      Marko._.any as {
        /** Badge label. */
        label?: string;
        count?: number;
        size?: "small" | "large";
        active?: boolean;
        model?: unknown;
        items?: unknown;
        weight?: -1 | 0 | 1;
        broken?: unknown;
      },
    )()()({
      active: "invalid",
      weight: 2,
      id: 1,
      onClick: 1,
    });
    var __marko_internal_hoist__badge = badge;
  }
  Marko._.noop({ badge, input, $global, $signal });
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
