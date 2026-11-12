import FancyButton from "./components/fancy-button.marko";
import ShinyButton from "./components/ShinyButton.marko";
import type { Input as FancyInput } from "./components/fancy-button.marko";
// A wrapper extending a deprecated tag's input.
export interface Input extends FancyInput {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const Button = Marko._.hoist(() => __marko_internal_hoist__Button);
  const buttonId = Marko._.hoist(() => __marko_internal_hoist__buttonId);
  const __marko_internal_tag_1 = FancyButton;
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()(
    //                             ^?
    {
      label: "Go",
    },
  );
  const __marko_internal_tag_2 = FancyButton;
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()(
    // ^?
    {
      label: "Go",
    },
  );
  const __marko_internal_tag_3 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/const.d.marko"),
  ).default;
  {
    const Button = Marko._.returned(() => __marko_internal_rendered_3);
    const __marko_internal_rendered_3 = Marko._.renderTemplate(
      __marko_internal_tag_3,
    )()()(
      //  ^?
      {
        value: FancyButton,
      },
    );
    const __marko_internal_tag_4 = Button;
    Marko._.renderDynamicTag(__marko_internal_tag_4)()()({
      label: "Go",
    });
    const __marko_internal_tag_5 = Marko._.fallbackTemplate(
      // @ts-ignore
      ShinyButton,
      Marko._.resolveTemplate(import("./components/ShinyButton.marko")).default,
    );
    Marko._.renderDynamicTag(__marko_internal_tag_5)()()(
      // ^?
      {},
    );
    const __marko_internal_tag_6 = Marko._.resolveTemplate(
      import("@marko/runtime-tags/tags/id.d.marko"),
    ).default;
    {
      const buttonId = Marko._.returned(() => __marko_internal_rendered_6);
      const __marko_internal_rendered_6 = Marko._.renderTemplate(
        __marko_internal_tag_6,
      )()()(
        // ^?
        // A core tag, documented by its types.
        {},
      );
      const __marko_internal_tag_7 = Marko._.resolveTemplate(
        import("marko/src/core-tags/core/await/index.d.marko"),
      ).default;
      Marko._.renderTemplate(__marko_internal_tag_7)()()({
        value: Promise.resolve(buttonId),
        //^?
        [Marko._.contentFor(__marko_internal_tag_7)]: (n) => {
          [n];
          return Marko._.voidReturn;
        },
      });
      var __marko_internal_hoist__Button = Button;
      var __marko_internal_hoist__buttonId = buttonId;
    }
  }
  Marko._.noop({ Button, buttonId, input, $global, $signal });
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
  ): Marko.MountedTemplate<typeof input, void>;

  api: typeof __marko_internal_api;
  _<A = 1>(
    m?: A,
  ): () => A extends 2 | 3
    ? Marko._.RestAttrTagsRenderer<Input, void>
    : <I>(
        input: Marko.Directives &
          Input &
          Marko._.Relate<I, Marko.Directives & Input>,
      ) => Marko._.ReturnWithScope<I, void>;
}> {})();
export default Input;
//^?
