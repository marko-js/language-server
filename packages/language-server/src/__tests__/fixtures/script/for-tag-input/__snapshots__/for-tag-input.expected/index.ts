export interface Input {
  tab?: Marko.AttrTag<{
    href: string;
    title: string;
  }>;
  option: any;
}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.forOfTag(
    {
      /*for*/ of: input.tab,
    },
    ({ href, title }) => {
      Marko._.renderNativeTag("a")()()(
        // ^?
        {
          href: href,
          [Marko._.content /*a*/]: (() => {
            title;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        },
      );
      return Marko._.voidReturn;
    },
  );
  Marko._.renderNativeTag("select")()()(
    // ^?
    {
      [Marko._.content /*select*/]: (() => {
        Marko._.forOfTag(
          {
            /*for*/ of: input.option,
          },
          ({ value, content }) => {
            Marko._.renderNativeTag("option")()()(
              // ^?
              {
                value: value,
                [Marko._.content /*option*/]: (() => {
                  content;
                  return () => {
                    return Marko._.voidReturn;
                  };
                })(),
              },
            );
            return Marko._.voidReturn;
          },
        );
        return () => {
          return Marko._.voidReturn;
        };
      })(),
    },
  );
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./components/my-select.marko"),
  );
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1 /*my-select*/)()()(
    // ^?
    {
      ...Marko._.mergeAttrTags(
        Marko._.forOfAttrTag(
          {
            /*for*/ of: input.tab,
          },
          ({ href, title }) => ({
            // ^?
            ["option" /*@option*/]: {
              value: href,
              [Marko._.contentFor(__marko_internal_tag_1) /*@option*/]: (() => {
                // ^?
                title;
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [/*@option*/ Symbol.iterator]: Marko._.any,
            },
          }),
        ),
        Marko._.forOfAttrTag(
          {
            /*for*/ of: input.option,
          },
          ({ value, content }) => ({
            // ^?
            ["option" /*@option*/]: {
              value: value,
              [Marko._.contentFor(__marko_internal_tag_1) /*@option*/]: (() => {
                // ^?
                content;
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [/*@option*/ Symbol.iterator]: Marko._.any,
            },
          }),
        ),
      ),
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
