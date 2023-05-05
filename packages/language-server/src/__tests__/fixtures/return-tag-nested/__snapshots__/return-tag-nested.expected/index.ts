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
    ["renderBody" /*test-tag*/]: (a) => {
      a;
      return Marko._.voidReturn;
    },
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    ["renderBody" /*test-tag*/]: (a) => {
      const __marko_internal_return = {
        return: Marko._.returnTag({
          value: a,
        }),
      };
      return new (class MarkoReturn<Return = void> {
        declare return: Return;
        constructor(_?: Return) {}
      })(__marko_internal_return.return);
    },
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    ["renderBody" /*test-tag*/]: (() => {
      const __marko_internal_return = {
        return: Marko._.returnTag({
          value: "b" as const,
        }),
      };
      return () => {
        return new (class MarkoReturn<Return = void> {
          declare return: Return;
          constructor(_?: Return) {}
        })(__marko_internal_return.return);
      };
    })(),
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    ["renderBody" /*test-tag*/]: (() => {
      const __marko_internal_return = {
        return: Marko._.returnTag({
          value: "c" as const,
        }),
      };
      return () => {
        return new (class MarkoReturn<Return = void> {
          declare return: Return;
          constructor(_?: Return) {}
        })(__marko_internal_return.return);
      };
    })(),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
      ["renderBody" /*test-tag*/]: (() => {
        Marko._.assertRendered(
          Marko._.rendered,
          2,
          Marko._.renderTemplate(
            import("../../components/let/index.marko")
          )()()({
            value: 1 as const,
          })
        );
        const hoisted = Marko._.rendered.returns[2].value;
        const __marko_internal_return = {
          return: Marko._.returnTag({
            value: "b" as const,
          }),
        };
        return () => {
          return new (class MarkoReturn<Return = void> {
            [Marko._.scope] = { hoisted };
            declare return: Return;
            constructor(_?: Return) {}
          })(__marko_internal_return.return);
        };
      })(),
    })
  );
  () => {
    hoisted;
  };
  const { hoisted } = Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ hoisted });
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
