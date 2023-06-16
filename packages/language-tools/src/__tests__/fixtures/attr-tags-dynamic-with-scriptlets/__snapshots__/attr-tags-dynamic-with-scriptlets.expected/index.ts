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
  let done = false;
  let i = 0;
  Marko._.renderDynamicTag(custom)()()({
    ...Marko._.mergeAttrTags(
      !done
        ? [
            (() => {
              i++;
              return {
                [Marko._.never]() {
                  const attrTags = Marko._.attrTagNames(this);
                  attrTags["@a"];
                },
                ["a" /*@a*/]: {
                  ["renderBody" /*@a*/]: (() => {
                    done;
                    if (i === 5) {
                      done = true;
                    }
                    return () => {
                      return Marko._.voidReturn;
                    };
                  })(),
                  [Symbol.iterator]: Marko._.any,
                },
              };
            })(),
          ]
        : []
    ),
  });
  Marko._.renderDynamicTag(custom)()()({
    ...Marko._.forAttrTag(
      {
        from: 1,
        to: 10,
      },
      (index) =>
        (() => {
          const doubleIndex = index * 2;
          return {
            [Marko._.never]() {
              const attrTags = Marko._.attrTagNames(this);
              attrTags["@a"];
            },
            ["a" /*@a*/]: {
              ["renderBody" /*@a*/]: (() => {
                doubleIndex;
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          };
        })()
    ),
  });
  Marko._.renderDynamicTag(custom)()()({
    x: 1,
    ...(x
      ? (() => {
          const a = 1 as const;
          return {
            [Marko._.never]() {
              const attrTags = Marko._.attrTagNames(this);
              attrTags["@a"];
            },
            ["a" /*@a*/]: {
              a: a,
              [Symbol.iterator]: Marko._.any,
            },
          };
        })()
      : (() => {
          const b = 2 as const;
          return {
            [Marko._.never]() {
              const attrTags = Marko._.attrTagNames(this);
              attrTags["@b"];
            },
            ["b" /*@b*/]: {
              b: b,
              [Symbol.iterator]: Marko._.any,
            },
          };
        })()),
  });
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
