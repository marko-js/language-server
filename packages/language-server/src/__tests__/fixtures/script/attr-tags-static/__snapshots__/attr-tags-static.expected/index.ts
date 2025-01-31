export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
  const __marko_internal_tag_1 = custom;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@b"];
    input["@b"];
    input["@a"];
  });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderDynamicTag(__marko_internal_tag_1)()()({
      ["b" /*@b*/]: Marko._.attrTagFor(
        __marko_internal_tag_1,
        "b",
      )([
        {
          [/*@b*/ Symbol.iterator]: Marko._.any,
          /*@b*/
        },
        {
          c: 2,
          [/*@b*/ Symbol.iterator]: Marko._.any,
        },
      ]),
      ["a" /*@a*/]: {
        b: 1,
        ["renderBody" /*@a*/]: (() => {
          const __marko_internal_tag_2 = Marko._.resolveTemplate(
            import("../../../components/const/index.marko"),
          );
          Marko._.assertRendered(
            Marko._.rendered,
            2,
            Marko._.renderTemplate(__marko_internal_tag_2)()()({
              value: 1 as const,
            }),
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
        [/*@a*/ Symbol.iterator]: Marko._.any,
      },
    }),
  );
  const __marko_internal_tag_3 = Marko._.interpolated`effect`;
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
    value() {
      hoistedFromStaticMember;
      //^?
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
    },
  ): Marko.Out<Component>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component>) => void,
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  api: "class";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
