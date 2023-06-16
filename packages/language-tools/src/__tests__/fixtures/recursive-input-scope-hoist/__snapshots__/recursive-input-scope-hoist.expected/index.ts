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
    Marko._.renderPreferLocal(
      // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
      (Marko._.error, comments),
      Marko._.renderTemplate(import("./components/comments.marko"))
    )()()({
      ...{
        [Marko._.never]() {
          const attrTags = Marko._.attrTagNames(this);
          attrTags["@comment"];
          attrTags["@comment"];
        },
      },
      ["comment" /*@comment*/]: [
        {
          id: Marko._.interpolated`a`,
          ...{
            [Marko._.never]() {
              const attrTags = Marko._.attrTagNames(this);
              attrTags["@comment"];
            },
          },
          ["comment" /*@comment*/]: {
            id: Marko._.interpolated`b`,
            ["renderBody" /*@comment*/]: (() => {
              Marko._.assertRendered(
                Marko._.rendered,
                2,
                Marko._.renderTemplate(
                  import("../../components/let/index.marko")
                )()()({
                  value: "b" as const,
                })
              );
              const b = Marko._.rendered.returns[2].value;
              return () => {
                return new (class MarkoReturn<Return = void> {
                  [Marko._.scope] = { b };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              };
            })(),
            [Symbol.iterator]: Marko._.any,
          },
          ["renderBody" /*@comment*/]: (() => {
            Marko._.assertRendered(
              Marko._.rendered,
              3,
              Marko._.renderTemplate(
                import("../../components/let/index.marko")
              )()()({
                value: "a" as const,
              })
            );
            const a = Marko._.rendered.returns[3].value;
            return () => {
              return new (class MarkoReturn<Return = void> {
                [Marko._.scope] = { a };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            };
          })(),
          [Symbol.iterator]: Marko._.any,
        },
        {
          ["renderBody" /*@comment*/]: (() => {
            Marko._.assertRendered(
              Marko._.rendered,
              4,
              Marko._.renderTemplate(
                import("../../components/let/index.marko")
              )()()({
                value: "c" as const,
              })
            );
            const c = Marko._.rendered.returns[4].value;
            return () => {
              return new (class MarkoReturn<Return = void> {
                [Marko._.scope] = { c };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            };
          })(),
          [Symbol.iterator]: Marko._.any,
        },
      ],
    })
  );
  Marko._.renderDynamicTag(effect)()()({
    value() {
      a;
      b;
      c;
    },
  });
  const { b, a, c } = Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ b, a, c });
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
