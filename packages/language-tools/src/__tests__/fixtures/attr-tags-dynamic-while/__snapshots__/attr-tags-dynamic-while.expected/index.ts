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
  let i = 0;
  Marko._.renderDynamicTag(custom)()()({
    ...Marko._.mergeAttrTags(
      ++i < 10
        ? [
            {
              [Marko._.never]() {
                const attrTags = Marko._.attrTagNames(this);
                attrTags["@a"];
              },
              ["a" /*@a*/]: {
                ["renderBody" /*@a*/]: (() => {
                  i;
                  return () => {
                    return Marko._.voidReturn;
                  };
                })(),
              },
            },
          ]
        : []
    ),
  });
  let done = false;
  i = 0;
  Marko._.renderDynamicTag(custom)()()({
    ...Marko._.mergeAttrTags(
      !done
        ? [
            {
              [Marko._.never]() {
                const attrTags = Marko._.attrTagNames(this);
                attrTags["@a"];
              },
              ["a" /*@a*/]: {
                ["renderBody" /*@a*/]: (() => {
                  done;
                  if (++i === 5) {
                    done = true;
                  }
                  return () => {
                    return Marko._.voidReturn;
                  };
                })(),
              },
            },
          ]
        : []
    ),
  });
  Marko._.renderDynamicTag(custom)()()({
    ...Marko._.mergeAttrTags(
      undefined
        ? [
            {
              [Marko._.never]() {
                const attrTags = Marko._.attrTagNames(this);
                attrTags["@a"];
              },
              ["a" /*@a*/]: {
                ["renderBody" /*@a*/]: (() => {
                  return () => {
                    return Marko._.voidReturn;
                  };
                })(),
              },
            },
          ]
        : []
    ),
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

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _(): () => <__marko_internal_input extends unknown>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
