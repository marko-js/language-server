export interface Input<T = string> {
  //                     ^?
  value: T;
  //       ^?
}
function __marko_internal_template<T = string>(this: void) {
  const input = Marko._.any as Input<T>;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  var __marko_internal_return = {
    return: Marko._.returnTag({
      value: input.value,
    }),
  };
  Marko._.noop({ input, $global, $signal });
  return __marko_internal_return.return;
}
export default new (class Template extends Marko._.Template<{
  render<T = string>(
    input: Marko.TemplateInput<Input<T>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<never>;

  render<T = string>(
    input: Marko.TemplateInput<Input<T>>,
    cb?: (err: Error | null, result: Marko.RenderResult<never>) => void,
  ): Marko.Out<never>;

  renderSync<T = string>(
    input: Marko.TemplateInput<Input<T>>,
  ): Marko.RenderResult<never>;

  renderToString<T = string>(input: Marko.TemplateInput<Input<T>>): string;

  stream<T = string>(
    input: Marko.TemplateInput<Input<T>>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount<T = string>(
    input: Marko.TemplateInput<Input<T>>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "tags";
  _<__marko_internal_apply = 1>(): __marko_internal_apply extends 0
    ? <T = string>() => <__marko_internal_input extends unknown>(
        input: Marko.Directives &
          Input<T> &
          Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>,
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        typeof __marko_internal_template<T> extends () => infer Return
          ? Return
          : never
      >
    : () => <__marko_internal_input extends unknown, T = string>(
        input: Marko.Directives &
          Input<T> &
          Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>,
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        typeof __marko_internal_template<T> extends () => infer Return
          ? Return
          : never
      >;
}> {})();
