import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
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
    Marko._.renderNativeTag("div")({
      /*div*/
      /*div*/
      ["renderBody"]: Marko._.inlineBody(
        (() => {
          Marko._.assertRendered(
            Marko._.rendered,
            2,
            Marko._.renderTemplate(import("../../components/let/index.marko"))({
              /*let*/
              value: 1,
            })
          );
          const { value: x } = Marko._.rendered.returns[2];
          x;
          Marko._.assertRendered(
            Marko._.rendered,
            3,
            Marko._.renderNativeTag("button")({
              /*button*/
              onClick() {
                __marko_internal_return.mutate.x = 2;
                __marko_internal_return.mutate.x++;
                ++__marko_internal_return.mutate.x;
              },
            })
          );
          const { value: el } = Marko._.rendered.returns[3];
          const __marko_internal_return = {
            mutate: Marko._.mutable([
              ["x", "value", Marko._.rendered.returns[2]],
            ] as const),
          };
          Marko._.noop({ x });
          return {
            scope: { x, el },
          };
        })()
      ),
    })
  );
  Marko._.renderDynamicTag(effect)({
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

  _<__marko_internal_input = unknown>(
    input: Marko._.Relate<Input, __marko_internal_input>
  ): Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
