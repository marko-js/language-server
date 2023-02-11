export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  Marko._.renderTemplate(import("./components/test-tag.marko"))({
    /*test-tag*/
    /*test-tag*/
    ["renderBody"]: Marko._.body(function* (a) {
      a;
      return;
    }),
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))({
    /*test-tag*/
    /*test-tag*/
    ["renderBody"]: Marko._.body(function* (a) {
      const __marko_internal_return = {
        return: Marko._.returnTag({
          /*return*/
          value: a,
        }),
      };
      return __marko_internal_return.return;
    }),
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))({
    /*test-tag*/
    /*test-tag*/
    ["renderBody"]: Marko._.inlineBody(
      (() => {
        const __marko_internal_return = {
          return: Marko._.returnTag({
            /*return*/
            value: "b" as const,
          }),
        };
        return {
          return: __marko_internal_return.return,
        };
      })()
    ),
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))({
    /*test-tag*/
    /*test-tag*/
    ["renderBody"]: Marko._.inlineBody(
      (() => {
        const __marko_internal_return = {
          return: Marko._.returnTag({
            /*return*/
            value: "c" as const,
          }),
        };
        return {
          return: __marko_internal_return.return,
        };
      })()
    ),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(import("./components/test-tag.marko"))({
      /*test-tag*/
      /*test-tag*/
      ["renderBody"]: Marko._.inlineBody(
        (() => {
          Marko._.assertRendered(
            Marko._.rendered,
            2,
            Marko._.renderTemplate(import("../../components/let/index.marko"))({
              /*let*/
              value: 1 as const,
            })
          );
          const hoisted = Marko._.rendered.returns[2].value;
          const __marko_internal_return = {
            return: Marko._.returnTag({
              /*return*/
              value: "b" as const,
            }),
          };
          return {
            scope: { hoisted },
            return: __marko_internal_return.return,
          };
        })()
      ),
    })
  );
  () => {
    hoisted;
  };
  const { hoisted } = Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ hoisted });
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
