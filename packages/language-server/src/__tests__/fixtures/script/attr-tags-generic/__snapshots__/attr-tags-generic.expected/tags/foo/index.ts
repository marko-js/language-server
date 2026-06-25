export interface Input<T> {
  value: T;
  then?: Marko.AttrTag<{
    content: Marko.Body<[T]>;
  }>;
}
(function <T>(this: void) {
  const input = Marko._.any as Input<T>;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const __marko_internal_tag_1 = input.then;
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()(input.value);
  Marko._.noop({ input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
const Foo = new (class Template extends Marko._.Template<{
  render<T>(
    input: Marko.TemplateInput<Input<T>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<never>;

  render<T>(
    input: Marko.TemplateInput<Input<T>>,
    cb?: (err: Error | null, result: Marko.RenderResult<never>) => void,
  ): Marko.Out<never>;

  renderSync<T>(
    input: Marko.TemplateInput<Input<T>>,
  ): Marko.RenderResult<never>;

  renderToString<T>(input: Marko.TemplateInput<Input<T>>): string;

  stream<T>(
    input: Marko.TemplateInput<Input<T>>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount<T>(
    input: Marko.TemplateInput<Input<T>>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: typeof __marko_internal_api;
  _<__marko_internal_apply = 1>(): __marko_internal_apply extends 0
    ? <T>() => <__marko_internal_input extends unknown>(
        input: Marko.Directives &
          Input<T> &
          Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>,
      ) => Marko._.ReturnWithScope<__marko_internal_input, void>
    : () => <__marko_internal_input extends unknown, T>(
        input: Marko.Directives &
          Input<T> &
          Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>,
      ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
export default Foo;
