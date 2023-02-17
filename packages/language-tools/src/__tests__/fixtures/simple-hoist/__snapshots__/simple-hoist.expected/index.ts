export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderNativeTag("div")()()({
      /*div*/
      /*div*/
      ["renderBody"]: (() => {
        Marko._.assertRendered(
          Marko._.rendered,
          2,
          Marko._.renderTemplate(
            import("../../components/let/index.marko")
          )()()({
            /*let*/
            value: 1,
          })
        );
        const x = Marko._.rendered.returns[2].value;
        x;
        Marko._.assertRendered(
          Marko._.rendered,
          3,
          Marko._.renderNativeTag("button")()()({
            /*button*/
            onClick() {
              __marko_internal_return.mutate.x = 2;
              __marko_internal_return.mutate.x++;
              ++__marko_internal_return.mutate.x;
            },
          })
        );
        const el = Marko._.rendered.returns[3].value;
        const __marko_internal_return = {
          mutate: Marko._.mutable([
            ["x", "value", Marko._.rendered.returns[2]],
          ] as const),
        };
        Marko._.noop({ x });
        return () => {
          return new (class MarkoReturn<Return = void> {
            [Marko._.scope] = { x, el };
            declare return: Return;
            constructor(_?: Return) {}
          })();
        };
      })(),
    })
  );
  Marko._.renderDynamicTag(effect)()()({
    /*effect*/
    value() {
      console.log(el());
    },
  });
  x;
  const { x, el } = Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ x, el });
  return;
}
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _(): () => <__marko_internal_input>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
