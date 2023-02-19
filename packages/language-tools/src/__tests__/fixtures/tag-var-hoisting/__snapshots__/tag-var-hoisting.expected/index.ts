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
    Marko._.renderNativeTag("div")()()({
      ["renderBody" /*div*/]: (() => {
        Marko._.assertRendered(
          Marko._.rendered,
          2,
          Marko._.renderTemplate(
            import("../../components/let/index.marko")
          )()()({
            value: {
              a: 1,
              b: "hello!",
              c: undefined,
              nested: {
                d: 2,
                dChange(v: number) {},
              },
              "some-alias": 3,
              computed: 4,
              other: true,
            } as const,
          })
        );
        const {
          a,
          b,
          c = "default" as const,
          nested: { d },
          "some-alias": e,
          ["computed"]: f,
          ...g
        } = Marko._.rendered.returns[2].value;
        Marko._.assertRendered(
          Marko._.rendered,
          3,
          Marko._.renderTemplate(
            import("../../components/let/index.marko")
          )()()({
            value: [1, 2, 3, 4, 5] as const,
          })
        );
        const [h, i, , ...j] = Marko._.rendered.returns[3].value;
        return () => {
          return new (class MarkoReturn<Return = void> {
            [Marko._.scope] = { a, b, c, d, e, f, g, h, i, j };
            declare return: Return;
            constructor(_?: Return) {}
          })();
        };
      })(),
    })
  );
  () => {
    a;
    b;
    c;
    d;
    e;
    f;
    g;
    h;
    i;
    j;
  };
  const { a, b, c, d, e, f, g, h, i, j } = Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ a, b, c, d, e, f, g, h, i, j });
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

  _(): () => <__marko_internal_input>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
