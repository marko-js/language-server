export interface Input {
  detailed?: boolean;
  content?: Marko.Body;
}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function __marko_internal_template(this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  // The provide sits inside control flow: the consumed type must still be
  // exactly the provided type, with no extractor-added `undefined` (reading
  // an unprovided context is a runtime error, not a valid `undefined`).
  if (input.detailed) {
    var __marko_internal_context = () =>
      ({ mode: "detailed", level: 2 }) as const;
    {
      const __marko_internal_tag_1 = input.content;
      Marko._.renderDynamicTag(__marko_internal_tag_1)()()({});
    }
  } else {
    const __marko_internal_tag_2 = input.content;
    Marko._.renderDynamicTag(__marko_internal_tag_2)()()({});
  }
  Marko._.noop({ component, state, out, input, $global, $signal });
  return Marko._.withContext(__marko_internal_context, undefined);
}
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
const ModeProvider = new (class Template extends Marko._.Template<{
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
export default ModeProvider;
