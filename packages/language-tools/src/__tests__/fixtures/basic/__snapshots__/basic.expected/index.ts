export interface Input<T extends string> {
  name: T;
}
abstract class Component<T extends string> extends Marko.Component<Input<T>> {}
export { type Component };
(function <T extends string>(this: void) {
  const input = Marko._.any as Input<T>;
  const component = Marko._.any as Component<T>;
  const state = Marko._.state(component);
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context)
  );
  const out = Marko._.out;
  Marko._.noop({ input, component, state, out, $global });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderNativeTag("div")()()({
      ["renderBody" /*div*/]: (() => {
        Marko._.assertRendered(
          Marko._.rendered,
          2,
          Marko._.renderTemplate(
            import("../../components/let/index.marko")
          )()()({
            value: 1,
          })
        );
        const x = Marko._.rendered.returns[2].value;
        new Thing();
        x;
        input.name;
        return () => {
          return new (class MarkoReturn<Return = void> {
            [Marko._.scope] = { x };
            declare return: Return;
            constructor(_?: Return) {}
          })();
        };
      })(),
    })
  );
  x;
  const { x } = Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ x });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render<T extends string>(
    input: Marko.TemplateInput<Input<T>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component<T>>;

  renderSync<T extends string>(
    input: Marko.TemplateInput<Input<T>>
  ): Marko.RenderResult<Component<T>>;

  renderToString<T extends string>(
    input: Marko.TemplateInput<Input<T>>
  ): string;

  stream<T extends string>(
    input: Marko.TemplateInput<Input<T>>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<__marko_internal_apply = 1>(): __marko_internal_apply extends 0
    ? <T extends string>() => <__marko_internal_input extends unknown>(
        input: Input<T> & Marko._.Relate<__marko_internal_input, Input<T>>
      ) => Marko._.ReturnWithScope<__marko_internal_input, void>
    : () => <__marko_internal_input extends unknown, T extends string>(
        input: Input<T> & Marko._.Relate<__marko_internal_input, Input<T>>
      ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
