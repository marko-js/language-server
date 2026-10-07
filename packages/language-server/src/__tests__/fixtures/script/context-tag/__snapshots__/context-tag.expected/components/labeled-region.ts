export interface Input {
  label: string;
  content?: Marko.Body;
}
function __marko_internal_template(this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const label = Marko._.hoist(() => __marko_internal_hoist__label);
  // Self-referencing consume: `from=` resolves to this same template.
  var __marko_internal_context = () => input.label;
  {
    const __marko_internal_tag_1 = input.content;
    Marko._.renderDynamicTag(__marko_internal_tag_1)()()({});
    {
      const label = Marko._.contextTag(() =>
        Marko._.renderTemplate(
          Marko._.resolveTemplate(import("./labeled-region.marko")),
        )()()(Marko._.any),
      );
      Marko._.renderNativeTag("div")()()(
        //       ^?
        {
          [Marko._.content]: (() => {
            label.toUpperCase();
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        },
      );
    }
  }
  var { label: __marko_internal_hoist__label } = undefined;
  Marko._.noop({ label, input, $global, $signal });
  return Marko._.withContext(__marko_internal_context, undefined);
}
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
const LabeledRegion = new (class Template extends Marko._.Template<{
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
  ) => Marko._.ReturnWithScope<
    __marko_internal_input,
    typeof __marko_internal_template extends () => infer Return ? Return : never
  >;
}> {})();
export default LabeledRegion;
