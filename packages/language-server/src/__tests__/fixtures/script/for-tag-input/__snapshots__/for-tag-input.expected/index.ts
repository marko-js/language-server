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
      of: input.tab,
    },
    ({ href, title }) => {
      Marko._.renderNativeTag("a")()()(
        // ^?
        {
          href: href,
          [Marko._.content]: (() => {
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
  Marko._.renderNativeTag("select")()()({
    [Marko._.content]: (() => {
      Marko._.forOfTag(
        {
          of: input.option,
        },
        ({ value, content }) => {
          Marko._.renderNativeTag("option")()()(
            // ^?
            {
              value: value,
              [Marko._.content]: (() => {
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
  });
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./components/my-select.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: input.tab,
        },
        ({ href, title }) =>
          Marko._.attrTags(__marko_internal_tag_1)([
            {
              // ^?
              option: {
                value: href,
                [Marko._.contentFor(__marko_internal_tag_1)]: (() => {
                  // ^?
                  title;
                  return () => {
                    return Marko._.voidReturn;
                  };
                })(),
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
      Marko._.forOfAttrTag(
        {
          of: input.option,
        },
        ({ value, content }) =>
          Marko._.attrTags(__marko_internal_tag_1)([
            {
              // ^?
              option: {
                value: value,
                [Marko._.contentFor(__marko_internal_tag_1)]: (() => {
                  // ^?
                  content;
                  return () => {
                    return Marko._.voidReturn;
                  };
                })(),
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("option"),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
const Input = new (class Template extends Marko._.Template<{
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
  ): Marko.MountedTemplate<typeof input, void>;

  api: typeof __marko_internal_api;
  _<A = 1>(
    m?: A,
  ): () => A extends 3
    ? Marko._.RestAttrTagsRenderer<Input, void>
    : <I>(
        input: Marko.Directives &
          Input &
          Marko._.Relate<I, Marko.Directives & Input>,
      ) => Marko._.ReturnWithScope<I, void>;
}> {})();
export default Input;
