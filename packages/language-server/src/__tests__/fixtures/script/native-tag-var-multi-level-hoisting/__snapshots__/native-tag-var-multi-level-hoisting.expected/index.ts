export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const searchInput = Marko._.hoist(() => __marko_internal_hoist__searchInput);
  const __marko_internal_rendered_1 = Marko._.renderNativeTag("div")()()({
    [Marko._.content /*div*/]: (() => {
      const __marko_internal_rendered_2 = Marko._.renderNativeTag("div")()()({
        onClick() {
          searchInput().focus();
          // ^?
        },
        [Marko._.content /*div*/]: (() => {
          Marko._.renderNativeTag("input")()()({
            type: "search",
          });
          {
            const searchInput = Marko._.el("input");
            return () => {
              return new (class MarkoReturn<Return = void> {
                [Marko._.scope] = { searchInput };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            };
          }
        })(),
      });
      return () => {
        return new (class MarkoReturn<Return = void> {
          [Marko._.scope] = Marko._.readScope(__marko_internal_rendered_2);
          declare return: Return;
          constructor(_?: Return) {}
        })();
      };
    })(),
  });
  var { searchInput: __marko_internal_hoist__searchInput } = Marko._.readScope(
    __marko_internal_rendered_1,
  );
  Marko._.noop({ searchInput, input, $global, $signal });
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
