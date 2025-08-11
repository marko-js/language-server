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
  let done = false;
  let i = 0;
  const __marko_internal_tag_1 = custom;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()({
    ...(!done
      ? (() => {
          //        ^?
          i++;
          return {
            //    ^?
            ["a" /*@a*/]: {
              ["renderBody" /*@a*/]: (() => {
                done;
                //      ^?
                if (i === 5) {
                  done = true;
                }
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [/*@a*/ Symbol.iterator]: Marko._.any,
            },
          };
        })()
      : {}),
  });
  const __marko_internal_tag_2 = custom;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
    ...Marko._.forToAttrTag(
      {
        /*for*/ from: 1,
        to: 10,
      },
      (index) =>
        (() => {
          const doubleIndex = index * 2;
          return {
            //          ^?
            ["a" /*@a*/]: {
              ["renderBody" /*@a*/]: (() => {
                doubleIndex;
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [/*@a*/ Symbol.iterator]: Marko._.any,
            },
          };
        })(),
    ),
  });
  const __marko_internal_tag_3 = custom;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@a"];
    input["@b"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()(
    //      ^?
    {
      x: 1,
      ...(x
        ? (() => {
            const a = 1 as const;
            return {
              //          ^?
              ["a" /*@a*/]: {
                a: a,
                [/*@a*/ Symbol.iterator]: Marko._.any,
              },
            };
          })()
        : (() => {
            const b = 2 as const;
            return {
              //          ^?
              ["b" /*@b*/]: {
                b: b,
                [/*@b*/ Symbol.iterator]: Marko._.any,
              },
            };
          })()),
    },
  );

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
