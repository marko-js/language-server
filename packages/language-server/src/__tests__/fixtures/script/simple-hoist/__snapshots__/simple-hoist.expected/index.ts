export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderNativeTag("div")()()({
      ["renderBody" /*div*/]: (() => {
        const __marko_internal_tag_1 = Marko._.resolveTemplate(
          import("../../../components/let/index.marko"),
        );
        Marko._.assertRendered(
          Marko._.rendered,
          2,
          Marko._.renderTemplate(__marko_internal_tag_1)()()({
            value: 1,
          }),
        );
        const x = Marko._.rendered.returns[2].value;
        x;
        Marko._.assertRendered(
          Marko._.rendered,
          3,
          Marko._.renderNativeTag("button")()()({
            onClick() {
              __marko_internal_return.mutate.x = 2;
              __marko_internal_return.mutate.x++;
              ++__marko_internal_return.mutate.x;
            },
            ["renderBody" /*button*/]: (() => {
              return () => {
                return Marko._.voidReturn;
              };
            })(),
          }),
        );
        const el = Marko._.rendered.returns[3].value;
        const __marko_internal_return = {
          mutate: Marko._.mutable([
            ["x", "value", Marko._.rendered.returns[2]],
          ] as const),
        };
        Marko._.noop({
          x,
        });
        return () => {
          return new (class MarkoReturn<Return = void> {
            [Marko._.scope] = { x, el };
            declare return: Return;
            constructor(_?: Return) {}
          })();
        };
      })(),
    }),
  );
  const __marko_internal_tag_2 = Marko._.interpolated`effect`;
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
    value() {
      console.log(el());
      //            ^?
    },
  });
  x;
  const { x, el } = Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ x, el });
  return;
})();
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

  api: "class";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
//   ^?
