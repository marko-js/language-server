export interface Input {
  content: Marko.Body<[{ title: string; count?: number }]>;
  pair: Marko.Body<[a: string, b: number]>;
  plain: Marko.Body;
}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const Card = Marko._.hoist(() => __marko_internal_hoist__Card);
  const __marko_internal_tag_1 = input.content;
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()(
    // A body whose only param is its input is given attributes, checked as a
    // tag's are.
    {
      title: "a",
      count: 1,
    },
  );
  const __marko_internal_tag_2 = input.content;
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()(
    //                ^?
    {
      title: 1,
    },
  );
  const __marko_internal_tag_3 = input.content;
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
    title: "a",
    bogus: 1,
  });
  const __marko_internal_tag_4 = input.content;
  Marko._.renderDynamicTag(__marko_internal_tag_4)()()({});
  const __marko_internal_tag_5 = input.pair;
  Marko._.renderDynamicTag(__marko_internal_tag_5)()()(
    // A body with other params is given arguments.
    "a",
    1,
  );
  const __marko_internal_tag_6 = input.pair;
  Marko._.renderDynamicTag(__marko_internal_tag_6)()()("a", "b");
  const __marko_internal_tag_7 = input.pair;
  Marko._.renderDynamicTag(__marko_internal_tag_7)()()("a");
  const __marko_internal_tag_8 = input.plain;
  Marko._.renderDynamicTag(__marko_internal_tag_8)()()(
    // A body with no params takes nothing.
    {},
  );
  const __marko_internal_tag_9 = input.plain;
  Marko._.renderDynamicTag(__marko_internal_tag_9)()()({
    bogus: 1,
  });
  const __marko_internal_tag_10 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/define.d.marko"),
  ).default;
  {
    const Card = Marko._.returned(() => __marko_internal_rendered_10);
    const __marko_internal_rendered_10 = Marko._.renderTemplate(
      __marko_internal_tag_10,
    )()()({
      // A <define> with attributes is such a body too. (Its attributes are not
      [Marko._.contentFor(__marko_internal_tag_10)]:
        // checked yet: a tag variable used as a tag name is read through its hoist.)
        ({ heading, size }: { heading: string; size?: number }) => {
          heading;
          size;
          return Marko._.voidReturn;
        },
    });
    const __marko_internal_tag_11 = Card;
    Marko._.renderDynamicTag(__marko_internal_tag_11)()()({
      heading: "a",
      size: 1,
    });
    const __marko_internal_tag_12 = Card;
    Marko._.renderDynamicTag(__marko_internal_tag_12)()()(
      //    ^?
      {
        heading: 1,
      },
    );
    const __marko_internal_tag_13 = Card;
    Marko._.renderDynamicTag(__marko_internal_tag_13)()()({
      heading: "a",
      bogus: 1,
    });
    const __marko_internal_tag_14 = Card;
    Marko._.renderDynamicTag(__marko_internal_tag_14)()()({});
    var __marko_internal_hoist__Card = Card;
  }
  Marko._.noop({ Card, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
const Input = new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<never>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<never>) => void,
  ): Marko.Out<never>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<never>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: typeof __marko_internal_api;
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
export default Input;
