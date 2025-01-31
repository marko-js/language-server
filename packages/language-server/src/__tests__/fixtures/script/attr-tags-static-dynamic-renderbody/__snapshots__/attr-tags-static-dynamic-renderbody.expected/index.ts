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
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("../../../components/let/index.marko"),
  );
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(__marko_internal_tag_1)()()({
      value: false,
    }),
  );
  const someCondition = Marko._.rendered.returns[1].value;
  const __marko_internal_tag_2 = custom;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@header"];
    input["@footer"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
    ...Marko._.mergeAttrTags(
      {
        ["header" /*@header*/]: {
          ["renderBody" /*@header*/]: (() => {
            return () => {
              return Marko._.voidReturn;
            };
          })(),
          [/*@header*/ Symbol.iterator]: Marko._.any,
        },
      },
      someCondition
        ? {
            //^?
            ["footer" /*@footer*/]: {
              ["renderBody" /*@footer*/]: (() => {
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [/*@footer*/ Symbol.iterator]: Marko._.any,
            },
          }
        : {},
    ),
    ["renderBody" /*custom*/]: (() => {
      Marko._.forOfTag(
        {
          /*for*/ of: [1],
        },
        (x) => {
          x;
          return Marko._.voidReturn;
        },
      );
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
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
//               ^?
