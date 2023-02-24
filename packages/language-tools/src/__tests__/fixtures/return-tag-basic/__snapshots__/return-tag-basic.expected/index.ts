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
    Marko._.renderTemplate(import("../../components/let/index.marko"))()()({
      value: 1,
    })
  );
  const value = Marko._.rendered.returns[1].value;
  Marko._.renderNativeTag("button")()()({
    onClick() {
      __marko_internal_return.mutate.value++;
    },
  });
  const __marko_internal_return = {
    return: Marko._.returnTag({
      value: value,
    }),
    mutate: Marko._.mutable([["value", Marko._.rendered.returns[1]]] as const),
  };
  Marko._.noop({
    value,
  });
  return __marko_internal_return.return;
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

  _(): () => <__marko_internal_input extends unknown>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<
    __marko_internal_input,
    typeof __marko_internal_template extends () => infer Return ? Return : never
  >;
}> {})();
