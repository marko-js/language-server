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
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./components/comments.marko"),
  );
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@comment"];
    input["@comment"];
    Marko._.nestedAttrTagNames(input["@comment"], (input) => {
      input["@comment"];
    });
  });
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1,
  )()()({
    ["comment" /*@comment*/]: Marko._.attrTagFor(
      __marko_internal_tag_1,
      "comment",
    )([
      {
        id: Marko._.interpolated`a`,
        ["comment" /*@comment*/]: {
          id: Marko._.interpolated`b`,
          ["renderBody" /*@comment*/]: (() => {
            const __marko_internal_tag_2 = Marko._.resolveTemplate(
              import("../../../components/let/index.marko"),
            );
            const __marko_internal_rendered_2 = Marko._.renderTemplate(
              __marko_internal_tag_2,
            )()()(
              //    ^?
              {
                value: "b" as const,
              },
            );
            const b = __marko_internal_rendered_2.return.value;
            return () => {
              return new (class MarkoReturn<Return = void> {
                [Marko._.scope] = { b };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            };
          })(),
          [/*@comment*/ Symbol.iterator]: Marko._.any,
        },
        ["renderBody" /*@comment*/]: (() => {
          const __marko_internal_tag_3 = Marko._.resolveTemplate(
            import("../../../components/let/index.marko"),
          );
          const __marko_internal_rendered_3 = Marko._.renderTemplate(
            __marko_internal_tag_3,
          )()()({
            value: "a" as const,
          });
          const a = __marko_internal_rendered_3.return.value;
          return () => {
            return new (class MarkoReturn<Return = void> {
              [Marko._.scope] = { a };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        })(),
        [/*@comment*/ Symbol.iterator]: Marko._.any,
      },
      {
        id: Marko._.interpolated`c`,
        ["renderBody" /*@comment*/]: (() => {
          const __marko_internal_tag_4 = Marko._.resolveTemplate(
            import("../../../components/let/index.marko"),
          );
          const __marko_internal_rendered_4 = Marko._.renderTemplate(
            __marko_internal_tag_4,
          )()()({
            value: "c" as const,
          });
          const c = __marko_internal_rendered_4.return.value;
          return () => {
            return new (class MarkoReturn<Return = void> {
              [Marko._.scope] = { c };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        })(),
        [/*@comment*/ Symbol.iterator]: Marko._.any,
      },
    ]),
  });
  const __marko_internal_tag_5 = Marko._.interpolated`effect`;
  Marko._.renderDynamicTag(__marko_internal_tag_5)()()({
    value() {
      a;
      //^?
      b;
      //^?
      c;
      //^?
    },
  });
  const { b, a, c } = __marko_internal_rendered_1.scope;
  Marko._.noop({ b, a, c, component, state, out, input, $global, $signal });
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

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "class";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
