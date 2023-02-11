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
    Marko._.renderTemplate(import("./components/test-tag.marko"))({
      /*test-tag*/
      data: 1 as const,
      /*test-tag*/
      ["renderBody"]: Marko._.body(function* <A>(data: A) {
        const __marko_internal_return = {
          return: Marko._.returnTag({
            /*return*/
            value: { result: data },
          }),
        };
        return __marko_internal_return.return;
      }),
    })
  );
  const result = Marko._.rendered.returns[1].value;
  result;
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

  _<__marko_internal_input = unknown>(
    input: Marko._.Relate<Input, __marko_internal_input>
  ): Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
