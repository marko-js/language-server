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
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderDynamicTag(custom)()()({
      ...{
        [Marko._.never]() {
          const attrTags = Marko._.attrTagNames(this);
          attrTags["@b"];
          attrTags["@b"];
          attrTags["@a"];
        },
      },
      ["b" /*@b*/]: [
        {
          [Symbol.iterator]: Marko._.any,
          /*@b*/
        },
        {
          c: 2,
          [Symbol.iterator]: Marko._.any,
        },
      ],
      ["a" /*@a*/]: {
        b: 1,
        ["renderBody" /*@a*/]: (() => {
          Marko._.assertRendered(
            Marko._.rendered,
            2,
            Marko._.renderTemplate(
              import("../../components/const/index.marko")
            )()()({
              value: 1 as const,
            })
          );
          const hoistedFromStaticMember = Marko._.rendered.returns[2].value;
          return () => {
            return new (class MarkoReturn<Return = void> {
              [Marko._.scope] = { hoistedFromStaticMember };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        })(),
        [Symbol.iterator]: Marko._.any,
      },
    })
  );
  Marko._.renderDynamicTag(effect)()()({
    value() {
      hoistedFromStaticMember;
    },
  });
  const { hoistedFromStaticMember } = Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ hoistedFromStaticMember });
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
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
