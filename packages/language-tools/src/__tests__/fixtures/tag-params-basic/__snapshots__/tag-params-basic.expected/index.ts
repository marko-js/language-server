export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context)
  );
  const out = Marko._.out;
  Marko._.noop({ input, component, state, out, $global });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    ["renderBody" /*test-tag*/]: (a, b) => {
      a;
      b;
      return Marko._.voidReturn;
    },
  });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
      ["renderBody" /*test-tag*/]: (a) => {
        Marko._.assertRendered(
          Marko._.rendered,
          2,
          Marko._.renderTemplate(
            import("../../components/const/index.marko")
          )()()({
            value: a,
          })
        );
        const hoistedFromTestTag = Marko._.rendered.returns[2].value;
        return new (class MarkoReturn<Return = void> {
          [Marko._.scope] = { hoistedFromTestTag };
          declare return: Return;
          constructor(_?: Return) {}
        })();
      },
    })
  );
  () => {
    hoistedFromTestTag;
  };
  const { hoistedFromTestTag } = Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ hoistedFromTestTag });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component>) => void
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
