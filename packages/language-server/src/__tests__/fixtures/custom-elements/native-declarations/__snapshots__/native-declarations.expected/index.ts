import type { Input as BadgeInput } from "typed-badge/index.d.marko";
export interface Input {
  badge?: BadgeInput;
}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const badge = Marko._.hoist(() => __marko_internal_hoist__badge);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("typed-badge/index.d.marko"),
  );
  {
    const badge = Marko._.el("typed-badge");
    Marko._.renderTemplate(__marko_internal_tag_1)()()({
      label:
        "hello",
        //^?
      count: 1,
      //^?
      size: "small",
      //^?
      id: "badge",
      onClick() {
        badge().setAttribute("active", "");
      },
      [Marko._.contentFor(__marko_internal_tag_1)]: (() => {
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
    });
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("typed-badge/index.d.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_2)()()({
      count: "invalid",
      size: "medium",
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
