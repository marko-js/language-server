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
    import("./components/test-tag/index.marko"),
  );
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1)()()({
    ["items" /*@item*/]: {
      x: 1,
      [/*@item*/ Symbol.iterator]: Marko._.any,
    },
  });
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("./components/test-tag/index.marko"),
  );
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_2)()()({
    ["items" /*@item*/]: Marko._.attrTagFor(
      __marko_internal_tag_2,
      "items",
    )([
      {
        x: 1,
        [Marko._.contentFor(__marko_internal_tag_2) /*@item*/]: (() => {
          return () => {
            return Marko._.voidReturn;
          };
        })(),
        [/*@item*/ Symbol.iterator]: Marko._.any,
      },
      {
        [Marko._.contentFor(__marko_internal_tag_2) /*@item*/]: (() => {
          return () => {
            return Marko._.voidReturn;
          };
        })(),
        [/*@item*/ Symbol.iterator]: Marko._.any,
      },
    ]),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
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
