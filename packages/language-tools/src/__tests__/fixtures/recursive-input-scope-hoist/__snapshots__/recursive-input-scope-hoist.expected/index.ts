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
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
